export type Restaurant = {
  id: string;
  slug: string;
  name: string;
  description: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  address: string;
  area: string;
  city: string;
  phone: string;
  isOpen: boolean;
  coverImage: string;
  logoImage: string;
  plan: "starter" | "pro" | "enterprise";
  monthlyRevenue: number;
  totalOrders: number;
  joinedDate: string;
  status: "active" | "trial" | "suspended";
  ownerId: string;
  ownerName: string;
};

export type MenuCategory = {
  id: string;
  restaurantId: string;
  name: string;
  emoji: string;
  order: number;
  itemCount: number;
};

export type MenuItem = {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  emoji: string;
  isAvailable: boolean;
  isBestseller: boolean;
  isVeg: boolean;
  spiceLevel: "none" | "mild" | "medium" | "hot";
  preparationTime: number;
  tags: string[];
};

export type Order = {
  id: string;
  orderNumber: string;
  restaurantId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  paymentMethod: "sslcommerz" | "cod";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: string;
  estimatedDelivery: string;
  note?: string;
};

export type OrderItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  address: string;
  area: string;
};

export type PlatformStats = {
  totalRestaurants: number;
  activeRestaurants: number;
  trialRestaurants: number;
  totalOrdersToday: number;
  platformRevenueToday: number;
  platformRevenueMonth: number;
  newSignupsMonth: number;
  churnMonth: number;
};

