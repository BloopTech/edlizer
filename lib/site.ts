/**
 * Single source of truth for the storefront's real-world details.
 * Footer, contact page and any future schema markup read from here so the
 * phone number only ever has to change in one place.
 */
export const siteDetails = {
  name: "Edlizer Beauty",
  tagline: "Beauty On Your Terms",
  phone: {
    display: "055 964 0640",
    tel: "+233559640640",
    whatsapp: "https://wa.me/233559640640",
  },
  emails: {
    general: "admin@edlizerbeauty.com",
    alternate: "Edlizerbeauty@gmail.com",
  },
  hours: {
    days: "Mondays – Saturdays",
    time: "9:00am – 5:00pm",
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
    facebook: {
      handle: "Edlizer Beauty",
      url: "https://www.facebook.com/profile.php?id=100042219142355",
    },
  },
} as const;
