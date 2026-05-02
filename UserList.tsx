"use client";

import { useState } from "react";
import { User } from "../types/user";

type Props = {
  users: User[];
  onRefresh: () => void;
};

export default function UserList({ users, onRefresh }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const deleteUser = async (id: number) => {
    await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    onRefresh();
  };

  const updateUser = async (id: number) => {
    await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name: editName }),
    });

    setEditingId(null);
    setEditName("");
    onRefresh();
  };

  return (
    <div className="space-y-3 mt-4">

      {users.map((u) => (
        <div
          key={u.id}
          className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
        >

          {/* DISPLAY MODE */}
          {editingId !== u.id && (
            <>
              <span className="font-medium">{u.name}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(u.id);
                    setEditName(u.name);
                  }}
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteUser(u.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                
              </div>
            </>
          )}

          {/* EDIT MODE */}
          {editingId === u.id && (
            <div className="flex w-full gap-2">
              <input
                className="flex-1 border px-2 py-1 rounded"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />

              {/* 🔥 UPDATE BUTTON CLAIR */}
              <button
                onClick={() => updateUser(u.id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Update
              </button>

              <button
                onClick={() => {
                  setEditingId(null);
                  setEditName("");
                }}
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          )}

        </div>
      ))}

    </div>
  );
}