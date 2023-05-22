import { useEffect, useRef, useState, createContext, useContext } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { useEvmNativeBalance, useEvmContractEvents } from "@moralisweb3/next";
import { ethers } from "ethers";

import artifact from "src/utils/artifact.json";
import ERC20ABI from "src/utils/erc20.json";
import { getaTokenBalance, getStakeEthEvents } from "src/utils/index";
import { getEthPrice, getStakeEthEventFromBE } from "src/apis/index";
import { networkConfig } from "src/utils/constants";

const BaseContext = createContext();

export const BaseProvider = (props) => {
  // init states
  const [ethPrice, setethPrice] = useState(null);
  const [aTokenBalance, setaTokenBalance] = useState(null);
  const [wallet, setWallet] = useState({ accounts: [] });
  const [contractEvents, setContractEvents] = useState([]);
  const [eventsLoading, setEventsLoadnig] = useState(false);
  console.log({ contractEvents });

  // init refs
  let injectedProvider = useRef(false);

  // init derived states
  const address = wallet?.accounts?.[0];
  const isMetaMask = injectedProvider.current
    ? window.ethereum.isMetaMask
    : false;
  const provider = injectedProvider.current
    ? new ethers.providers.Web3Provider(window.ethereum)
    : null;
  const chainId = injectedProvider.current ? window?.ethereum?.chainId : null;

  // init contract instances
  const aavePocContract = new ethers.Contract(
    networkConfig.AAVE_POC_ADDRESS,
    artifact.abi,
    provider?.getSigner()
  );
  const aTokenContract = new ethers.Contract(
    networkConfig.ATOKEN_CONTRACT_ADDRESS,
    ERC20ABI,
    provider?.getSigner()
  );

  // init effects
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      injectedProvider.current = true;
    }

    const refreshAccounts = (accounts) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        setWallet({ accounts: [] });
      }
    };
    const handleChainChanged = (chainId) => {
      window.location.reload();
    };

    const getProvider = async () => {
      const detectedProvider = await detectEthereumProvider({ silent: true });
      if (detectedProvider) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        refreshAccounts(accounts);
        window.ethereum.on("accountsChanged", refreshAccounts);
        window.ethereum.on("chainChanged", handleChainChanged);
      }
    };
    const ethPrice = async () => {
      const res = await getEthPrice();
      setethPrice(res.data.ethereum.usd);
    };

    getProvider();
    ethPrice();
    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
    };
  }, []);

  useEffect(() => {
    if (address) {
      getTokenBalance();
      getStakeEthEvent(address);
    }
  }, [address]);

  // init functions
  const getStakeEthEvent = async (address) => {
    setEventsLoadnig(true);
    const res = await getStakeEthEventFromBE(address);
    const events = res?.data?.events?.filter(
      (event) => event?.data?.user === address
    );
    setContractEvents(events);
    setEventsLoadnig(false);
  };

  const getTokenBalance = async () => {
    const balance = await getaTokenBalance(aavePocContract, address);
    setaTokenBalance(balance);
  };

  const updateWallet = async (accounts) => {
    setWallet({ accounts });
  };

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    updateWallet(accounts);
  };

  const handleChainChange = async () => {
    if (chainId && chainId !== "0x5") {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
    }
  };

  // init hooks
  const { data: nativeBalance, fetch } = useEvmNativeBalance({
    address,
    chain: "0x5",
  });

  return (
    <BaseContext.Provider
      value={{
        walletAddress: address,
        handleConnect,
        isMetaMask,
        balance:
          address && nativeBalance?.balance.ether
            ? nativeBalance?.balance.ether
            : "0.0",
        provider,
        aavePocContract,
        aTokenBalance: address && aTokenBalance ? aTokenBalance : "0.0",
        ethPrice: ethPrice,
        aTokenContract,
        chainNotSupported: chainId && chainId !== "0x5",
        handleChainChange,
        contractEvents,
        eventsLoading,
        refetchBalance: fetch,
        refetchTokenBalance: getTokenBalance,
        refetchEvents: getStakeEthEvent,
      }}
    >
      {props.children}
    </BaseContext.Provider>
  );
};

export const useBaseContext = () => {
  const context = useContext(BaseContext);
  if (context === undefined) {
    throw new Error("useBaseContext must be used within a BaseProvider");
  }
  return context;
};
