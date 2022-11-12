import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { useGetGroupResults } from "../../hooks/Mutation";
import { useGetColumns, useGetGroupsAndDate } from "../../hooks/Query";
import Filter from "../Elements/Filter";
import SearchFilter from "../SerachFilter";

interface DataType {
  key: React.Key;
  roll: number;
  name: string;
  cq: string;
  mcq: string;
  percentage: string;
  gp: string;
  totalMarks: number;
  totalGP: number;
  totalGPA: number;
  failedSub: number;
  merit: number;
}
const columns2: ColumnsType<DataType> = [
  {
    title: "Name",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Roll",
    width: 100,
    dataIndex: "roll",
    key: "roll",
    fixed: "left",
  },
  { title: "Bangla 1st", dataIndex: "Bangla_1st_total", key: "1" },
  { title: "Bangla 2nd", dataIndex: "Bangla_2nd_total", key: "2" },
  { title: "English 1st", dataIndex: "English_1st_total", key: "3" },
  { title: "English 2nd", dataIndex: "English_2nd_total", key: "4" },
  { title: "Column 5", dataIndex: "address", key: "5" },
  { title: "Column 6", dataIndex: "address", key: "6" },
  { title: "Column 7", dataIndex: "address", key: "7" },
  { title: "Column 8", dataIndex: "address", key: "8" },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => <a>action</a>,
  },
];

