import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* ── React Compiler (stable in Next 16) ──────────────────────────
	 * Automatic memoization of components and hooks — removes the need
	 * for manual useMemo/useCallback/React.memo. Requires
	 * babel-plugin-react-compiler (installed as a devDependency).      */
	reactCompiler: true,

	/* ── Statically typed routes (stable) ────────────────────────────
	 * <Link href> and router.push() are type-checked against the
	 * actual app router file tree at build time.                       */
	typedRoutes: true,

	/* ── Cache Components / PPR — Next 16's headline feature ─────────
	 * Enables "use cache", cacheLife(), cacheTag() and makes Partial
	 * Prerendering the default rendering model. Intentionally OFF:
	 * @opennextjs/cloudflare does not support PPR yet. Flip this on
	 * once the adapter ships support.
	 *
	 * cacheComponents: true,                                           */

	/* ── Hygiene ─────────────────────────────────────────────────── */
	reactStrictMode: true,
	poweredByHeader: false,

	/* Serve AVIF (smaller) with WebP fallback from the image optimizer. */
	images: {
		formats: ["image/avif", "image/webp"],
	},

	/* Log the full URL of every fetch() in dev, with cache HIT/MISS. */
	logging: {
		fetches: {
			fullUrl: true,
		},
	},

	serverExternalPackages: ["bun:sqlite"],

	experimental: {
		serverActions: {
			allowedOrigins: ["localhost:3000", "127.0.0.1:3000", "*.github.dev", "*.app.github.dev"],
		},

		/* Turbopack persists compiler artifacts to disk between dev runs —
		 * dramatically faster cold starts after the first run.            */
		turbopackFileSystemCacheForDev: true,

		/* Forwards browser console.log/error output into the dev terminal,
		 * with source locations — no more tab switching.                  */
		browserDebugInfoInTerminal: true,

		/* React 19.2 <ViewTransition> component — animate elements across
		 * Transitions and router navigations.                             */
		viewTransition: true,

		/* Generates types for process.env.* keys from your .env files.    */
		typedEnv: true,
	},
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
