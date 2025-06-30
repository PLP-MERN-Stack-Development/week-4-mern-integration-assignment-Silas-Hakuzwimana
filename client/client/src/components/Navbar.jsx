// components/Navbar.jsx
export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <div className="space-x-4">
        <a href="/" className="hover:underline">Dashboard</a>
        <a href="/users" className="hover:underline">Users</a>
        <a href="/posts" className="hover:underline">Posts</a>
        <a href="/categories" className="hover:underline">Categories</a>
      </div>
    </nav>
  );
}
