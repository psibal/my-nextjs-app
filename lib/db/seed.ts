// Load environment variables FIRST before any other imports
import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "./index";
import { users, posts, products, accounts, sessions, verificationTokens } from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    console.log("🧹 Resetting data...");
    // Delete in order to respect foreign keys
    await db.delete(posts);
    await db.delete(products);
    await db.delete(accounts);
    await db.delete(sessions);
    await db.delete(verificationTokens);
    await db.delete(users);
    console.log("✅ Data reset complete.");

    // Create a test user
    console.log("👤 Creating test user...");
    const [user] = await db
      .insert(users)
      .values({
        name: "Test User",
        email: "test@example.com",
        emailVerified: new Date(),
      })
      .returning();

    if (!user) {
      throw new Error("Failed to create test user");
    }

    console.log(`✅ Created test user: ${user.email}`);

    // Seed posts
    await seedPosts(user.id);

    // Seed products
    await seedProducts();

    console.log("🎉 Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

async function seedPosts(userId: string) {
  console.log("📝 Seeding posts...");
  // Create sample posts
  const samplePosts = [
    {
      title: "Welcome to My Blog",
      content:
        "This is my first blog post! I'm excited to share my thoughts and ideas with you. This application is built with Next.js, TypeScript, and all the modern tools.",
      published: true,
      authorId: userId,
    },
    {
      title: "Getting Started with Next.js 15",
      content:
        "Next.js 15 introduces amazing new features including the stable App Router, Server Actions, and improved performance. Let me walk you through the key updates...",
      published: true,
      authorId: userId,
    },
    {
      title: "Building Full-Stack Apps with Drizzle ORM",
      content:
        "Drizzle ORM is a TypeScript-first ORM that makes database queries a breeze. Here's how I'm using it in this project to manage my Postgres database with full type safety.",
      published: true,
      authorId: userId,
    },
    {
      title: "Draft: Upcoming Features",
      content:
        "I'm planning to add several new features to this blog:\n- Comment system\n- Categories and tags\n- Search functionality\n- RSS feed\n\nStay tuned!",
      published: false,
      authorId: userId,
    },
    {
      title: "The Power of Server Actions",
      content:
        "Server Actions in Next.js allow you to write backend logic directly in your components. No more API routes for simple mutations! Here's how they work...",
      published: true,
      authorId: userId,
    },
  ];

  const insertedPosts = await db
    .insert(posts)
    .values(samplePosts)
    .returning();

  console.log(`✅ Created ${insertedPosts.length} sample posts`);
}

async function seedProducts() {
  console.log("🛍️  Seeding products...");
  // Create sample products
  const sampleProducts = [
    {
      name: "Ergonomic Mechanical Keyboard",
      description: "A premium mechanical keyboard with hot-swappable switches and PBT keycaps. Perfect for long coding sessions.",
      price: "159.99",
      stock: 50,
      imageUrl: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&auto=format&fit=crop&q=60",
      published: true,
    },
    {
      name: "4K Ultrawide Monitor",
      description: "34-inch curved ultrawide monitor with 144Hz refresh rate and HDR support. Boost your productivity with more screen real estate.",
      price: "649.99",
      stock: 25,
      imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=60",
      published: true,
    },
    {
      name: "Noise-Cancelling Headphones",
      description: "Industry-leading active noise cancellation with 40 hours of battery life. Crystal clear audio for focus and music.",
      price: "349.00",
      stock: 100,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
      published: true,
    },
    {
      name: "Height-Adjustable Standing Desk",
      description: "Solid wood desktop with dual-motor lift system and anti-collision technology. Healthier way to work.",
      price: "499.00",
      stock: 15,
      imageUrl: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&auto=format&fit=crop&q=60",
      published: true,
    },
    {
      name: "Wireless Vertical Mouse",
      description: "Ergonomic vertical mouse designed to reduce wrist strain. High-precision sensor and customizable buttons.",
      price: "89.00",
      stock: 75,
      imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=60",
      published: false,
    },
  ];

  const insertedProducts = await db
    .insert(products)
    .values(sampleProducts)
    .returning();

  console.log(`✅ Created ${insertedProducts.length} sample products`);
}

seed();
