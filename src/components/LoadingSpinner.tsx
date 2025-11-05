'use client';

import Image from 'next/image';

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex items-center p-4 rounded-lg bg-transparent shadow-none">
        <Image
          src="https://i.ibb.co/0yBYM9HS/bola.png"
          alt="Loading Spinner"
          width={60}
          height={60}
          className="animate-spin"
        />
        <p className="ml-3 text-lg font-semibold text-white">Aguarde ...</p>
      </div>
    </div>
  );
}
