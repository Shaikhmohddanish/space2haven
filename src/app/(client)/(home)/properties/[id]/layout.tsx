import { Metadata } from 'next';
import { generatePropertySchema } from '@/lib/seo-utils';
import JsonLd from '@/components/JsonLd';

type Props = {
  params: { id: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const idOrSlug = params.id;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://space2heaven.com';

  try {
    const isObjectId = /^[a-fA-F0-9]{24}$/.test(idOrSlug);
    const apiUrl = isObjectId ? `/api/properties?id=${idOrSlug}` : `/api/properties?slug=${idOrSlug}`;
    const response = await fetch(apiUrl, { cache: 'no-store' });
    const payload = await response.json();
    const property = payload?.matchingData || payload;

    if (!property || Array.isArray(property)) {
      return {
        title: 'Property Not Found | Space2Heaven',
        description: 'The property you are looking for could not be found.',
        alternates: { canonical: `${baseUrl}/properties/${idOrSlug}` },
        openGraph: { url: `${baseUrl}/properties/${idOrSlug}` },
      };
    }

    const rawImage = property.images && property.images.length > 0 ? property.images[0] : '/images/default-image.webp';
    const imageUrl = /^https?:\/\//.test(rawImage) ? rawImage : `${baseUrl}${rawImage}`;

    const title = property.title ? `${property.title} | Space2Heaven` : 'Property Details | Space2Heaven';
    const descBase = property.description || property.overview || 'Explore this property on Space2Heaven.';
    const description = typeof descBase === 'string' && descBase.length > 160 ? `${descBase.slice(0, 157)}...` : descBase;

    return {
      title,
      description,
      alternates: {
        canonical: `${baseUrl}/properties/${idOrSlug}`,
      },
      openGraph: {
        title,
        description,
        url: `${baseUrl}/properties/${idOrSlug}`,
        siteName: 'Space2Heaven',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: property.title || 'Property image',
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating property metadata:', error);
    return {
      title: 'Property Details | Space2Heaven',
      description: 'Explore our property listings on Space2Heaven.',
      alternates: { canonical: `${baseUrl}/properties/${idOrSlug}` },
      openGraph: { url: `${baseUrl}/properties/${idOrSlug}` },
    };
  }
}

export default async function PropertyLayout({ params, children }: Props) {
  let schemaData = null;
  
  try {
    const isObjectId = /^[a-fA-F0-9]{24}$/.test(params.id);
    const apiUrl = isObjectId ? `/api/properties?id=${params.id}` : `/api/properties?slug=${params.id}`;
    const response = await fetch(apiUrl, { cache: 'no-store' });
    const payload = await response.json();
    const property = payload?.matchingData || payload;
    
    if (property) {
      schemaData = generatePropertySchema(property);
    }
  } catch (error) {
    console.error('Error generating property schema:', error);
  }
  
  return (
    <>
      {schemaData && <JsonLd data={schemaData} />}
      {children}
    </>
  );
}
