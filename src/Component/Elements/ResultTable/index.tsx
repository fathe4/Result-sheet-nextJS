import React from "react";

const ResultTable = ({
  results,
  setSelect,
}: {
  results: any;
  setSelect: Function;
}) => {
  console.log(results);

  return (
    <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
      <thead>
        <tr className="text-left">
          <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
            Roll
          </th>
          <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
            Name
          </th>
          <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
            Group
          </th>
          <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
            Total Marks
          </th>
          <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
            Total GP
          </th>
          <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
            GPA
          </th>
          <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
            Status
          </th>
          <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
            Merit
          </th>
          <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {results.map((result: any) => {
          return (
            <tr key={result.id}>
              <td className="border-dashed border-t border-gray-200 userId">
                <span className="text-gray-700 px-6 py-3 flex items-center">
                  {result.roll}
                </span>
              </td>
              <td className="border-dashed border-t border-gray-200 firstName">
                <span className="text-gray-700 px-6 py-3 flex items-center">
                  {result.name}
                </span>
              </td>
              <td className="border-dashed border-t border-gray-200 lastName">
                <span className="text-gray-700 px-6 py-3 flex items-center">
                  {result.group_name}
                </span>
              </td>
              <td className="border-dashed border-t border-gray-200 emailAddress">
                <span className="text-gray-700 px-6 py-3 flex items-center">
                  {result.total_marks}
                </span>
              </td>
              <td className="border-dashed border-t border-gray-200 gender">
                <span className="text-gray-700 px-6 py-3 flex items-center">
                  {result.total_GP}
                </span>
              </td>
              <td className="border-dashed border-t border-gray-200 phoneNumber">
                <span className="text-gray-700 px-6 py-3 flex items-center">
                  {result.GPA}
                </span>
              </td>
              <td className="border-dashed border-t border-gray-200 phoneNumber">
                <span
                  className={`rounded ${
                    result.GPA === "Failed" ? "bg-red-500" : "bg-green-400"
                  } py-1 px-3 text-xs font-bold`}
                >
                  {result.GPA === "Failed" ? "Failed" : "Passed"}
                </span>
              </td>
              <td className="border-dashed border-t border-gray-200 phoneNumber">
                <span className="text-gray-700 px-6 py-3 flex items-center">
                  {result.merit}
                </span>
              </td>
              <td className="border-dashed border-t border-gray-200 phoneNumber">
                <label
                  onClick={() => setSelect(result.roll)}
                  htmlFor="my-modal-5"
                  className="text-gray-700 px-6 py-3 flex items-center cursor-pointer"
                >
                  Edit
                </label>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ResultTable;
