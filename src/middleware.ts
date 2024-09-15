import createMiddleware from 'next-intl/middleware';

import { locales, localePrefix, pathnames } from './navigation';


export default createMiddleware({
  defaultLocale: 'uz',
  localePrefix,
  locales,
  pathnames
});


export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ru|en|uz|tr)/:path*']
};