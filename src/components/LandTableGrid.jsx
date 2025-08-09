import React from "react";

export default function LandTableGrid({ tables }) {
  return (
    <div
      className={`grid gap-1 ${
        tables.length === 1
          ? "grid-cols-1"
          : tables.length === 2
          ? "grid-cols-2"
          : "grid-cols-2"
      }`}
    >
      {tables.map((rows, index) => (
        <div
          key={index}
          className={
            tables.length === 3 && index === 2
              ? "col-span-2 flex justify-center"
              : ""
          }
        >
          <table className="border border-dotted border-collapse my-2.5 mx-0.5 w-full text-xs">
            <thead>
              <tr>
                <th className="b1">ক্রমঃ</th>
                <th className="b1">দাগ নং</th>
                <th className="b1">জমির শ্রেণী</th>
                <th className="b1">জমির পরিমাণ (শতাংশ)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="h-[21px]">
                  <td className="b1 input_bangla text-center">{row.col1}</td>
                  <td className="b1 input_bangla">{row.col2}</td>
                  <td className="b1">{row.col3}</td>
                  <td className="b1 input_bangla">{row.col4}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
