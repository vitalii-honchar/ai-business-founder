const InfoMessageComponent = ({ message, className }) => {
  if (!message) return null;
  
  return (
    <div className={`${className} text-blue-700 bg-blue-50 border-l-4 border-blue-500 p-4 rounded`}>
      {decodeURIComponent(message)}
    </div>
  );
};

export default InfoMessageComponent;