export const RESTAURANTS: Restaurant[] = [
  {
    id: "rest-1",
    slug: "dhaka-biryani-house",
    name: "Dhaka Biryani House",
    description:
      "Authentic Bangladeshi biryani and Mughlai cuisine served with love since 2010. Famous for our slow-cooked kacchi biryani.",
    cuisine: ["Biryani", "Mughlai", "Bengali"],
    rating: 4.8,
    reviewCount: 1243,
    deliveryTime: "30-45 min",
    deliveryFee: 60,
    minimumOrder: 299,
    address: "House 12, Road 7, Dhanmondi",
    area: "Dhanmondi",
    city: "Dhaka",
    phone: "01712-345678",
    isOpen: true,
    coverImage: "/images/restaurants/biryani-cover.jpg",
    logoImage: "/images/restaurants/biryani-logo.jpg",
    plan: "pro",
    monthlyRevenue: 284500,
    totalOrders: 4821,
    joinedDate: "2024-01-15",
    status: "active",
    ownerId: "user-1",
    ownerName: "Mohammad Rahim",
  },
  {
    id: "rest-2",
    slug: "chittagong-sea-kitchen",
    name: "Chittagong Sea Kitchen",
    description:
      "Fresh seafood from the Bay of Bengal. Hilsa, prawn, crab, and more — cooked the authentic Chittagonian way.",
    cuisine: ["Seafood", "Bengali", "Chittagonian"],
    rating: 4.6,
    reviewCount: 876,
    deliveryTime: "35-50 min",
    deliveryFee: 80,
    minimumOrder: 399,
    address: "Shop 4, Agrabad Commercial Area",
    area: "Agrabad",
    city: "Chittagong",
    phone: "01819-234567",
    isOpen: true,
    coverImage: "/images/restaurants/seafood-cover.jpg",
    logoImage: "/images/restaurants/seafood-logo.jpg",
    plan: "starter",
    monthlyRevenue: 142000,
    totalOrders: 2340,
    joinedDate: "2024-03-10",
    status: "active",
    ownerId: "user-2",
    ownerName: "Karim Uddin",
  },
  {
    id: "rest-3",
    slug: "sylhet-spice-garden",
    name: "Sylhet Spice Garden",
    description:
      "A taste of the hills — traditional Sylheti cuisine with authentic seven-layer tea and wholesome rice dishes.",
    cuisine: ["Sylheti", "Bengali", "Tea"],
    rating: 4.9,
    reviewCount: 2156,
    deliveryTime: "25-40 min",
    deliveryFee: 50,
    minimumOrder: 249,
    address: "Zindabazar, Sylhet",
    area: "Zindabazar",
    city: "Sylhet",
    phone: "01611-456789",
    isOpen: false,
    coverImage: "/images/restaurants/sylheti-cover.jpg",
    logoImage: "/images/restaurants/sylheti-logo.jpg",
    plan: "enterprise",
    monthlyRevenue: 512000,
    totalOrders: 8904,
    joinedDate: "2023-11-05",
    status: "active",
    ownerId: "user-3",
    ownerName: "Nusrat Jahan",
  },
  {
    id: "rest-4",
    slug: "rajshahi-sweets",
    name: "Rajshahi Sweets & Desserts",
    description:
      "Famous Rajshahi mango sweets, mishti doi, roshogolla, and traditional Bengali desserts.",
    cuisine: ["Desserts", "Bengali Sweets"],
    rating: 4.7,
    reviewCount: 543,
    deliveryTime: "20-35 min",
    deliveryFee: 40,
    minimumOrder: 199,
    address: "Shaheb Bazar, Rajshahi",
    area: "Shaheb Bazar",
    city: "Rajshahi",
    phone: "01921-567890",
    isOpen: true,
    coverImage: "/images/restaurants/sweets-cover.jpg",
    logoImage: "/images/restaurants/sweets-logo.jpg",
    plan: "starter",
    monthlyRevenue: 87000,
    totalOrders: 1560,
    joinedDate: "2024-06-20",
    status: "trial",
    ownerId: "user-4",
    ownerName: "Abdul Karim",
  },
  {
    id: "rest-5",
    slug: "cox-bazar-seafood",
    name: "Cox's Bazar Seafood Palace",
    description:
      "Freshest catches from Cox's Bazar — grilled, fried, or curried. Beachside flavors brought to your door.",
    cuisine: ["Seafood", "Coastal Bengali"],
    rating: 4.5,
    reviewCount: 312,
    deliveryTime: "40-55 min",
    deliveryFee: 90,
    minimumOrder: 449,
    address: "Sugandha Beach Road, Cox's Bazar",
    area: "Sugandha",
    city: "Cox's Bazar",
    phone: "01855-678901",
    isOpen: true,
    coverImage: "/images/restaurants/coxsbazar-cover.jpg",
    logoImage: "/images/restaurants/coxsbazar-logo.jpg",
    plan: "starter",
    monthlyRevenue: 64000,
    totalOrders: 890,
    joinedDate: "2025-01-12",
    status: "trial",
    ownerId: "user-5",
    ownerName: "Sabbir Hossain",
  },
];

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: "cat-1", restaurantId: "rest-1", name: "Popular", emoji: "⭐", order: 1, itemCount: 4 },
  { id: "cat-2", restaurantId: "rest-1", name: "Biryani", emoji: "🍚", order: 2, itemCount: 6 },
  { id: "cat-3", restaurantId: "rest-1", name: "Kebab", emoji: "🍢", order: 3, itemCount: 5 },
  { id: "cat-4", restaurantId: "rest-1", name: "Curry", emoji: "🍛", order: 4, itemCount: 7 },
  { id: "cat-5", restaurantId: "rest-1", name: "Breads", emoji: "🫓", order: 5, itemCount: 4 },
  { id: "cat-6", restaurantId: "rest-1", name: "Drinks", emoji: "🥤", order: 6, itemCount: 5 },
  { id: "cat-7", restaurantId: "rest-1", name: "Desserts", emoji: "🍮", order: 7, itemCount: 4 },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "item-1", restaurantId: "rest-1", categoryId: "cat-2",
    name: "Beef Kacchi Biryani", description: "Slow-cooked mutton/beef with aromatic basmati rice, marinated overnight. Served with raita and salad.",
    price: 380, image: "/images/food/beef-biryani.jpg", emoji: "🍚",
    isAvailable: true, isBestseller: true, isVeg: false, spiceLevel: "medium",
    preparationTime: 20, tags: ["bestseller", "popular"]
  },
  {
    id: "item-2", restaurantId: "rest-1", categoryId: "cat-2",
    name: "Chicken Biryani", description: "Tender chicken pieces cooked with fragrant rice, saffron, and whole spices.",
    price: 280, image: "/images/food/chicken-biryani.jpg", emoji: "🍗",
    isAvailable: true, isBestseller: true, isVeg: false, spiceLevel: "mild",
    preparationTime: 15, tags: ["popular"]
  },
  {
    id: "item-3", restaurantId: "rest-1", categoryId: "cat-2",
    name: "Tehari", description: "Classic Dhaka-style beef tehari with golden basmati rice and caramelized onions.",
    price: 220, image: "/images/food/tehari.jpg", emoji: "🥘",
    isAvailable: true, isBestseller: false, isVeg: false, spiceLevel: "medium",
    preparationTime: 15, tags: []
  },
  {
    id: "item-4", restaurantId: "rest-1", categoryId: "cat-3",
    name: "Seekh Kebab (6 pcs)", description: "Minced beef mixed with herbs and spices, grilled on skewers. Served with mint chutney.",
    price: 240, image: "/images/food/seekh-kebab.jpg", emoji: "🍢",
    isAvailable: true, isBestseller: true, isVeg: false, spiceLevel: "medium",
    preparationTime: 12, tags: ["popular", "grilled"]
  },
  {
    id: "item-5", restaurantId: "rest-1", categoryId: "cat-3",
    name: "Chicken Tikka (8 pcs)", description: "Marinated chicken chunks grilled in tandoor. Smoky, juicy, and packed with flavor.",
    price: 320, image: "/images/food/chicken-tikka.jpg", emoji: "🍖",
    isAvailable: true, isBestseller: true, isVeg: false, spiceLevel: "mild",
    preparationTime: 15, tags: ["popular"]
  },
  {
    id: "item-6", restaurantId: "rest-1", categoryId: "cat-4",
    name: "Mutton Rezala", description: "Slow-cooked mutton in a rich white gravy with cashew paste and aromatic spices. Mughlai classic.",
    price: 420, image: "/images/food/mutton-rezala.jpg", emoji: "🥗",
    isAvailable: true, isBestseller: false, isVeg: false, spiceLevel: "mild",
    preparationTime: 25, tags: ["mughlai", "special"]
  },
  {
    id: "item-7", restaurantId: "rest-1", categoryId: "cat-4",
    name: "Chicken Bhuna", description: "Dry-fried chicken curry with bold spices and caramelized onions. Goes best with naan.",
    price: 240, image: "/images/food/chicken-bhuna.jpg", emoji: "🍛",
    isAvailable: true, isBestseller: false, isVeg: false, spiceLevel: "hot",
    preparationTime: 18, tags: []
  },
  {
    id: "item-8", restaurantId: "rest-1", categoryId: "cat-4",
    name: "Dal Makhani", description: "Creamy black lentil curry slow-cooked overnight with butter and spices.",
    price: 150, image: "/images/food/dal-makhani.jpg", emoji: "🫕",
    isAvailable: true, isBestseller: false, isVeg: true, spiceLevel: "mild",
    preparationTime: 10, tags: ["vegetarian"]
  },
  {
    id: "item-9", restaurantId: "rest-1", categoryId: "cat-5",
    name: "Butter Naan", description: "Soft leavened bread baked in tandoor, brushed with butter.",
    price: 40, image: "/images/food/butter-naan.jpg", emoji: "🫓",
    isAvailable: true, isBestseller: false, isVeg: true, spiceLevel: "none",
    preparationTime: 8, tags: []
  },
  {
    id: "item-10", restaurantId: "rest-1", categoryId: "cat-5",
    name: "Paratha", description: "Flaky whole-wheat flatbread, layered and pan-fried with ghee.",
    price: 30, image: "/images/food/paratha.jpg", emoji: "🥙",
    isAvailable: true, isBestseller: false, isVeg: true, spiceLevel: "none",
    preparationTime: 6, tags: []
  },
  {
    id: "item-11", restaurantId: "rest-1", categoryId: "cat-6",
    name: "Mango Lassi", description: "Chilled yoghurt drink blended with Rajshahi mango pulp. Thick and refreshing.",
    price: 85, image: "/images/food/mango-lassi.jpg", emoji: "🥭",
    isAvailable: true, isBestseller: true, isVeg: true, spiceLevel: "none",
    preparationTime: 5, tags: ["cold", "popular"]
  },
  {
    id: "item-12", restaurantId: "rest-1", categoryId: "cat-6",
    name: "Rooh Afza Sharbat", description: "Classic rose syrup drink with chilled milk. A Bangladeshi favourite.",
    price: 60, image: "/images/food/rooh-afza.jpg", emoji: "🌹",
    isAvailable: true, isBestseller: false, isVeg: true, spiceLevel: "none",
    preparationTime: 3, tags: ["cold"]
  },
  {
    id: "item-13", restaurantId: "rest-1", categoryId: "cat-7",
    name: "Gulab Jamun (4 pcs)", description: "Soft milk-solid dumplings soaked in rose-flavored sugar syrup. Warm and indulgent.",
    price: 120, image: "/images/food/gulab-jamun.jpg", emoji: "🟤",
    isAvailable: true, isBestseller: true, isVeg: true, spiceLevel: "none",
    preparationTime: 5, tags: ["sweet", "popular"]
  },
  {
    id: "item-14", restaurantId: "rest-1", categoryId: "cat-7",
    name: "Mishti Doi", description: "Sweet yoghurt caramelized with sugar and set in earthenware pots. Authentic Bengali.",
    price: 80, image: "/images/food/mishti-doi.jpg", emoji: "🍮",
    isAvailable: true, isBestseller: false, isVeg: true, spiceLevel: "none",
    preparationTime: 3, tags: ["sweet"]
  },
];

