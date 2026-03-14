export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  link?: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Admonition Plastic Grocery Container 1200 ml",
    description: "High-quality plastic grocery container for your kitchen storage needs. (Details to be updated)",
    price: 299,
    category: "Storage",
    image: "https://images.unsplash.com/photo-1581622558667-3419a8dc5f83?auto=format&fit=crop&q=80&w=800",
    rating: 4.5,
    reviews: 12,
    featured: true,
    link: "https://dl.flipkart.com/dl/admonition-plastic-grocery-container-1200-ml/p/itm1efa17b53baee?pid=CNTHAYYF2JKXCBRJ"
  },
  {
    id: "p2",
    name: "Admonition Product 2",
    description: "Product details could not be fetched from Flipkart. Please update the name, description, and image.",
    price: 499,
    category: "Kitchen Gadgets",
    image: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&q=80&w=800",
    rating: 4.0,
    reviews: 5,
    link: "https://dl.flipkart.com/s/VRJQe!uuuN"
  },
  {
    id: "p3",
    name: "Admonition Product 3",
    description: "Product details could not be fetched from Flipkart. Please update the name, description, and image.",
    price: 599,
    category: "Kitchen Gadgets",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&q=80&w=800",
    rating: 4.2,
    reviews: 8,
    link: "https://dl.flipkart.com/s/VRKXg2uuuN"
  },
  {
    id: "p4",
    name: "Admonition Product 4",
    description: "Product details could not be fetched from Flipkart. Please update the name, description, and image.",
    price: 399,
    category: "Storage",
    image: "https://images.unsplash.com/photo-1599598425947-330026295adf?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 24,
    featured: true,
    link: "https://dl.flipkart.com/s/VQRPjeuuuN"
  },
  {
    id: "p5",
    name: "Admonition Product 5",
    description: "Product details could not be fetched from Flipkart. Please update the name, description, and image.",
    price: 799,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    reviews: 15,
    link: "https://dl.flipkart.com/s/0h6_LWNNNN"
  },
  {
    id: "p6",
    name: "Admonition Product 6",
    description: "Product details could not be fetched from Flipkart. Please update the name, description, and image.",
    price: 899,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 32,
    featured: true,
    link: "https://dl.flipkart.com/s/0hEBg_NNNN"
  }
];
