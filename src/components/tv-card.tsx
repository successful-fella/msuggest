import React from 'react';
import Image from "next/image";

import {
	Typography,
	Card,
	CardBody,
	CardHeader,
} from "@material-tailwind/react";

interface TvCardProps {
	poster_path: string;
	genreNames: string[];
	name: string;
	overview: string;
	category: string;
}

export function TvCard({
	poster_path,
	genreNames,
	name,
	overview,
}: TvCardProps) {
	return (
		<Card color="transparent" shadow={false}>
			<CardHeader color="gray" floated={false} className="mx-0 mt-0 mb-6">
				<Image
					width={768}
					height={768}
					src={`https://image.tmdb.org/t/p/w500${poster_path}`}
					alt={`${name}`}
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
						{name}
					</Typography>
				</a>
				<Typography className="mb-4 font-normal !text-gray-500">
					{overview}
				</Typography>
			</CardBody>
		</Card>
	);
}
export default TvCard