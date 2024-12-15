"use client";

import Image from "next/image";
import Link from "next/link";
import { Typography, Chip, Button } from "@material-tailwind/react";
import {
    CalendarDaysIcon,
    GlobeAltIcon,
    LanguageIcon,
    FilmIcon,
    TvIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Component() {
    const params = useParams();
    const tvId = params?.id;
    const [tvShow, setTvShow] = useState(null);

    useEffect(() => {
        if (tvId) {
            fetch(
                `https://api.themoviedb.org/3/tv/${tvId}?api_key=b20f6d214d701e3acf7fea07c7115612`
            )
                .then((response) => response.json())
                .then((data) => setTvShow(data))
                .catch((error) => console.error("Error fetching TV details:", error));
        }
    }, [tvId]);

    if (!tvShow) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Loading...
            </div>
        );
    }

    const backdropUrl = `https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`;
    const posterUrl = `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="relative w-full h-96">
                <Image
                    src={backdropUrl}
                    alt={tvShow.name}
                    fill
                    className="brightness-50 object-cover"
                    onError={(e) => e.target.src = "/default-backdrop.webp"}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                    <div className="container mx-auto px-4 py-6 flex items-end space-x-6">
                        <Image
                            src={posterUrl}
                            alt={tvShow.name}
                            width={150}
                            height={225}
                            className="rounded-lg shadow-lg"
                        />
                        <div className="space-y-2">
                            <Typography variant="h1" color="white">
                                {tvShow.name}
                            </Typography>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <TvIcon className="h-5 w-5 mr-1 text-white" />
                                    <Typography color="white">
                                        {tvShow.number_of_seasons} Seasons
                                    </Typography>
                                </div>
                                <div className="flex items-center">
                                    <FilmIcon className="h-5 w-5 mr-1 text-white" />
                                    <Typography color="white">
                                        {tvShow.number_of_episodes} Episodes
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tvShow.genres.map((genre) => (
                                    <Chip
                                        key={genre.id}
                                        value={genre.name}
                                        className="bg-blue-gray-50 text-blue-gray-900"
                                    />
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
                            <Typography variant="h4" color="blue-gray">
                                Overview
                            </Typography>
                            <Typography color="gray">{tvShow.overview}</Typography>
                        </section>

                        <section>
                            <Typography variant="h4" color="blue-gray">
                                Details
                            </Typography>
                            <ul className="space-y-2" style={{ backgroundColor: '#f5f5f5' }}>
                                <li className="flex items-center">
                                    <CalendarDaysIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">
                                        First Air Date: {tvShow.first_air_date}
                                    </Typography>
                                </li>
                                <li className="flex items-center">
                                    <GlobeAltIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">
                                        Origin Country: {tvShow.origin_country.join(", ")}
                                    </Typography>
                                </li>
                                <li className="flex items-center">
                                    <LanguageIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">
                                        Language:{" "}
                                        {tvShow.spoken_languages
                                            .map((lang) => lang.english_name)
                                            .join(", ")}
                                    </Typography>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircleIcon className="h-5 w-5 mr-2 text-blue-gray-500" />
                                    <Typography color="gray">Status: {tvShow.status}</Typography>
                                </li>
                            </ul>
                        </section>
                    </div>

                    <div>
                        <Link href={tvShow.homepage} target="_blank" rel="noopener noreferrer">
                            <Button fullWidth className="mb-4">Visit Official Website</Button>
                        </Link>
                        <Link href="/">
                            <Button fullWidth color="gray">
                                Back to TV Shows List
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}