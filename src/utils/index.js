var ethers = require("ethers");
import artifact from "./artifact.json";

const url =
  "https://lingering-cosmopolitan-orb.ethereum-goerli.discover.quiknode.pro/56537c668da215497b3a273fc6870ac6298619a7/"; // Quick node
const privateKey = "";
const contractAddress = "0xb23133a15e198081F52133F9e001bD3149A3CdA4";

const provider = new ethers.providers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(contractAddress, artifact.abi, wallet);
const user = "0xa234bF5AcC3B150907704ce26D855A5638dEF890";

async function main() {
  const formatWeiToDecimal = (numberString) => {
    return ethers.utils.formatEther(numberString);
  };

  const getETHBalance = async (provider, address) => {
    const balance = await provider.getBalance(address);
    const formattedValue = formatWeiToDecimal(balance);
    console.log(`ETH balance of address ${address}: ${formattedValue}`);
    return formattedValue;
  };

  const getaTokenBalance = async (contract, address) => {
    const balance = await contract.getBalance(address);
    const formattedValue = formatWeiToDecimal(balance);
    console.log(`aToken balance of address ${address}: ${formattedValue}`);
    return formattedValue;
  };

  const depoistETH = async (contract, ethAmountInDecimal) => {
    const ethAmountInWei = ethers.utils.parseEther(ethAmountInDecimal);
    await contract.stakeEth({ value: ethAmountInWei });
  };

  const approveAllowance = async (contract) => {
    await contract.allowance();
  };

  const withdrawETH = async (contract, ethAmountInDecimal) => {
    const ethAmountInWei = ethers.utils.parseEther(ethAmountInDecimal);
    await contract.withdrawEth(ethAmountInWei, { gasLimit: 1000 });
  }; // await getETHBalance(provider, user); // await approveAllowance(contract); // await withdrawETH(contract, "0.05"); // await getETHBalance(provider, user);
}

main();
