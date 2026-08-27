import {
  MenuItem,
  RestaurantLocation,
  HeritageMilestone,
  ExperiencePackage,
  JournalArticle,
  RecipeItem,
  Testimonial,
  FAQItem,
  GalleryItem,
} from '../types';
import { DISH_IMAGES, VENUE_IMAGES, JOURNAL_IMAGES } from './images';

export const RESTAURANT_LOCATIONS: RestaurantLocation[] = [
  {
    id: 'church-street',
    name: "Queen's Restaurant · Church Street",
    subName: 'The Flagship Heritage Venue',
    establishedYear: 1974,
    address: '52, Church St, Haridevpur, Shanthala Nagar, Ashok Nagar',
    landmark: 'Opposite Amoeba / Near Brigade Road Junction',
    city: 'Bengaluru',
    pincode: '560001',
    phone: '+91 72044 64661',
    email: 'churchstreet@queensrestaurant.in',
    hours: [
      { days: 'Monday – Thursday', timings: '12:00 PM – 11:00 PM' },
      { days: 'Friday – Sunday', timings: '12:00 PM – 11:30 PM' },
    ],
    features: [
      'Full Bar & Craft Beer',
      'Valet Parking Available',
      'Private Dining Alcoves',
      'Outdoor Verandah Seating',
      'Wheelchair Accessible',
      'Live Tandoor Showcase',
    ],
    hasLiquor: true,
    seatingCapacity: 140,
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9854497672264!2d77.6033334!3d12.9734167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1681283d5a23%3A0x6b3064cb058e38d7!2sChurch%20St%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    googleMapsLink: 'https://maps.google.com/?q=52+Church+St+Bengaluru+560001',
    swiggyLink: 'https://www.swiggy.com/city/bangalore/queens-restaurant-church-street-central-bangalore-rest811581',
    zomatoLink: 'https://www.zomato.com/bangalore/queens-restaurant-church-street-bangalore',
    image: VENUE_IMAGES.churchStreetFlagship,
    gallery: [
      VENUE_IMAGES.churchStreetFlagship,
      VENUE_IMAGES.heroDiningRoom,
      VENUE_IMAGES.tandoorLiveHearth,
      VENUE_IMAGES.royalFeastTable,
    ],
  },
  {
    id: 'new-bel-road',
    name: "Queen's Restaurant · New BEL Road",
    subName: 'Grand Family & Celebration Pavilion',
    establishedYear: 2012,
    address: '45, 1st Main Rd, RMV Ext, 2nd Stage, KGE Layout, Mathikere',
    landmark: 'Near Ramaiah Hospital / New BEL Road Main Arch',
    city: 'Bengaluru',
    pincode: '560094',
    phone: '+91 63660 46260',
    email: 'newbelroad@queensrestaurant.in',
    hours: [
      { days: 'Daily Lunch', timings: '12:00 PM – 03:30 PM' },
      { days: 'Monday – Thursday Dinner', timings: '06:00 PM – 10:30 PM' },
      { days: 'Friday – Sunday Dinner', timings: '06:00 PM – 11:00 PM' },
    ],
    features: [
      'Spacious Banquet & Private Party Hall',
      'Family-Friendly Spacious Booths',
      'Dedicated Kids & Senior Friendly Seating',
      'Ample Designated Parking',
      'Executive Dining Lounge',
      'Takeaway & Express Counter',
    ],
    hasLiquor: false,
    seatingCapacity: 180,
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.684128362489!2d77.5684532!3d13.0315481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17dd8b0e8b2b%3A0xb35a0cf075cf3981!2sNew%20BEL%20Rd%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    googleMapsLink: 'https://maps.google.com/?q=45+1st+Main+Rd+New+BEL+Rd+Mathikere+Bengaluru+560094',
    swiggyLink: 'https://www.swiggy.com/city/bangalore/queens-restaurant-new-bel-road-rest406543',
    zomatoLink: 'https://www.zomato.com/bangalore/queens-restaurant-new-bel-road-bangalore',
    image: VENUE_IMAGES.newBelRoadBanquet,
    gallery: [
      VENUE_IMAGES.newBelRoadBanquet,
      VENUE_IMAGES.royalFeastTable,
      VENUE_IMAGES.heroDiningRoom,
      VENUE_IMAGES.tandoorLiveHearth,
    ],
  },
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // STARTERS
  {
    id: 'm-1',
    name: "Queen's Special Bhatti Da Murgh",
    hindiName: 'भट्टी दा मुर्ग',
    description: 'Succulent chicken thighs steeped in toasted black cardamom, roasted cumin, and Kashmiri deghi mirch, char-grilled over live lump charcoal.',
    price: 495,
    category: 'starters',
    isVeg: false,
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 2,
    image: DISH_IMAGES.bhattiDaMurgh,
    portion: '4 Large Pieces',
    allergens: ['Dairy'],
    pairing: 'Fresh Mint Chutney & Laccha Onion',
  },
  {
    id: 'm-2',
    name: 'Amritsari Machhi Tikka',
    hindiName: 'अमृतसरी मच्छी टिक्का',
    description: 'Fresh water river sole marinated with carom seeds (ajwain), crushed coriander, and gram flour, crisp fried to golden perfection.',
    price: 545,
    category: 'starters',
    isVeg: false,
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 2,
    image: DISH_IMAGES.amritsariMachhiTikka,
    portion: '6 Pieces',
    allergens: ['Fish', 'Mustard'],
    pairing: 'Radish Slaw & Nimbu',
  },
  {
    id: 'm-3',
    name: 'Paneer Tikka Lazeez',
    hindiName: 'पनीर टिक्का लज़ीज़',
    description: 'Handcrafted fresh malai paneer cubes marinated in hung curd, yellow mustard oil, fenugreek leaves, and chargrilled with bell peppers.',
    price: 425,
    category: 'starters',
    isVeg: true,
    isChefSpecial: false,
    isPopular: true,
    spiceLevel: 1,
    image: DISH_IMAGES.paneerTikkaLazeez,
    portion: '5 Generous Cubes',
    allergens: ['Dairy'],
    pairing: 'Charred Pineapple Salsa',
  },
  {
    id: 'm-4',
    name: 'Tandoori Bharwan Khumb',
    hindiName: 'तंदूरी भरवां खुम्ब',
    description: 'Plump button mushrooms stuffed with spiced cottage cheese, minced dry fruits, and fresh coriander, roasted in the clay tandoor.',
    price: 410,
    category: 'starters',
    isVeg: true,
    isChefSpecial: false,
    isPopular: false,
    spiceLevel: 1,
    image: DISH_IMAGES.tandooriBharwanKhumb,
    portion: '6 Stuffed Portions',
    allergens: ['Dairy', 'Nuts'],
  },
  {
    id: 'm-5',
    name: 'Dahi Ke Kebab',
    hindiName: 'दही के कबाब',
    description: 'Silken hung yogurt blended with roasted cumin, finely diced bell peppers, and fresh herbs, pan-seared with a crisp crust.',
    price: 395,
    category: 'starters',
    isVeg: true,
    isChefSpecial: false,
    isPopular: true,
    spiceLevel: 1,
    image: DISH_IMAGES.dahiKeKebab,
    portion: '6 Medallions',
    allergens: ['Dairy', 'Gluten'],
  },
  {
    id: 'm-6',
    name: 'Galouti Kebab Nawabi',
    hindiName: 'गलौटी कबाब नवाबी',
    description: 'Finely pounded tender lamb mince infused with 32 rare potli spices, melted bone marrow fat, served on mini saffron sheermal coins.',
    price: 595,
    category: 'starters',
    isVeg: false,
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 2,
    image: DISH_IMAGES.galoutiKebabNawabi,
    portion: '4 Sheermal Coins',
    allergens: ['Dairy', 'Nuts', 'Gluten'],
  },

  // SOUPS & SALADS
  {
    id: 'm-7',
    name: 'Murgh Shorba Zafraani',
    hindiName: 'मुर्ग शोरबा ज़ाफ़रानी',
    description: 'Fragrant, slow-simmered chicken broth enriched with saffron strands, crushed peppercorn, ginger, and fresh mint essence.',
    price: 245,
    category: 'soups-salads',
    isVeg: false,
    isChefSpecial: false,
    isPopular: false,
    spiceLevel: 1,
    image: DISH_IMAGES.murghShorbaZafraani,
  },
  {
    id: 'm-8',
    name: 'Tamatar Dhania Shorba',
    hindiName: 'टमाटर धनिया शोरबा',
    description: 'Ripe country tomatoes simmered with fresh coriander roots, cumin, and seasoned with a touch of roasted asafoetida.',
    price: 215,
    category: 'soups-salads',
    isVeg: true,
    isChefSpecial: false,
    isPopular: true,
    spiceLevel: 1,
    image: DISH_IMAGES.tamatarDhaniaShorba,
  },

  // VEG MAINS
  {
    id: 'm-9',
    name: "Queen's 1974 Signature Dal Makhani",
    hindiName: 'क्वीन्स दाल मखनी (सिंस 1974)',
    description: 'Black urad lentils and red kidney beans slow-cooked for 18 hours over clay tandoor embers, finished with farm white butter and rich dairy cream.',
    price: 445,
    category: 'veg-mains',
    isVeg: true,
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 1,
    image: DISH_IMAGES.dalMakhaniSignature,
    portion: 'Serves 2-3',
    allergens: ['Dairy'],
    pairing: 'Best enjoyed with Garlic Naan or Jeera Rice',
  },
  {
    id: 'm-10',
    name: 'Paneer Butter Masala',
    hindiName: 'पनीर बटर मसाला',
    description: 'Velvety makhani gravy prepared with sun-ripened tomatoes, cashew paste, kasuri methi, and soft artisan malai paneer.',
    price: 465,
    category: 'veg-mains',
    isVeg: true,
    isChefSpecial: false,
    isPopular: true,
    spiceLevel: 1,
    image: DISH_IMAGES.paneerButterMasala,
    portion: 'Serves 2',
    allergens: ['Dairy', 'Nuts'],
  },
  {
    id: 'm-11',
    name: 'Amritsari Pindi Chole',
    hindiName: 'अमृतसरी पिंडी छोले',
    description: 'Authentic dark chickpeas slow-simmered with black tea leaves, dried pomegranate seeds (anardana), ginger juliennes, and green chilies.',
    price: 395,
    category: 'veg-mains',
    isVeg: true,
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 2,
    image: DISH_IMAGES.amritsariPindiChole,
    portion: 'Serves 2',
    pairing: 'Pair with Amritsari Stuffed Kulcha',
  },
  {
    id: 'm-12',
    name: 'Sarson Ka Saag (Seasonal)',
    hindiName: 'सरसों का साग',
    description: 'Hand-harvested mustard greens, bathua, and spinach churned in earthen pots, tempered with desi ghee, garlic, and served with white makhan.',
    price: 435,
    category: 'veg-mains',
    isVeg: true,
    isChefSpecial: true,
    isPopular: false,
    spiceLevel: 1,
    image: DISH_IMAGES.sarsonKaSaag,
    portion: 'Serves 2',
    allergens: ['Dairy'],
    pairing: 'Served with Makki Di Roti and Jaggery',
  },

  // NON-VEG MAINS
  {
    id: 'm-13',
    name: "Queen's Classic Murgh Makhani",
    hindiName: 'क्वीन्स बटर चिकन',
    description: 'Our iconic 1974 recipe: Char-grilled tandoori chicken simmered in an indulgent gravy of simmered tomatoes, fresh cream, honey, and crushed kasuri methi.',
    price: 545,
    category: 'non-veg-mains',
    isVeg: false,
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 1,
    image: DISH_IMAGES.queensMurghMakhani,
    portion: 'Serves 2-3',
    allergens: ['Dairy', 'Nuts'],
    pairing: 'Butter Naan or Steamed Basmati',
  },
  {
    id: 'm-14',
    name: 'Kashmiri Rogan Josh',
    hindiName: 'कश्मीरी रोगन जोश',
    description: 'Prime cuts of spring mutton braised with Kashmiri whole red chilies, fennel powder, dried ginger (saunth), and infused with ratanjot bark.',
    price: 645,
    category: 'non-veg-mains',
    isVeg: false,
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 2,
    image: DISH_IMAGES.kashmiriRoganJosh,
    portion: 'Serves 2-3',
    pairing: 'Laccha Paratha or Jeera Rice',
  },
  {
    id: 'm-15',
    name: 'Rara Mutton Punjabi',
    hindiName: 'रारा मटन पंजाबी',
    description: 'Tender lamb chunks braised in a robust, spiced mince gravy with roasted whole spices, fried onions, and fresh ginger slivers.',
    price: 665,
    category: 'non-veg-mains',
    isVeg: false,
    isChefSpecial: true,
    isPopular: false,
    spiceLevel: 3,
    image: DISH_IMAGES.raraMuttonPunjabi,
    portion: 'Serves 2-3',
  },
  {
    id: 'm-16',
    name: 'Dhabe Da Kadhai Murgh',
    hindiName: 'ढाबे दा कढ़ाई मुर्ग',
    description: 'Country chicken tossed in iron wok with freshly pounded coriander seeds, black peppercorns, crunchy onions, and capsicum.',
    price: 525,
    category: 'non-veg-mains',
    isVeg: false,
    isChefSpecial: false,
    isPopular: true,
    spiceLevel: 3,
    image: DISH_IMAGES.dhabeDaKadhaiMurgh,
    portion: 'Serves 2',
  },

  // BREADS & RICE
  {
    id: 'm-17',
    name: 'Amritsari Aloo Kulcha',
    hindiName: 'अमृतसरी आलू कुलचा',
    description: 'Flaky layered bread stuffed with spiced potatoes, pomegranate seeds, and fresh green chilies, baked crisp in clay tandoor with melting butter.',
    price: 135,
    category: 'breads-rice',
    isVeg: true,
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 1,
    image: DISH_IMAGES.amritsariAlooKulcha,
    allergens: ['Gluten', 'Dairy'],
  },
  {
    id: 'm-18',
    name: 'Garlic & Coriander Naan',
    hindiName: 'लहसुनी नान',
    description: 'Refined flour bread topped with minced roasted garlic, fresh coriander leaves, and brushed with pure salted butter.',
    price: 110,
    category: 'breads-rice',
    isVeg: true,
    isChefSpecial: false,
    isPopular: true,
    spiceLevel: 1,
    image: DISH_IMAGES.garlicCorianderNaan,
    allergens: ['Gluten', 'Dairy'],
  },

  // BEVERAGES
  {
    id: 'm-20',
    name: 'Grand Punjabi Malai Lassi (Sweet/Salted)',
    hindiName: 'शाही मलाई लस्सी',
    description: 'Thick, churned whole-milk curd served chilled in traditional earthen kulhad, crowned with a thick layer of clotted cream (malai) and pistachio slivers.',
    price: 185,
    category: 'beverages',
    isVeg: true,
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 1,
    image: DISH_IMAGES.punjabiMalaiLassi,
    portion: '400 ml Kulhad',
    allergens: ['Dairy', 'Nuts'],
  },
  {
    id: 'm-21',
    name: 'Kesar Pista Badam Milk',
    hindiName: 'केसर पिस्ता बादाम मिल्क',
    description: 'Chilled reduced whole milk infused with royal Kashmiri saffron, crushed almonds, pistachios, and green cardamom.',
    price: 195,
    category: 'beverages',
    isVeg: true,
    isChefSpecial: false,
    isPopular: false,
    spiceLevel: 1,
    image: DISH_IMAGES.kesarPistaBadamMilk,
    allergens: ['Dairy', 'Nuts'],
  },

  // DESSERTS
  {
    id: 'm-22',
    name: 'Kesari Phirni in Clay Pot',
    hindiName: 'केसरी फिरनी',
    description: 'Traditional slow-cooked ground basmati rice pudding infused with saffron, rose petals, and silver vark, set chilled in porous clay saucers.',
    price: 195,
    category: 'desserts',
    isVeg: true,
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 1,
    image: DISH_IMAGES.kesariPhirniClayPot,
    allergens: ['Dairy', 'Nuts'],
  },
  {
    id: 'm-23',
    name: 'Shahi Gulab Jamun with Rabri',
    hindiName: 'शाही गुलाब जामुन रबड़ी के साथ',
    description: 'Golden mawa dumplings soaked in cardamom and rose syrup, served warm atop a bed of thick, saffron-scented lachha rabri.',
    price: 225,
    category: 'desserts',
    isVeg: true,
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 1,
    image: DISH_IMAGES.shahiGulabJamunRabri,
    allergens: ['Dairy', 'Gluten', 'Nuts'],
  },
];

