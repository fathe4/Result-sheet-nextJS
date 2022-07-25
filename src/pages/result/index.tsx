import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../Component/Header";

const Result = () => {
  const [studentResult, setStudentResult] = useState<any>({
    result: [],
    studentDetails: {},
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { group, date, roll } = router.query;
  console.log(group, date, roll);
  useEffect(() => {
    setIsLoading(true);
    if (studentResult.result.length === 0) {
      fetch(
        `http://localhost:3000/api/results/studentResult?date=${date}&&group=${group}&&roll=${roll}`
      )
        .then((res) => res.json())
        .then((data) => setStudentResult(data))
        .finally(() => setIsLoading(false));
    }
  }, [studentResult, date, roll, group]);
  console.log(studentResult);

  const tableHeadingCss =
    "flex items-center justify-center border-[1px] bg-[#5CB25a] text-white";
  const tableBodyCss = "flex items-center justify-center border-[1px]";
  //   console.log("result", subjects(fakeData))

  return (
    <>
      <div className="container  mx-auto">
        <Header />
        <div className="overflow-x-auto border-x border-t my-10">
          <table className="table-auto w-full">
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <th className="text-left p-4 w-24 font-bold">Name:</th>
                <td className="p-4">{studentResult.studentDetails.name}</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 w-24">
                <th className="text-left p-4 font-bold">Roll No:</th>
                <td className="p-4">{studentResult.studentDetails.roll}</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 w-24">
                <th className="text-left p-4 font-bold">Group:</th>
                <td className="p-4">{studentResult.studentDetails.group}</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 w-24">
                <th className="text-left p-4 font-bold">Result:</th>
                <td className="p-4">
                  {parseInt(studentResult.studentDetails.totalFailed) == 0
                    ? "Passed"
                    : "Failed"}
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50 w-24">
                <th className="text-left p-4 font-bold">GPA:</th>
                <td className="p-4">{studentResult.studentDetails.GPA}</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 w-24">
                <th className="text-left p-4 font-bold">Position:</th>
                <td className="p-4">{studentResult.studentDetails.merit}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-6 bg-gray-50 border">
          {/* <!-- table head starts --> */}
          <div className="row-span-2 flex items-center justify-center border-[1px] bg-[#5CB25a] py-8 text-white">
            Subject Code
          </div>
          <div className="row-span-2 flex items-center justify-center border-[1px] bg-[#5CB25a] py-8 text-white">
            Subject Name
          </div>
          <div className={[`col-span-3`, tableHeadingCss].join(" ")}>Marks</div>
          <div className={[`row-span-2`, tableHeadingCss].join(" ")}>Grade</div>

          <div className={tableHeadingCss}>Theory</div>
          <div className={tableHeadingCss}>MCQ</div>
          <div className={tableHeadingCss}>Total</div>
          {/* <!-- table head ends --> */}

          {/* <!-- table body starts --> */}
          {isLoading &&
            studentResult.result.map((result: any, i: number) => {
              return (
                <React.Fragment key={i}>
                  <div className={[tableBodyCss, `border-b-0 py-4`].join(" ")}>
                    001
                    <br />
                    001
                  </div>
                  <div className={[tableBodyCss, `border-b-0`].join(" ")}>
                    {result.part_1?.subject}
                    <br />
                    {result?.part_2?.subject}
                  </div>
                  <div className={[tableBodyCss, `border-b-0`].join(" ")}>
                    {result.part_1?.CQ}
                    <br />
                    {result?.part_2?.CQ}
                  </div>
                  <div className={[tableBodyCss, `border-b-0`].join(" ")}>
                    {result.part_1?.MCQ}
                    <br />
                    {result?.part_2?.MCQ}
                  </div>
                  <div className={[tableBodyCss, `border-b-0`].join(" ")}>
                    {parseInt(result?.part_1?.total) +
                      parseInt(result?.part_2?.total)}
                  </div>
                  <div className={[tableBodyCss, `py-2`].join(" ")}>
                    {result.grade}
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </div>
      <div className="h-20"></div>
    </>
  );
};

export default Result;
