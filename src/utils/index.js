import { ethers } from "ethers";
import moment from "moment";
import { commify } from "ethers/lib/utils";

export const formatWeiToDecimal = (numberString) => {
  return ethers.utils.formatEther(numberString);
};

export const getETHBalance = async (provider, address) => {
  const balance = await provider.getBalance(address);
  const formattedValue = formatWeiToDecimal(balance);
  console.log(`ETH balance of address ${address}: ${formattedValue}`);
  return formattedValue;
};

export const getaTokenBalance = async (contract, address) => {
  const balance = await contract.getBalance(address);
  const formattedValue = formatWeiToDecimal(balance);
  console.log(`aToken balance of address ${address}: ${formattedValue}`);
  return formattedValue;
};

export const depositETH = async (contract, ethAmountInDecimal) => {
  const ethAmountInWei = ethers.utils.parseEther(ethAmountInDecimal);
  return await contract.stakeEth({ value: ethAmountInWei });
};

export const approveAllowance = async (tokenContract, address, amount) => {
  const ethAmountInWei = ethers.utils.parseEther(amount);
  return await tokenContract.approve(address, ethAmountInWei);
};

export const getAllowance = async (tokenContract, owner, spender) => {
  const allowance = await tokenContract.allowance(owner, spender);
  const formattedValue = formatWeiToDecimal(allowance);
  console.log(`Allowance of address ${spender}: ${formattedValue}`);
  return formattedValue;
};

export const withdrawETH = async (contract, ethAmountInDecimal) => {
  const ethAmountInWei = ethers.utils.parseEther(ethAmountInDecimal);
  return await contract.withdrawEth(ethAmountInWei, { gasLimit: 1000000 });
};

export const minifyAddress = (address, middleChars = 6, endChars = 4) => {
  if (!address) return "";
  if (address.substr(-4) == ".eth" && address.length < 20) return address;
  return `${address.substring(0, middleChars + 2)}...${address.substring(
    address.length - endChars
  )}`;
};

export const parseEventsData = (events) => {
  if (!events) return [];
  const newEvents = [...events];

  return newEvents
    .sort((a, b) => +b.data.timestamp - +a.data.timestamp)
    .map((event) => {
      return {
        amount: ethers.utils.formatEther(event.data.amount),
        action: event.type,
        timestamp: moment(event.block_timestamp).format(
          "MMM DD, YYYY | h:mm:ss A"
        ),
        txHash: event.transaction_hash,
      };
    });
};

export const getCommifyAmount = (amount) => {
  const value = amount.replace(/[^0-9.]/g, "");
  const wholePart = String(value).split(".")[0] || "";
  const commifiedWholePart = wholePart.length > 0 ? commify(wholePart) : "";
  const decimalPart = String(value).split(".")[1]?.slice(0, 18) || "";
  const dot = String(value).includes(".") ? "." : "";
  const commifiedValue = `${commifiedWholePart}${dot}${decimalPart}`;
  return commifiedValue;
};

export const getRectifiedAmount = (amount) => {
  const value = amount.replace(/[^0-9.]/g, "");
  const wholePart = String(value).split(".")[0] || "";
  const dot = String(value).includes(".") ? "." : "";
  const decimalPart = String(value).split(".")[1]?.slice(0, 18) || "";
  const rectifiedValue = `${wholePart}${dot}${decimalPart}`;
  return rectifiedValue;
};
