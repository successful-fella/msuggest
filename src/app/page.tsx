// components
import { Navbar, Footer } from "@/components";

// sections
import DailyMovies from "./daily-movies";
import Faq from "./faq";

export default function Campaign() {
	return (
		<>
			<Navbar />
			<DailyMovies />
			<Faq />
			<Footer />
		</>
	);
}