export const DASHBOARD_ORDERS: Order[] = [
  {
    id: "ord-1", orderNumber: "FF-104821",
    restaurantId: "rest-1",
    customerId: "cust-1", customerName: "Arif Hossain", customerPhone: "01712-111222",
    customerAddress: "House 5, Road 2, Dhanmondi, Dhaka",
    items: [
      { menuItemId: "item-1", name: "Beef Kacchi Biryani", price: 380, quantity: 2, total: 760 },
      { menuItemId: "item-11", name: "Mango Lassi", price: 85, quantity: 2, total: 170 },
    ],
    subtotal: 930, deliveryFee: 0, tax: 47, discount: 0, total: 977,
    status: "pending", paymentMethod: "sslcommerz", paymentStatus: "paid",
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 35 * 60000).toISOString(),
  },
  {
    id: "ord-2", orderNumber: "FF-104820",
    restaurantId: "rest-1",
    customerId: "cust-2", customerName: "Fatema Begum", customerPhone: "01819-334455",
    customerAddress: "Flat 3B, Mirpur DOHS, Dhaka",
    items: [
      { menuItemId: "item-2", name: "Chicken Biryani", price: 280, quantity: 1, total: 280 },
      { menuItemId: "item-4", name: "Seekh Kebab (6 pcs)", price: 240, quantity: 1, total: 240 },
      { menuItemId: "item-9", name: "Butter Naan", price: 40, quantity: 2, total: 80 },
    ],
    subtotal: 600, deliveryFee: 60, tax: 30, discount: 0, total: 690,
    status: "preparing", paymentMethod: "cod", paymentStatus: "pending",
    createdAt: new Date(Date.now() - 18 * 60000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 22 * 60000).toISOString(),
  },
  {
    id: "ord-3", orderNumber: "FF-104819",
    restaurantId: "rest-1",
    customerId: "cust-3", customerName: "Nasir Uddin", customerPhone: "01611-556677",
    customerAddress: "Road 11, Block C, Banani, Dhaka",
    items: [
      { menuItemId: "item-6", name: "Mutton Rezala", price: 420, quantity: 1, total: 420 },
      { menuItemId: "item-8", name: "Dal Makhani", price: 150, quantity: 1, total: 150 },
      { menuItemId: "item-9", name: "Butter Naan", price: 40, quantity: 4, total: 160 },
      { menuItemId: "item-13", name: "Gulab Jamun", price: 120, quantity: 1, total: 120 },
    ],
    subtotal: 850, deliveryFee: 0, tax: 43, discount: 50, total: 843,
    status: "ready", paymentMethod: "sslcommerz", paymentStatus: "paid",
    createdAt: new Date(Date.now() - 32 * 60000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 8 * 60000).toISOString(),
  },
  {
    id: "ord-4", orderNumber: "FF-104818",
    restaurantId: "rest-1",
    customerId: "cust-4", customerName: "Sadia Islam", customerPhone: "01921-778899",
    customerAddress: "House 22, Gulshan Avenue, Dhaka",
    items: [
      { menuItemId: "item-5", name: "Chicken Tikka", price: 320, quantity: 1, total: 320 },
      { menuItemId: "item-7", name: "Chicken Bhuna", price: 240, quantity: 1, total: 240 },
      { menuItemId: "item-10", name: "Paratha", price: 30, quantity: 3, total: 90 },
    ],
    subtotal: 650, deliveryFee: 60, tax: 33, discount: 0, total: 743,
    status: "out_for_delivery", paymentMethod: "sslcommerz", paymentStatus: "paid",
    createdAt: new Date(Date.now() - 48 * 60000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 3 * 60000).toISOString(),
  },
  {
    id: "ord-5", orderNumber: "FF-104817",
    restaurantId: "rest-1",
    customerId: "cust-5", customerName: "Rahim Sheikh", customerPhone: "01855-990011",
    customerAddress: "Plot 14, Uttara Sector 7, Dhaka",
    items: [
      { menuItemId: "item-1", name: "Beef Kacchi Biryani", price: 380, quantity: 3, total: 1140 },
      { menuItemId: "item-12", name: "Rooh Afza Sharbat", price: 60, quantity: 3, total: 180 },
      { menuItemId: "item-14", name: "Mishti Doi", price: 80, quantity: 3, total: 240 },
    ],
    subtotal: 1560, deliveryFee: 0, tax: 78, discount: 100, total: 1538,
    status: "delivered", paymentMethod: "sslcommerz", paymentStatus: "paid",
    createdAt: new Date(Date.now() - 90 * 60000).toISOString(),
    estimatedDelivery: new Date(Date.now() - 45 * 60000).toISOString(),
  },
];

