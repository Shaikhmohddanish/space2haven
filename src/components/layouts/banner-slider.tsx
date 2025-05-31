"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

export interface Banner {
	id: number
	title: string
	subtitle: string
	description: string
	image: string
	ctaText: string
	ctaLink: string
	secondaryCtaText: string
	secondaryCtaLink: string
	align: string
}

interface BannerSliderProps {
	banners?: Banner[]
}

const defaultBanners = [
	{
		id: 1,
		title: "Transform Your Space",
		subtitle: "Award-winning interior design for modern living",
		description:
			"Creating beautiful, functional spaces that reflect your unique style and enhance your quality of life.",
		image: "/placeholder.svg?height=1080&width=1920",
		ctaText: "View Our Work",
		ctaLink: "/portfolio",
		secondaryCtaText: "Book a Consultation",
		secondaryCtaLink: "/contact",
		align: "left",
	},
	{
		id: 2,
		title: "Luxury Interior Design",
		subtitle: "Elevate your home with premium design services",
		description:
			"Bespoke interior solutions crafted with meticulous attention to detail and the finest materials.",
		image: "/placeholder.svg?height=1080&width=1920",
		ctaText: "Explore Services",
		ctaLink: "/services",
		secondaryCtaText: "View Portfolio",
		secondaryCtaLink: "/portfolio",
		align: "center",
	},
	{
		id: 3,
		title: "Commercial Excellence",
		subtitle: "Inspiring workspaces for forward-thinking businesses",
		description:
			"Strategic design solutions that enhance productivity, reflect your brand, and impress your clients.",
		image: "/placeholder.svg?height=1080&width=1920",
		ctaText: "Commercial Services",
		ctaLink: "/services",
		secondaryCtaText: "Contact Us",
		secondaryCtaLink: "/contact",
		align: "right",
	},
]

export default function BannerSlider({ banners: bannersProp }: BannerSliderProps) {
	const bannersToShow = bannersProp && bannersProp.length > 0 ? bannersProp : defaultBanners
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isPaused, setIsPaused] = useState(false)
	const timerRef = useRef<NodeJS.Timeout | null>(null)
	const sliderRef = useRef<HTMLDivElement>(null)
	const isMobile = useMediaQuery("(max-width: 768px)")

	const goToNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % bannersToShow.length)
	}

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + bannersToShow.length) % bannersToShow.length)
	}

	const goToSlide = (index: number) => {
		setCurrentIndex(index)
	}

	// Reset the timer when the slide changes
	useEffect(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current)
		}

		if (!isPaused) {
			timerRef.current = setInterval(() => {
				goToNext()
			}, 5000) // 5 seconds for a more professional pace
		}

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current)
			}
		}
	}, [currentIndex, isPaused])

	// Pause slider on hover
	const handleMouseEnter = () => {
		setIsPaused(true)
	}

	const handleMouseLeave = () => {
		setIsPaused(false)
	}

	return (
		<div
			ref={sliderRef}
			className="relative h-[60vh] w-full overflow-hidden sm:h-[70vh] md:h-[80vh] lg:h-[90vh] -mt-8 sm:mt-0"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{/* Slides */}
			<AnimatePresence mode="wait">
				{bannersToShow.map((banner, index) => (
					<motion.div
						key={banner.id}
						className={cn("absolute inset-0 w-full h-full flex items-center justify-center", index === currentIndex ? "z-10" : "z-0")}
						initial={{ opacity: 0 }}
						animate={index === currentIndex ? { opacity: 1 } : { opacity: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1 }}
					>
						{/* Standardized Image Container */}
						<div className="relative w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
							<Image
								src={banner.image || "/placeholder.svg"}
								alt={banner.title}
								fill
								priority
								sizes="100vw"
								className="object-cover w-full h-full rounded-lg"
							/>
						</div>
					</motion.div>
				))}
			</AnimatePresence>

			{/* Navigation Arrows */}
			<div className="absolute left-4 right-4 top-1/2 z-20 flex -translate-y-1/2 justify-between">
				<Button
					variant="outline"
					size="icon"
					className="h-10 w-10 rounded-full border-white/30 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50 hover:text-white"
					onClick={goToPrevious}
					data-no-scroll="true"
				>
					<ChevronLeft className="h-5 w-5" />
					<span className="sr-only">Previous slide</span>
				</Button>
				<Button
					variant="outline"
					size="icon"
					className="h-10 w-10 rounded-full border-white/30 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50 hover:text-white"
					onClick={goToNext}
					data-no-scroll="true"
				>
					<ChevronRight className="h-5 w-5" />
					<span className="sr-only">Next slide</span>
				</Button>
			</div>

			{/* Indicators */}
			<div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
				{bannersToShow.map((_, index) => (
					<button
						key={index}
						className={cn(
							"h-2 w-2 rounded-full transition-all",
							index === currentIndex ? "w-8 bg-primary" : "bg-white/50",
						)}
						onClick={() => goToSlide(index)}
						data-no-scroll="true"
					/>
				))}
			</div>

			{/* Progress Bar */}
			<div className="absolute bottom-0 left-0 right-0 z-20 h-1 w-full bg-white/20">
				<motion.div
					className="h-full bg-primary"
					initial={{ width: "0%" }}
					animate={{ width: "100%" }}
					transition={{ duration: 5, ease: "linear" }}
					key={currentIndex}
				/>
			</div>
		</div>
	)
}
