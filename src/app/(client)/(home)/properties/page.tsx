import { Suspense } from "react";

import PropertiesPageClient from "./propertiesPageClient";

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <PropertiesPageClient />
    </Suspense>
  );
}
