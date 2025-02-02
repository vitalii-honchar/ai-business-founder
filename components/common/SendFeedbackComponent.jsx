import Link from 'next/link';

const SendFeedbackComponent = () => {
  return (
    <div className="text-center text-sm">
      <Link 
        href="https://forms.gle/8ENaz7dhUGqUSN688" 
        target="_blank"
        className="text-blue-600 hover:text-blue-800 transition-colors"
      >
        Send feedback
      </Link>
    </div>
  );
};

export default SendFeedbackComponent;
