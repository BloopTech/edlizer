// The project id is public (it ships in every browser request), so defaulting
// to the real one keeps a deploy without env vars pointed at the right data.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nhdvb0s6";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
