import React from 'react';

interface JsonLdProps {
  data: object | object[];
}

// This component injects structured data in JSON-LD format
// This helps search engines better understand your content
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