// const columns: ColumnsType<DataType> = [
//   { title: "roll", width: 50, dataIndex: "roll", key: "roll", fixed: "left" },
//   { title: "name", width: 60, dataIndex: "name", key: "name", fixed: "left" },
//   {
//     title: "bangla",
//     width: 50,
//     children: [
//       {
//         title: "1st",
//         width: 50,
//         children: [
//           { title: "CQ", dataIndex: "bangla_1st_CQ", key: "bangla_1st_CQ" },
//           { title: "MCQ", dataIndex: "bangla_1st_MCQ", key: "bangla_1st_MCQ" },
//           {
//             title: "total",
//             dataIndex: "bangla_1st_total",
//             key: "bangla_1st_total",
//           },
//         ],
//       },
//       {
//         title: "2nd",
//         width: 50,
//         children: [
//           { title: "CQ", dataIndex: "bangla_2nd_CQ", key: "bangla_2nd_CQ" },
//           { title: "MCQ", dataIndex: "bangla_2nd_MCQ", key: "bangla_2nd_MCQ" },
//           {
//             title: "total",
//             dataIndex: "bangla_2nd_total",
//             key: "bangla_2nd_total",
//           },
//         ],
//       },
//       {
//         title: "percentage",
//         width: 50,
//         children: [
//           { dataIndex: "bangla_percentage", key: "bangla_percentage" },
//         ],
//       },
//       {
//         title: "GP",
//         width: 50,
//         children: [{ dataIndex: "bangla_GP", key: "bangla_GP" }],
//       },
//     ],
//   },
//   {
//     title: "english",
//     width: 50,
//     children: [
//       {
//         title: "1st",
//         width: 50,
//         children: [
//           { title: "CQ", dataIndex: "english_1st_CQ", key: "english_1st_CQ" },
//           {
//             title: "total",
//             dataIndex: "english_1st_total",
//             key: "english_1st_total",
//           },
//         ],
//       },
//       {
//         title: "2nd",
//         width: 50,
//         children: [
//           { title: "CQ", dataIndex: "english_2nd_CQ", key: "english_2nd_CQ" },
//           {
//             title: "total",
//             dataIndex: "english_2nd_total",
//             key: "english_2nd_total",
//           },
//         ],
//       },
//       {
//         title: "total",
//         width: 50,
//         children: [{ dataIndex: "english_total", key: "english_total" }],
//       },
//       {
//         title: "percentage",
//         width: 50,
//         children: [
//           { dataIndex: "english_percentage", key: "english_percentage" },
//         ],
//       },
//       {
//         title: "GP",
//         width: 50,
//         children: [{ dataIndex: "english_GP", key: "english_GP" }],
//       },
//     ],
//   },
//   {
//     title: "accounting",
//     width: 50,
//     children: [
//       {
//         title: "1st",
//         width: 50,
//         children: [
//           {
//             title: "CQ",
//             dataIndex: "accounting_1st_CQ",
//             key: "accounting_1st_CQ",
//           },
//           {
//             title: "MCQ",
//             dataIndex: "accounting_1st_MCQ",
//             key: "accounting_1st_MCQ",
//           },
//           {
//             title: "total",
//             dataIndex: "accounting_1st_total",
//             key: "accounting_1st_total",
//           },
//         ],
//       },
//       {
//         title: "2nd",
//         width: 50,
//         children: [
//           {
//             title: "CQ",
//             dataIndex: "accounting_2nd_CQ",
//             key: "accounting_2nd_CQ",
//           },
//           {
//             title: "MCQ",
//             dataIndex: "accounting_2nd_MCQ",
//             key: "accounting_2nd_MCQ",
//           },
//           {
//             title: "total",
//             dataIndex: "accounting_2nd_total",
//             key: "accounting_2nd_total",
//           },
//         ],
//       },
//       {
//         title: "percentage",
//         width: 50,
//         children: [
//           { dataIndex: "accounting_percentage", key: "accounting_percentage" },
//         ],
//       },
//       {
//         title: "GP",
//         width: 50,
//         children: [{ dataIndex: "accounting_GP", key: "accounting_GP" }],
//       },
//     ],
//   },
//   {
//     title: "business",
//     width: 50,
//     children: [
//       {
//         title: "1st",
//         width: 50,
//         children: [
//           { title: "CQ", dataIndex: "business_1st_CQ", key: "business_1st_CQ" },
//           {
//             title: "MCQ",
//             dataIndex: "business_1st_MCQ",
//             key: "business_1st_MCQ",
//           },
//           {
//             title: "total",
//             dataIndex: "business_1st_total",
//             key: "business_1st_total",
//           },
//         ],
//       },
//       {
//         title: "2nd",
//         width: 50,
//         children: [
//           { title: "CQ", dataIndex: "business_2nd_CQ", key: "business_2nd_CQ" },
//           {
//             title: "MCQ",
//             dataIndex: "business_2nd_MCQ",
//             key: "business_2nd_MCQ",
//           },
//           {
//             title: "total",
//             dataIndex: "business_2nd_total",
//             key: "business_2nd_total",
//           },
//         ],
//       },
//       {
//         title: "percentage",
//         width: 50,
//         children: [
//           { dataIndex: "business_percentage", key: "business_percentage" },
//         ],
//       },
//       {
//         title: "GP",
//         width: 50,
//         children: [{ dataIndex: "business_GP", key: "business_GP" }],
//       },
//     ],
//   },
//   {
//     title: "production",
//     width: 50,
//     children: [
//       {
//         title: "1st",
//         width: 50,
//         children: [
//           {
//             title: "CQ",
//             dataIndex: "production_1st_CQ",
//             key: "production_1st_CQ",
//           },
//           {
//             title: "MCQ",
//             dataIndex: "production_1st_MCQ",
//             key: "production_1st_MCQ",
//           },
//           {
//             title: "total",
//             dataIndex: "production_1st_total",
//             key: "production_1st_total",
//           },
//         ],
//       },
//       {
//         title: "2nd",
//         width: 50,
//         children: [
//           {
//             title: "CQ",
//             dataIndex: "production_2nd_CQ",
//             key: "production_2nd_CQ",
//           },
//           {
//             title: "MCQ",
//             dataIndex: "production_2nd_MCQ",
//             key: "production_2nd_MCQ",
//           },
//           {
//             title: "total",
//             dataIndex: "production_2nd_total",
//             key: "production_2nd_total",
//           },
//         ],
//       },
//       {
//         title: "percentage",
//         width: 50,
//         children: [
//           { dataIndex: "production_percentage", key: "production_percentage" },
//         ],
//       },
//       {
//         title: "GP",
//         width: 50,
//         children: [{ dataIndex: "production_GP", key: "production_GP" }],
//       },
//     ],
//   },
//   {
//     title: "finance",
//     width: 50,
//     children: [
//       {
//         title: "1st",
//         width: 50,
//         children: [
//           { title: "CQ", dataIndex: "finance_1st_CQ", key: "finance_1st_CQ" },
//           {
//             title: "MCQ",
//             dataIndex: "finance_1st_MCQ",
//             key: "finance_1st_MCQ",
//           },
//           {
//             title: "total",
//             dataIndex: "finance_1st_total",
//             key: "finance_1st_total",
//           },
//         ],
//       },
//       {
//         title: "2nd",
//         width: 50,
//         children: [
//           { title: "CQ", dataIndex: "finance_2nd_CQ", key: "finance_2nd_CQ" },
//           {
//             title: "MCQ",
//             dataIndex: "finance_2nd_MCQ",
//             key: "finance_2nd_MCQ",
//           },
//           {
//             title: "total",
//             dataIndex: "finance_2nd_total",
//             key: "finance_2nd_total",
//           },
//         ],
//       },
//       {
//         title: "percentage",
//         width: 50,
//         children: [
//           { dataIndex: "finance_percentage", key: "finance_percentage" },
//         ],
//       },
//       {
//         title: "GP",
//         width: 50,
//         children: [{ dataIndex: "finance_GP", key: "finance_GP" }],
//       },
//     ],
//   },
//   {
//     title: "economics",
//     width: 50,
//     children: [
//       {
//         title: "1st",
//         width: 50,
//         children: [
//           {
//             title: "CQ",
//             dataIndex: "economics_1st_CQ",
//             key: "economics_1st_CQ",
//           },
//           {
//             title: "MCQ",
//             dataIndex: "economics_1st_MCQ",
//             key: "economics_1st_MCQ",
//           },
//           {
//             title: "total",
//             dataIndex: "economics_1st_total",
//             key: "economics_1st_total",
//           },
//         ],
//       },
//       {
//         title: "2nd",
//         width: 50,
//         children: [
//           {
//             title: "CQ",
//             dataIndex: "economics_2nd_CQ",
//             key: "economics_2nd_CQ",
//           },
//           {
//             title: "MCQ",
//             dataIndex: "economics_2nd_MCQ",
//             key: "economics_2nd_MCQ",
//           },
//           {
//             title: "total",
//             dataIndex: "economics_2nd_total",
//             key: "economics_2nd_total",
//           },
//         ],
//       },
//       {
//         title: "percentage",
//         width: 50,
//         children: [
//           { dataIndex: "economics_percentage", key: "economics_percentage" },
//         ],
//       },
//       {
//         title: "GP",
//         width: 50,
//         children: [{ dataIndex: "economics_GP", key: "economics_GP" }],
//       },
//     ],
//   },
//   {
//     title: "total",
//     width: 50,
//     children: [
//       {
//         title: "marks",
//         width: 50,
//         children: [{ dataIndex: "total_marks", key: "total_marks" }],
//       },
//       {
//         title: "gp",
//         width: 50,
//         children: [{ dataIndex: "total_gp", key: "total_gp" }],
//       },
//       {
//         title: "failed",
//         width: 50,
//         children: [{ dataIndex: "total_failed", key: "total_failed" }],
//       },
//     ],
//   },
//   {
//     title: "GPA",
//     width: 50,
//     children: [{ width: 50, children: [{ dataIndex: "GPA", key: "GPA" }] }],
//   },
//   { title: "merit", dataIndex: "merit", key: "merit", fixed: "right" },
// ];