export const HERITAGE_MILESTONES: HeritageMilestone[] = [
  {
    year: '1974',
    title: 'The Tandoor is Lit on Church Street',
    description: 'Founded with a singular vision: to bring the uncompromised, soul-stirring royal flavours of undivided Punjab to the burgeoning garden city of Bengaluru.',
    image: VENUE_IMAGES.churchStreet1974Dining,
    quote: '"We brought clay pots from Amritsar and coal from the northern hills. True flavour cannot be rushed."',
    highlight: 'Bengaluru’s First Authentic Punjabi Hearth',
  },
  {
    year: '1985',
    title: 'The Beloved Church Street Landmark',
    description: 'As Church Street became Bengaluru’s cultural heartbeat, Queen’s became the meeting ground for artists, intellectuals, families, and lovers of slow-simmered Dal Makhani.',
    image: VENUE_IMAGES.heroDiningRoom,
    quote: '"Generations of families celebrated graduations, engagements, and Sunday reunions at our booths."',
    highlight: 'Over 1 Million Meals Served with Grace',
  },
  {
    year: '1998',
    title: 'Mastering the 18-Hour Simmer',
    description: 'Our culinary master chefs refined the sacred spice blenders and established the legendary 18-hour continuous simmering technique for our iconic Dal Makhani and Butter Chicken.',
    image: DISH_IMAGES.dalMakhaniSignature,
    highlight: 'Culinary Secret Recipes Sealed & Preserved',
  },
  {
    year: '2012',
    title: 'New BEL Road Grand Expansion',
    description: 'Responding to decades of patron requests from North Bengaluru, Queen’s opened its grand second home on New BEL Road with dedicated celebration suites and private dining.',
    image: VENUE_IMAGES.newBelRoadBanquet,
    quote: '"Same heritage spices, same devotion, with a modern dining ambiance for larger family gatherings."',
    highlight: 'A Grand 180-Cover Celebration Pavilion',
  },
  {
    year: 'Today',
    title: '50+ Years of Unbroken Hospitality',
    description: 'Half a century of authentic Punjabi heritage. We continue to honour the sacred traditions of the tandoor while welcoming new generations of diners to the royal table.',
    image: VENUE_IMAGES.royalFeastTable,
    quote: '"A legacy of Punjabi hospitality, presented through a modern premium digital experience."',
    highlight: '5 Decades · 2 Iconic Locations · Countless Memories',
  },
];

