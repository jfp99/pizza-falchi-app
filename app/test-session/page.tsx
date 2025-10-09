'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function TestSession() {
  const { data: session, status } = useSession();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [cookies, setCookies] = useState<string>('');

  useEffect(() => {
    // Fetch debug info from API
    fetch('/api/auth/debug')
      .then(res => res.json())
      .then(data => setDebugInfo(data))
      .catch(err => console.error(err));

    // Get cookies only on client side
    if (typeof window !== 'undefined') {
      setCookies(document.cookie || 'No cookies found');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Session Debug Page</h1>

        {/* Client-side Session */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Client-Side Session (useSession)</h2>
          <div className="space-y-2">
            <p><strong>Status:</strong> <span className={`px-3 py-1 rounded ${
              status === 'authenticated' ? 'bg-green-100 text-green-800' :
              status === 'loading' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>{status}</span></p>

            {session && (
              <>
                <p><strong>User ID:</strong> {session.user?.id || 'N/A'}</p>
                <p><strong>Email:</strong> {session.user?.email || 'N/A'}</p>
                <p><strong>Name:</strong> {session.user?.name || 'N/A'}</p>
                <p><strong>Role:</strong> {session.user?.role || 'N/A'}</p>
              </>
            )}

            <details className="mt-4">
              <summary className="cursor-pointer font-semibold">Raw Session Data</summary>
              <pre className="mt-2 bg-gray-50 p-4 rounded overflow-auto text-xs">
                {JSON.stringify(session, null, 2)}
              </pre>
            </details>
          </div>
        </div>

        {/* Server-side Session */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Server-Side Session (API)</h2>
          {debugInfo ? (
            <div className="space-y-2">
              <p><strong>Authenticated:</strong> <span className={`px-3 py-1 rounded ${
                debugInfo.authenticated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>{debugInfo.authenticated ? 'Yes' : 'No'}</span></p>

              {debugInfo.session && (
                <>
                  <p><strong>User ID:</strong> {debugInfo.session.user?.id || 'N/A'}</p>
                  <p><strong>Email:</strong> {debugInfo.session.user?.email || 'N/A'}</p>
                  <p><strong>Name:</strong> {debugInfo.session.user?.name || 'N/A'}</p>
                  <p><strong>Role:</strong> {debugInfo.session.user?.role || 'N/A'}</p>
                </>
              )}

              <details className="mt-4">
                <summary className="cursor-pointer font-semibold">Raw Debug Data</summary>
                <pre className="mt-2 bg-gray-50 p-4 rounded overflow-auto text-xs">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </details>
            </div>
          ) : (
            <p className="text-gray-600">Loading...</p>
          )}
        </div>

        {/* Cookies */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Browser Cookies</h2>
          <p className="text-sm text-gray-600 mb-2">Check for NextAuth session cookies:</p>
          <pre className="bg-gray-50 p-4 rounded overflow-auto text-xs">
            {cookies}
          </pre>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            <a
              href="/auth/signin"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Sign In
            </a>
            <a
              href="/admin"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Go to Admin
            </a>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
