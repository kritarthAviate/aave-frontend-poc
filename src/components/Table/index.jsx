/* eslint-disable @next/next/no-img-element */
import { useBaseContext } from "src/context/BaseContext";
import Button from "src/components/Button";
import TableContents from "./TableContents";
import GhostLogo from "../../../public/aaveGhost.svg";
import { parseEventsData } from "src/utils";

const Table = () => {
  const {
    isMetaMask,
    hasProvider,
    walletAddress,
    handleConnect,
    handleChainChange,
    chainNotSupported,
    contractEvents,
    eventsLoading
  } = useBaseContext();

  const rows = parseEventsData(contractEvents);

  const headers = [
    {
      label: "Amount",
      id: "amount",
    },
    {
      label: "Event",
      id: "action",
    },
    {
      label: "Timestamp",
      id: "timestamp",
    },
    {
      label: "TxHash",
      id: "txHash",
    },
  ];

  if (!walletAddress || chainNotSupported) {
    return (
      <div className="flex flex-col p-10 shadow-custom h-[400px]">
        <div className="flex flex-col space-y-5 items-center justify-center h-full">
          <img src={GhostLogo.src} alt="Ghost Logo" className="w-100 h-100" />
          <Button
            text={!walletAddress ? "Connect Metamask" : "Switch to Goerli"}
            handleClick={!walletAddress ? handleConnect : handleChainChange}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-10 shadow-custom">
      {!rows.length ? (
        <div className="min-h-[400px] flex px-10 flex-col space-y-5 items-center justify-center h-full">
          <img src={GhostLogo.src} alt="Ghost Logo" className="w-100 h-100" />
          <div className="text-500 text-24 text-secondary-1">
            { eventsLoading
              ? "Loading..."
              : "Initiate a transaction to display historical data"}
          </div>
        </div>
      ) : (
        <TableContents rows={rows} headers={headers} />
      )}
    </div>
  );
};

export default Table;
