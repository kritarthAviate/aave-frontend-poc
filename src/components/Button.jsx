const Button = ({ text, handleClick, disabled = false, loading = false }) => {
  return (
    <div
      onClick={handleClick}
      className={`py-15 flex items-center justify-center rounded-md bg-gradient-to-b from-pink to-teal px-40 text-secondary-2  ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <span className="text-center text-white">{text}</span>
    </div>
  );
};

export default Button;
