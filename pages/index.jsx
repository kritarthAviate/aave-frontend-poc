import { useEvmNativeBalance } from "@moralisweb3/next";
import { useEffect, useRef, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Card from "../src/components/Card";
import Table from "../src/components/Table";
import Button from "../src/components/Button";
import Modal from "../src/components/Modal";

function HomePage() {
  const [hasProvider, setHasProvider] = useState(false);
  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);
  const address = wallet?.accounts?.[0];
  let injectedProvider = useRef(false);
  const isMetaMask = injectedProvider.current
    ? window.ethereum.isMetaMask
    : false;
  const chainId = injectedProvider.current ? window?.ethereum?.chainId : null;
  // console.log({ isMetaMask, hasProvider, wallet, chainId });

  useEffect(() => {
    // window is accessible here.
    if (typeof window.ethereum !== "undefined") {
      injectedProvider.current = true;
    }

    const refreshAccounts = (accounts) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        // if length 0, user is disconnected
        setWallet(initialState);
      }
    };
    function handleChainChanged(chainId) {
      // We recommend reloading the page, unless you must do otherwise.
      window.location.reload();
    }

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider)); // transform provider to true or false

      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        refreshAccounts(accounts);
        window.ethereum.on("accountsChanged", refreshAccounts);
        window.ethereum.on("chainChanged", handleChainChanged);
      }
    };

    getProvider();
    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
    };
  }, []);

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
    console.log({ chainId });
  };

  // get balance of native token on current chain
  const { data: nativeBalance } = useEvmNativeBalance({
    address,
    chain: chainId,
  });
  return (
    // div of height 100vh
    <div className="h-screen bg-white">
      {/* <h3>Wallet: {address}</h3>
      <h3>Native Balance: {nativeBalance?.balance.ether} ETH</h3>
      {isMetaMask && hasProvider && wallet.accounts.length < 1 ? (
        <button onClick={handleConnect}>Connect MetaMask</button>
      ) : (
        !isMetaMask && "Add MetaMask"
      )}
      <button onClick={handleChainChange}>Change Chain</button> */}
      {/* <Card
        title="Your Deposits"
        amount="50,000 ETH"
        buttonText="Withdraw"
        handleClick={() => {
          console.log("withdraw");
        }}
      /> */}
      {/* first div of height 40% and background color of primary 2 */}
      <div className="h-35vh bg-primary-2"></div>
      {/* second div of height 60% and background color of primary 1 */}
      <div className="flex flex-col space-y-5 px-15vw">
        <div className="flex justify-between space-x-5">
          <Card
            title="Your Deposits"
            amount="50,000 ETH"
            buttonText="Withdraw"
            handleClick={() => {
              console.log("withdraw");
            }}
          />
          <Card
            title="Wallet Balance"
            amount="50,000 ETH"
            buttonText="Deposit"
            handleClick={() => {
              console.log("deposit");
            }}
          />
        </div>
        <Table />
        <Modal />
        <div className="flex flex-col p-40 shadow-custom w-500">
          <div>
            <span className="text-600 text-24 text-primary-1">
              Withdraw ETH
            </span>
          </div>
          <div className="rounded-md border border-solid border-secondary-3 px-4 py-2 mt-40">
            <div className="flex items-center justify-between">
              <input
                type="text"
                className="text-400 text-20 text-secondary-2"
                value="0.00"
              />
              <div>AB</div>
            </div>

            <div className="flex items-center justify-between">
              <span type="text" className="text-400 text-14 text-secondary-2">
                $ 0.5
              </span>
              <div className="flex items-center">
                <span type="text" className="text-500 text-14 text-secondary-1">
                  {`Supply balance <0.00001`}{" "}
                </span>
                <span type="text" className="text-700 text-12 text-primary-1">
                  MAX
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-5 mt-80">
            <Button text={"Approve"} />
            <Button text={"Withdraw"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