export const CUSTOMERS: Customer[] = [
  { id: "cust-1", name: "Arif Hossain", phone: "01712-111222", email: "arif@example.com", totalOrders: 14, totalSpent: 9840, lastOrderDate: new Date(Date.now() - 5 * 60000).toISOString(), address: "House 5, Road 2", area: "Dhanmondi" },
  { id: "cust-2", name: "Fatema Begum", phone: "01819-334455", email: "fatema@example.com", totalOrders: 8, totalSpent: 5420, lastOrderDate: new Date(Date.now() - 18 * 60000).toISOString(), address: "Flat 3B, Mirpur DOHS", area: "Mirpur" },
  { id: "cust-3", name: "Nasir Uddin", phone: "01611-556677", email: "nasir@example.com", totalOrders: 22, totalSpent: 16750, lastOrderDate: new Date(Date.now() - 32 * 60000).toISOString(), address: "Road 11, Block C", area: "Banani" },
  { id: "cust-4", name: "Sadia Islam", phone: "01921-778899", email: "sadia@example.com", totalOrders: 5, totalSpent: 3610, lastOrderDate: new Date(Date.now() - 48 * 60000).toISOString(), address: "House 22, Gulshan Ave", area: "Gulshan" },
  { id: "cust-5", name: "Rahim Sheikh", phone: "01855-990011", email: "rahim@example.com", totalOrders: 31, totalSpent: 24820, lastOrderDate: new Date(Date.now() - 90 * 60000).toISOString(), address: "Plot 14, Uttara Sector 7", area: "Uttara" },
  { id: "cust-6", name: "Roksana Akter", phone: "01712-221133", email: "roksana@example.com", totalOrders: 9, totalSpent: 6240, lastOrderDate: new Date(Date.now() - 2 * 24 * 3600000).toISOString(), address: "House 3, Mohammadpur", area: "Mohammadpur" },
  { id: "cust-7", name: "Jamal Uddin", phone: "01819-443322", email: "jamal@example.com", totalOrders: 17, totalSpent: 12980, lastOrderDate: new Date(Date.now() - 3 * 24 * 3600000).toISOString(), address: "Road 5, Lalmatia", area: "Lalmatia" },
];

