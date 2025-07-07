import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-white">
        <div className="bg-black bg-opacity-85 p-8 rounded-lg text-center">
      <h1 className="text-6xl font-extrabold text-yellow-400 mb-4">
        404 - Pagina nu a fost găsită
      </h1>
      <p className="text-gray-400 mb-8">Oops, vibe-ul tău s-a pierdut... Înapoi la ritm!</p>
      <Link href="/">
        <p className="cta-primary">Înapoi acasă</p>
      </Link>
    </div>
    </div>
  );
}
