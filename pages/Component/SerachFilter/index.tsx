import react, { useState } from "react";
import { Select, Input } from "antd";
import Link from "next/link";
interface IAppProps {}

const SearchFilter: React.FunctionComponent = (props) => {
  const { Option } = Select;
  const [roll, setRoll] = useState<number>();
  const [group, setGroup] = useState("science");
  const [date, setDate] = useState("2022");
  const handleSelect = (e: any) => {
    e.preventDefault();
    console.log(`selected`, roll, group, date);
  };
  return (
    <div className="flex justify-center my-10">
      <div className="md:w-1/3 w-96 gap-2 flex md:flex-row flex-col">
        <Input
          size="large"
          className="md:w-32 w-16"
          placeholder="Search by roll"
          type="number"
          min={3}
          onChange={(e: any) => setRoll(e.target.value)}
        />
        <Select
          className="md:w-40 w-full md:py-0 py-2"
          size="large"
          defaultValue="science"
          onChange={setGroup}
        >
          <Option value="science">Science</Option>
          <Option value="business">Commerce</Option>
          <Option value="arts">Arts</Option>
        </Select>
        <Select
          className="md:w-40 w-full md:py-0 py-2"
          size="large"
          defaultValue="2022"
          onChange={setDate}
        >
          <Option value="2022">2022</Option>
          <Option value="2021">2021</Option>
          <Option value="2020">2020</Option>
        </Select>
        <Link href={`/result?date=${date}&&group=${group}&&roll=${roll}`}>
          <button
            disabled={!roll && true}
            type="submit"
            className="inline-flex justify-center w-full md:w-36 py-2 px-4 border border-transparent drop-shadow-md text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchFilter;
