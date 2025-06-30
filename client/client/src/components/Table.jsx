// components/Table.jsx (can be reused for users/posts)
export default function Table({ headers = [], rows = [], actions }) {
    return (
        <table className="w-full border border-gray-300 rounded-md overflow-hidden">
            <thead className="bg-gray-200 text-left">
                <tr>
                    {headers.map((h, i) => (
                        <th key={i} className="p-3 border-b">{h}</th>
                    ))}
                    {actions && <th className="p-3 border-b">Actions</th>}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                        {headers.map((h, i) => (
                            <td key={i} className="p-3">{row[h.toLowerCase()]}</td>
                        ))}
                        {actions && (
                            <td className="p-3">
                                <button
                                    className="text-blue-600 hover:underline mr-2"
                                    onClick={() => actions.onEdit(row)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-600 hover:underline"
                                    onClick={() => actions.onDelete(row)}
                                >
                                    Delete
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
