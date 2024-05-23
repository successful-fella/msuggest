import React from "react";
import {
	Navbar as MTNavbar,
	Button,
	Typography,
} from "@material-tailwind/react";

interface NavItemProps {
	children: React.ReactNode;
	href?: string;
}

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

	React.useEffect(() => {
		window.addEventListener(
			"resize",
			() => window.innerWidth >= 960 && setOpen(false)
		);
	}, []);

	return (
		<MTNavbar shadow={false} fullWidth className="border-0 sticky top-0 z-50">
			<div className="container mx-auto flex items-center justify-between">
				<Typography color="blue-gray" className="text-lg font-bold">
					mSuggest
				</Typography>
			</div>
		</MTNavbar>
	);
}

export default Navbar;
