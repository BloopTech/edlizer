/**
 * Single source of truth for the storefront's real-world details.
 * Footer, navigation, mega menu, contact page and search all read from here,
 * so a number or an opening time only ever changes in one place.
 */
export const siteDetails = {
  name: "Edlizer Beauty",
  tagline: "Beauty On Your Terms",
  phones: [
    { display: "055 036 2752", tel: "+233550362752", whatsapp: "https://wa.me/233550362752" },
    { display: "055 964 0640", tel: "+233559640640", whatsapp: "https://wa.me/233559640640" },
  ],
  email: "edlizerbeauty@gmail.com",
  hours: {
    days: "Mondays – Saturdays",
    time: "9:00 AM – 8:00 PM",
    note: "Closed Sundays and public holidays",
  },
  location: {
    city: "Accra",
    country: "Ghana",
    delivery: "Express Accra dispatch and nationwide delivery across Ghana",
  },
  social: {
    instagram: {
      handle: "@edlizer_beauty_outlet",
      url: "https://www.instagram.com/edlizer_beauty_outlet",
    },
    tiktok: {
      handle: "@edlizer_beauty_outlet",
      url: "https://www.tiktok.com/@edlizer_beauty_outlet",
    },
  },
} as const;

/** The number to lead with wherever only one will fit. */
export const primaryPhone = siteDetails.phones[0];

/** "055 036 2752 / 055 964 0640" */
export const allPhonesDisplay = siteDetails.phones
  .map((p) => p.display)
  .join(" / ");
