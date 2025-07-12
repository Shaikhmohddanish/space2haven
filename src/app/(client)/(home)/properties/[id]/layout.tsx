import { Metadata } from 'next';
import { generatePropertySchema } from '@/lib/seo-utils';
import JsonLd from '@/components/JsonLd';

type Props = {
  params: { id: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  
  try {
    // Fetch property data
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://space2heaven.com'}/api/properties?id=${id}`, {
      cache: 'no-cache'
    });
    const { matchingData: property } = await response.json();
    
    if (!property) {
      return {
        title: 'Property Not Found | Space2Heaven',
        description: 'The property you are looking for could not be found.',
      };
    }

    // Base property image
    const propertyImage = property.images && property.images.length > 0 
      ? property.images[0] 
      : '/images/default-image.webp';

    // Create metadata for property
    return {
      title: `${property.title} | Space2Heaven`,
      description: property.description.substring(0, 160) + '...' || `${property.title} - Explore this property listing on Space2Heaven.`,
      keywords: [
        property.type || 'property', 
        property.city || 'real estate', 
        `${property.bedrooms || ''} bhk`, 
        'property for sale', 
        'real estate listing'
      ],
      alternates: {
        canonical: `/properties/${id}`,
      },
      openGraph: {
        title: property.title,
        description: property.description.substring(0, 160) + '...' || `${property.title} - Explore this property listing on Space2Heaven.`,
        url: `/properties/${id}`,
        siteName: 'Space2Heaven',
        images: [
          {
            url: propertyImage,
            width: 1200,
            height: 630,
            alt: property.title,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: property.title,
        description: property.description.substring(0, 160) + '...' || `${property.title} - Explore this property listing on Space2Heaven.`,
        images: [propertyImage],
      },
    };
  } catch (error) {
    console.error('Error generating property metadata:', error);
    return {
      title: 'Property Details | Space2Heaven',
      description: 'Explore our property listings on Space2Heaven.',
    };
  }
}

export default async function PropertyLayout({ params, children }: Props) {
  let schemaData = null;
  
  try {
    // Fetch property data for structured data
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://space2heaven.com'}/api/properties?id=${params.id}`, {
      cache: 'no-cache'
    });
    const { matchingData: property } = await response.json();
    
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
