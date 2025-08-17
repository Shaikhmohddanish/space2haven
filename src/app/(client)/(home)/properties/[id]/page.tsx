import { notFound, redirect } from "next/navigation";
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
