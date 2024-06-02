"use client";

import { useState, useEffect } from "react"

import {
	Button,
	Typography,
	Tabs,
	TabsHeader,
	Tab,
	Select,
	Option
} from "@material-tailwind/react";
import MovieCard from "@/components/movie-card";

const getTimeUntilNextMidnight = () => {
	const now = new Date();
	const midnight = new Date(now);
	midnight.setHours(24, 0, 0, 0); // Set to next midnight
	return midnight.getTime() - now.getTime();
}

const formatRemainingTime = (ms: number) => {
	const totalSeconds = Math.floor(ms / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	return `${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
}

export function DailyMovies() {
	const [activeTab, setActiveTab] = useState("all");
	const [remainingTime, setRemainingTime] = useState(getTimeUntilNextMidnight());
	const [isClient, setIsClient] = useState(false);
	const [country, setCountry] = useState('');
	const [movies, setMovies] = useState([]);
	const [movieGenres, setMovieGenres] = useState([]);
	const [showType, setShowType] = useState(Math.random() < 0.5 ? 'movie' : 'tv')

	useEffect(() => {
		setIsClient(true);
		const interval = setInterval(() => {
			setRemainingTime(getTimeUntilNextMidnight());
		}, 1000);

		return () => clearInterval(interval);
	}, [])

	useEffect(() => {
		fetch("https://ipinfo.io", { headers: { 'Accept': 'application/json' } })
			.then(response => response.json())
			.then(data => {
				console.log(data.country)
				if (['IN', 'US', 'CN', 'KR', 'JP'].includes(data.country)) {
					setCountry(data.country)
				} else {
					setCountry('IN')
				}
			})
			.catch(error => {
				console.error('Error fetching location:', error);
				setCountry('IN');
			});
	}, []);

	useEffect(() => {
		if (country) {
			fetch(`http://localhost:9092/movies?countryCode=${country}`)
				.then(response => response.json())
				.then(data => {
					setMovies(data);
					setMovieGenres(Array.from(new Set(data.flatMap((movie: { genreNames: any; }) => movie.genreNames))));
				})
				.catch(error => {
					console.error('Error fetching movies:', error);
				});
		}
	}, [country]);

	return (
		<section className="px-8 pt-20 pb-10">
			<div className="container mx-auto mb-20 text-center">
				<Typography variant="h1" color="blue-gray" className="mb-2">
					New TVs/Movies Suggestion Everyday!
				</Typography>
				<Typography
					variant="lead"
					className="mx-auto w-full px-4 lg:w-9/12 theme-color"
				>
					Come back in {isClient ? formatRemainingTime(remainingTime) : 'some time'} for new suggestions.
				</Typography>
				<div className="flex justify-center items-center mt-5 mx-auto !text-gray-500 py-5">
					<div className="w-72 mr-2">
						<Select label="Global Industry Filter" value={country} onChange={(val) => setCountry(val || '')}>
							<Option value="IN">Indian</Option>
							<Option value="US">American</Option>
							<Option value="JP">Japanese</Option>
							<Option value="CN">Chinese</Option>
							<Option value="KR">Korean</Option>
						</Select>
					</div>
					<div className="w-72 mr-2">
						<Select label="Show Type" value={showType} onChange={(val) => setShowType(val || '')}>
							<Option value="movie">Movies</Option>
							<Option value="tv">TVs</Option>
						</Select>
					</div>
				</div>
				<div className="mt-5 flex items-center justify-center">
					<Tabs value={activeTab} className="w-full lg:w-8/12">
						<TabsHeader
							className="h-12 bg-transparent"
							indicatorProps={{
								className: "theme-bg rounded-lg",
							}}
						>
							<Tab
								key={'all'}
								value={'all'}
								className={`!font-medium capitalize transition-all duration-300 ${activeTab === 'all' ? "text-white" : "capitalize"}`}
								onClick={() => setActiveTab('all')}
							>
								All
							</Tab>
							{movieGenres.map((genre) => {
								return (
									<Tab
										key={genre}
										value={genre}
										className={`!font-medium capitalize transition-all duration-300 ${activeTab === genre ? "text-white" : "capitalize"}`}
										onClick={() => setActiveTab(genre)}
									>
										{genre === 'Science Fiction' ? 'SciFi' : genre}
									</Tab>
								);
							})}
						</TabsHeader>
					</Tabs>
				</div>
			</div>
			<div className="container mx-auto grid grid-cols-1 items-start gap-x-6 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
				{movies.map((props, key) => {
					if (activeTab === "all") {
						return <MovieCard key={key} {...props} />
					} else if (props.genreNames.includes(activeTab)) {
						return <MovieCard key={key} {...props} />
					}
				})}
			</div>
		</section>
	);
}


export default DailyMovies;