import { Popconfirm } from "antd";
import React, { useState } from "react";
import DashboardLayout from "../../../Component/Layout/DashboardLayout";
import TableHeadingPopup from "../../../Component/TableHeadingPopup";
import { useCreateTable, useDeleteTable } from "../../hooks/Mutation";
import { useGetTables } from "../../hooks/Query";

export default function CreateTable() {
  const [tableName, setTableName] = useState("");
  const { data: tables } = useGetTables();
  const { mutate: createTable } = useCreateTable();
  const { mutate: deleteTable } = useDeleteTable();

  const handleCreateTable = (e: any) => {
    e.preventDefault();
    createTable({
      tableName: e.target.tableName.value?.split(" ")?.join("_"),
      groupName: e.target.groupName.value,
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className=" px-4 py-5 bg-white space-y-6 sm:p-6 shadow sm:rounded-md sm:overflow-hidden">
        <form onSubmit={handleCreateTable}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Table Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="tableName"
              type="text"
              placeholder="Table name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 my-3">
              Group Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="groupName"
              type="text"
              placeholder="Group Name"
            />
          </div>
          <div className="py-3 text-right ">
            <button
              type="submit"
              className="bg-gray-700 py-2 px-6 text-white rounded hover:bg-slate-900 shadow-sm"
            >
              Create
            </button>
          </div>
        </form>
      </div>

      <div className=" col-span-2 px-4 py-5 bg-white space-y-6 sm:p-6 shadow sm:rounded-md sm:overflow-hidden">
        <div className="mx-auto">
          <div className="">
            <table className="text-left w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Tables
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-right	">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tables.map((table: { TablesName: string }, i: number) => (
                  <tr key={i} className="hover:bg-grey-lighter">
                    <td className="py-4 px-6 border-b border-grey-light">
                      {table.TablesName}
                    </td>

                    <td className="py-4 px-6 border-b border-grey-light text-right">
                      <label
                        onClick={() => setTableName(table.TablesName)}
                        htmlFor="table-heading-modal"
                        className="text-white font-bold py-1 px-3 rounded text-xs bg-indigo-600 hover:bg-green-dark mr-3 cursor-pointer"
                      >
                        Edit
                      </label>

                      <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => deleteTable(table.TablesName)}
                      >
                        <a className="text-white font-bold py-1 px-3 rounded text-xs bg-red-600 hover:bg-blue-dark">
                          Delete
                        </a>
                      </Popconfirm>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {tableName && (
        <TableHeadingPopup tableName={tableName} setTableName={setTableName} />
      )}
    </div>
  );
}
CreateTable.Layout = DashboardLayout;