export const EXPERIENCE_PACKAGES: ExperiencePackage[] = [
  {
    id: 'corporate-events',
    title: 'Executive Dinners & Corporate Events',
    subtitle: 'High-Level Hospitality for Discerning Business Guests',
    tagline: 'Leave an indelible impression on clients and team leaders.',
    description: 'Impeccably choreographed dining experiences with bespoke multi-course menus, dedicated sommelier wine pairings at Church Street, discreet service, and AV-enabled executive alcoves.',
    capacity: '15 to 80 Guests',
    idealFor: ['Executive Dinners', 'Quarterly Celebrations', 'Client Entertaining', 'Tech & Venture Meetups'],
    features: [
      'Bespoke Pre-Fixed Royal Menus',
      'Dedicated Hospitality Captain',
      'Private High-Speed Wi-Fi & AV Support',
      'Curated Cocktail & Wine Menus (Church Street)',
      'Customized Printed Menu Cards with Corporate Branding',
    ],
    image: VENUE_IMAGES.heroDiningRoom,
    menus: ['The Maharaja Executive Feast', 'The Imperial Tandoor Showcase', 'The Royal Vegetarian Grandeur'],
  },
  {
    id: 'private-parties',
    title: 'Intimate Private Parties & Gatherings',
    subtitle: 'Secluded Luxury for Personal Celebrations',
    tagline: 'Cherished memories framed by warmth, laughter, and Punjabi hospitality.',
    description: 'Whether celebrating a milestone 50th birthday, an intimate anniversary, or a joyous family get-together, our private dining rooms offer exclusive seclusion and royal feasts.',
    capacity: '10 to 45 Guests',
    idealFor: ['Milestone Birthdays', 'Anniversary Dinners', 'Family Reunions', 'Bespoke Degustation Dinners'],
    features: [
      'Exclusive Private Room Reservation',
      'Customizable Table Decor & Floral Accents',
      'Live Chef Tandoor Skewers Served Hot to Table',
      'Dedicated Cake Cutting & Celebration Ceremony',
      'Handcrafted Dessert Platters with Royal Silver Vark',
    ],
    image: VENUE_IMAGES.royalFeastTable,
    menus: ['Queen’s Shahi Dawat', 'The Tandoori Connoisseur', 'The Heritage Family Thaal'],
  },
  {
    id: 'celebrations',
    title: 'Grand Banquets & Festive Celebrations',
    subtitle: 'Unforgettable Large-Scale Hospitality',
    tagline: 'When the occasion calls for unmatched grandeur and bountiful feasts.',
    description: 'Host up to 180 guests at our New BEL Road grand celebration suite. Complete with live chaat and tandoori counters, royal brassware service, and custom culinary themes.',
    capacity: '50 to 180 Guests',
    idealFor: ['Engagement Ceremonies', 'Post-Wedding Feasts', 'Retirement Honors', 'Diwali & New Year Galas'],
    features: [
      'Full Pavilion Floor Buyout Option',
      'Live Tandoori & Fresh Bread Live Counters',
      'Heritage Brass & Copper Serving Vessels',
      'Valet Parking & Welcome Drink Reception',
      'Dedicated Event Coordinator & Master Service Team',
    ],
    image: VENUE_IMAGES.newBelRoadBanquet,
    menus: ['The Grand 50-Year Jubilee Banquet', 'The Royal Amritsari Gala Feast'],
  },
];

