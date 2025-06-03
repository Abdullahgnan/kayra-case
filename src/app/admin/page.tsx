'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    } else if (status === "authenticated") {
      const role = session?.user?.role;
      if (
        !role ||
        (Array.isArray(role) ? !role.includes("admin") : role !== "admin")
      ) {
        router.replace("/unauthorized");
      }
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  if (!session) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Admin Paneli</h1>
        <p>Hoş geldin, <span className="font-semibold">{session.user?.name || session.user?.email}</span></p>
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
        <p className="mt-4 text-green-600 font-semibold">Yalnızca adminler bu sayfayı görebilir.</p>
      </div>
    </main>
  );
}