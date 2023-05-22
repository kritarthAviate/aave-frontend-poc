/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useBaseContext } from "src/context/BaseContext";
import {
  depositETH,
  getCommifyAmount,
  getRectifiedAmount,
} from "src/utils/index";
import { ethLogoUri } from "src/utils/constants";
import Button from "./Button";

const SupplyModal = ({ setShowModal }) => {
  const {
    balance,
    ethPrice,
    aavePocContract,
    refetchBalance,
    walletAddress,
    refetchTokenBalance,
    refetchEvents,
  } = useBaseContext();
  const [amount, setAmount] = React.useState("");
  const [usdValue, setUsdValue] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const isDisabled = +amount > +balance;

  const handleAmountChange = (e) => {
    const rectifiedAmount = getRectifiedAmount(e.target.value);
    setAmount(rectifiedAmount);
    if (ethPrice) {
      setUsdValue((rectifiedAmount * ethPrice).toFixed(2));
    }
  };
  const handleMaxClick = () => {
    const rectifiedAmount = getRectifiedAmount(balance);
    setAmount(rectifiedAmount);
  };

  const handleDeposit = async () => {
    setLoading(true);
    const rectifiedAmount = getRectifiedAmount(amount);
    const res = await depositETH(aavePocContract, rectifiedAmount);
    await res.wait();
    await refetchBalance({ address: walletAddress });
    await refetchTokenBalance();
    await refetchEvents(walletAddress);
    setLoading(false);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col p-10 shadow-custom w-[500px] bg-white">
      <div>
        <span className="text-600 text-24 text-primary-1">Supply ETH</span>
      </div>
      <div className="rounded-md border border-solid border-secondary-3 px-4 py-2 mt-10">
        <div className="flex items-center justify-between">
          <input
            type="text"
            className="text-400 text-20 text-primary-1 outline-none"
            value={getCommifyAmount(amount)}
            placeholder="0.00"
            onChange={handleAmountChange}
          />
          <img src={ethLogoUri} alt="ETH" width="20" height="20" />
        </div>

        <div className="flex items-center justify-between">
          <span type="text" className="text-400 text-14 text-secondary-2">
            ${usdValue || "--"}
          </span>
          <div className="flex items-center space-x-1">
            <span type="text" className="text-500 text-14 text-secondary-1">
              {`Wallet balance ${balance}`}{" "}
            </span>
            <span
              type="text"
              className="text-700 text-14 text-primary-1 cursor-pointer"
              onClick={handleMaxClick}
            >
              MAX
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-5 mt-20">
        <Button
          text={
            !amount
              ? "Enter amount"
              : isDisabled
              ? "Insufficient Balance"
              : "Supply ETH"
          }
          disabled={isDisabled || !amount || loading}
          handleClick={handleDeposit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default SupplyModal;
