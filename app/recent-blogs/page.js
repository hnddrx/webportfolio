'use client';

import { useEffect, useState } from 'react';

export default function RecentBlogsPage() {
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('recentBlogs');
      if (stored) {
        setRecentBlogs(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load recent blogs:', err);
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📰 Recently Viewed Blogs</h1>
      {recentBlogs.length === 0 ? (
        <p className="text-gray-500">No blogs viewed yet.</p>
      ) : (
        <ul className="space-y-3">
          {recentBlogs.map((blog, index) => (
            <li key={index} className="border p-4 rounded-lg shadow">
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline"
              >
                {blog.title}
              </a>
              <p className="text-sm text-gray-500">
                Viewed on {new Date(blog.viewedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
