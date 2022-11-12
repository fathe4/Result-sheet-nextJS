import { Popconfirm, Select, Form, Table, Input, Button } from "antd";
import { Option } from "antd/lib/mentions";
import { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import {
  useCreateColumn,
  useDeleteColumn,
  useUpdateColumn,
} from "../../hooks/Mutation";
import { useGetColumns } from "../../hooks/Query";

interface DataType {
  column_name: string;
  key: string;
}
function convertToColumn(n: number) {
  if (n == 0) return null;
  let result = "";
  while (n > 0) {
    let r = n % 26;
    let d = parseInt(n / 26);
    if (r == 0) {
      r = 26;
      d = d - 1;
    }
    result += String.fromCharCode(64 + r);
    n = d;
  }
  return result.split("").reverse().join("");
}
const addKeyLetter = (data: any = []) => {
  const mapped = data
    .filter(
      (item: any) =>
        item.column_name != "id" &&
        item.column_name != "group_name" &&
        item.column_name != "date" &&
        item.column_name != "created_table_at"
    )
    .map((item: any, i: any) => ({
      [convertToColumn(i + 1)]: item.column_name,
    }));
  const object = Object.assign({}, ...mapped);
  return object;
  //   console.log(object);
};

export default function TableHeadingPopup({
  tableName,
  setTableName,
}: {
  tableName: string;
  setTableName: Function;
}) {
  //   const [tableColumns, setTableColumns] = useState([]);
  const [editingRow, setEditingRow] = useState<any>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectColumn, setSelectColumn] = useState("");
  const [form] = Form.useForm();

  const columns: ColumnsType<DataType> = [
    {
      title: "Key",
      key: "key",
      dataIndex: "key",
      render: (text, record, i) => {
        console.log(text, record);
        if (
          record.column_name != "id" &&
          record.column_name != "group_name" &&
          record.column_name != "date" &&
          record.column_name != "created_table_at"
        ) {
          return convertToColumn(i + 1 - 4);
        }
      },
    },
    {
      title: "Heading",
      key: "column_name",
      dataIndex: "column_name",
      render: (text, record) => {
        if (editingRow === record.column_name) {
          return (
            <Form.Item
              className="m-0"
              name="column_name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <div className="">
          {editingRow !== record.column_name && (
            <a
              onClick={() => {
                setEditingRow(record.column_name);
                form.setFieldsValue({
                  column_name: record.column_name,
                });
              }}
              className="text-white font-bold py-1 px-3 rounded text-xs bg-gray-700 mr-2 hover:bg-blue-dark"
            >
              Edit
            </a>
          )}
          {editingRow === record.column_name && (
            <Button
              size="small"
              className="text-xs text-white font-bold py-1 px-3 rounded bg-green-500 mr-2 hover:bg-green-600 hover:text-white"
              htmlType="submit"
            >
              Save
            </Button>
          )}

          <Popconfirm
            title="Sure to delete?"
            onConfirm={() =>
              deleteColumn({ columnName: record.column_name, tableName })
            }
          >
            <a className="text-white font-bold py-1 px-3 rounded text-xs !bg-red-600 hover:bg-blue-dark">
              Delete
            </a>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const { data: tableColumns } = useGetColumns(tableName);
  const { mutate: deleteColumn } = useDeleteColumn();
  const { mutate: createColumn } = useCreateColumn();
  const { mutate: updateColumn } = useUpdateColumn();

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    // getCheckboxProps: (record: any) => ({
    //   disabled: record.column_name === "Disabled User", // Column configuration not to be checked
    //   column_name: record.column_name,
    // }),
  };

  const handleCreateHeading = (e: any) => {
    e.preventDefault();
    const heading = e.target.heading.value;
    createColumn({
      heading: heading?.split(" ")?.join("_"),
      tableName,
      afterColumn: selectColumn,
    });
  };
  const handleUpdateColumn = (values: any) => {
    updateColumn({
      tableName,
      previousColumnName: editingRow,
      currentColumnName: values.column_name?.split(" ")?.join("_"),
    });
  };

  return (
    <>
      <div className="">
        <input
          type="checkbox"
          id="table-heading-modal"
          className="modal-toggle"
        />
        <div className="modal">
          <div className={`modal-box relative py-12 w-4/12 max-w-5/12`}>
            <label
              htmlFor="table-heading-modal"
              onClick={() => setTableName("")}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <div className="">
              <form onSubmit={handleCreateHeading} className="p-3">
                <h3 className="text-2xl mb-3">
                  <span className="font-extrabold">Table: </span>
                  {tableName}
                </h3>
                <label className="text-sm font-medium text-gray-700 my-6">
                  Create heading
                </label>

                <div className="flex flex-row gap-2">
                  <div className="w-96">
                    <input
                      className="shadow appearance-none border rounded w-full py-1.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="heading"
                      type="text"
                      required
                      placeholder="Value"
                    />
                  </div>
                  <Select
                    showSearch
                    onChange={(e: any) => setSelectColumn(e)}
                    placeholder="Add after"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {tableColumns.map((column: any, i: number) => (
                      <React.Fragment key={i}>
                        <Option value={column.column_name}>
                          {column.column_name}
                        </Option>
                      </React.Fragment>
                    ))}
                  </Select>

                  <div className="text-right ">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-1.5 px-5 bg-gray-700 rounded text-white hover:bg-gray-800"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
              <Form form={form} onFinish={handleUpdateColumn}>
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={tableColumns}
                  size="small"
                  pagination={false}
                />
              </Form>
              <div className="px-4 py-3 text-right">
                <button className="bg-gray-700 py-2 px-6 text-white rounded hover:bg-slate-900">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
