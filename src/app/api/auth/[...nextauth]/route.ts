export const maxDuration = 50;

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { API_ENDPOINTS, getFullEndpointUrl } from "@/services/api/config";
import jwt from 'jsonwebtoken';

// Helper function to set auth cookies
async function setAuthCookies(token: string, userId?: string) {
  const cookieStore = await cookies();
  // Set HTTP-only cookie for server-side use
  cookieStore.set("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
  });

  // Set client-accessible cookie for API calls
  cookieStore.set("clientAuthToken", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  // Set user ID cookie if available
  if (userId) {
    cookieStore.set("userId2", userId, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  }
}

async function handleGoogleLogin(token: string) {
  try {
    const response = await fetch(
      getFullEndpointUrl(API_ENDPOINTS.AUTH.GOOGLE_LOGIN),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      const errorData = await response.json();
      console.error("API error details:", errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Set auth cookies if login successful
    if (data && data.token) {
      setAuthCookies(data.token, data.user?._id);
    }

    return data;
  } catch (error) {
    console.error("Error in Google login:", error);
    throw error;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("No credentials provided for CredentialsProvider.");
          return null;
        }

        try {
          const response = await fetch(
            getFullEndpointUrl(API_ENDPOINTS.AUTH.LOGIN),
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!response.ok) {
            console.error(
              "Credentials login API response not OK.",
              response.status
            );
            return null;
          }

          const data = await response.json();

          if (data && data.success && data.data) {
            // Set auth cookies
            setAuthCookies(data.data.token, data.data.user?._id);

            // Return user data for NextAuth session
            return {
              id: data.data.user?._id || "",
              email: data.data.user?.email || "",
              name: data.data.user?.name || "",
              token: data.data.token || "",
            };
          }
          return null;
        } catch (error) {
          console.error("Authentication error in CredentialsProvider:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account }) {
      // Handle Google sign-in
      if (account?.provider === "google" && account?.id_token) {
        try {
          // Send the Google token to our backend
          const apiResponse = await handleGoogleLogin(account.id_token);

          if (apiResponse && apiResponse.data && apiResponse.data.token) {
            // Store user ID for profile fetching
            user.id = apiResponse.data._id;
            // If your backend returns a token, set it here
            if (apiResponse.success && apiResponse.data.token) {
              await setAuthCookies(apiResponse.data.token, user.id);
            }
          }

          return true;
        } catch (error) {
          console.error(
            "Google authentication error in signIn callback:",
            error
          );
          // Still allow sign in even if our API fails
          return true;
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      // If the user object is present (meaning a new sign-in or session update),
      // add user ID and access token to the JWT token.
      if (user) {
        token.userId = user.id;
        if (user.token) {
          token.accessToken = user.token;
        }
      }

      // If it's a Google sign-in, add the Google token to the JWT token.
      if (account?.provider === "google" && account?.id_token) {
        token.googleToken = account.id_token;
      }

      // If the token is not yet populated (e.g., on subsequent requests after initial sign-in),
      // try to read it from the 'authToken' cookie.
      if (!token.accessToken) {
        const cookieStore = await cookies();
        const authTokenCookie = cookieStore.get("authToken")?.value;

        if (authTokenCookie && process.env.NEXTAUTH_SECRET) {
          try {
            const decoded = jwt.verify(authTokenCookie, process.env.NEXTAUTH_SECRET) as {
              id: string;
              email: string;
            };
            token.userId = decoded.id;
            token.email = decoded.email;
            token.accessToken = authTokenCookie;
          } catch (error) {
            console.error("Error decoding authToken from cookie:", error);
          }
        }
      }

      return token;
    },

    async session({ session, token }) {
      // Add user ID to the session
      if (token.userId) {
        session.user.id = token.userId as string;
      }

      // Add the access token to the session
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
