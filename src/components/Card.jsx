/* eslint-disable @next/next/no-img-element */
import { ethLogoUri } from "src/utils/constants";
import Button from "./Button";

const Card = ({
  title,
  amount,
  handleClick,
  buttonText,
  buttonDisabled = false,
}) => {
  return (
    <div className="flex flex-col p-10 shadow-custom bg-white">
      <div className="flex justify-start">
        <span className="text-24 font-500 text-base text-primary-1">
          {title}
        </span>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <img src={ethLogoUri} alt="ETH" width="20" height="20" />
          <span className="text-30 font-700 text-base text-primary-1">
            {amount}
          </span>
        </div>
        <div>
          <div>
            <Button
              text={buttonText}
              handleClick={handleClick}
              disabled={buttonDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
