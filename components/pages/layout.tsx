import { ReactNode } from 'react';
import Link from 'next/link';
import { SITE_TITLE } from '../../lib/constants';

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <header className="text-center bg-sky-600 h-30 w-full">
        <Link href="/">
          <h1 className="text-white text-3xl mt-0 py-8">{SITE_TITLE}</h1>
        </Link>
      </header>
      <div className="mx-auto">
        {children}
      </div>
    </>
  );
}