export const WEEKLY_REVENUE = [
  { day: "Mon", revenue: 12400, orders: 48 },
  { day: "Tue", revenue: 9800, orders: 37 },
  { day: "Wed", revenue: 15200, orders: 61 },
  { day: "Thu", revenue: 11600, orders: 44 },
  { day: "Fri", revenue: 18900, orders: 75 },
  { day: "Sat", revenue: 22400, orders: 89 },
  { day: "Sun", revenue: 8450, orders: 34 },
];

export const MONTHLY_REVENUE = [
  { month: "Nov", revenue: 198000 },
  { month: "Dec", revenue: 245000 },
  { month: "Jan", revenue: 312000 },
  { month: "Feb", revenue: 278000 },
  { month: "Mar", revenue: 356000 },
  { month: "Apr", revenue: 124500 },
];

export const PLATFORM_STATS: PlatformStats = {
  totalRestaurants: 47,
  activeRestaurants: 42,
  trialRestaurants: 5,
  totalOrdersToday: 1284,
  platformRevenueToday: 38450,
  platformRevenueMonth: 1245000,
  newSignupsMonth: 8,
  churnMonth: 1,
};

export const PLATFORM_ACTIVITY = [
  { id: 1, type: "upgrade", message: "Dhaka Biryani House upgraded to Pro plan", time: new Date(Date.now() - 2 * 3600000).toISOString(), icon: "trending-up" },
  { id: 2, type: "signup", message: "Cox's Bazar Seafood Palace signed up on Starter plan", time: new Date(Date.now() - 5 * 3600000).toISOString(), icon: "user-plus" },
  { id: 3, type: "payment", message: "Payment received from Sylhet Spice Garden — ৳5,099", time: new Date(Date.now() - 8 * 3600000).toISOString(), icon: "credit-card" },
  { id: 4, type: "payment", message: "Payment received from Chittagong Sea Kitchen — ৳999", time: new Date(Date.now() - 12 * 3600000).toISOString(), icon: "credit-card" },
  { id: 5, type: "warning", message: "Rajshahi Sweets trial ending in 3 days", time: new Date(Date.now() - 18 * 3600000).toISOString(), icon: "alert-triangle" },
];

