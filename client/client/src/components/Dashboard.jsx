// components/Dashboard.jsx
import { useState } from 'react';
import Users from './Users';
import Posts from './Posts';
import Categories from './Categories';
import Logout from './Logout';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('users');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <Users />;
      case 'posts':
        return <Posts />;
      case 'categories':
        return <Categories />;
      default:
        return <Users />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-60 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        <ul>
          <li
            className={`mb-4 cursor-pointer ${activeTab === 'users' ? 'font-bold underline' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Manage Users
          </li>
          <li
            className={`mb-4 cursor-pointer ${activeTab === 'posts' ? 'font-bold underline' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Manage Posts
          </li>
          <li
            className={`mb-4 cursor-pointer ${activeTab === 'categories' ? 'font-bold underline' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            Manage Categories
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </nav>

      {/* Content area */}
      <main className="flex-1 p-6 bg-gray-50">{renderContent()}</main>
    </div>
  );
}
