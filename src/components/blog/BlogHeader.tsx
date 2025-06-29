import Link from "next/link";

const BlogHeader = () => (
  <header className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between">
    <Link href="/" className="text-2xl font-bold text-blue-700">
      Space2Heaven Blog
    </Link>
    <nav className="space-x-4">
      <Link href="/blog" className="text-gray-700 hover:text-blue-600">Blog Home</Link>
      <Link href="/properties" className="text-gray-700 hover:text-blue-600">Properties</Link>
      <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
      <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
    </nav>
  </header>
);

export default BlogHeader;
