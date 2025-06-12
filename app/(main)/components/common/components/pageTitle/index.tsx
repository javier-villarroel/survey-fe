'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { getPageTitle } from '../../lib/metadata';

const PageTitle = () => {
  const pathname = usePathname();

  useEffect(() => {
    const title = getPageTitle(pathname);
    document.title = title;
  }, [pathname]);

  return null;
};

export default PageTitle; 