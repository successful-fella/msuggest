import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Layout } from "@/components";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700", "900"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "New Movies/TVs Suggestion Everyday ❤️ | mSuggest",
	description:
		"Bored? What should I watch today? Welcome to mSuggest, we get you random movies with random genres so you have fresh suggestions everyday!",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="shortcut icon" href="/favicon.png" type="image/png" />
			</head>
			<body className={roboto.className}>
				<Layout>
					{children}
				</Layout>
			</body>
		</html>
	);
}
