/**
 * An array of routes that are public and do not require authentication.
 * @type {string[]}
 * */
export const publicRoutes: string[] = ["/", "/auth/verify-email"];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged-in users to the /settings page.
 * @type {string[]}
 * */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/reset-password",
];

/**
 * The prefix for all API authentication routes.
 * @type {string}
 * */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after a successful login.
 * @type {string}
 * */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings";
