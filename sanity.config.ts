"use client";

/**
 * Sanity Studio, mounted inside this app at /studio.
 * Keeping it embedded means one deployment and one set of env vars — the
 * storefront and the place you edit it ship together.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes, SINGLETONS } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";

export default defineConfig({
  name: "edlizer-studio",
  title: "Edlizer Beauty",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Store details, Homepage and Delivery & FAQs exist once each; keep them
    // out of the "Create new" menu.
    templates: (prev) => prev.filter(({ schemaType }) => !SINGLETONS.has(schemaType)),
  },
  document: {
    // ...and leave them only the actions that cannot remove or copy them.
    actions: (prev, { schemaType }) =>
      SINGLETONS.has(schemaType)
        ? prev.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : prev,
  },
  plugins: [
    structureTool({ structure }),
    // Query playground — handy for checking what the storefront will receive.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
