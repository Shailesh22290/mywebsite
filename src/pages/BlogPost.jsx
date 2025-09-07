// src/pages/BlogPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, User, Eye, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BlogPost = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      setError(null);

      try {
        // First, try to get post from navigation state (when clicked from blog list)
        if (location.state && location.state.post) {
          console.log('Loading post from navigation state');
          setPost(location.state.post);
          await loadRelatedPosts(location.state.post);
          setLoading(false);
          return;
        }

        // If no state, load from JSON file and find the post
        console.log('Loading post from JSON file for slug:', slug);
        const response = await fetch('/posts.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.posts && Array.isArray(data.posts)) {
          const foundPost = data.posts.find(p => p.slug === slug);
          
          if (!foundPost) {
            throw new Error('Post not found');
          }
          
          setPost(foundPost);
          await loadRelatedPosts(foundPost, data.posts);
        } else {
          throw new Error('Invalid JSON structure');
        }

      } catch (error) {
        console.error('Error loading blog post:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug, location.state]);

  const loadRelatedPosts = async (currentPost, allPosts = null) => {
    try {
      let posts = allPosts;
      
      if (!posts) {
        const response = await fetch('/posts.json');
        if (response.ok) {
          const data = await response.json();
          posts = data.posts || [];
        }
      }

      if (posts) {
        // Find related posts based on categories and tags
        const related = posts
          .filter(p => p.id !== currentPost.id)
          .filter(p => {
            const hasSharedCategory = p.categories?.some(cat => 
              currentPost.categories?.includes(cat)
            );
            const hasSharedTag = p.tags?.some(tag => 
              currentPost.tags?.includes(tag)
            );
            return hasSharedCategory || hasSharedTag;
          })
          .slice(0, 3);
        
        setRelatedPosts(related);
      }
    } catch (error) {
      console.error('Error loading related posts:', error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleRelatedPostClick = (relatedPost) => {
    navigate(`/blog/${relatedPost.slug}`, { state: { post: relatedPost } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {error}
            </p>
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        {/* Article Header */}
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="px-8 py-12">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime || '5 min read'}
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {post.author}
              </div>
              {/* <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {post.views} views
              </div> */}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>

            {/* Categories and Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories?.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors mb-8"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={tomorrow}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => handleRelatedPostClick(relatedPost)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                    <span>{new Date(relatedPost.publishDate).toLocaleDateString()}</span>
                    <span>{relatedPost.readTime || '5 min read'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;