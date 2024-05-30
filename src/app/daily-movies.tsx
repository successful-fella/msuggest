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

const MOVIES = [
	{
		img: `/image/movies/1KTazlgbXsAgAFVRw1oRZMPfQaw.jpg`,
		genres: ["action", "adventure", "romance"],
		title: "Salaad",
		desc: "A heartwarming and humorous picture book that eases the jitters of starting kindergarten.",
	},
	{
		img: `/image/movies/aRqQNSuXpcE3dkJC43aEg9f2HXd.jpg`,
		genres: ["anime", "comedy"],
		title: "One Piece",
		desc: "A funny and relatable novel about the challenges of navigating middle school.",
	},
	{
		img: `/image/movies/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg`,
		genres: ["action", "gore"],
		title: "Attack on Titan",
		desc: "A practical guidebook that helps college students prepare for the transition to university.",
	},
	{
		img: `/image/movies/nZNUTxGsSB4nLEC9Bpa2xfu81qV.jpg`,
		genres: ["adventure", "drama", "comedy", "romance"],
		title: "Munna Bhai M.B.B.S.",
		desc: "A valuable resource for high school seniors and college freshmen, offering effective study strategies.",
	},
	{
		img: `/image/movies/q719jXXEzOoYaps6babgKnONONX.jpg`,
		genres: ["romance", "comedy"],
		title: "Kimi no Nawa",
		desc: "A classic reference book on grammar and writing skills, essential for high school and college students.",
	},
	{
		img: `/image/movies/ykZ7hlShkdRQaL2aiieXdEMmrLb.jpg`,
		genres: ["action", "adventure"],
		title: "Three Body Problem",
		desc: "A classic reference book on grammar and writing skills, essential for high school and college students.",
	},
];

const MOVIE_GENRES = Array.from(new Set(MOVIES.flatMap((movie) => movie.genres)))

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
	const [country, setCountry] = useState('')

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
				if(['IN', 'US', 'CN', 'KR', 'JP'].includes(data.country)) {
					setCountry(data.country)
				} else {
					setCountry('IN')
				}
			})
			.catch(error => {
				console.error('Error fetching location:', error);
				setCountry('IN');
			});
	}, [])

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
				<div className="w-72 mt-5 mx-auto !text-gray-500 py-5">
					<Select label="Global Industry Filter" value={country} onChange={(val) => setCountry(val || '')}>
						<Option value="IN">Indian</Option>
						<Option value="US">American</Option>
						<Option value="JP">Japanese</Option>
						<Option value="CN">Chinese</Option>
						<Option value="KR">Korean</Option>
					</Select>
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
							{MOVIE_GENRES.map((genre) => (
								<Tab
									key={genre}
									value={genre}
									className={`!font-medium capitalize transition-all duration-300 ${activeTab === genre ? "text-white" : "capitalize"}`}
									onClick={() => setActiveTab(genre)}
								>
									{genre}
								</Tab>
							))}
						</TabsHeader>
					</Tabs>
				</div>
			</div>
			<div className="container mx-auto grid grid-cols-1 items-start gap-x-6 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
				{MOVIES.map((props, key) => {
					if (activeTab === "all") {
						return <MovieCard key={key} {...props} />
					} else if (props.genres.includes(activeTab)) {
						return <MovieCard key={key} {...props} />
					}
				})}
			</div>
		</section>
	);
}


export default DailyMovies;