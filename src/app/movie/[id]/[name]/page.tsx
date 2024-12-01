'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Typography, Chip, Button } from "@material-tailwind/react"
import { CalendarDaysIcon, GlobeAltIcon, LanguageIcon, BuildingOfficeIcon, CurrencyDollarIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Component() {
    const params = useParams();
    const movieId = params?.id;
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        if (movieId) {
            fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=b20f6d214d701e3acf7fea07c7115612`)
                .then((response) => response.json())
                .then((data) => setMovieDetails(data))
                .catch((error) => console.error("Error fetching movie details:", error));
        }
    }, [movieId]);

    if (!movieDetails) {
        return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="relative w-full h-96">
                <Image
                    src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
                    alt={movieDetails.title}
                    layout="fill"
                    objectFit="cover"
                    className="brightness-50"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                    <div className="container mx-auto px-4 py-6 flex items-end space-x-6">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                            alt={movieDetails.title}
                            width={150}
                            height={225}
                            className="rounded-lg shadow-lg"
                        />
                        <div>
                            <Typography variant="h1" color="white" className="mb-2">
                                {movieDetails.title}
                            </Typography>
                            <div className="flex flex-wrap gap-2">
                                {movieDetails.genres.map((genre, index) => (
                                    <Chip key={index} value={genre.name} className="bg-blue-gray-50 text-blue-gray-900" />
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
                            <Typography color="gray">{movieDetails.overview}</Typography>
                        </section>

                        <section>
                            <Typography variant="h4" color="blue-gray" className="mb-2">Details</Typography>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <CalendarDaysIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">Release Date: {movieDetails.release_date}</Typography>
                                </li>
                                <li className="flex items-center">
                                    <GlobeAltIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">Origin Country: {movieDetails.production_countries.map(c => c.name).join(", ")}</Typography>
                                </li>
                                <li className="flex items-center">
                                    <LanguageIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">Language: {movieDetails.spoken_languages.map(l => l.english_name).join(", ")}</Typography>
                                </li>
                                <li className="flex items-center">
                                    <BuildingOfficeIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">Production Company: {movieDetails.production_companies.map(c => c.name).join(", ")}</Typography>
                                </li>
                                <li className="flex items-center">
                                    <CurrencyDollarIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">Revenue: ${movieDetails.revenue.toLocaleString()}</Typography>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircleIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">Status: {movieDetails.status}</Typography>
                                </li>
                            </ul>
                        </section>
                    </div>

                    <div>
                        <Link href={movieDetails.homepage} target="_blank" rel="noopener noreferrer">
                            <Button fullWidth className="mb-4">Visit Official Website</Button>
                        </Link>
                        <Link href="/">
                            <Button fullWidth color="gray">Back to Movies List</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}