export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 999,
    yearlyPrice: 9990,
    description: "Perfect for new restaurants just getting started with online ordering.",
    features: [
      "Up to 50 menu items",
      "Basic order management",
      "SSLCommerz payments",
      "Email support",
      "1 admin user",
      "Basic analytics",
      "Mobile-responsive storefront",
    ],
    notIncluded: ["Custom domain", "Advanced analytics", "Priority support", "API access"],
    cta: "Start Free Trial",
    popular: false,
    color: "slate",
  },
  {
    id: "pro",
    name: "Pro",
    price: 2499,
    yearlyPrice: 24990,
    description: "For growing restaurants that need more power and customization.",
    features: [
      "Unlimited menu items",
      "Advanced order management",
      "SSLCommerz + bKash + Nagad",
      "Live chat + email support",
      "3 admin users",
      "Advanced analytics & reports",
      "Custom domain",
      "Promo codes & discounts",
      "Customer loyalty system",
      "Scheduled ordering",
    ],
    notIncluded: ["API access", "Dedicated account manager"],
    cta: "Start Free Trial",
    popular: true,
    color: "primary",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 0,
    yearlyPrice: 0,
    description: "For restaurant chains and multi-branch operations requiring maximum control.",
    features: [
      "Everything in Pro",
      "Unlimited admin users",
      "Multi-branch management",
      "API access & webhooks",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee (99.9%)",
      "White-label option",
      "Priority 24/7 support",
      "Custom payment gateway",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    popular: false,
    color: "slate",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Mohammad Rahim",
    role: "Owner, Dhaka Biryani House",
    avatar: "/images/avatars/rahim.jpg",
    initials: "MR",
    rating: 5,
    text: "FoodFlow has completely transformed our business. We went from zero online orders to over 80 orders per day within 3 months. The SSLCommerz and bKash integration made it so easy for our customers to pay. Highly recommend to every restaurant owner in Bangladesh.",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Owner, Sylhet Spice Garden",
    avatar: "/images/avatars/nusrat.jpg",
    initials: "NJ",
    rating: 5,
    text: "আমাদের রেস্টুরেন্টের অনলাইন বিক্রি তিনগুণ বেড়ে গেছে। FoodFlow-এর ড্যাশবোর্ড ব্যবহার করা খুবই সহজ, এবং অর্ডার ম্যানেজমেন্ট সিস্টেম দারুণ কাজ করে। প্রতিদিনের আয় ট্র্যাক করা এখন অনেক সহজ।",
  },
  {
    id: 3,
    name: "Karim Uddin",
    role: "Owner, Chittagong Sea Kitchen",
    avatar: "/images/avatars/karim.jpg",
    initials: "KU",
    rating: 5,
    text: "The customer support team is amazing. They helped us set up everything in less than a day. Our customers love how easy it is to order — the website looks professional and the checkout with Nagad works flawlessly.",
  },
];

