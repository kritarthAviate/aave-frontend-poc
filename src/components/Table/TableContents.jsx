import TableRow from "./TableRow";
import { widths } from "./constants";
const TableContents = ({ rows, headers }) => {
  console.log({ rows, headers });
  return (
    <div>
      <div className="w-full">
        <div className="px-10 py-1">
          <div className="flex w-full">
            {headers.map((col) => {
              return (
                <div
                  key={col.id}
                  className={`text-secondary-1 font-400 text-14 ${
                    widths[col.id]
                  }`}
                >
                  {col.label}
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-[1px] bg-secondary-3 w-full" />
        <div className="px-10 py-5">
          {rows.map((row, i) => (
            <TableRow row={row} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableContents;
