import React, { useEffect, useState } from "react";
import {
	Navbar as MTNavbar,
	Typography,
	Button,
} from "@material-tailwind/react";
import { CommentCount } from 'disqus-react';
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid"
interface NavItemProps {
	children: React.ReactNode;
	href?: string;
}

import ThemeToggleButton from './ThemeToggleButton';

function NavItem({ children, href }: NavItemProps) {
	return (
		<li>
			<Typography
				as="a"
				href={href || "#"}
				target={href ? "_blank" : "_self"}
				variant="paragraph"
				color="gray"
				className="flex items-center gap-2 font-medium text-gray-900"
			>
				{children}
			</Typography>
		</li>
	);
}

export function Navbar() {
	const [open, setOpen] = React.useState(false);

	function handleOpen() {
		setOpen((cur) => !cur);
	}

	const scrollToDiscussion = () => {
		const discussionSection = document.querySelector('.disqus-section');
		if (discussionSection) {
			discussionSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => {
		window.addEventListener(
			"resize",
			() => window.innerWidth >= 960 && setOpen(false)
		);
	}, []);

	return (
		<MTNavbar shadow={false} fullWidth className="border-0 sticky top-0 z-50">
			<div className="container mx-auto flex items-center justify-between py-3">
				<Typography className="text-4xl font-bold lancelot-font theme-color">
					mSuggest
				</Typography>
				<div className="flex items-center gap-4">
					<Button
						variant="text"
						className="flex items-center gap-2"
						onClick={scrollToDiscussion}
					>
						<ChatBubbleLeftRightIcon className="h-5 w-5" />
						<span className="hidden sm:inline">Discussion</span>
						<CommentCount
							shortname='msuggest'
							config={{
								url: '',
								identifier: 'home',
								title: 'mSuggest Discussion'
							}}
						>
							Comments
						</CommentCount>
					</Button>
					<ThemeToggleButton /> 
				</div>
			</div>
		</MTNavbar>
	);
}

export default Navbar;