import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import Filter from "../../../Component/Elements/Filter";
import ResultTable from "../../../Component/Elements/ResultTable";
import DashboardLayout from "../../../Component/Layout/DashboardLayout";
import ResultModal from "../../../Component/ResultModal";
import { useGetGroupResults } from "../../../hooks/Mutation";
import { useGetGroupsAndDate } from "../../../hooks/Query";

const DashboardResultTable = () => {
  const [group, setGroup] = useState({
    value: "Science",
    table_name: "Science",
  });
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [roll, setRoll] = useState("");
  const [searchResultByRoll, setSearchResultByRoll] = useState("");
  const {
    mutate: getGroupResults,
    data: results = { data: [], totalFailed: [] },
  } = useGetGroupResults();
  const { data: groupsAndDate } = useGetGroupsAndDate();
  useEffect(() => {
    getGroupResults({
      table_name: group.table_name,
      year,
      roll: searchResultByRoll,
    });
  }, [getGroupResults, group, year, searchResultByRoll]);
  const filterOptions = groupsAndDate.groups.map(
    (group: { group_name: string; table_name: string }) => ({
      value: group.group_name,
      label: group.group_name,
      table_name: group.table_name,
    })
  );
  console.log(group, "group");

  return (
    <div className="antialiased sans-serif bg-gray-200 h-screen">
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-between">
          <h1 className="text-3xl py-4 border-b font-sans font-semibold">
            {year} {group.value} Result
          </h1>
          <div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Total student</div>
                <div className="text-lg font-bold">{results.data.length}</div>
                <div className="stat-desc">21% more than last month</div>
              </div>
            </div>
            <div className="stats shadow mx-2">
              <div className="stat">
                <div className="stat-title">Total Passed</div>
                <div className="text-lg font-bold">
                  {results.data.length - results.totalFailed.length}
                </div>
                <div className="stat-desc">21% more than last month</div>
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Total Failed</div>
                <div className="text-lg font-bold">
                  {results.totalFailed.length}
                </div>
                <div className="stat-desc">21% more than last month</div>
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
                onChange={(e) => setSearchResultByRoll(e.target.value)}
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
              onChange={(value) => setYear(value)}
            >
              {groupsAndDate.dates.map(
                ({ year }: { year: string }, i: number) => (
                  <React.Fragment key={i}>
                    <Option value={year}>{year}</Option>
                  </React.Fragment>
                )
              )}
            </Select>
          </div>
          <Filter options={filterOptions} selectOption={setGroup} />
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
          <ResultTable results={results.data} setSelect={setRoll} />
        </div>
      </div>
      {roll && <ResultModal group={group.table_name} year={year} roll={roll} />}
    </div>
  );
};

DashboardResultTable.Layout = DashboardLayout;
export default DashboardResultTable;
