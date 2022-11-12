import CsvDownloader from "react-csv-downloader";
import React, { useState } from "react";
import { useGetAllGroupsResult } from "../../../hooks/Query";
import {
  useDeleteGroupResults,
  useGetGroupResults,
} from "../../../hooks/Mutation";
import DashboardLayout from "../../../Component/Layout/DashboardLayout";

const ManageResults = () => {
  const { data: groupResults } = useGetAllGroupsResult();
  const { mutateAsync: getGroupResult } = useGetGroupResults();
  const { mutate: handleDeleteResults } = useDeleteGroupResults();

  const downloadCSV = async (result: any) => {
    const data = await getGroupResult(result);
    return data.map(
      ({ id, created_table_at, group_name, year, ...rest }: any) => rest
    );
  };
  return (
    <div className="antialiased sans-serif bg-gray-200 h-screen">
      <div className="container mx-auto py-6 px-4">
        <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
          <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
            <thead>
              <tr className="text-left">
                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  Id
                </th>
                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  Group
                </th>
                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  Result Year
                </th>
                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  Uploaded Date
                </th>
                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  Total Students
                </th>
                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  Download CSV
                </th>
                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {groupResults.map((result: any, i: number) => (
                <tr key={result.id}>
                  <td className="border-dashed border-t border-gray-200 userId">
                    <span className="text-gray-700 px-6 py-3 flex items-center">
                      {i + 1}
                    </span>
                  </td>
                  <td className="border-dashed border-t border-gray-200 firstName">
                    <span className="text-gray-700 px-6 py-3 flex items-center">
                      {result.group_name}
                    </span>
                  </td>
                  <td className="border-dashed border-t border-gray-200 lastName">
                    <span className="text-gray-700 px-6 py-3 flex items-center">
                      {result.year}
                    </span>
                  </td>
                  <td className="border-dashed border-t border-gray-200 lastName">
                    <span className="text-gray-700 px-6 py-3 flex items-center">
                      {result.created_table_at.split("T")[0]}
                    </span>
                  </td>
                  <td className="border-dashed border-t border-gray-200 emailAddress">
                    <span className="text-gray-700 px-6 py-3 flex items-center">
                      {result.total_student}
                    </span>
                  </td>
                  <td className="border-dashed border-t border-gray-200 gender">
                    <span className="text-gray-700 px-6 py-3 flex items-center">
                      <CsvDownloader
                        filename={
                          result.group_name + "-" + result.year + "-result"
                        }
                        datas={() => downloadCSV(result)}
                      >
                        <button className="btn btn-xs">Download</button>
                      </CsvDownloader>
                    </span>
                  </td>
                  <td className="border-dashed border-t border-gray-200 phoneNumber">
                    <button
                      onClick={() =>
                        handleDeleteResults({
                          tableName: result.table_name,
                          year: result.year,
                        })
                      }
                      className="border border-red-500 bg-red-500 text-white rounded-md px-2 py-1 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                    >
                      Delete All
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
ManageResults.Layout = DashboardLayout;
export default ManageResults;
