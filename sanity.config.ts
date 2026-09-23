"use client";

/**
 * Sanity Studio, mounted inside this app at /studio.
 * Keeping it embedded means one deployment and one set of env vars — the
 * storefront and the place you edit it ship together.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";

export default defineConfig({
  name: "edlizer-studio",
  title: "Edlizer Beauty",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    // Query playground — handy for checking what the storefront will receive.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
