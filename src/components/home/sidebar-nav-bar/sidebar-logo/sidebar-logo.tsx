'use client';

import Image from 'next/image';

export function SidebarLogo() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      <Image
        src="https://i.ibb.co/WWx6qgWF/cbf.png"
        width={40}
        height={40}
        alt="CBF Logo"
        className="shrink-0 rounded-full"
      />
      <h1 className="text-xl font-bold text-foreground truncate">CBF Manager</h1>
    </div>
  );
}
