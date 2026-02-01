"use client";

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;

  if (!userId) redirect("/");

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
