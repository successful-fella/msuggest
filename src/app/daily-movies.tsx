"use client";

import { useState, useEffect } from "react"

import { Typography, Tabs, TabsHeader, Tab, Select, Option, List } from "@material-tailwind/react";
import MovieCard from "@/components/movie-card"
import MovieList from "@/components/movie-list"
import GenreSkeleton from "@/components/genre-skeleton"
import MovieCardSkeleton from "@/components/movie-card-skeleton"
import { Squares2X2Icon, QueueListIcon } from "@heroicons/react/24/solid"

const getTimeUntilNextMidnight = () => {
	const now = new Date();
	const midnight = new Date(now);
	midnight.setHours(24, 0, 0, 0);
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
	const [showType, setShowType] = useState(Math.random() < 0.5 ? 'movies' : 'tv')
	const [view, setView] = useState('card')

	const normalizeShowData = (data: any) => {
		const adjustedData = data.map((movie: any) => ({
			...movie,
			posterPath: movie.posterPath || movie.poster_path,
			title: movie.name || movie.title,
		}))
		return adjustedData
	}

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
			fetch(`${process.env.NEXT_PUBLIC_API_URL}${showType}?countryCode=${country}`)
				.then(response => response.json())
				.then(data => {
					const adjustedData = normalizeShowData(data)
					setMovies(adjustedData)
					setMovieGenres(Array.from(new Set(data.flatMap((movie: { genreNames: any; }) => movie.genreNames))));
				})
				.catch(error => {
					console.error('Error fetching movies:', error);
				});
		}
	}, [country]);

	const changeByCountry = (country: string) => {
		setMovies([])
		setMovieGenres([])
		setCountry(country);
		fetch(`${process.env.NEXT_PUBLIC_API_URL}${showType}?countryCode=${country}`)
			.then(response => response.json())
			.then(data => {
				const adjustedData = normalizeShowData(data)
				setMovies(adjustedData);
				setMovieGenres(Array.from(new Set(data.flatMap((movie: { genreNames: any; }) => movie.genreNames))));
			})
			.catch(error => {
				console.error('Error fetching movies:', error);
			});
	}

	const changeShowType = (type: any) => {
		setMovies([])
		setMovieGenres([])
		setShowType(type);
		fetch(`${process.env.NEXT_PUBLIC_API_URL}${type}?countryCode=${country}`)
			.then(response => response.json())
			.then(data => {
				const adjustedData = normalizeShowData(data)
				setMovies(adjustedData);
				setMovieGenres(Array.from(new Set(data.flatMap((movie: { genreNames: any; }) => movie.genreNames))));
			})
			.catch(error => {
				console.error('Error fetching movies:', error);
			});
	}

	return (
		<section className="px-8 pt-20 pb-10">
			<div className="container mx-auto mb-10 text-center">
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
						<Select label="Global Industry Filter" value={country} onChange={(val) => changeByCountry(val || '')}>
							<Option value="IN">Indian</Option>
							<Option value="US">American</Option>
							<Option value="JP">Japanese</Option>
							<Option value="CN">Chinese</Option>
							<Option value="KR">Korean</Option>
						</Select>
					</div>
					<div className="w-72 mr-2">
						<Select label="Show Type" value={showType} onChange={(val) => changeShowType(val)}>
							<Option value="movies">Movies</Option>
							<Option value="tv">TVs</Option>
						</Select>
					</div>
				</div>
				{movieGenres.length === 0 ? (
					<GenreSkeleton />
				) : (
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
				)}
			</div>
			<div className="flex justify-end mb-10 container mx-auto">
				<div className="inline-flex bg-gray-200 p-2 rounded">
					<Squares2X2Icon className={`h-4 w-4 mr-2 cursor-pointer ${view === 'card' ? 'theme-color' : ''}`} onClick={() => setView('card')} />
					<QueueListIcon className={`h-4 w-4 cursor-pointer ${view === 'list' ? 'theme-color' : ''}`} onClick={() => setView('list')} />
				</div>
			</div>
			<div className={`container mx-auto grid grid-cols-1 items-start gap-x-6 gap-y-20 ${view === 'card' ? 'md:grid-cols-2 xl:grid-cols-4' : 'md:grid-cols-1 xl:grid-cols-1'}`}>
				{movies.length === 0 ? (
					Array(8).fill(1).map((val, i) =>
						<MovieCardSkeleton key={i} />
					)
				) : (
					movies.map((props: any, key) => {
						if (showType === "movies") {
							if (activeTab === "all") {
								return view === 'card' ? <MovieCard key={key} {...props} /> : <MovieList key={key} {...props} />
							} else if (props.genreNames.includes(activeTab)) {
								return view === 'card' ? <MovieCard key={key} {...props} /> : <MovieList key={key} {...props} />
							}
						} else {
							if (activeTab === "all") {
								return view === 'card' ? <MovieCard key={key} {...props} /> : <MovieList key={key} {...props} />
							} else if (props.genreNames.includes(activeTab)) {
								return view === 'card' ? <MovieCard key={key} {...props} /> : <MovieList key={key} {...props} />
							}
						}
					})
				)}
			</div>
		</section>
	);
}


export default DailyMovies;