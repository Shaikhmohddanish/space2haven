'use client'

import Image from 'next/image'

interface DemoImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  priority?: boolean
}

export default function DemoImage({ src, alt, width, height, className, fill, priority }: DemoImageProps) {
  // If the src is a demo URL and we're having issues, show a placeholder
  const isDemoUrl = src.includes('picsum.photos') || src.includes('demo-image')
  
  if (isDemoUrl) {
    // Create a simple gradient placeholder based on the image ID
    const colors = [
      'from-blue-400 to-blue-600',
      'from-green-400 to-green-600', 
      'from-purple-400 to-purple-600',
      'from-red-400 to-red-600',
      'from-yellow-400 to-yellow-600',
      'from-pink-400 to-pink-600',
    ]
    
    const colorIndex = Math.abs(src.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % colors.length
    const gradientColors = colors[colorIndex]
    
    const PlaceholderDiv = () => (
      <div className={`bg-gradient-to-br ${gradientColors} flex items-center justify-center ${className}`}>
        <div className="text-white/80 text-center">
          <div className="text-4xl mb-2">🏠</div>
          <div className="text-sm font-medium">Demo Image</div>
        </div>
      </div>
    )
    
    if (fill) {
      return <PlaceholderDiv />
    }
    
    return (
      <div style={{ width, height }} className="relative">
        <PlaceholderDiv />
      </div>
    )
  }
  
  // For real images, use the normal Image component
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      fill={fill}
      priority={priority}
    />
  )
}
