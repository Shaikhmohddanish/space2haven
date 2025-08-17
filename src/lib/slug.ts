export function generateSlug(title: string): string {
  const base = (title || "property")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  const suffix = Date.now().toString().slice(-5);
  return `${base}-${suffix}`;
}

import { toSlug } from "./utils";

export function generateSlug(title: string): string {
  const base = toSlug(title || "property");
  const suffix = Date.now().toString().slice(-5);
  return `${base}-${suffix}`;
}


