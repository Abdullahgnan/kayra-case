'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  if (!session) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Profil</h1>
        <p><span className="font-semibold">Ad:</span> {session.user?.name}</p>
        <p><span className="font-semibold">E-posta:</span> {session.user?.email}</p>
        <p className="mt-2 text-sm text-gray-500">
          Rol: <span className="font-mono">
            {(() => {
              const role = session.user?.role;
              if (!role) return "user";
              if (Array.isArray(role)) return role.join(', ');
              if (typeof role === "string") return role;
              return String(role);
            })()}
          </span>
        </p>
      </div>
    </main>
  );
}