export const FAQS = [
  {
    question: "How quickly can I get my restaurant online?",
    answer: "Most restaurants are up and running within 24 hours. Our onboarding team will help you set up your menu, payment gateway, and storefront. You can start accepting orders the same day.",
  },
  {
    question: "Which payment methods are supported?",
    answer: "We support SSLCommerz (Visa, Mastercard, Amex), bKash, Nagad, Rocket, and Cash on Delivery. All online payments are processed securely through SSLCommerz's certified gateway.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! All plans include a 14-day free trial. No credit card required. You can explore all features during the trial period.",
  },
  {
    question: "Can I manage multiple branches?",
    answer: "Yes, with the Enterprise plan you can manage multiple restaurant branches from a single dashboard, each with their own menu, orders, and analytics.",
  },
  {
    question: "How does the delivery system work?",
    answer: "FoodFlow handles the ordering and payment side. You can manage your own delivery team, or integrate with Pathao or Shohoz delivery services through our API (Pro and Enterprise plans).",
  },
  {
    question: "What happens if I need help?",
    answer: "Starter plan users get email support. Pro plan users get live chat + email support (9am-9pm BST). Enterprise users get 24/7 priority support with a dedicated account manager.",
  },
];

export const AREAS = [
  "Gulshan", "Banani", "Dhanmondi", "Mohammadpur", "Mirpur",
  "Uttara", "Motijheel", "Khilgaon", "Rampura", "Badda",
  "Malibagh", "Shantinagar", "Puran Dhaka", "Lalmatia", "Kalabagan",
];
