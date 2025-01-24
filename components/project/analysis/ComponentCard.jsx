export default function ComponentCard({ title, icon, loading, children }) {
    return (
        <div className={`w-full max-w-7xl mx-auto bg-white p-6 rounded-lg shadow ${loading ? 'animate-pulse' : ''}`}>
            <h2 className="text-xl font-bold mb-4">{icon} {title}</h2>
            {loading ? (
                <div className="h-32 bg-gray-200 rounded"></div>
            ) : children}
        </div>
    );
}
