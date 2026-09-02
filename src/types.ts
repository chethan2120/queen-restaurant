export type PageType = 
  | 'home'
  | 'our-story'
  | 'menu'
  | 'experiences'
  | 'locations'
  | 'gallery'
  | 'journal'
  | 'journal-detail'
  | 'queens-table'
  | 'contact'
  | 'faq'
  | 'book-table'
  | 'cms-admin';

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  description: string;
  price: number;
  category: 'starters' | 'soups-salads' | 'veg-mains' | 'non-veg-mains' | 'breads-rice' | 'rolls-snacks' | 'beverages' | 'desserts';
  isVeg: boolean;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  spiceLevel?: 1 | 2 | 3; // 1: Mild, 2: Medium, 3: Spicy
  image: string;
  portion?: string;
  allergens?: string[];
  pairing?: string;
}

export interface RestaurantLocation {
  id: 'church-street' | 'new-bel-road';
  name: string;
  subName: string;
  establishedYear: number;
  address: string;
  landmark: string;
  city: string;
  pincode: string;
  phone: string;
  email: string;
  hours: {
    days: string;
    timings: string;
  }[];
  features: string[];
  hasLiquor: boolean;
  seatingCapacity: number;
  mapEmbedUrl: string;
  googleMapsLink: string;
  swiggyLink?: string;
  zomatoLink?: string;
  image: string;
  gallery: string[];
}

export interface HeritageMilestone {
  year: string;
  title: string;
  description: string;
  image: string;
  quote?: string;
  highlight: string;
}

export interface ExperiencePackage {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  capacity: string;
  idealFor: string[];
  features: string[];
  image: string;
  menus: string[];
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Punjabi Food & Culture' | "Queen's Legacy" | 'Food Guides' | 'Bangalore Dining' | 'Recipes';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  image: string;
  tags: string[];
  featured?: boolean;
  relatedDishId?: string;
}

export interface RecipeItem {
  id: string;
  slug: string;
  title: string;
  hindiTitle?: string;
  category: 'Vegetarian' | 'Non-Vegetarian' | 'Main Course' | 'Breads' | 'Snacks' | 'Desserts' | 'Drinks';
  difficulty: 'Easy' | 'Medium' | 'Master Chef';
  prepTime: string;
  cookTime: string;
  servings: string;
  image: string;
  description: string;
  ingredients: {
    section: string;
    items: string[];
  }[];
  steps: {
    stepNumber: number;
    title: string;
    instruction: string;
    tip?: string;
  }[];
  chefSecret: string;
  relatedMenuDish?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  vintage: string; // e.g. "Patron since 1982"
  content: string;
  favoriteDish: string;
  rating: number;
  location: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Reservations' | 'Menu & Dining' | 'Events & Private Dining' | 'Locations & Service';
}

export interface TableReservation {
  id: string;
  referenceCode: string;
  locationId: 'church-street' | 'new-bel-road';
  date: string;
  timeSlot: string;
  guestCount: number;
  seatingPreference: 'Main Dining Hall' | 'Heritage Corner' | 'Window Seating' | 'Private Alcove';
  specialOccasion?: 'None' | 'Birthday' | 'Anniversary' | 'Business Dinner' | 'Family Reunion' | 'Celebration';
  fullName: string;
  email: string;
  phone: string;
  dietaryNotes?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'food' | 'interiors' | 'events' | 'celebrations' | 'heritage' | 'people';
  image: string;
  caption: string;
  location?: string;
  featured?: boolean;
}
