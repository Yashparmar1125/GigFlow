import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  authorImage: string;
  date: string;
  image: string;
}

interface BlogCardProps {
  post: BlogPost;
}

// ==========================================
// Data Definitions
// ==========================================

const blogPosts = [
  {
    id: 1,
    title: 'Choose a Blogging Platform',
    excerpt: 'Select a blogging platform that suits your needs. WordPress, Blogger, and Medium options.',
    author: 'Aidan Funnell',
    authorImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80', // Replace with actual author image
    date: '25 Sep 2023',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', // Replace with actual blog image
  },
  {
    id: 2,
    title: 'Pick a Domain Name',
    excerpt: 'Choose a memorable and relevant domain name for your blog.',
    author: 'Aidan Funnell',
    authorImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80', // Replace with actual author image
    date: '30 Sep 2023',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', // Replace with actual blog image
  },
  {
    id: 3,
    title: 'Analyze and Improve',
    excerpt: 'Use analytics tools (e.g., Google Analytics) to track your blog\'s performance.',
    author: 'Aidan Funnell',
    authorImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80', // Replace with actual author image
    date: '06 Oct 2023',
    image: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', // Replace with actual blog image
  },
];

// ==========================================
// Reusable Component
// ==========================================

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link to="#" className="block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      {/* Blog Image */}
      <div className="overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6">
        {/* Author & Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-purple-200 transition-all duration-300"
            />
            <span className="text-sm font-medium text-gray-700">{post.author}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
             {/* Calendar Icon */}
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
            </svg>
            <span className="">{post.date}</span>
          </div>
        </div>

        {/* Title & Excerpt */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
};

// ==========================================
// Main Section Component
// ==========================================

const BlogSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Our Blog
          </h2>
          <p className="text-gray-600 text-lg">
            Freelancing refers to working as an independent contractor
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;