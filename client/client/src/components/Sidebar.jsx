// components/Sidebar.jsx
export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 min-h-screen p-4 space-y-4 border-r">
      <div className="font-bold text-lg mb-2">Menu</div>
      <a href="/" className="block hover:text-blue-500">Dashboard</a>
      <a href="/users" className="block hover:text-blue-500">Users</a>
      <a href="/posts" className="block hover:text-blue-500">Posts</a>
      <a href="/categories" className="block hover:text-blue-500">Categories</a>
    </aside>
  );
}
