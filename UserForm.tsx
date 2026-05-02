"use client";

import { useState } from "react";

type Props = {
  onRefresh: () => void;
};

export default function UserForm({ onRefresh }: Props) {
  const [name, setName] = useState("");

  const addUser = async () => {
    if (!name.trim()) return;

    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setName("");
    onRefresh();
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        style={{ padding: 8, marginRight: 8 }}
      />
      <button
      onClick={addUser}
      className="bg-blue-500 text-white px-10 py-2 rounded-lg hover:bg-blue-600 transition"
    >
      Add
    </button>
    </div>
  );
}