import type { StructureResolver } from "sanity/structure";

/**
 * Studio navigation. A single flat "Product" list gets unusable past a few
 * dozen items, so the catalogue is split into the views a shop actually works
 * from day to day: what needs photographing, what has sold out, what is on
 * offer, and the full list by department.
 */
const DEPARTMENTS = [
  "Foundation",
  "Face Primer",
  "Setting Powder",
  "Setting & Finishing Spray",
  "Eyeshadow",
  "Eye Lash Adhesive",
  "Lipsticks",
  "Lipstains",
  "Lip Liners",
  "Lip Gloss",
  "Lip Care",
  "Face Serums",
  "Face Moisturizer",
  "Face Toners",
  "Face Wash or Cleanser",
  "Suncare and Sunscreen",
  "Skincare",
  "Bath & Body",
  "Brushes",
  "Makeup",
  "Makeup Wipes & Removers",
];

export const structure: StructureResolver = (S) => {
  /** Opens the one document of a singleton type straight in the editor. */
  const singleton = (type: string, title: string) =>
    S.listItem()
      .id(type)
      .title(title)
      .schemaType(type)
      .child(S.document().schemaType(type).documentId(type).title(title));

  return S.list()
    .title("Edlizer Beauty")
    .items([
      singleton("siteSettings", "Store details"),
      singleton("homepage", "Homepage"),
      singleton("shopInfo", "Delivery & FAQs"),

      S.divider(),

      S.listItem()
        .title("All products")
        .child(
          S.documentTypeList("product")
            .title("All products")
            .defaultOrdering([{ field: "name", direction: "asc" }])
        ),

      S.divider(),

      S.listItem()
        .title("Needs photography")
        .child(
          S.documentList()
            .title("Needs photography")
            .filter('_type == "product" && !defined(image.asset)')
            .defaultOrdering([{ field: "name", direction: "asc" }])
        ),

      S.listItem()
        .title("Out of stock")
        .child(
          S.documentList()
            .title("Out of stock")
            .filter('_type == "product" && stockCount == 0')
            .defaultOrdering([{ field: "name", direction: "asc" }])
        ),

      S.listItem()
        .title("Low stock (8 or fewer)")
        .child(
          S.documentList()
            .title("Low stock")
            .filter('_type == "product" && stockCount > 0 && stockCount <= 8')
            .defaultOrdering([{ field: "stockCount", direction: "asc" }])
        ),

      S.listItem()
        .title("On offer")
        .child(
          S.documentList()
            .title("On offer")
            .filter('_type == "product" && defined(originalPrice)')
            .defaultOrdering([{ field: "name", direction: "asc" }])
        ),

      S.listItem()
        .title("Best sellers")
        .child(
          S.documentList()
            .title("Best sellers")
            .filter('_type == "product" && isBestSeller == true')
            .defaultOrdering([{ field: "name", direction: "asc" }])
        ),

      S.divider(),

      S.listItem()
        .title("By category")
        .child(
          S.list()
            .title("By category")
            .items(
              DEPARTMENTS.map((dept) =>
                S.listItem()
                  .id(dept.replace(/[^a-zA-Z0-9]/g, "-"))
                  .title(dept)
                  .child(
                    S.documentList()
                      .title(dept)
                      .filter('_type == "product" && $dept in categories')
                      .params({ dept })
                      .defaultOrdering([{ field: "name", direction: "asc" }])
                  )
              )
            )
        ),

      S.divider(),

      S.listItem()
        .title("By brand")
        .child(
          S.documentTypeList("product")
            .title("By brand")
            .defaultOrdering([
              { field: "brand", direction: "asc" },
              { field: "name", direction: "asc" },
            ])
        ),
    ]);
};
