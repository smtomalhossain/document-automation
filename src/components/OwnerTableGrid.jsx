import React from "react";

export default function OwnerTableGrid({ tables = [] }) {
  // Normalize rows to arrays safely
  const normalizeRows = (rows) => {
    if (!rows) return [];
    return Array.isArray(rows) ? rows : [rows];
  };

  // Determine grid columns
  const gridCols = tables.length === 1 ? "grid-cols-1" : "grid-cols-2";

  return (
    <div className={`grid gap-1 ${gridCols}`}>
      {tables.map((rows, index) => {
        const rowArray = normalizeRows(rows);
        const isLastOdd = tables.length === 3 && index === 2;

        return (
          <div
            key={index}
            className={isLastOdd ? "col-span-2 flex justify-center" : ""}
          >
            <table className="border border-dotted border-collapse my-2.5 mx-0.5 w-full text-xs">
              <thead>
                <tr>
                  <th className="b1 text-center w-[10%]">ক্রমঃ</th>
                  <th className="b1 text-center w-[60%]">মালিকের নাম</th>
                  <th className="b1 text-center w-[25%]">মালিকের অংশ</th>
                </tr>
              </thead>
              <tbody>
                {rowArray.map((row, ri) => (
                  <tr key={ri} className="h-[21px]">
                    <td className="b1 input_bangla text-center">{row.col1}</td>
                    <td className="b1 input_bangla">{row.col2}</td>
                    <td className="b1 input_bangla text-center">{row.col3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
