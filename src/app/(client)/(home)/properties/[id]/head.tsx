export default function Head({ params }: { params: { id: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://space2heaven.com'
  const url = `${baseUrl}/properties/${params.id}`
  const image = `${baseUrl}/properties/${params.id}/opengraph-image`

  return (
    <>
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={image} />
    </>
  )
}


