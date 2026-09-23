import type { Metadata, Viewport } from "next";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

/** The Studio manages its own <head>, so hand it the metadata it expects. */
export const metadata: Metadata = {
  title: "Edlizer Beauty Studio",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

// The Studio is a single-page app; let it own every path under /studio.
export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
