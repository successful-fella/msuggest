"use client";
import React from "react";

import { Typography, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
const FAQS = [
	{
		title: "How are randomly movies selected?",
		desc: "We have designed a true random generator that shuffle movies and TVs while ensuring we always suggest good rated movies avoiding any flop movies or TV series.",
	},
	{
		title: "Where is 'xyz' genre?",
		desc: "Everyday random movie/TV means that you may somedays not get the genre you are looking for. Come back next time for fresh suggestions!",
	},
	{
		title: "At what time does clock reset and we get new suggestions?",
		desc: "00:00 IST",
	},
	{
		title: "How can I reach out to you?",
		desc: <span>Connect with me on <a href="https://telegram.dog/WrkLifebal" target="_blank" className="text-blue-900">Telegram</a>!</span>,
	},
];

export function Faq() {
	const [open, setOpen] = React.useState(0);
	const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

	return (
		<section className="px-8 py-40">
			<div className="container mx-auto">
				<div className="text-center">
					<Typography variant="h1" color="blue-gray" className="mb-4">
						Frequently Asked Questions
					</Typography>
					<Typography
						variant="lead"
						className="mx-auto mb-24 w-full max-w-2xl !text-gray-900"
					>
						Something New Everyday ❤️
					</Typography>
				</div>
				<div className="mx-auto lg:max-w-screen-lg lg:px-20">
					{FAQS.map(({ title, desc }, key) => (
						<Accordion
							key={key}
							open={open === key + 1}
							onClick={() => handleOpen(key + 1)}
						>
							<AccordionHeader className="text-left text-gray-900">
								{title}
							</AccordionHeader>
							<AccordionBody>
								<Typography
									color="blue-gray"
									className="font-normal text-gray-800"
								>
									{desc}
								</Typography>
							</AccordionBody>
						</Accordion>
					))}
				</div>
			</div>
		</section>
	);
}


export default Faq;
