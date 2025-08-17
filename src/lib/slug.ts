import { toSlug } from "./utils";

export function generateSlug(title: string): string {
  const base = toSlug(title || "property");
  const suffix = Date.now().toString().slice(-5);
  return `${base}-${suffix}`;
}


