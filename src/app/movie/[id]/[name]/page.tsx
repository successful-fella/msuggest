"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Typography, Chip, Button } from "@material-tailwind/react"
import { CalendarDaysIcon, GlobeAltIcon, LanguageIcon, BuildingOfficeIcon, CurrencyDollarIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

export default function Component() {
    const movie = {
        backdropPath: "https://image.tmdb.org/t/p/original/628Dep6AxEtDxjZoGP78TsOxYbK.jpg",
        posterPath: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        genres: ["Action", "Adventure", "Science Fiction"],
        officialWebsite: "https://www.guardians.marvel.com",
        language: "English",
        title: "Guardians of the Galaxy Vol. 3",
        overview: "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them.",
        releaseDate: "May 5, 2023",
        originCountry: "United States",
        productionCompany: "Marvel Studios",
        revenue: 845555777,
        status: "Released"
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="relative w-full h-96">
                <Image
                    src={movie.backdropPath}
                    alt={movie.title}
                    layout="fill"
                    objectFit="cover"
                    className="brightness-50"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                    <div className="container mx-auto px-4 py-6 flex items-end space-x-6">
                        <Image
                            src={movie.posterPath}
                            alt={movie.title}
                            width={150}
                            height={225}
                            className="rounded-lg shadow-lg"
                        />
                        <div>
                            <Typography variant="h1" color="white" className="mb-2">
                                {movie.title}
                            </Typography>
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map((genre, index) => (
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
                            <Typography color="gray">{movie.overview}</Typography>
                        </section>

                        <section>
                            <Typography variant="h4" color="blue-gray" className="mb-2">Details</Typography>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <CalendarDaysIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">Release Date: {movie.releaseDate}</Typography>
                                </li>
                                <li className="flex items-center">
                                    <GlobeAltIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">Origin Country: {movie.originCountry}</Typography>
                                </li>
                                <li className="flex items-center">
                                    <LanguageIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">Language: {movie.language}</Typography>
                                </li>
                                <li className="flex items-center">
                                    <BuildingOfficeIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">Production Company: {movie.productionCompany}</Typography>
                                </li>
                                <li className="flex items-center">
                                    <CurrencyDollarIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">Revenue: ${movie.revenue.toLocaleString()}</Typography>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircleIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">Status: {movie.status}</Typography>
                                </li>
                            </ul>
                        </section>
                    </div>

                    <div>
                        <Link href={movie.officialWebsite} target="_blank" rel="noopener noreferrer">
                            <Button fullWidth className="mb-4">Visit Official Website</Button>
                        </Link>
                        <Link href="/">
                            <Button fullWidth color="gray">Back to Movies List</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}