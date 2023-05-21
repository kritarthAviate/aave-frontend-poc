import Button from "./Button";

const Card = ({ title, amount, handleClick, buttonText }) => {
  return (
    <div className="flex flex-col p-40 shadow-custom w-1/2">
      <div className="flex justify-start">
        <span className="text-24 font-500 text-base text-primary-1">
          {title}
        </span>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center">
          <span className="text-30 font-700 text-base text-primary-1">
            {amount}
          </span>
        </div>
        <div>
          <div>
            <Button text={buttonText} handleClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
