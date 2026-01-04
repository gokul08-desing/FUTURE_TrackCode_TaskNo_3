"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);

    const totalPrice = storedCart.reduce(
      (sum: number, item: any) => sum + item.price,
      0
    );
    setTotal(totalPrice);
  }, []);

  const removeItem = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const newTotal = updatedCart.reduce(
      (sum: number, item: any) => sum + item.price,
      0
    );
    setTotal(newTotal);
  };

  return (
    <main className="min-h-screen bg-[#F7F7F7] p-10">
      <h1 className="text-4xl font-bold mb-6">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty ☕</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>

                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-xl font-bold">
            Total: ₹{total}
          </div>
        </>
        
      )}
      <a
  href="/checkout"
  className="inline-block mt-6 bg-[#006241] text-white px-6 py-3 rounded-full"
>
  Proceed to Checkout
</a>

    </main>
  );
}
