import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { connectDB } from "@/lib/dbConnection";
import PropertyModel from "@/models/propertyModel";
import PropertyDetails from "./PropertyDetails";

async function fetchProperty(idOrSlug: string) {
    const isObjectId = /^[a-fA-F0-9]{24}$/.test(idOrSlug);
    const url = isObjectId ? `/api/properties?id=${idOrSlug}` : `/api/properties?slug=${idOrSlug}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return {
        property: data?.matchingData || null,
        recommended: data?.recommendedData || [],
    };
}

export default async function PropertyById({ params }: { params: { id: string } }) {
    const result = await fetchProperty(params.id);
    if (!result || !result.property) return notFound();

    const isObjectId = /^[a-fA-F0-9]{24}$/.test(params.id);
    if (isObjectId && result.property?.slug) {
        redirect(`/properties/${result.property.slug}`);
    }

    return (
        <section className="min-h-screen w-full flex-center flex-col py-20 px-4 ">
            <PropertyDetails property={result.property} recommended={result.recommended} />
        </section>
    );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const idOrSlug = params.id;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://space2heaven.com";
  try {
    await connectDB();
    const isObjectId = /^[a-fA-F0-9]{24}$/.test(idOrSlug);
    const property = isObjectId
      ? await PropertyModel.findById(idOrSlug).lean()
      : await PropertyModel.findOne({ slug: idOrSlug }).lean();

    if (!property) {
      return {
        title: "Property Not Found | Space2Heaven",
        description: "The property you are looking for could not be found.",
        openGraph: { url: `${baseUrl}/properties/${idOrSlug}` },
        alternates: { canonical: `${baseUrl}/properties/${idOrSlug}` },
      };
    }

    const city: string = property?.address?.city || "";
    const state: string = property?.address?.state || "";
    const locationSuffix = city || state ? `, ${[city, state].filter(Boolean).join(", ")}` : "";
    const title = property.title ? `${property.title}${locationSuffix} | Space2Heaven` : "Property Details | Space2Heaven";

    const sourceText: string = property.overview || property.description || "Explore this property on Space2Heaven.";
    const trimmed = sourceText.replace(/\s+/g, " ").trim();
    const description = trimmed.length > 100 ? `${trimmed.slice(0, 100).replace(/\s+\S*$/, "")}...` : trimmed;
    const imageUrl = `${baseUrl}/properties/${idOrSlug}/opengraph-image`;

    return {
      title,
      description,
      alternates: { canonical: `${baseUrl}/properties/${idOrSlug}` },
      openGraph: {
        title,
        description,
        url: `${baseUrl}/properties/${idOrSlug}`,
        siteName: "Space2Heaven",
        images: [{ url: imageUrl, width: 1200, height: 630, alt: property.title || "Property image" }],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: "Property Details | Space2Heaven",
      description: "Explore our property listings on Space2Heaven.",
      openGraph: { url: `${baseUrl}/properties/${idOrSlug}` },
      alternates: { canonical: `${baseUrl}/properties/${idOrSlug}` },
    };
  }
}
