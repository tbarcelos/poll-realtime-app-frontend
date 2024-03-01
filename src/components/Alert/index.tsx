const Alert: React.FC<any> = ({ children }) => (
  <div
    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 bg-gray-800 text-red-400"
    role="alert"
  >
    {children}
  </div>
);
export default Alert;
