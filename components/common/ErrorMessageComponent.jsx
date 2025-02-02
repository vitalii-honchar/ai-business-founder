const ErrorMessageComponent = ({ message }) => {
  if (!message) return null;

  return (
    <div className="text-red-700 bg-red-50 border-l-4 border-red-500 p-4 rounded">
      {decodeURIComponent(message)}
    </div>
  );
};

export default ErrorMessageComponent;
