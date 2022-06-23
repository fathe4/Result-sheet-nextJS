import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import React from "react";

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

const App: React.FC = () => (
  <Table
    columns={columns}
    dataSource={data}
    bordered
    size="middle"
    // scroll={{ x: "calc(700px + 50%)", y: 240 }}
  />
);

export default App;
