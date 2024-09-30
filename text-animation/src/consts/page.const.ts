import { ENV, Environment } from "../../env.config";

const GetBaseURL = () => {
  switch (ENV) {
    case Environment.PRODUCTION:
      return "/";
    case Environment.STAGING:
      return "https://www.yesoryes.io/staging/_kesav/text-animation/";
    case Environment.DEVELOPMENT:
      return "/";
    default:
      return "/";
  }
};

export const BASE_URL = GetBaseURL();
export const PagePaths = {
  home: BASE_URL,
  preacticeAreas: BASE_URL + "practice-and-sectors/",
  team: BASE_URL + "team/",
  insights: BASE_URL + "insights/",
  faq: BASE_URL + "faq/",
  contact: BASE_URL + "contact/",
  terms_of_use: BASE_URL + "terms-and-conditions/",
};

export const PAPagePaths = {
  commercial_contracts: PagePaths.preacticeAreas + "commercial-contracts",
  intellectual_property_rights:
    PagePaths.preacticeAreas + "intellectual-property-rights",
  corporate_advisory: PagePaths.preacticeAreas + "corporate-advisory",

  litigation_and_dispute_resolution:
    PagePaths.preacticeAreas + "litigation-and-dispute-resolution",
  real_estate: PagePaths.preacticeAreas + "real-estate",
  corporate_compliance: PagePaths.preacticeAreas + "corporate-compliance",
  others_area_of_Practice: PagePaths.preacticeAreas + "other-areas-of-practice",
};

export const TeamPagePaths = {
  divya_chandrasekaran: PagePaths.team + "divya-chandrasekaran",
  harish_naidu: PagePaths.team + "harish-naidu",
  praneetha_rasbag: PagePaths.team + "praneetha-rasbag",
  sharath_mulia: PagePaths.team + "sharath-mulia",
};

export const BlogPagePaths = {
  idea_to_implementation_legal_basics_every_startup_should_know:
    PagePaths.insights +
    "idea_to_implementation_legal_basics_every_startup_should_know",
  what_are_dark_patterns: PagePaths.insights + "what_are_dark_patterns",
  why_conduct_a_trademark_search:
    PagePaths.insights + "why_conduct_a_trademark_search",
};

export const OtherLinks = {
  linkedIn: "https://in.linkedin.com/company/ipact-legal",
  whatsapp: "",
  mailto: "mailto:contact@ipactlegal.com",
  telto: "tel:+919741858584",
  locationto: "https://maps.app.goo.gl/zzkK4o4qLLBogLV3A",
};
