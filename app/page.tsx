"use client";

import Image from "next/image";
import  {useEffect, useState } from "react";

const products = [
  { id: 1, name: "Caffè Latte", price: 220, image: "/images/latte.jpg" },
  { id: 2, name: "Cappuccino", price: 200, image: "/images/cappuccino.jpg" },
  { id: 3, name: "Espresso", price: 150, image: "/images/espresso.jpg" },
  { id: 4, name: "Mocha", price: 250, image: "/images/mocha.jpeg" },
  { id: 5, name: "Caramel Macchiato", price: 280, image: "/images/caramel-macchiato.jpeg" },
  { id: 6, name: "Matcha Green Tea Latte", price: 240, image: "/images/matcha-green-tea-latte.jpeg" },
  { id: 7, name: "Iced Cappuccino", price: 220, image: "/images/iced-cappuccino.jpeg" },
  { id: 8, name: "Flat White", price: 210, image: "/images/flat-white.jpeg" },
  { id: 9, name: "Black Coffee", price: 130, image: "/images/black-coffee.jpeg" },
];

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  setCartCount(storedCart.length);
}, []);

 const addToCart = (product: any) => {
  const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
  existingCart.push(product);
  localStorage.setItem("cart", JSON.stringify(existingCart));
  setCartCount(existingCart.length);
};


  return (
    <main className="bg-[#F7F7F7] min-h-screen">

      {/* HEADER */}
      <header className="bg-white shadow-md py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#006241]">Starbucks ☕</h2>
         <a href="/cart" className="text-lg font-semibold">
           🛒 Cart ({cartCount})
         </a>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-[#1E3932] text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            Starbucks Redesign
          </h1>
          <p className="mt-4 text-lg max-w-xl">
            Order your favorite coffee anytime, anywhere.
          </p>
        </div>
      </section>

      {/* MENU */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Our Popular Drinks
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-4 hover:scale-105 transition"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={300}
                  className="rounded-lg"
                />

                <h3 className="text-xl font-semibold mt-4">
                  {item.name}
                </h3>

                <p className="text-gray-600 mt-2">
                  ₹{item.price}
                </p>

              <button onClick={() => addToCart(item)}  className="mt-4 w-full bg-[#006241] text-white py-2 rounded-full">
                Order Now
              </button>

              </div>
            ))}

          </div>
        </div>
      </section>

    </main>
  );
}
