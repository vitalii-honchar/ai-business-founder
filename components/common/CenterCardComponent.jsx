const sizeClasses = {
  default: 'max-w-md',
  xl: 'max-w-5xl'
};

const CenterCardComponent = ({ children, size = 'default' }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className={`${sizeClasses[size]} w-full mx-auto`}>
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CenterCardComponent;
