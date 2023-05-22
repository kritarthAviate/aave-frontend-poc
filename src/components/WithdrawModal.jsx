/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";

import { useBaseContext } from "src/context/BaseContext";
import {
  approveAllowance,
  getAllowance,
  withdrawETH,
  getCommifyAmount,
  getRectifiedAmount,
} from "src/utils";
import { ethLogoUri, networkConfig } from "src/utils/constants";
import Button from "./Button";

const WithdrawModal = () => {
  const {
    aTokenBalance,
    ethPrice,
    aavePocContract,
    aTokenContract,
    walletAddress,
    refetchBalance,
    refetchTokenBalance,
    refetchEvents,
  } = useBaseContext();

  const [tokenAllowance, setTokenAllowance] = React.useState(null);
  const [amount, setAmount] = React.useState("");
  const [usdValue, setUsdValue] = React.useState(null);
  const [approveLoading, setApproveLoading] = React.useState(false);
  const [withdrawLoading, setWithdrawLoading] = React.useState(false);

  const getTAllowance = async () => {
    const allowance = await getAllowance(
      aTokenContract,
      walletAddress,
      networkConfig.AAVE_POC_ADDRESS
    );
    setTokenAllowance(allowance);
  };

  useEffect(() => {
    getTAllowance();
  }, []);

  const withDrawDisabled =
    +amount > +tokenAllowance ||
    +amount > +aTokenBalance ||
    +amount === 0 ||
    withdrawLoading ||
    approveLoading;
  const approveDisabled =
    +amount <= +tokenAllowance ||
    +amount > +aTokenBalance ||
    +amount === 0 ||
    approveLoading ||
    withdrawLoading;

  const handleApprove = async () => {
    setApproveLoading(true);
    const res = await approveAllowance(
      aTokenContract,
      networkConfig.AAVE_POC_ADDRESS,
      amount
    );
    await res.wait();
    await getTAllowance();
    setApproveLoading(false);
  };

  const handleWithdraw = async () => {
    setWithdrawLoading(true);
    const rectifiedAmount = getRectifiedAmount(amount);
    const res = await withdrawETH(aavePocContract, rectifiedAmount);
    await res.wait();
    await refetchBalance({ address: walletAddress });
    await refetchTokenBalance();
    await refetchEvents(walletAddress);
    setWithdrawLoading(false);
  };

  const handleAmountChange = (e) => {
    const rectifiedAmount = getRectifiedAmount(e.target.value);
    setAmount(rectifiedAmount);
    if (ethPrice) {
      setUsdValue((rectifiedAmount * ethPrice).toFixed(2));
    }
  };
  const handleMaxClick = () => {
    const rectifiedAmount = getRectifiedAmount(aTokenBalance);
    setAmount(rectifiedAmount);
  };
  return (
    <div className="flex flex-col p-10 shadow-custom w-[500px] bg-white">
      <div>
        <span className="text-600 text-24 text-primary-1">Withdraw ETH</span>
      </div>
      <div className="rounded-md border border-solid border-secondary-3 px-4 py-2 mt-10">
        <div className="flex items-center justify-between">
          <input
            type="text"
            className={`text-400 text-20 text-primary-1 outline-none`}
            value={getCommifyAmount(amount)}
            placeholder="0.00"
            onChange={handleAmountChange}
          />
          <div>
            <img src={ethLogoUri} alt="ETH" width="20" height="20" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span type="text" className="text-400 text-14 text-secondary-2">
            ${usdValue || "--"}
          </span>
          <div className="flex items-center space-x-1">
            <span type="text" className="text-500 text-14 text-secondary-1">
              {`Supply balance: ${aTokenBalance}`}
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
          text={"Approve"}
          disabled={approveDisabled}
          handleClick={handleApprove}
          loading={approveLoading}
        />
        <Button
          text={+amount > +aTokenBalance ? "Insufficient Balance" : "Withdraw"}
          loading={withdrawLoading}
          disabled={withDrawDisabled}
          handleClick={handleWithdraw}
        />
      </div>
    </div>
  );
};

export default WithdrawModal;
