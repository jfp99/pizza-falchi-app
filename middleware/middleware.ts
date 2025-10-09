import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Gérer les redirections d'authentification
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Pages admin nécessitent un rôle admin
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.role === 'admin';
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*', '/checkout/:path*']
};