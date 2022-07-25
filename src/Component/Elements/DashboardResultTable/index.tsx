import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import ResultModal from "../../ResultModal";

const DashboardResultTable = () => {
  const [results, setResults] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/results/results")
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      });
  }, []);
  //   console.log(results);

  return (
    <div className="antialiased sans-serif bg-gray-200 h-screen">
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-between">
          <h1 className="text-3xl py-4 border-b">Science Result</h1>
          <div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Total student</div>
                <div className="text-lg font-bold">1070</div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>
            </div>
            <div className="stats shadow mx-2">
              <div className="stat">
                <div className="stat-title">Total Passed</div>
                <div className="text-lg font-bold">950</div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Total Failed</div>
                <div className="text-lg font-bold">120</div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 flex justify-between items-center">
          <div className="flex pr-4 gap-4">
            <div className="relative">
              <input
                type="search"
                className="w-80 pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                placeholder="Search by roll"
              />
              <div className="absolute top-0 left-0 inline-flex items-center p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-400"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                  <circle cx="10" cy="10" r="7" />
                  <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
              </div>
            </div>
            <Select
              className="md:w-40 w-full md:py-0 py-2 rounded-sm"
              size="large"
              defaultValue="2022"
              //   onChange={}
            >
              <Option value="2022">2022</Option>
              <Option value="2021">2021</Option>
              <Option value="2020">2020</Option>
            </Select>
          </div>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1">
              Filter
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Science</a>
              </li>
              <li>
                <a>Business</a>
              </li>
              <li>
                <a>Arts</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
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
                        {result.total_gp}
                      </span>
                    </td>
                    <td className="border-dashed border-t border-gray-200 phoneNumber">
                      <span className="text-gray-700 px-6 py-3 flex items-center">
                        {result.GPA}
                      </span>
                    </td>
                    <td className="border-dashed border-t border-gray-200 phoneNumber">
                      <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold">
                        Passed
                      </span>
                    </td>
                    <td className="border-dashed border-t border-gray-200 phoneNumber">
                      <span className="text-gray-700 px-6 py-3 flex items-center">
                        {result.merit}
                      </span>
                    </td>
                    <td className="border-dashed border-t border-gray-200 phoneNumber">
                      <label
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
        </div>
      </div>
      <ResultModal />
    </div>
  );
};

export default DashboardResultTable;
