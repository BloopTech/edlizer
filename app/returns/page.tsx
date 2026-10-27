import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getSiteContent } from "@/sanity/content";
import { allPhonesDisplay } from "@/lib/site";

export const metadata: Metadata = {
  title: "Returns & Exchanges | Edlizer Beauty",
  description:
    "How returns, exchanges and refunds work at Edlizer Beauty, including our hygiene policy on opened cosmetics.",
};

export default async function ReturnsPage() {
  const { details: siteDetails } = await getSiteContent();
  return (
    <LegalPage
      title="Returns & Exchanges"
      updated="September 2026"
      intro="Cosmetics are personal and hygiene matters, so our policy is specific about what can come back and when. If something is wrong with your order, tell us and we will put it right."
      sections={[
        {
          heading: "The short version",
          body: [
            "Unopened items in their original packaging can be returned within seven days of delivery. Opened cosmetics cannot be returned for hygiene reasons unless the product is faulty or we sent the wrong thing.",
          ],
          points: [
            "Seven days to return unopened items",
            "Faulty or incorrect items: replaced or refunded in full, including delivery",
            "Anything found not to be genuine: refunded in full, no questions",
          ],
        },
        {
          heading: "What we can accept",
          body: [
            "To be returned, an item needs to be in the condition you received it — unopened, unused, seal intact, with any outer packaging.",
          ],
          points: [
            "Sealed skincare, cosmetics and fragrance",
            "Brushes and tools in unopened packaging",
            "Items delivered damaged, faulty, or different from what you ordered",
          ],
        },
        {
          heading: "What we cannot accept",
          body: [
            "This is not us being difficult. Once a cosmetic product has been opened it cannot be resold safely, and we will not put a used product back on the shelf for someone else.",
          ],
          points: [
            "Opened or used cosmetics, skincare and fragrance",
            "Lashes, lash adhesive and other close-contact items once unsealed",
            "Items returned after seven days without a fault",
            "Products damaged by misuse after delivery",
          ],
        },
        {
          heading: "Shade matches that did not work",
          body: [
            "Foundation is hard to buy online and we know it. If you order a shade and it is clearly wrong, message us before you use more than a single swatch — we will do our best to exchange it, even though a swatched product technically falls outside the policy.",
            "Better still, ask first. Send a daylight photo and the shade you wear in another brand and we will match you before you buy.",
          ],
        },
        {
          heading: "How to start a return",
          body: [
            `Message us on WhatsApp at ${allPhonesDisplay(siteDetails)} or email ${siteDetails.email} with your order details and a photo of the item. We will confirm whether it qualifies and arrange collection or drop-off.`,
            "Approved refunds are issued to your original payment method, or as mobile money, within five working days of us receiving the item.",
          ],
        },
        {
          heading: "Delivery charges",
          body: [
            "Where a return is due to our error — wrong item, faulty product, damage in transit — we cover delivery both ways. For change-of-mind returns, the cost of sending the item back sits with you.",
          ],
        },
      ]}
    />
  );
}
