import { ReactNode } from "react";
import { Footer, Navbar } from "@/components";

// Keep minimal metadata here so page-level metadata (e.g., property pages) is not overridden
export const metadata = {
	robots: {
		index: true,
		follow: true,
	},
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<main>
				<Navbar />
				<div className="flex">
					<section className="w-full min-h-screen flex-1 flex-col">
						{children}
					</section>
				</div>
				<Footer />
			</main>
		</>
	);
};

export default HomeLayout;