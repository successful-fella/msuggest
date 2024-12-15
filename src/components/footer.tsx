import { Typography, Button, Input } from "@material-tailwind/react";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
	return (
		<footer className="mt-10 px-8 pt-20">
			<div className="container mx-auto">
				<div className="mt-16 flex flex-wrap items-center justify-center gap-y-4 gap-x-8 border-t border-blue-gray-50 py-6 md:justify-between">
					<Typography className="text-center footer-text font-normal !text-gray-700 lancelot-font text-xl">
						<b>&copy; {CURRENT_YEAR} mSuggest</b>
						.
					</Typography>

					<ul className="flex items-center">
						<li>
							<Typography
								as="a"
								href="https://github.com/mrrohit-me"
								target="_blank"
								className={`py-1 font-normal !text-gray-700 transition-colors footer-text hover:!text-gray-900 pr-5`}
							>
								Github
							</Typography>
						</li>
						<li>
							<Typography
								as="a"
								href="https://telegram.dog/WrkLifebal"
								target="_blank"
								className={`py-1 font-normal !text-gray-700 transition-colors footer-text hover:!text-gray-900`}
							>
								Telegram
							</Typography>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
