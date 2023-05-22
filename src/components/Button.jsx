const Button = ({ text, handleClick, disabled = false, loading = false }) => {
  const handleButtonClick = () => {
    if (disabled) return;
    handleClick();
  };
  return (
    <div
      onClick={handleButtonClick}
      className={`py-3.5 flex items-center justify-center rounded-md bg-gradient-to-b from-pink to-teal px-10 text-secondary-2  ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <span className="text-center text-white">
        {loading ? "loading..." : text}
      </span>
    </div>
  );
};

export default Button;
