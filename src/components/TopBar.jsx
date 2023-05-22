/* eslint-disable @next/next/no-img-element */
import { useBaseContext } from "src/context/BaseContext";
import { ethLogoUri } from "src/utils/constants";
import GhostLogo from "../../public/aaveGhost.svg";

const TopBar = () => {
  const { walletAddress, contractEvents } = useBaseContext();

  return (
    <div className="flex justify-between">
      <div className="flex h-10 self-end">
        <img src={ethLogoUri} alt="ETH" width="40px" height="40px" />
        <span className="ml-3 text-700 text-28 text-white">Ethereum</span>
      </div>
      <div className="h-40">
        {walletAddress && contractEvents.length > 0 && (
          <img src={GhostLogo.src} alt="Ghost Logo" />
        )}
      </div>
    </div>
  );
};

export default TopBar;
