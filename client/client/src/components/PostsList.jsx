import { useState, useEffect } from 'react';
import API from '../services/API';
import AddPost from './AddPost';
import EditPost from './EditPost';

export default function PostsList() {
    const [posts, setPosts] = useState([]);
    const [adding, setAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const fetchPosts = async () => {
        try {
            const res = await API.get('/posts');
            setPosts(res.data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const reloadPosts = () => {
        fetchPosts();
        setAdding(false);
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;
        try {
            await API.delete(`/posts/${id}`);
            reloadPosts();
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Posts Management</h2>

            <button
                className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => setAdding(true)}
            >
                Add Post
            </button>

            {adding && <AddPost onSuccess={reloadPosts} onCancel={() => setAdding(false)} />}
            {editingId && (
                <EditPost id={editingId} onSuccess={reloadPosts} onCancel={() => setEditingId(null)} />
            )}

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center py-4">
                                No posts found.
                            </td>
                        </tr>
                    )}
                    {posts.map((post) => (
                        <tr key={post._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{post.title}</td>
                            <td className="border border-gray-300 px-4 py-2">{post.category?.name || 'Uncategorized'}</td>
                            
                            <td className="border border-gray-300 px-4 py-2">{post.author?.name || 'Unknown'}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                                <button
                                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    onClick={() => setEditingId(post._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                    onClick={() => handleDelete(post._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
