import { minifyAddress } from "src/utils";
import { ethLogoUri } from "src/utils/constants";
import { widths } from "./constants";

const TableRow = ({ row }) => {
  return (
    <div className="flex w-full py-2">
      <div className={`text-primary-1 font-600 text-14 ${widths.amount}`}>
        <div className="flex w-full space-x-1 items-center">
          <img src={ethLogoUri} alt="ETH" className="h-5 w-5" />
          <span>{row.amount}</span>
        </div>
      </div>
      <div className={`text-primary-1 font-600 text-14 ${widths.action}`}>
        {row.action}
      </div>
      <div className={`text-primary-1 font-600 text-14 ${widths.timestamp}`}>
        {row.timestamp}
      </div>
      <div
        className={`text-primary-1 font-600 text-14 text-blue-500 ${widths.txHash}`}
      >
        <a
          target="_blank"
          href={`https://goerli.etherscan.io/tx/${row.txHash}`}
        >
          {minifyAddress(row.txHash)}
        </a>
      </div>
    </div>
  );
};
export default TableRow;
