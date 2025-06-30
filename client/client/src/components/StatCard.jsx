// components/StatCard.jsx
export default function StatCard({ title, value }) {
  return (
    <div className="bg-white p-5 shadow-md rounded border border-gray-200">
      <div className="text-gray-600">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </div>
  );
}
