'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ProfileNavLinks = ({ href, children } : any ) => {
  const pathname = usePathname();
  const active = href === pathname;

  return (
    <Link
      href={href}
      className={`hover:bg-gray-900 p-2 rounded block text-lg ${
        active ? 'text-white font-semibold' : 'text-gray-500'
      }`}
    >
      {children}
    </Link>
  );
};

export default ProfileNavLinks;