import React, { useState } from "react";
import { Select, Input } from "antd";
import Link from "next/link";
import { useGetGroupsAndDate } from "../../hooks/Query";

const SearchFilter: React.FunctionComponent = (props) => {
  const { Option } = Select;
  const [roll, setRoll] = useState<number>();
  const [group, setGroup] = useState("Science");
  const [year, setYear] = useState("2022");
  const { data: groupsAndDate } = useGetGroupsAndDate();
  const handleSelect = (e: any) => {
    e.preventDefault();
    console.log(`selected`, roll, group, year);
  };
  console.log(groupsAndDate);

  return (
    <div className="flex justify-center my-10">
      <div className="md:w-1/3 w-96 gap-2 flex md:flex-row flex-col">
        <Input
          size="large"
          className="md:w-48 w-16"
          placeholder="Search by roll"
          type="number"
          min={3}
          onChange={(e: any) => setRoll(e.target.value)}
        />
        <Select
          className="md:w-40 w-full md:py-0 py-2 rounded-sm"
          size="large"
          defaultValue="science"
          onChange={(value) => setGroup(value)}
        >
          {groupsAndDate.groups.map(
            ({ group_name }: { group_name: string }, i: number) => (
              <React.Fragment key={i}>
                <Option value={group_name}>{group_name}</Option>
              </React.Fragment>
            )
          )}
        </Select>
        <Select
          className="md:w-40 w-full md:py-0 py-2 rounded-sm"
          size="large"
          defaultValue="2022"
          onChange={(value) => setYear(value)}
        >
          {groupsAndDate.dates.map(({ year }: { year: string }, i: number) => (
            <React.Fragment key={i}>
              <Option value={year}>{year}</Option>
            </React.Fragment>
          ))}
        </Select>
        <Link href={`/result?year=${year}&&group=${group}&&roll=${roll}`}>
          <button
            disabled={!roll && true}
            type="submit"
            className="inline-flex justify-center w-full md:w-32 py-2 px-4 border border-transparent drop-shadow-md text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchFilter;
