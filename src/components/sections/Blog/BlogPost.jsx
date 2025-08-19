import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Share2, BookOpen, Heart, MessageCircle } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    // Simulate loading blog post data
    const loadPost = async () => {
      setLoading(true);
      // This would normally fetch from your CMS or API
      const mockPost = {
        id: 1,
        title: "The Future of AI in Research: Opportunities and Challenges",
        slug: "future-ai-research",
        excerpt: "Exploring how artificial intelligence is transforming research methodologies and what it means for the future of scientific discovery.",
        content: `
          <div class="prose max-w-none">
            <p>Artificial Intelligence has emerged as a transformative force in research across multiple domains. From automating data analysis to generating novel hypotheses, AI is reshaping how we approach scientific inquiry.</p>
            
            <h2>The Current Landscape</h2>
            <p>Today's research environment is characterized by unprecedented data volumes and computational capabilities. Machine learning algorithms can process vast datasets in ways that were previously impossible, revealing patterns and insights that human researchers might miss.</p>
            
            <h3>Key Applications</h3>
            <ul>
              <li><strong>Literature Review Automation:</strong> AI can scan thousands of papers and identify relevant research trends</li>
              <li><strong>Hypothesis Generation:</strong> Machine learning models can suggest novel research directions based on existing data</li>
              <li><strong>Experimental Design:</strong> AI can optimize experimental parameters and predict outcomes</li>
              <li><strong>Data Analysis:</strong> Advanced algorithms can identify subtle patterns in complex datasets</li>
            </ul>
            
            <h2>Challenges and Considerations</h2>
            <p>While AI offers tremendous potential, it also presents significant challenges that researchers must navigate carefully.</p>
            
            <blockquote class="border-l-4 border-blue-500 pl-4 italic">
              "The integration of AI in research is not about replacing human creativity and insight, but about augmenting our capabilities to tackle increasingly complex problems."
            </blockquote>
            
            <h3>Ethical Implications</h3>
            <p>As AI becomes more prevalent in research, we must consider the ethical implications of algorithmic decision-making in scientific contexts. Questions of bias, transparency, and accountability become paramount.</p>
            
            <h2>Looking Forward</h2>
            <p>The future of AI in research is bright, but it requires careful consideration of how we integrate these powerful tools into our scientific workflows. Success will depend on maintaining the human element while leveraging AI's computational advantages.</p>
            
            <p>As we continue to develop and refine AI technologies, the research community must work together to establish best practices and ethical guidelines that ensure these tools serve the greater good of scientific discovery.</p>
          </div>
        `,
        author: "Dr. Research Scholar",
        date: "2024-03-15",
        category: "Technology",
        tags: ["AI", "Research", "Machine Learning", "Future"],
        readingTime: 8,
        likes: 42,
        comments: 12,
        image: "/assets/images/blog/ai-research.jpg"
      };
      
      setPost(mockPost);
      setLikes(mockPost.likes);
      setReadingTime(mockPost.readingTime);
      setLoading(false);
    };

    loadPost();
  }, [slug]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/blog')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </button>

          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                {readingTime} min read
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {post.comments} comments
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isLiked
                  ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              {likes}
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Comments Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Comments ({post.comments})
          </h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Comments functionality would be implemented here with a commenting system like Disqus or a custom solution.
            </p>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Related Posts
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Mock related posts */}
            {[1, 2].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Related Post Title {i}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  Brief excerpt of the related post content goes here...
                </p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  March {10 + i}, 2024
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;