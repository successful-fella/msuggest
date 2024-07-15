import React from 'react';
import Image from "next/image";

import {
	Typography,
	Card,
	CardBody,
	CardHeader,
} from "@material-tailwind/react";

interface MovieCardProps {
	posterPath: string;
	genreNames: string[];
	title: string;
	overview: string;
	category: string;
}

export function MovieCard({
	posterPath,
	genreNames,
	title,
	overview,
}: MovieCardProps) {
	return (
        (posterPath && overview) ?
            <Card shadow={false} className="flex flex-row bg-gray-50 transition animate-fade-in">
                <CardHeader color="gray" floated={false} className="flex-shrink-0 w-2/12">
                    <Image
                        width={768}
                        height={768}
                        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                        alt={title}
                        className="h-full w-full object-cover object-center"
                    />
                </CardHeader>
                <CardBody className="w-10/12 p-4">
                    <Typography color="blue" className="mb-2 text-xs !font-semibold">
                        {genreNames.map((genre, i) => (
                            <span key={i} style={{ textTransform: "capitalize" }}>
                                {genre}
                                {i < genreNames.length - 1 && ", "}
                            </span>
                        ))}
                    </Typography>
                    <a href="#">
                        <Typography
                            variant="h5"
                            color="blue-gray"
                            className="mb-3 font-bold normal-case xl:w-64"
                        >
                            {title}
                        </Typography>
                    </a>
                    <Typography className="mb-4 font-normal !text-gray-500">
                        {overview}
                    </Typography>
                </CardBody>
            </Card>
        : null
            
	);
}
export default MovieCard