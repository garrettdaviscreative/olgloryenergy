/* ==========================================================================
   Ol' Glory site settings — the only file you need to edit to go live.
   Leave a value as "" and the site falls back gracefully.
   ========================================================================== */
window.OG_CONFIG = {

  // Online checkout links, one per flavor.
  // Easiest option: create a Stripe Payment Link for each product
  // (dashboard.stripe.com → Payment Links) and paste the URL here.
  // Empty = the button shows "Online ordering coming soon".
  buyLinks: {
    "citrus": "",
    "citrus-zero": "",
    "mixed-berry": ""
  },

  // Email signup. Paste a form endpoint from Formspree, Mailchimp,
  // Klaviyo or similar. Empty = the form shows a "coming soon" note
  // and does NOT save anything.
  newsletterAction: "",

  // Where wholesale / retail inquiries go (shown as an email link).
  contactEmail: "",

  // Social profiles. Empty links are hidden automatically.
  social: {
    x: "",
    tiktok: "",
    instagram: "",
    facebook: ""
  }
};
