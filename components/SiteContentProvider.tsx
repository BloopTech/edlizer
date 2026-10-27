"use client";

import React, { createContext, useContext } from "react";
import { defaultContent, type SiteContent } from "@/lib/site";

/**
 * Hands the Studio-edited site content, fetched once on the server in the root
 * layout, to every client component. Server components call
 * `getSiteContent()` directly instead.
 */
const SiteContentContext = createContext<SiteContent>(defaultContent);

export function SiteContentProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: React.ReactNode;
}) {
  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent(): SiteContent {
  return useContext(SiteContentContext);
}
