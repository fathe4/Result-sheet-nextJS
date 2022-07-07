import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import React, { Children, useEffect, useState } from "react";

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

const columns: ColumnsType<DataType> = [
  {
    title: "Roll",
    dataIndex: "roll",
    key: "roll",
    width: 60,
    fixed: "left",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 150,
    fixed: "left",
  },
  {
    title: "Bangla",
    children: [
      {
        title: "1ST",
        children: [
          {
            title: "CQ",
            dataIndex: "cq",
          },
          {
            title: "MCQ",
            dataIndex: "mcq",
          },
        ],
      },
      {
        title: "2ND",
        children: [
          {
            title: "CQ",
            dataIndex: "cq",
          },
          {
            title: "MCQ",
            dataIndex: "mcq",
          },
        ],
      },
      {
        title: "AVG.",
        children: [
          {
            title: "%",
            dataIndex: "percentage",
          },
          {
            title: "GP",
            dataIndex: "gp",
          },
        ],
      },
    ],
  },
  {
    title: "English",
    children: [
      {
        title: "1ST",
        children: [
          {
            title: "CQ",
            dataIndex: "cq",
          },
          {
            title: "MCQ",
            dataIndex: "mcq",
          },
        ],
      },
      {
        title: "2ND",
        children: [
          {
            title: "CQ",
            dataIndex: "cq",
          },
          {
            title: "MCQ",
            dataIndex: "mcq",
          },
        ],
      },
      {
        title: "AVG.",
        children: [
          {
            title: "%",
            dataIndex: "percentage",
          },
          {
            title: "GP",
            dataIndex: "gp",
          },
        ],
      },
    ],
  },
  {
    title: "Physics",
    children: [
      {
        title: "1ST",
        children: [
          {
            title: "CQ",
            dataIndex: "cq",
          },
          {
            title: "MCQ",
            dataIndex: "mcq",
          },
        ],
      },
      {
        title: "2ND",
        children: [
          {
            title: "CQ",
            dataIndex: "cq",
          },
          {
            title: "MCQ",
            dataIndex: "mcq",
          },
        ],
      },
      {
        title: "AVG.",
        children: [
          {
            title: "%",
            dataIndex: "percentage",
          },
          {
            title: "GP",
            dataIndex: "gp",
          },
        ],
      },
    ],
  },
  {
    title: "Chemistry",
    children: [
      {
        title: "1ST",
        children: [
          {
            title: "CQ",
            dataIndex: "cq",
          },
          {
            title: "MCQ",
            dataIndex: "mcq",
          },
        ],
      },
      {
        title: "2ND",
        children: [
          {
            title: "CQ",
            dataIndex: "cq",
          },
          {
            title: "MCQ",
            dataIndex: "mcq",
          },
        ],
      },
      {
        title: "AVG.",
        children: [
          {
            title: "%",
            dataIndex: "percentage",
          },
          {
            title: "GP",
            dataIndex: "gp",
          },
        ],
      },
    ],
  },
  {
    title: "Mathematics",
    children: [
      {
        title: "1ST",
        children: [
          {
            title: "CQ",
            dataIndex: "cq",
          },
          {
            title: "MCQ",
            dataIndex: "mcq",
          },
        ],
      },
      {
        title: "2ND",
        children: [
          {
            title: "CQ",
            dataIndex: "cq",
          },
          {
            title: "MCQ",
            dataIndex: "mcq",
          },
        ],
      },
      {
        title: "AVG.",
        children: [
          {
            title: "%",
            dataIndex: "percentage",
          },
          {
            title: "GP",
            dataIndex: "gp",
          },
        ],
      },
    ],
  },
  {
    title: "Biology",
    children: [
      {
        title: "1ST",
        children: [
          {
            title: "CQ",
            dataIndex: "cq",
          },
          {
            title: "MCQ",
            dataIndex: "mcq",
          },
        ],
      },
      {
        title: "2ND",
        children: [
          {
            title: "CQ",
            dataIndex: "cq",
          },
          {
            title: "MCQ",
            dataIndex: "mcq",
          },
        ],
      },
      {
        title: "AVG.",
        children: [
          {
            title: "%",
            dataIndex: "percentage",
          },
          {
            title: "GP",
            dataIndex: "gp",
          },
        ],
      },
    ],
  },
  {
    title: "Total Marks (600)",
    width: 60,
    dataIndex: "totalMarks",
  },
  {
    title: "Total GP (30)",
    width: 50,
    dataIndex: "totalGP",
  },
  {
    title: "GPA",
    width: 50,
    dataIndex: "totalGPA",
  },
  {
    title: "No of failed sub",
    width: 55,
    dataIndex: "failedSub",
  },
  {
    title: "Merit",
    width: 50,
    dataIndex: "merit",
  },
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    roll: i + 1000,
    name: "John Brown",
    cq: "40",
    mcq: "10",
    percentage: "10",
    gp: "10",
    totalMarks: i * 7 + 351,
    totalGP: 40 + i,
    totalGPA: 4.5,
    failedSub: 0,
    merit: i + 1,
  });
}

const App = () => {
  const [results, setResults] = useState([]);
  const [tableColumn, setTableColumn] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/table/table")
      .then((res) => res.json())
      .then((data) => {
        setTableColumn(data);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/api/results/results")
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      });
  }, []);
  //   const [subjectName, subjectPosition, suffix] = result.field?.split("_");
  //   console.log(results);
  //   const structureData = (results: any) => {
  //     return results.reduce((result: any, value: any) => {
  //       if (value.Field.includes("_")) {
  //         const [subjectName, subjectPosition, suffix] = value.Field.split("_");
  //         console.log(value.Field);

  //         result.title = subjectName;
  //         result.children = [
  //           {
  //             title: subjectPosition,
  //             children: [
  //               {
  //                 title: suffix,
  //                 dataIndex: suffix,
  //               },
  //             ],
  //           },
  //         ];
  //       }
  //       return result;
  //     }, []);
  //   };
  //   const sResults = [
  //     { Field: "name" },
  //     { Field: "english_1st_CQ" },
  //     { Field: "english_1st_MCQ" },
  //     { Field: "english_2nd_CQ" },
  //     { Field: "english_2nd_MCQ" },
  //     { Field: "english_1st_total" },
  //   ];

  function resolveNode(arr: any, title: any) {
    const node = arr.find((node: any) => node.title === title) ?? {
      title,
      width: 10,
      fixed: "left",
      children: [],
    };
    if (!arr.includes(node)) arr.push(node);
    return node;
  }

  function setColumn(input: any) {
    const result: any = [];
    for (const { Field } of input) {
      if (Field != "id" && Field != "date" && Field != "group_name") {
        const [subject, part, suffix] = Field.split("_");
        const s = resolveNode(result, subject);
        const p = resolveNode(s.children, part);
        // Don't create duplicates:
        if (!p.children.find((node: any) => node.title === suffix)) {
          p.children.push({ title: suffix, dataIndex: Field, width: 10 });
        }
      }
    }
    return result;
  }
  const column = setColumn(tableColumn);
  const formattedJson = JSON.stringify(column, null, 2);
  console.log(column);

  return (
    <Table
      columns={column}
      dataSource={data}
      bordered
      size="middle"
      //   scroll={{ x: 3000, y: 200 }}
    />
  );
};

export default App;
