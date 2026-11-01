// src/components/sections/Blog/Blog.jsx
import React, { useState, useEffect } from 'react';
import { CalendarClock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BlogCard from './BlogCard';

const formatDay = (d) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/posts.json')
      .then((r) => r.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const published = posts
    .filter((p) => !p.upcoming)
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  const upcoming = posts
    .filter((p) => p.upcoming)
    .sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">Blogs</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Stories from my journey: research, leadership, work, and life.
          </p>
        </div>

        {loading && <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>}

        {published.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {published.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onClick={() => navigate(`/blog/${post.slug}`, { state: { post } })}
              />
            ))}
          </div>
        )}

        {upcoming.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <CalendarClock className="w-6 h-6 mr-2 text-blue-600" />
              Coming Soon
            </h2>
            <ol className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 space-y-8">
              {upcoming.map((post) => (
                <li key={post.id} className="pl-6 relative">
                  <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-2 border-blue-500" />
                  <div className="flex flex-wrap items-center gap-2 text-xs mb-1">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      Publishing {formatDay(post.publishDate)}
                    </span>
                    {post.categories?.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{post.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{post.storyDate}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{post.excerpt}</p>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </div>
  );
};

export default Blog;
