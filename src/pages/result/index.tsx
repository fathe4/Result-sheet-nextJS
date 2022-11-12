import { useRouter } from "next/router";
import React from "react";
import Header from "../../Component/Header";
import { useGetStudentResult } from "../../hooks/Query";
import { HiIdentification } from "react-icons/hi";
import { FaLayerGroup } from "react-icons/fa";

const Result = () => {
  const router = useRouter();
  const { group, year, roll }: Record<string, any> = router.query;
  const { data: studentResult } = useGetStudentResult(group, year, roll);

  const tableHeadingCss =
    "flex items-center justify-center border-[1px] bg-[#5CB25a] text-white";
  const tableBodyCss = "flex items-center justify-center border-[1px]";
  console.log(studentResult);

  return (
    <>
      <div className="container  mx-auto">
        <Header />
        {/* <div className="overflow-x-auto border-x border-t my-10">
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
        </div> */}
        <div className="flex flex-col border rounded-lg overflow-hidden bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-4">
            <div className="flex flex-col border-b sm:border-b-0 items-center p-8 sm:px-4 sm:h-full sm:justify-center">
              <p className="text-7xl font-bold text-[#0ed3cf] rounded-full">
                J
              </p>
            </div>
            <div className="flex flex-col sm:border-l col-span-3">
              <div className="flex flex-col space-y-4  p-6 text-gray-600">
                <div className="flex flex-row text-sm">
                  <span className="mr-3">
                    <HiIdentification className="text-xl" />
                  </span>
                  <p className="flex items-center  text-gray-500">
                    <span className="font-semibold mr-2 text-xs uppercase">
                      Name:
                    </span>
                    <span>{studentResult.studentDetails.name}</span>
                  </p>
                </div>

                <div className="flex flex-row text-sm">
                  <span className="mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 0 24 24"
                      width="20px"
                      fill="#64748b"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
                    </svg>
                  </span>
                  <p className="flex items-center  text-gray-500">
                    <span className="font-semibold mr-2 text-xs uppercase">
                      Roll:
                    </span>
                    <span>{studentResult.studentDetails.roll}</span>
                  </p>
                </div>
                <div className="flex flex-row text-sm">
                  <span className="mr-3">
                    <FaLayerGroup className="text-xl" />
                  </span>
                  <p className="flex items-center  text-gray-500">
                    <span className="font-semibold mr-2 text-xs uppercase">
                      Group:
                    </span>
                    <span>{studentResult.studentDetails.group}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col w-full relative bottom-0">
                <div className="grid grid-cols-3 border-t divide-x text-[#0ed3cf]  bg-gray-50 dark:bg-transparent py-3">
                  <a className=" cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold">
                    <div className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 0 24 24"
                        width="20px"
                        fill="#0ed3cf"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                    </div>
                    Update
                  </a>
                  <a className="cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold">
                    <div className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 0 24 24"
                        width="20px"
                        fill="#0ed3cf"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </div>
                    Remove
                  </a>
                  <a className="cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold">
                    <div className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 0 24 24"
                        width="20px"
                        fill="#0ed3cf"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                      </svg>
                    </div>
                    View
                  </a>
                </div>
              </div>
            </div>
          </div>
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
          {studentResult.results.map((result: any, i: number) => {
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
