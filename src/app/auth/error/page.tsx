export default function AuthErrorPage() {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Bir hata oluştu</h1>
          <p>Kimlik doğrulama sırasında bir hata meydana geldi. Lütfen tekrar deneyin.</p>
        </div>
      </main>
    );
  }