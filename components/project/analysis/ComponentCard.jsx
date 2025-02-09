export default function ComponentCard({ title, icon, loading, children }) {
    return (
        <div className={`
            w-full max-w-7xl mx-auto 
            bg-white 
            p-2 sm:p-6 
            rounded-lg 
            shadow-sm sm:shadow 
            ${loading ? 'animate-pulse' : ''}
        `}>
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 flex items-center gap-2">
                <span className="text-xl sm:text-2xl">{icon}</span>
                <span>{title}</span>
            </h2>
            {loading ? (
                <div className="h-24 sm:h-32 bg-gray-200 rounded animate-pulse"></div>
            ) : children}
        </div>
    );
}
