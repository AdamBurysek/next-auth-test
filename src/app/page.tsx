"use client";

import { signOut } from "next-auth/react";

export default function Home() {
  const handleLogout = async () => {
    await signOut({ redirect: false });
  };

  return (
    <div className="">
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Odhlásit se
      </button>
    </div>
  );
}
