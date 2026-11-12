
require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");

const products = [
  {
    name: "Wireless Headphones",
    category: "Audio",
    price: 4500,
    imageUrl: "/images/images.jpeg",
    description: "Comfortable wireless headphones for everyday use.",
    stock: 10
  },
  {
    name: "Smart Watch",
    category: "Accessories",
    price: 6500,
    imageUrl: "/images/images1.jpeg",
    description: "A modern smartwatch for your daily activities.",
    stock: 10
  },
  {
    name: "Gaming Mouse",
    category: "Gaming",
    price: 2500,
    imageUrl: "/images/images2.jpeg",
    description: "A precise mouse designed for gaming.",
    stock: 10
  },
  {
    name: "Bluetooth Speaker",
    category: "Audio",
    price: 3500,
    imageUrl: "/images/images3.jpeg",
    description: "Enjoy your favorite music anywhere.",
    stock: 10
  },
  {
    name: "Mechanical Keyboard",
    category: "Gaming",
    price: 5500,
    imageUrl: "/images/images4.jpeg",
    description: "A responsive keyboard for work and gaming.",
    stock: 10
  },
  {
    name: "USB-C Charger",
    category: "Accessories",
    price: 1800,
    imageUrl: "/images/images5.jpeg",
    description: "A compact charger for compatible devices.",
    stock: 10
  }
];

const seedProducts = async () => {
  try {
    await connectDB();

    const operations = products.map((product) => ({
      updateOne: {
        filter: { name: product.name },
        update: { $set: product },
        upsert: true
      }
    }));

    await Product.bulkWrite(operations);

    console.log("Products inserted successfully!");

    const count = await Product.countDocuments();
    console.log(`Total products in database: ${count}`);

  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedProducts();
