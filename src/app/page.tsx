'use client';

import { useSession, signIn, signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Kayra Case Auth</h1>
        {!session ? (
          <>
            <p className="mb-4">Giriş yapmak için aşağıdaki butona tıkla:</p>
            <button
              onClick={() => signIn("auth0")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Auth0 ile Giriş Yap
            </button>
          </>
        ) : (
          <>
            <p className="mb-2">Hoş geldin, <span className="font-semibold">{session.user?.name || session.user?.email}</span></p>
            <p className="mb-2 text-sm text-gray-500">
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
            
            <button
              onClick={() => signOut()}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Çıkış Yap
            </button>
          </>
        )}
      </div>
    </main>
  );
}