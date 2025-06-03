'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link href="/" className="text-white font-bold text-lg">Kayra Case</Link>
      <div className="flex gap-4">
        {session && (
          <>
            <Link href="/dashboard" className="text-gray-200 hover:text-white">Dashboard</Link>
            <Link href="/profile" className="text-gray-200 hover:text-white">Profil</Link>
            {(() => {
              const role = session.user?.role;
              if (Array.isArray(role) ? role.includes("admin") : role === "admin") {
                return <Link href="/admin" className="text-gray-200 hover:text-white">Admin</Link>;
              }
              return null;
            })()}
            <button
              onClick={() => signOut()}
              className="text-red-400 hover:text-red-600 ml-2"
            >
              Çıkış Yap
            </button>
          </>
        )}
      </div>
    </nav>
  );
}