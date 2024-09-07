'use client'

// components
import { Navbar, Footer } from "@/components";
import { DiscussionEmbed } from 'disqus-react'

// sections
import DailyMovies from "./daily-movies";
import Faq from "./faq";

export default function Campaign() {
	return (
		<>
			<Navbar />
			<DailyMovies />
			<Faq />
			<section className="px-8 py-40">
				<div className="container mx-auto disqus-section">
					<DiscussionEmbed
						shortname='msuggest'
						config={
							{
								url: '',
								identifier: 'home',
								title: 'mSuggest Discussion'
							}
						}
					/>
				</div>
			</section>
			<Footer />
		</>
	);
}
