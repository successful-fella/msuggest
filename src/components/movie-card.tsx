import React, { useState } from 'react';
import Image from "next/image";
import {
	Popover,
	PopoverHandler,
	PopoverContent
  } from "@material-tailwind/react";

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
			<Card color="transparent" shadow={false}>
				<CardHeader color="gray" floated={false} className="mx-0 mt-0 mb-6">
					<Image
					width={768}
					height={768}
						src={`https://image.tmdb.org/t/p/w500${posterPath}`}
						alt={title}
					className="h-full w-full scale-[1.1] object-cover object-center"
					/>
				</CardHeader>
				<CardBody className="p-0">
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
						{overview.length > 199 ? (
							<span> {overview.substring(0,199).trim() + "..."}
							<Popover
								animate={{
								mount: { scale: 1, y: 0 },
								unmount: { scale: 0, y: 25 },
								}}
						  	>
							<PopoverHandler>
								<span className='text-blue-500 cursor-pointer'> more</span>
							</PopoverHandler>
							<PopoverContent className='tooltip'>
							  {overview}
							</PopoverContent>
						  </Popover></span>
						) : (
							overview
						)}
					</Typography>
				</CardBody>
			</Card> : ""
	);
}
export default MovieCard