import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteDetails } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Edlizer Beauty",
  description:
    "What data Edlizer Beauty collects, why we collect it, and the control you have over it.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 2026"
      intro="We collect the minimum we need to get your order to you and to answer your questions. We do not sell your data, and we do not share it with anyone who is not part of fulfilling your order."
      sections={[
        {
          heading: "What we collect",
          body: [
            "Only what an order or an enquiry actually requires.",
          ],
          points: [
            "Your name, delivery address, phone number and email address",
            "What you ordered and what you paid",
            "Messages you send us, so we can follow up on them",
            "Basic, anonymous information about how the site is used, to fix what is broken",
          ],
        },
        {
          heading: "What we do not collect",
          body: [
            "We do not store your full card details. Payments are handled by our payment provider, and card data never reaches our servers.",
          ],
        },
        {
          heading: "Why we hold it",
          body: [
            "To pack and deliver your order, to handle returns and refunds, to answer you when you write to us, and to send you updates if — and only if — you asked for them.",
          ],
        },
        {
          heading: "Who else sees it",
          body: [
            "Only the people required to complete your order: our delivery partner gets your name, address and phone number, and our payment provider processes the transaction. Nobody else receives your details, and we never sell or rent them.",
          ],
        },
        {
          heading: "Marketing",
          body: [
            "If you join our newsletter you can leave at any time using the unsubscribe link in any email, or by asking us directly. Leaving the list does not affect an order in progress.",
          ],
        },
        {
          heading: "Your control over it",
          body: [
            `You can ask to see what we hold about you, correct anything wrong, or have it deleted entirely. Write to ${siteDetails.emails.general} and we will action it within thirty days.`,
            "Deleting your data may mean we can no longer look up a past order for you, so it is worth downloading anything you need first.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "The site uses cookies to keep your bag intact between pages and to remember that you are signed in. We do not use advertising cookies. Blocking cookies in your browser will still let you browse, but the bag will not persist.",
          ],
        },
        {
          heading: "Contact",
          body: [
            `For anything to do with your data, reach us at ${siteDetails.emails.general} or ${siteDetails.phone.display}, ${siteDetails.hours.days.toLowerCase()}, ${siteDetails.hours.time}.`,
          ],
        },
      ]}
    />
  );
}
