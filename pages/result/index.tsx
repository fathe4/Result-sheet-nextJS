import { TableColumnsType } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Result = () => {
  const [studentResult, setStudentResult] = useState<any>({});
  const router = useRouter();
  const { group, date, roll } = router.query;
  console.log(group, date, roll);
  useEffect(() => {
    fetch(
      "http://localhost:3000/api/results/studentResult?date=2022&&group=business&&roll=1401"
    )
      .then((res) => res.json())
      .then((data) => setStudentResult(data));
  }, []);
  console.log(studentResult);

  //   console.log("result", subjects(fakeData));

  return (
    <>
      <div className="container  mx-auto">
        <div className="flex gap-2 w-full rounded-lg my-4">
          <div>
            <img
              src="https://bd.top10place.com/img_files/1329810593746058"
              alt=""
              width={100}
            />
          </div>
          <div className="bg-green-600 w-full py-6">
            <div className="border-b">
              <h2 className="text-3xl font-bold text-white ml-4">
                Narsingdi Government College
              </h2>
            </div>
            <div>
              <h2 className="text-2xl text-white ml-4">
                Intermediate and secondary Education board results
              </h2>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto border-x border-t my-10">
          <table className="table-auto w-full">
            {/* <thead className="border-b">
			  <tr className="bg-gray-100">
				<th className="text-left p-4 font-medium">Name</th>
				<th className="text-left p-4 font-medium">Email</th>
				<th className="text-left p-4 font-medium">Role</th>
			  </tr>
			</thead> */}
            {/* <tbody>
              <tr className="border-b hover:bg-gray-50">
                <th className="text-left p-4 w-24 font-bold">Name:</th>
                <td className="p-4">{studentResult[0].name}</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 w-24">
                <th className="text-left p-4 font-bold">Roll No:</th>
                <td className="p-4">{studentResult[0].roll}</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 w-24">
                <th className="text-left p-4 font-bold">Group:</th>
                <td className="p-4">{studentResult[0].group_name}</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 w-24">
                <th className="text-left p-4 font-bold">Result:</th>
                <td className="p-4">
                  {parseInt(studentResult[0].total_failed) == 0
                    ? "Passed"
                    : "Failed"}
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50 w-24">
                <th className="text-left p-4 font-bold">GPA:</th>
                <td className="p-4">{studentResult.GPA}</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 w-24">
                <th className="text-left p-4 font-bold">Position:</th>
                <td className="p-4">{studentResult.merit}</td>
              </tr>
            </tbody> */}
          </table>
        </div>
      </div>

      <div className="container mx-auto overflow-x-auto border-x border-t my-10">
        <table className="table-auto w-full">
          <thead className="border-b">
            <tr className="text-white font-bold h-10 bg-[#5CB25A]">
              <th
                rowSpan={2}
                className="text-center md:p-4 p-0 md:w-32 w-10 border-r border-white"
              >
                Subject Code
              </th>
              <th
                rowSpan={2}
                className="text-center md:p-4 p-0 md:w-96 w-none "
              >
                Subject Name
              </th>
              <th
                colSpan={3}
                className="text-center p-4 border border-t-0 border-white"
              >
                Marks
              </th>
              <th
                rowSpan={2}
                className="text-center md:p-4 p-0 md:w-32 w-10 border-r border-gray-300"
              >
                Grade
              </th>
            </tr>
            <tr className="border-b border-gray-400 font-bold h-10 text-white bg-[#5CB25A]">
              <th className="text-center p-4 border ">Theory</th>
              <th className="text-center p-4 border ">MCQ</th>
              <th className="text-center p-4 border ">Total</th>
            </tr>
          </thead>
          <tbody>
            {studentResult.map((result: Record<string, any>, i: number) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-50 text-center h-10"
              >
                <td className="p-4 border">{i + 1}</td>
                <td className="p-4 border">{result.subject}</td>
                <td className="p-4 border">40</td>
                <td className="p-4 border">40</td>
                <td className="p-4 border"></td>
                <td className="p-4 border">A+</td>
              </tr>
            ))}
            <tr className="border -b border-t-0 hover:bg-gray-50 text-center h-10">
              <td className="p-0 border-l border-r">001</td>
              <td className="p-0 border-l border-r">English 1</td>
              <td className="p-0 border-l border-r">40</td>
              <td className="p-0 border-l border-r">40</td>
              {/* <td className="p-0 border-l border-r"  rowSpan={2}>80</td> */}
              {/* <td className="p-0 border-l border-r">A+</td> */}
            </tr>
            <tr className="border-b hover:bg-gray-50 text-center h-10">
              <td className="p-4 border">001</td>
              <td className="p-4 border">English 1</td>
              <td className="p-4 border">40</td>
              <td className="p-4 border">40</td>
              <td className="p-4 border"></td>
              <td className="p-4 border">A+</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container mx-auto">
        {/* <Table
			  columns={ExpandableColumns}
			  expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
			  dataSource={expandableData}
			  pagination={false}
			/> */}
      </div>
    </>
  );
};

export default Result;
