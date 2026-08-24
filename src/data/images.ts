// Queen's Restaurant Authentic Culinary & Heritage Image Registry
// Every image is imported directly via Vite ESM bundler to guarantee 100% resolution on Vercel production deployments.

// Official Queen's Restaurant Logo
import officialLogoPng from '../assets/images/queens_official_logo.png';

// Page Hero Images
import heroOurStory from '../assets/images/hero_our_story_heritage_1787324126069.jpg';
import heroMenu from '../assets/images/hero_menu_culinary_spread_1787324146292.jpg';
import churchStreetVenue from '../assets/images/church_street_venue_1787395918125.png';
import newBelRoadVenue from '../assets/images/new_bel_road_venue_4k_1787557783344.jpg';
import tandoorFlame from '../assets/images/tandoor_flame_1787312441035.jpg';
import royalFeastSpread from '../assets/images/royal_feast_spread_1787312455215.jpg';
import heroCinematic from '../assets/images/hero_4k_royal_dining_scene_1787560536423.jpg';
import restaurantInteriorDining from '../assets/images/restaurant_interior_dining_1787394728973.jpg';
import churchStreet1974Dining from '../assets/images/hero_4k_royal_dining_scene_1787560536423.jpg';
import royalPrivateDiningSalon from '../assets/images/royal_private_dining_salon_1787552779208.jpg';

// Starters
import bhattiDaMurgh from '../assets/images/bhatti_da_murgh_1787312038567.jpg';
import amritsariMachhiTikka from '../assets/images/amritsari_machhi_tikka_1787312060525.jpg';
import paneerTikkaLazeez from '../assets/images/paneer_tikka_lazeez_1787312074816.jpg';
import tandooriBharwanKhumb from '../assets/images/bharwan_khumb_1787312124669.jpg';
import dahiKeKebab from '../assets/images/dahi_ke_kebab_1787312089759.jpg';
import galoutiKebabNawabi from '../assets/images/galouti_kebab_1787312102434.jpg';

// Soups & Shorbas
import murghShorbaZafraani from '../assets/images/murgh_shorba_1787312158115.jpg';
import tamatarDhaniaShorba from '../assets/images/tamatar_shorba_1787312137114.jpg';

// Veg Mains
import dalMakhaniSignature from '../assets/images/dal_makhani_1787312189761.jpg';
import paneerButterMasala from '../assets/images/paneer_butter_masala_1787312202734.jpg';
import amritsariPindiChole from '../assets/images/pindi_chole_1787312219052.jpg';
import sarsonKaSaag from '../assets/images/sarson_ka_saag_1787312233306.jpg';

// Non-Veg Mains
import queensMurghMakhani from '../assets/images/murgh_makhani_1787312248068.jpg';
import kashmiriRoganJosh from '../assets/images/kashmiri_rogan_josh_1787312262159.jpg';
import raraMuttonPunjabi from '../assets/images/rara_mutton_1787312283585.jpg';
import dhabeDaKadhaiMurgh from '../assets/images/kadhai_murgh_1787312299135.jpg';

// Breads & Rice
import amritsariAlooKulcha from '../assets/images/aloo_kulcha_1787312312995.jpg';
import garlicCorianderNaan from '../assets/images/garlic_naan_1787312326186.jpg';
import goshtDumBiryani from '../assets/images/gosht_dum_biryani_1787312339507.jpg';

// Beverages
import punjabiMalaiLassi from '../assets/images/punjabi_lassi_1787312362482.jpg';
import kesarPistaBadamMilk from '../assets/images/kesar_badam_milk_1787312377894.jpg';

// Desserts
import kesariPhirniClayPot from '../assets/images/kesari_phirni_1787312392557.jpg';
import shahiGulabJamunRabri from '../assets/images/shahi_gulab_jamun_1787312407840.jpg';

// Photorealistic Editorial Journal Images
import journalPunjabiHeritage from '../assets/images/punjabi_cuisine_heritage_1787547603046.jpg';
import journalClayTandoor from '../assets/images/clay_tandoor_live_fire_1787547622034.jpg';
import journalQueensHospitality from '../assets/images/queens_heritage_hospitality_1787547640959.jpg';
import journalChurchStreetDining from '../assets/images/church_street_dining_uploaded_1787548250286.jpg';
import journalSacredMasalas from '../assets/images/sacred_punjabi_masalas_1787547767976.jpg';
import journalFamilyFeast from '../assets/images/family_milestone_feast_1787547790032.jpg';

export const JOURNAL_IMAGES = {
  punjabiHeritage: journalPunjabiHeritage,
  clayTandoor: journalClayTandoor,
  queensHospitality: journalQueensHospitality,
  churchStreetDining: journalChurchStreetDining,
  sacredMasalas: journalSacredMasalas,
  familyFeast: journalFamilyFeast,
} as const;

// Official Queen's Restaurant Transparent Logo Asset
export const OFFICIAL_LOGO_URL = officialLogoPng;

// Hero Sections for Specific Pages
export const PAGE_HERO_IMAGES = {
  ourStory: heroOurStory,
  menu: heroMenu,
  gallery: restaurantInteriorDining,
  journal: tandoorFlame,
  queensTable: royalFeastSpread,
  locations: churchStreetVenue,
  contact: heroCinematic,
  faq: newBelRoadVenue,
} as const;

// Dishes (Starters, Shorbas, Veg Mains, Non-Veg Mains, Breads & Rice, Beverages, Desserts)
export const DISH_IMAGES = {
  // Starters
  bhattiDaMurgh,
  amritsariMachhiTikka,
  paneerTikkaLazeez,
  tandooriBharwanKhumb,
  dahiKeKebab,
  galoutiKebabNawabi,

  // Soups & Shorbas
  murghShorbaZafraani,
  tamatarDhaniaShorba,

  // Veg Mains
  dalMakhaniSignature,
  paneerButterMasala,
  amritsariPindiChole,
  sarsonKaSaag,

  // Non-Veg Mains
  queensMurghMakhani,
  kashmiriRoganJosh,
  raraMuttonPunjabi,
  dhabeDaKadhaiMurgh,

  // Breads & Rice
  amritsariAlooKulcha,
  garlicCorianderNaan,
  goshtDumBiryani,

  // Beverages
  punjabiMalaiLassi,
  kesarPistaBadamMilk,

  // Desserts
  kesariPhirniClayPot,
  shahiGulabJamunRabri,
} as const;

// Heritage, Venues & Atmosphere
export const VENUE_IMAGES = {
  heroDiningRoom: restaurantInteriorDining,
  restaurantInterior: restaurantInteriorDining,
  churchStreet1974Dining: churchStreet1974Dining,
  royalPrivateDiningSalon: royalPrivateDiningSalon,
  tandoorLiveHearth: tandoorFlame,
  royalFeastTable: royalFeastSpread,
  churchStreetFlagship: churchStreetVenue,
  newBelRoadBanquet: newBelRoadVenue,
  newBelRoadLocation: newBelRoadVenue,
  familyCelebration: royalFeastSpread,
} as const;

export const HERITAGE_IMAGES = {
  founding1974: churchStreet1974Dining,
  culinaryTradition: tandoorFlame,
  churchStreet1974: churchStreet1974Dining,
  tandoorEvolution: tandoorFlame,
  newBelRoadExpansion: newBelRoadVenue,
  fiftyYearLegacy: heroCinematic,
} as const;

