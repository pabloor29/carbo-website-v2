import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run on all pathnames except: API routes, Next internals, and any file with
  // an extension (sitemap.xml, robots.txt, images, etc.).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
