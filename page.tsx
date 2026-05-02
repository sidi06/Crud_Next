"use client";

import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { User } from "./types/user";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = () => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    
    <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">

      <h1 className="text-2xl font-bold text-center mb-4">
        CRUD USERS
      </h1>

      <UserForm onRefresh={fetchUsers} />

      <UserList users={users} onRefresh={fetchUsers} />

    </div>

  </div>
);
}








