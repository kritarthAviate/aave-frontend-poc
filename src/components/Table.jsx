/* eslint-disable @next/next/no-img-element */
import Button from "./Button";
import GhostLogo from "../../public/aaveGhost.svg";
import Image from "next/image";

const Table = () => {
  const isConnected = false;
  const data = [];
  const loading = false;

  if (!isConnected) {
    return (
      <div className="flex flex-col p-40 shadow-custom h-400">
        <div className="flex flex-col space-y-5 items-center justify-center h-full">
          <img src={GhostLogo.src} alt="Ghost Logo" className="w-100 h-100" />
          <Button text="Connect Metamask" handleClick={() => {}} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col p-40 shadow-custom h-400">
      <div className="flex flex-col space-y-5 items-center justify-center h-full">
        {!data.length ? (
          <>
            <img src={GhostLogo.src} alt="Ghost Logo" className="w-100 h-100" />
            <div class="text-500 text-24 text-secondary-1">
              {loading
                ? "Loading..."
                : "Initiate a transactioin to display historical data"}
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Table;
