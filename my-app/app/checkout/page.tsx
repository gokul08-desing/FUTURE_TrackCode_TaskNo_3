"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);

    const totalPrice = storedCart.reduce(
      (sum: number, item: any) => sum + (item.price || 0),
      0
    );
    setTotal(totalPrice);
  }, []);

  const placeOrder = () => {
    if (!name || !address) {
      alert("Please fill all details");
      return;
    }

    localStorage.removeItem("cart");
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F7F7F7]">
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h1 className="text-3xl font-bold mb-4">🎉 Order Placed!</h1>
          <p className="text-gray-600">
            Thank you for ordering from Starbucks ☕
          </p>
          <a
            href="/"
            className="inline-block mt-6 bg-[#006241] text-white px-6 py-2 rounded-full"
          >
            Back to Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F7] p-8">
      <h1 className="text-4xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* CUSTOMER INFO */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Your Details</h2>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-3 rounded mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Delivery Address"
            className="w-full border p-3 rounded mb-4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button
            onClick={placeOrder}
            className="w-full bg-[#006241] text-white py-3 rounded-full"
          >
            Place Order
          </button>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="text-xl font-bold">
            Total: ₹{total}
          </div>
        </div>

      </div>
    </main>
  );
}
