'use client'

interface PlaceholderImageProps {
  width?: number
  height?: number
  className?: string
  fill?: boolean
  text?: string
  icon?: string
}

export default function PlaceholderImage({ 
  width = 400, 
  height = 300, 
  className = '', 
  fill = false,
  text = 'Demo Image',
  icon = '🏠'
}: PlaceholderImageProps) {
  const gradients = [
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600', 
    'from-purple-400 to-purple-600',
    'from-red-400 to-red-600',
    'from-yellow-400 to-yellow-600',
    'from-pink-400 to-pink-600',
    'from-indigo-400 to-indigo-600',
    'from-teal-400 to-teal-600',
  ]
  
  const gradientClass = gradients[Math.floor(Math.random() * gradients.length)]
  
  const content = (
    <div className={`bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white ${className}`}>
      <div className="text-center">
        <div className="text-4xl mb-2">{icon}</div>
        <div className="text-sm font-medium opacity-90">{text}</div>
      </div>
    </div>
  )
  
  if (fill) {
    return content
  }
  
  return (
    <div style={{ width, height }} className="relative">
      {content}
    </div>
  )
}