export const INITIAL_JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'j-1',
    slug: 'history-of-punjabi-cuisine-traditions',
    title: 'The History and Soul of Authentic Punjabi Cuisine: From the Five Rivers to the Royal Table',
    excerpt: 'Explore how pastoral Punjab traditions, clay tandoors, and the richness of whole milk ghee shaped one of the world’s most celebrated culinary traditions.',
    content: `
# The Sacred Hearth of the Five Rivers

Punjabi cuisine is not merely food; it is an exuberant celebration of agrarian bounty, ancient trade routes, and sacred hospitality (*Mehmaan-Nawazi*). Situated in the fertile land fed by five rivers, Punjab developed a culinary philosophy rooted in wholesome ingredients, slow fire, and hearty nourishment.

## The Sanjha Chulha: Community Tandoor
Historically in Punjab villages, families would prepare dough at home and gather around the *Sanjha Chulha*—the village community clay oven. As dough was slapped against the glowing clay walls, stories were shared, songs were sung, and bonds were forged.

At Queen's Restaurant, founded in 1974, we carry this very communal warmth forward every day.

## The Philosophy of Pure Ingredients
The essence of Punjabi cooking rests on four pillars:
1. **Slow Embers (Dheemi Aanch):** Spices must never be scorched; they are slowly coaxed to release essential oils into warm desi ghee.
2. **Whole Spices (Khada Masala):** Black cardamom, star anise, cinnamon quills, and mace create layers of aroma rather than flat heat.
3. **Dairy Excellence:** Rich malai, freshly churned white butter (*makhan*), and hand-hung yogurt impart natural creaminess without artificial thickeners.
4. **Charcoal Caramelization:** The intense dry radiant heat of the clay tandoor chars marinades, imparting the unmistakable smoky note that defines Queen's dishes.
    `,
    category: 'Punjabi Food & Culture',
    author: {
      name: 'Chef Harinder Singh',
      role: 'Master Chef & Culinary Historian',
      avatar: '/queens_restuarant/assets/img/chefs/chefs-1.webp',
    },
    publishedDate: 'January 14, 2026',
    readTime: '6 min read',
    image: JOURNAL_IMAGES.punjabiHeritage,
    tags: ['Punjabi History', 'Heritage', 'Tandoor', 'Slow Cooking'],
    featured: true,
    relatedDishId: 'm-9',
  },
  {
    id: 'j-2',
    slug: 'why-slow-tandoor-cooking-tastes-different',
    title: 'Why Slow-Fire Clay Tandoor Cooking Cannot Be Replicated in Modern Ovens',
    excerpt: 'The physics, chemistry, and culinary magic behind 900-degree earthen tandoors and why nothing compares to charcoal-kissed kebabs and blistered breads.',
    content: `
# The Ancient Metallurgy of Clay and Charcoal

While modern commercial kitchens rely on digital combi-ovens and induction ranges, Queen's Restaurant has preserved hand-crafted clay tandoors stoked with natural lump wood charcoal since our doors first opened in 1974.

## The Three Modes of Heat Transfer
A clay tandoor is a rare cooking vessel that harnesses three simultaneous heat modes:
- **Direct Radiation:** Heat radiating directly from the glowing coal bed at 800°F–900°F chars marinades instantly, sealing in internal moisture.
- **Convection:** Upward currents of intense hot air circulate through the cylindrical chamber, roasting whole cuts of meat and vegetables uniformly.
- **Conduction:** Bread slapped directly against the porous, cured clay wall cooks in seconds, expanding air pockets into crispy, blistered bubbles.

## The Chemistry of Dripping Juices
When marinades and fat from skewered kebabs drip onto the red-hot coals below, they vaporize instantly into aromatic smoke. This fragrant plume billows upward, basting the meat in natural wood smoke. This phenomenon is chemically impossible in an electric oven.
    `,
    category: 'Food Guides',
    author: {
      name: 'Simranjit Randhawa',
      role: 'Senior Food Columnist & Patron',
      avatar: '/queens_restuarant/assets/img/gallery/people/68_sonaleem-and-anshul-chodha.webp',
    },
    publishedDate: 'February 2, 2026',
    readTime: '5 min read',
    image: JOURNAL_IMAGES.clayTandoor,
    tags: ['Tandoor Science', 'Breads', 'Culinary Craft'],
    featured: false,
    relatedDishId: 'm-1',
  },
  {
    id: 'j-3',
    slug: 'queens-restaurant-50-years-of-punjabi-hospitality',
    title: 'Queen’s Restaurant: Five Decades of Punjabi Hospitality in Bangalore',
    excerpt: 'From 1974 on Church Street to a beloved culinary landmark spanning two iconic locations, here is the journey of staying true to authentic roots for half a century.',
    content: `
# A Half-Century Love Affair with Bengaluru

When Queen's Restaurant opened its doors on Church Street in 1974, Bengaluru was known as a serene pensioner’s paradise of flowering rain trees and colonial bungalows. Yet amidst this tranquil setting, the aromas of roasted cumin, simmering black lentils, and tandoori charcoal sparked a revolution in the city's dining scene.

## Staying Uncompromising in an Era of Trends
Over fifty years, food fads have come and gone: fusion menus, molecular gastronomy, and fast-casual dining. Queen's Restaurant made a conscious, courageous choice: **remain uncompromisingly authentic**.

- Our Dal Makhani still simmers overnight for 18 hours.
- Our garam masala is hand-roasted in small batches every Monday morning.
- Our kitchen team includes chefs whose fathers cooked at Queen's in the 1980s.

We invite you to taste fifty years of devotion in every bite.
    `,
    category: "Queen's Legacy",
    author: {
      name: 'Gurpreet Singh',
      role: 'Managing Partner',
      avatar: '/queens_restuarant/assets/img/gallery/people/69_people-at-restaurant.webp',
    },
    publishedDate: 'February 18, 2026',
    readTime: '7 min read',
    image: JOURNAL_IMAGES.queensHospitality,
    tags: ['Legacy', 'Church Street', '50 Years', 'Bengaluru History'],
    featured: true,
    relatedDishId: 'm-13',
  },
  {
    id: 'j-4',
    slug: 'punjabi-dining-guide-church-street-bangalore',
    title: 'The Ultimate Guide to Punjabi Dining on Church Street, Bangalore',
    excerpt: 'How to plan the perfect lunch or dinner on Bangalore’s most vibrant pedestrian street, from pairing craft beers with tandoori kebabs to weekend booking tips.',
    content: `
# Navigating Church Street’s Culinary Crown Jewel

Church Street is widely recognized as Bengaluru’s most vibrant pedestrian and cultural promenade. Between the bookstores, art galleries, and historic cafes, Queen's Restaurant stands as the beacon for authentic North Indian fine dining.

## How to Experience Queen's Church Street Like a Connoisseur
1. **Pre-Book for Weekend Evenings:** With Church Street’s pedestrian-only weekend policy, tables fill quickly. Reserve your table 24-48 hours in advance.
2. **Start with the Bhatti Da Murgh & Cold Draught:** Our Church Street location features a full bar; cold crisp lager pairs impeccably with char-grilled smoky spices.
3. **The Holy Trinity Main Course:** Order Queen's Signature Dal Makhani, Murgh Makhani or Paneer Butter Masala, and piping hot Amritsari Kulcha.
4. **Conclude with Clay Pot Phirni:** Served chilled in porous earthen saucers that absorb excess moisture and concentrate pure saffron sweetness.
    `,
    category: 'Bangalore Dining',
    author: {
      name: 'Pooja Kashyap',
      role: 'Bengaluru Food & Culture Writer',
      avatar: '/queens_restuarant/assets/img/gallery/people/64_people-5.webp',
    },
    publishedDate: 'March 1, 2026',
    readTime: '4 min read',
    image: JOURNAL_IMAGES.churchStreetDining,
    tags: ['Church Street', 'Bangalore Dining', 'Tips', 'Weekend Guide'],
    featured: false,
    relatedDishId: 'm-1',
  },
  {
    id: 'j-5',
    slug: 'art-of-punjabi-masalas-dheemi-aanch',
    title: 'The Sacred Art of Punjabi Masalas: Whole Spices, Potlis, and Dheemi Aanch',
    excerpt: 'Discover how Queen\'s signature garam masala is hand-blended, tied in cotton potlis, and coaxed over gentle embers to create deep, soul-warming layers of flavour.',
    content: `
# The Sacred Symphony of Khada Masala

In traditional Punjabi kitchens, masala is never an afterthought or a commercial powder shaken from a jar. It is a living, breathing craft perfected through generations of master khansamas.

## The Potli Method: Infusing Without Bitterness
For our legendary gravies and slow-cooked rogan josh, spices are tied securely inside an unbleached muslin cloth pouch (*potli*). This allows the quills of cinnamon, pods of black cardamom, whole mace flowers, and cloves to gently steep in simmering stocks for hours, imparting subtle warmth and ethereal aroma without clouding the sauce with gritty powder.

## The Rule of Dheemi Aanch (Gentle Simmer)
Spices roasted over aggressive flames scorch instantly, releasing bitter acrid tannins. At Queen's, our spice base is gently bloomed in golden desi ghee over low charcoal embers (*dheemi aanch*). This allows the natural essential oils to emulsify with onions, ginger, garlic, and ripe tomatoes into a velvety, fragrant base.

## The Weekly Small-Batch Roast
Every Monday morning, our kitchen brigade hand-selects whole spices imported directly from Malabar and Kashmir, dry-roasting them in heavy iron kadhais before coarsely pounding them in brass mortars. This freshness is the unmistakable signature of Queen's dining.
    `,
    category: 'Punjabi Food & Culture',
    author: {
      name: 'Chef Balvinder Deol',
      role: 'Executive Chef, Queen\'s Kitchen',
      avatar: '/queens_restuarant/assets/img/chefs/chefs-2.webp',
    },
    publishedDate: 'March 12, 2026',
    readTime: '5 min read',
    image: JOURNAL_IMAGES.sacredMasalas,
    tags: ['Spice Craft', 'Heritage Cooking', 'Garam Masala', 'Culinary Secrets'],
    featured: true,
    relatedDishId: 'm-9',
  },
  {
    id: 'j-6',
    slug: 'family-feasts-and-milestone-banquets-at-queens',
    title: 'Family Feasts & Milestone Banquets: Creating Lasting Memories at Queen’s',
    excerpt: 'From first dates in the 1970s to multi-generational anniversary feasts, how Queen\'s became Bengaluru\'s cherished home for heartfelt celebrations.',
    content: `
# Tables That Bring Generations Together

For fifty years, Queen's Restaurant has witnessed the evolving tapestry of Bengaluru’s families. Grandparents who dined with us as college sweethearts on Church Street in 1978 now bring their grandchildren to celebrate graduation feasts at our New BEL Road banquet hall.

## The Magic of Family-Style Thaal Dining
Punjabi dining is inherently generous and communal. We believe the sweetest laughter is shared over brimming copper handis passed from hand to hand across the table. When a family gathers at Queen's:
- Every table begins with crispy, paper-thin papads and freshly whipped mint-coriander chutney.
- Sizzling tandoori platters are placed centrally, inviting everyone to share and savor.
- Steaming garlic naans and butter kulchas arrive hot from the tandoor in woven wicker baskets.

## Hosting Life’s Milestones
Whether an intimate 25th wedding anniversary or a grand 150-guest milestone gala, our banquet team curates every detail—from personalized brass service to custom royal dessert platters garnished with pure silver vark.

We don't just serve meals; we honor the traditions of your family.
    `,
    category: "Queen's Legacy",
    author: {
      name: 'Ananya & Vikram Sengupta',
      role: 'Lifelong Patrons Since 1984',
      avatar: '/queens_restuarant/assets/img/gallery/people/62_people-9.webp',
    },
    publishedDate: 'March 24, 2026',
    readTime: '6 min read',
    image: JOURNAL_IMAGES.familyFeast,
    tags: ['Family Dining', 'Celebrations', 'Banquets', 'Memories', 'Church Street'],
    featured: false,
    relatedDishId: 'm-13',
  },
];

