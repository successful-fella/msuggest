"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Typography, Chip, Button } from "@material-tailwind/react"
import { CalendarDaysIcon, GlobeAltIcon, LanguageIcon, FilmIcon, TvIcon, MapPinIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

export default function Component() {
    const tvShow = {
        backdropPath: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
        firstAirDate: "October 23, 2011",
        genres: ["Drama", "Crime", "Thriller"],
        officialWebsite: "https://www.amc.com/shows/the-walking-dead",
        whereToWatch: ["AMC", "Netflix"],
        numberOfEpisodes: 177,
        numberOfSeasons: 11,
        originCountry: "United States",
        language: "English",
        title: "The Walking Dead",
        overview: "Sheriff's deputy Rick Grimes awakens from a coma to find a post-apocalyptic world dominated by flesh-eating zombies. He sets out to find his family and encounters many other survivors along the way.",
        posterPath: "https://image.tmdb.org/t/p/w500/xf9wuDcqlUPWABZNeDKPbZUjWx0.jpg",
        status: "Ended"
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="relative w-full h-96">
                <Image
                    src={tvShow.backdropPath}
                    alt={tvShow.title}
                    layout="fill"
                    objectFit="cover"
                    className="brightness-50"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                    <div className="container mx-auto px-4 py-6 flex items-end space-x-6">
                        <Image
                            src={tvShow.posterPath}
                            alt={tvShow.title}
                            width={150}
                            height={225}
                            className="rounded-lg shadow-lg"
                        />
                        <div className="space-y-2">
                            <Typography variant="h1" color="white" className="mb-1">
                                {tvShow.title}
                            </Typography>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <TvIcon className="h-5 w-5 mr-1 text-white" />
                                    <Typography color="white">{tvShow.numberOfSeasons} Seasons</Typography>
                                </div>
                                <div className="flex items-center">
                                    <FilmIcon className="h-5 w-5 mr-1 text-white" />
                                    <Typography color="white">{tvShow.numberOfEpisodes} Episodes</Typography>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tvShow.genres.map((genre, index) => (
                                    <Chip key={index} value={genre} className="bg-blue-gray-50 text-blue-gray-900" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <section>
                            <Typography variant="h4" color="blue-gray" className="mb-2">Overview</Typography>
                            <Typography color="gray">{tvShow.overview}</Typography>
                        </section>

                        <section>
                            <Typography variant="h4" color="blue-gray" className="mb-2">Details</Typography>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <CalendarDaysIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">First Air Date: {tvShow.firstAirDate}</Typography>
                                </li>
                                <li className="flex items-center">
                                    <GlobeAltIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">Origin Country: {tvShow.originCountry}</Typography>
                                </li>
                                <li className="flex items-center">
                                    <LanguageIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">Language: {tvShow.language}</Typography>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircleIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">Status: {tvShow.status}</Typography>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <Typography variant="h4" color="blue-gray" className="mb-2">Where to Watch</Typography>
                            <div className="flex flex-wrap gap-2">
                                {tvShow.whereToWatch.map((network, index) => (
                                    <Chip key={index} value={network} className="bg-blue-gray-50 text-blue-gray-900" />
                                ))}
                            </div>
                        </section>
                    </div>

                    <div>
                        <Link href={tvShow.officialWebsite} target="_blank" rel="noopener noreferrer">
                            <Button fullWidth className="mb-4">Visit Official Website</Button>
                        </Link>
                        <Link href="/">
                            <Button fullWidth color="gray">Back to TV Shows List</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}