// const data: DataType[] = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     roll: i + 1000,
//     name: "John Brown",
//     cq: "40",
//     mcq: "10",
//     percentage: "10",
//     gp: "10",
//     totalMarks: i * 7 + 351,
//     totalGP: 40 + i,
//     totalGPA: 4.5,
//     failedSub: 0,
//     merit: i + 1,
//   });
// }

const ResultsDataTable = () => {
  //   const [results, setResults] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [group, setGroup] = useState({
    value: "Science",
    table_name: "Science",
  });
  //   console.log(group);

  const {
    mutate: getGroupResults,
    data: results = { data: [], totalFailed: [] },
  } = useGetGroupResults();
  const { data: groupsAndDate } = useGetGroupsAndDate();
  useEffect(() => {
    getGroupResults({ table_name: group.table_name, year });
  }, [getGroupResults, group, year]);
  const { data: tableColumns } = useGetColumns(group.table_name);
  //   useEffect(() => {
  //     fetch("http://localhost:3000/api/table/tableColumns")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data, "columnn useeddct");
  //       });
  //   }, []);
  //   useEffect(() => {
  //     fetch("http://localhost:3000/api/results/results")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setResults(data);
  //       });
  //   }, []);
  // getGroupResults;getColumns

  const resolveNode = (arr: any, title: any) => {
    const node = arr.find((node: any) => node.title === title) ?? {
      title,
      width: 50,
      children: [],
    };
    if (!arr.includes(node)) arr.push(node);
    return node;
  };

  const setColumn = (input: any) => {
    const result: any = [];

    const roll = {
      title: "roll",
      width: 50,
      dataIndex: "roll",
      key: "roll",
      fixed: "left",
    };
    const name = {
      title: "name",
      width: 60,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    };
    result.push(roll);
    result.push(name);
    for (const { column_name } of input) {
      const columnName = [
        "id",
        "date",
        "group_name",
        "roll",
        "name",
        "merit",
        "year",
        "created_table_at",
      ];
      if (!columnName.includes(column_name)) {
        const [subject, part, suffix] = column_name.split("_");
        const s = resolveNode(result, subject);
        const p = resolveNode(s.children, part);
        // Don't create duplicates:
        if (!p.children.find((node: any) => node.title === suffix)) {
          p.children.push({
            title: suffix,
            dataIndex: column_name,
            key: column_name,
          });
        }
      }
    }
    const merit = {
      title: "merit",
      width: 60,
      dataIndex: "merit",
      key: "merit",
      fixed: "right",
    };
    result.push(merit);
    return result;
  };
  const setColumn2 = (input: any) => {
    const result: any = [];
    const roll = {
      title: "roll",
      width: 50,
      dataIndex: "roll",
      key: "roll",
      fixed: "left",
    };
    const name = {
      title: "name",
      width: 60,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    };
    result.push(roll);
    result.push(name);
    input.map(({ column_name }: any, i: number) => {
      const columnName = [
        "id",
        "date",
        "group_name",
        "roll",
        "name",
        "merit",
        "year",
        "created_table_at",
      ];
      if (!columnName.includes(column_name)) {
        const [subject, part, suffix] = column_name.split("_");
        if (suffix === "total") {
          result.push({
            title: subject + " " + part,
            dataIndex: column_name,
            key: i,
          });
        }
      }
    });
    const merit = {
      title: "merit",
      width: 60,
      dataIndex: "merit",
      key: "merit",
      fixed: "right",
    };
    result.push(merit);
    return result;
  };

  const column = setColumn2(tableColumns);
  //   const formattedJson = JSON.stringify(column, null, 2);
  const filterOptions = groupsAndDate.groups.map(
    (group: { group_name: string; table_name: string }) => ({
      value: group.group_name,
      label: group.group_name,
      table_name: group.table_name,
    })
  );
  return (
    <>
      <SearchFilter />
      <div className="flex justify-end">
        <Filter options={filterOptions} selectOption={setGroup} />
      </div>
      {/* <Table
        columns={column}
        dataSource={results.data}
        bordered
        size="middle"
        scroll={{ x: 3500 }}
        // scroll={{ x: "calc(700px + 50%)", y: 1000 }}
        // sticky
      /> */}
      <Table
        columns={column}
        dataSource={results.data}
        scroll={{ x: 1300 }}
        size="small"
      />
    </>
  );
};

export default ResultsDataTable;