export const INITIAL_RECIPES: RecipeItem[] = [
  {
    id: 'r-1',
    slug: 'queens-signature-dal-makhani-18-hour',
    title: "Queen's Signature 18-Hour Dal Makhani",
    hindiTitle: 'शाही दाल मखनी विधि',
    category: 'Vegetarian',
    difficulty: 'Medium',
    prepTime: '8 hours soaking',
    cookTime: '3 hours active (12-18 hrs slow simmer)',
    servings: '6-8 Servings',
    image: DISH_IMAGES.dalMakhaniSignature,
    description: 'The sacred 1974 recipe: slow-simmered whole black urad and kidney beans enriched with ripe tomato puree, white butter, and aromatic kasuri methi.',
    ingredients: [
      {
        section: 'Lentils & Soaking',
        items: [
          '1.5 cups Whole Black Urad Dal (Sabut Urad)',
          '1/3 cup Red Kidney Beans (Rajma Chitra)',
          '6 cups Water for soaking',
          '2 tsp Salt',
          '1 tsp Kashmiri Red Chilli Powder',
        ],
      },
      {
        section: 'The Makhani Gravy',
        items: [
          '2 cups Fresh ripe country tomato puree (strained)',
          '2 tbsp Ginger-Garlic paste (freshly ground)',
          '100g Pure White Unsalted Butter (Makhan)',
          '1/3 cup Fresh Full-Fat Dairy Cream',
          '1 tsp Roasted Kasuri Methi (crushed between palms)',
          '1/2 tsp Shahi Garam Masala (clove, mace, cardamom)',
          '1 tbsp Degi Mirch for natural crimson hue',
        ],
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Thorough Washing & Overnight Soaking',
        instruction: 'Wash the black urad and rajma vigorously 4-5 times in cold running water until water runs clear. Soak in abundant fresh water for 8-10 hours.',
        tip: 'Vigorous washing removes excess starch and bitterness from the black lentil skin.',
      },
      {
        stepNumber: 2,
        title: 'Initial Gentle Boil',
        instruction: 'In a heavy-bottomed handi or pot, bring soaked lentils to a rolling boil with salt, degi mirch, and ginger paste. Skim off any white froth that rises to the top.',
      },
      {
        stepNumber: 3,
        title: 'The Slow Simmer & Tomato Infusion',
        instruction: 'Add the strained fresh tomato puree. Reduce the flame to the lowest setting (or use a heat diffuser plate). Cover loosely and let it simmer for at least 2 to 3 hours, stirring every 20 minutes.',
      },
      {
        stepNumber: 4,
        title: 'Lashing with White Butter & Kasuri Methi',
        instruction: 'As lentils soften into a creamy mash, stir in the farm white butter in 3 stages. Season with crushed kasuri methi and garam masala. Finish with fresh cream right before serving.',
        tip: 'Do not boil the dal aggressively after adding cream; gentle heat preserves the velvety gloss.',
      },
    ],
    chefSecret: 'The real secret to Queen’s legendary Dal Makhani is continuous gentle agitation while it simmers, allowing the lentil starches to emulsify seamlessly with butter and tomato pectins without any cornflour or thickening agents.',
    relatedMenuDish: 'Queen’s 1974 Signature Dal Makhani',
  },
  {
    id: 'r-2',
    slug: 'classic-murgh-makhani-butter-chicken',
    title: 'Heritage Murgh Makhani (Butter Chicken)',
    hindiTitle: 'मुर्ग मखनी शाही अंदाज',
    category: 'Non-Vegetarian',
    difficulty: 'Medium',
    prepTime: '45 mins (2 hrs marination)',
    cookTime: '35 mins',
    servings: '4 Servings',
    image: DISH_IMAGES.queensMurghMakhani,
    description: 'Char-roasted smoky chicken steeped in a silk-smooth cashew-tomato velvet gravy, balanced with honey, cardamom, and toasted fenugreek.',
    ingredients: [
      {
        section: 'Chicken Tikka Marination',
        items: [
          '700g Boneless chicken thighs cut into bite-sized chunks',
          '1/2 cup Hung Greek-style curd',
          '2 tbsp Mustard oil',
          '1.5 tbsp Kashmiri red chilli powder',
          '1.5 tbsp Ginger-garlic paste',
          '1 tsp Chaat masala & 1 tsp salt',
        ],
      },
      {
        section: 'Velvet Makhani Sauce',
        items: [
          '6 Large ripe tomatoes (roughly chopped and boiled with 15 cashews)',
          '50g Salted butter',
          '2 Green cardamoms & 1 clove',
          '1 tbsp Pure organic honey or brown sugar',
          '1/2 cup Heavy whipping cream',
          '1 tbsp Kasuri methi (gently toasted)',
        ],
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Marinate & Char the Chicken',
        instruction: 'Whisk hung curd, mustard oil, ginger-garlic paste, and spices. Coat chicken thoroughly. Marinate in refrigerator for 2 hours. Grill on skewers in oven or cast-iron skillet at maximum heat until char spots appear.',
      },
      {
        stepNumber: 2,
        title: 'Build the Silken Makhani Base',
        instruction: 'Puree the boiled tomatoes and cashews until glassy and smooth. Strain through a fine-mesh sieve to eliminate any seed particles.',
      },
      {
        stepNumber: 3,
        title: 'Simmer with Charred Tikka',
        instruction: 'Melt butter in a pan with bruised green cardamom. Add strained gravy and simmer for 15 minutes. Slide in the charred chicken pieces along with any pan juices.',
      },
      {
        stepNumber: 4,
        title: 'Finish with Honey, Cream & Fenugreek',
        instruction: 'Drizzle honey for balance, fold in heavy cream, and crush kasuri methi over the surface. Rest for 5 minutes before serving.',
      },
    ],
    chefSecret: 'Using boneless chicken thighs instead of chicken breasts ensures the meat remains succulent and juicy even under high charcoal heat.',
    relatedMenuDish: "Queen's Classic Murgh Makhani",
  },
  {
    id: 'r-3',
    slug: 'kesari-phirni-in-earthen-pots',
    title: 'Kesari Phirni in Clay Kulhads',
    hindiTitle: 'केसरी फिरनी कुल्हड़ वाली',
    category: 'Desserts',
    difficulty: 'Easy',
    prepTime: '20 mins',
    cookTime: '30 mins (+ 2 hrs chilling)',
    servings: '6 Clay Pots',
    image: DISH_IMAGES.kesariPhirniClayPot,
    description: 'A regal royal dessert of coarsely ground basmati rice slow-cooked in sweetened buffalo milk with saffron strands and sliced pistachio nuts.',
    ingredients: [
      {
        section: 'Main Ingredients',
        items: [
          '1 Litre Full-Cream Whole Milk',
          '1/4 cup Aged Basmati Rice (washed, dried, coarsely ground to semolina texture)',
          '1/2 cup Organic Sugar (adjust to taste)',
          '15-20 Strands Pure Kashmiri Saffron (steeped in 2 tbsp warm milk)',
          '1/2 tsp Green Cardamom Powder',
          '2 tbsp Sliced Pistachios & Almonds',
          'Edible Silver Foil (Vark) for royal finish',
        ],
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Grind Rice to Sooji Consistency',
        instruction: 'Wash basmati rice, dry completely on a cotton cloth for 30 minutes, then pulse in a blender until coarse like semolina (*rawa*). Do not make a fine powder.',
      },
      {
        stepNumber: 2,
        title: 'Simmer Milk & Whisk Rice Paste',
        instruction: 'Bring whole milk to a boil. Dissolve ground rice in 1/4 cup cold milk, then slowly whisk it into the boiling milk to prevent lumps.',
      },
      {
        stepNumber: 3,
        title: 'Infuse Saffron & Thicken',
        instruction: 'Add saffron milk and cardamom. Cook on medium-low heat for 20 minutes, stirring continuously until the pudding coats the back of a wooden ladle.',
      },
      {
        stepNumber: 4,
        title: 'Set in Unglazed Clay Pots',
        instruction: 'Ladle the hot phirni into pre-soaked, dried clay pots (matkas). Garnish with pistachios and refrigerate for 2 hours until firmly set.',
      },
    ],
    chefSecret: 'Unglazed clay pots absorb excess steam and water from the hot pudding as it cools, giving phirni its dense, creamy texture and pleasant earthy aroma (*sondhi khushboo*).',
    relatedMenuDish: 'Kesari Phirni in Clay Pot',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Vikram & Ananya Sen',
    role: 'Patrons Since 1986',
    vintage: '40-Year Family Tradition',
    content: "We had our first date at Queen's Church Street in 1986. Thirty-eight years later, we brought our grandchildren here for their birthday. The Butter Chicken and Dal Makhani taste identical to that golden evening. That kind of consistency is royal.",
    favoriteDish: 'Murgh Makhani & Garlic Naan',
    rating: 5,
    location: 'Church Street',
  },
  {
    id: 't-2',
    name: 'Lt. Col. Rajinder Pal (Retd.)',
    role: 'Army Veteran & Food Connoisseur',
    vintage: 'Patron Since 1978',
    content: "Having grown up in Jalandhar, finding authentic Punjabi flavours in South India was almost impossible until I walked into Queen's in the late seventies. The Bhatti Da Murgh and Pindi Chole are as authentic as what my grandmother cooked.",
    favoriteDish: 'Bhatti Da Murgh & Pindi Chole',
    rating: 5,
    location: 'Church Street',
  },
  {
    id: 't-3',
    name: 'Dr. Smrithi Nambiar',
    role: 'Ramaiah Medical Faculty',
    vintage: 'Regular Patron',
    content: "The New BEL Road restaurant has been our department's go-to venue for every promotion, retirement, and medical conference dinner. The private hall, attentive service, and incredible vegetarian spread make it unmatched.",
    favoriteDish: 'Paneer Tikka Lazeez & Phirni',
    rating: 5,
    location: 'New BEL Road',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Reservations',
    question: 'Do you take table reservations in advance?',
    answer: 'Yes! We strongly recommend reserving tables online through our website or by phone, especially for Friday through Sunday dinner service and weekend lunches. Walk-in guests are welcomed on a first-come, first-served basis as capacity permits.',
  },
  {
    id: 'faq-2',
    category: 'Locations & Service',
    question: 'What are the opening hours and contact numbers for both locations?',
    answer: 'Church Street: Mon–Thu 12:00 PM – 11:00 PM, Fri–Sun 12:00 PM – 11:30 PM (Phone: +91 72044 64661). New BEL Road: Daily Lunch 12:00 PM – 03:30 PM, Mon–Thu Dinner 06:00 PM – 10:30 PM, Fri–Sun Dinner 06:00 PM – 11:00 PM (Phone: +91 63660 46260).',
  },
  {
    id: 'faq-3',
    category: 'Menu & Dining',
    question: 'Which Queen’s location serves alcoholic beverages and beer?',
    answer: 'Our flagship Church Street location features a full bar with curated single malts, classic cocktails, draught beers, and selected wines. Our New BEL Road location is a dedicated non-alcoholic family dining and celebration pavilion.',
  },
  {
    id: 'faq-4',
    category: 'Menu & Dining',
    question: 'Do you cater to vegetarian, Jain, and gluten-sensitive dietary needs?',
    answer: 'Over 50% of our menu is strictly vegetarian. We prepare several dishes without onion and garlic upon prior request (Jain friendly), including our special Shahi Paneer and yellow dal. Please inform your service captain upon seating.',
  },
  {
    id: 'faq-5',
    category: 'Events & Private Dining',
    question: 'Can we host private parties, birthdays, or corporate celebrations?',
    answer: 'Yes! Both locations cater to private events. Church Street offers private alcoves for 15–40 guests, while New BEL Road features a dedicated banquet pavilion accommodating up to 180 guests with custom royal menus, AV support, and valet parking.',
  },
  {
    id: 'faq-6',
    category: 'Locations & Service',
    question: 'Is valet parking available at Queen’s Restaurant?',
    answer: 'Yes, complimentary valet parking is provided at both our Church Street and New BEL Road locations during operational lunch and dinner hours.',
  },
  {
    id: 'faq-7',
    category: 'Locations & Service',
    question: 'Do you accommodate private dining and milestone family celebrations?',
    answer: 'Yes, both our Church Street dining salon and New BEL Road banquet hall feature dedicated spaces for milestone family celebrations, anniversaries, and executive gatherings.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: "The Grand Queen's Royal Spread",
    category: 'food',
    image: '/queens_restuarant/assets/img/hero-bg-6.webp',
    caption: 'A lavish feast of authentic Punjabi delicacies prepared for celebration dining.',
    location: 'Flagship Salon',
    featured: true,
  },
  {
    id: 'g-2',
    title: 'Church Street Heritage Verandah & Dining Salon',
    category: 'interiors',
    image: VENUE_IMAGES.churchStreetFlagship,
    caption: 'Neo-classical warm wood, brass chandeliers, and heritage portraits on 52 Church Street.',
    location: 'Church Street',
    featured: true,
  },
  {
    id: 'g-3',
    title: 'Shared Laughter & Generational Dining',
    category: 'people',
    image: '/queens_restuarant/assets/img/gallery/people/69_people-at-restaurant.webp',
    caption: 'Families and lifelong patrons gathered around the table for cherished conversations.',
    location: 'Church Street',
  },
  {
    id: 'g-4',
    title: 'Charcoal Kebab-ka-Kamaal Tandoor Platter',
    category: 'food',
    image: '/queens_restuarant/assets/img/gallery/other/39_Kebab-ka-Kamaal-Platter.webp',
    caption: 'Skewered succulent kebabs charred over glowing lump charcoal embers.',
    location: 'Tandoor Station',
  },
  {
    id: 'g-5',
    title: 'Milestone Celebrations & Anniversaries',
    category: 'celebrations',
    image: '/queens_restuarant/assets/img/celebration-1.webp',
    caption: 'Celebrating five decades of golden milestones, birthdays, and family reunions.',
    location: 'New BEL Road',
  },
  {
    id: 'g-5b',
    title: 'Warm Heritage Ambience & Evening Dining',
    category: 'interiors',
    image: VENUE_IMAGES.churchStreet1974Dining,
    caption: 'Intimate candlelit dining salon adorned with vintage woodwork and warm chandeliers.',
    location: 'Church Street',
  },
  {
    id: 'g-6',
    title: 'New BEL Road Grand Celebration Banquet Pavilion',
    category: 'interiors',
    image: VENUE_IMAGES.newBelRoadLocation,
    caption: 'Modern luxury banquet and dining hall designed for grand family occasions.',
    location: 'New BEL Road',
    featured: true,
  },
  {
    id: 'g-7',
    title: 'Handi Butter Chicken Lazeez',
    category: 'food',
    image: '/queens_restuarant/assets/img/gallery/other/17_Butter-Chicken.webp',
    caption: 'Velvety spiced tomato-butter gravy with tender tandoori chicken and fresh makhan.',
    location: 'Kitchen Showcase',
  },
  {
    id: 'g-8',
    title: 'Patrons & Fellowship at Queen’s',
    category: 'people',
    image: '/queens_restuarant/assets/img/gallery/people/68_sonaleem-and-anshul-chodha.webp',
    caption: 'Warm hospitality and smiling guests experiencing authentic royal warmth.',
    location: 'Church Street',
  },
  {
    id: 'g-9',
    title: 'Artisan Tandoori Breads & Naan Hot off Clay Walls',
    category: 'heritage',
    image: '/queens_restuarant/assets/img/gallery/other/14_Breads.webp',
    caption: 'Hand-stretched dough baked at 480°C in traditional clay tandoors.',
    location: 'Bake Station',
  },
  {
    id: 'g-10',
    title: 'Grand Banquet Celebrations',
    category: 'celebrations',
    image: '/queens_restuarant/assets/img/upload/event-1.png',
    caption: 'Spacious banquet seating tailored for weddings, corporate galas, and milestones.',
    location: 'New BEL Road',
  },
  {
    id: 'g-11',
    title: 'Shahi Gosht Dum Biryani with Golden Saffron',
    category: 'food',
    image: '/queens_restuarant/assets/img/gallery/other/42_Biryanis.webp',
    caption: 'Aged basmati rice dum-cooked with whole spices and caramelized onions.',
    location: 'Kitchen Showcase',
  },
  {
    id: 'g-12',
    title: 'Master Khansamas & Kitchen Brigade',
    category: 'heritage',
    image: '/queens_restuarant/assets/img/chefs/chefs-1.webp',
    caption: 'Preserving 50 years of authentic Punjabi culinary techniques and sacred spice ratios.',
    location: 'Heritage Kitchen',
  },
  {
    id: 'g-13',
    title: 'Family Reunions Across Generations',
    category: 'people',
    image: '/queens_restuarant/assets/img/gallery/people/62_people-9.webp',
    caption: 'Three generations of diners sharing signature family platters.',
    location: 'Both Locations',
  },
  {
    id: 'g-14',
    title: 'Intimate Corner Verandah Dining',
    category: 'interiors',
    image: '/queens_restuarant/assets/img/about-4.webp',
    caption: 'Cozy colonial-inspired corners offering a peaceful retreat in the heart of Bengaluru.',
    location: 'Church Street',
  },
  {
    id: 'g-15',
    title: 'Tandoori Sizzle & Kebab Platter',
    category: 'food',
    image: '/queens_restuarant/assets/img/gallery/other/26_Tandoori-Chicken-Combo.webp',
    caption: 'Smoking hot tandoori cuts served with fresh mint chutney and lachha onions.',
    location: 'Tandoor Station',
  },
  {
    id: 'g-16',
    title: 'Royal Private Dining Salon',
    category: 'celebrations',
    image: VENUE_IMAGES.royalPrivateDiningSalon,
    caption: 'Exclusive heritage suites for intimate private dining and executive banquets.',
    location: 'Church Street',
  },
  {
    id: 'g-17',
    title: 'Winter Sarson Ka Saag & Makki Roti',
    category: 'food',
    image: '/queens_restuarant/assets/img/gallery/other/49_Sarso-ka-Saag.webp',
    caption: 'Slow-simmered mustard greens with homemade white butter and jaggery.',
    location: 'Seasonal Menu',
  },
  {
    id: 'g-18',
    title: 'Sacred Potli Spices & Pure Farm Ghee',
    category: 'heritage',
    image: '/queens_restuarant/assets/img/blogs/13_Cuisine_of_Punjab.jpg',
    caption: 'Whole cardamom, cloves, cinnamon, and pure desi ghee creating unforgettable aromas.',
    location: 'Spice Pantry',
  },
];
