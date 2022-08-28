import { Popconfirm, Select, Form, Table, Input, Button } from "antd";
import { Option } from "antd/lib/mentions";
import { ColumnsType } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import React, { useEffect, useState } from "react";
import Modal from "../Elements/Modal";

interface DataType {
  column_name: string;
  key: string;
}
// function convertToColumn(n: any) {
//   if (n == 0) return null;
//   let result = "";
//   while (n > 0) {
//     let r = n % 26;
//     let d = n / 26;
//     if (r == 0) {
//       r = 26;
//       d = d - 1;
//     }
//     result += String.fromCharCode(64 + r);
//     n = d;
//   }

//   return result.split("").reverse().join("");
// }
//   const addKeyLetter = (data: any) => {
//     const mapped = data.map((item: any, i: number) => ({
//       [convertToColumn(i + 1)]: item.column_name,
//     }));
//     const object = Object.assign({}, ...mapped);
//     console.log(object);
//   };
//   addKeyLetter(dataSource);
function convertToColumn(n: any) {
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
}: {
  tableName: string;
}) {
  const [dataSource, setDataSource] = useState([]);
  const [editingRow, setEditingRow] = useState<any>(null);
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectColumn, setSelectColumn] = useState("");
  const [table, setTable] = useState([]);
  const toggle = () => setIsTrue(!isTrue);
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
            onConfirm={() => deleteColumn(record.column_name)}
          >
            <a className="text-white font-bold py-1 px-3 rounded text-xs !bg-red-600 hover:bg-blue-dark">
              Delete
            </a>
          </Popconfirm>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/table/tableColumns?tableName="${tableName}"`
    )
      .then((res) => res.json())
      .then((data) => setDataSource(data));
  }, [tableName]);
  console.log(table);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
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
  const deleteColumn = (columnName: string) => {
    console.log(columnName, columnName);

    fetch("/api/table/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableName,
        columnName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleCreateHeading = (e: any) => {
    e.preventDefault();
    const heading = e.target.heading.value;
    fetch("/api/table/createTableHeadings", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        heading: heading?.split(" ")?.join("_"),
        tableName,
        afterColumn: selectColumn,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleUpdateColumn = (
    previousColumnName: string,
    currentColumnName: string
  ) => {
    fetch("/api/table/updateTableColumn", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableName,
        previousColumnName,
        currentColumnName: currentColumnName?.split(" ")?.join("_"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  console.log(dataSource);
  const onFinish = (values: any) => {
    // const updatedDataSource: any = [...dataSource];
    const updateArray: any = dataSource.map((item: any) => {
      if (item.column_name === editingRow) {
        return { ...item, column_name: values.column_name };
      }
      return item;
    });

    setDataSource(updateArray);
    handleUpdateColumn(editingRow, values.column_name);
    setEditingRow(null);
  };

  console.log(JSON.stringify(dataSource));

  return (
    <>
      {/* <button
        className="text-white font-bold py-1 px-3 rounded text-xs bg-indigo-600 hover:bg-green-dark mr-3 cursor-pointer"
        onClick={() => toggle()}
      >
        Edit
      </button>
      <div
        className={`fixed z-10 overflow-y-auto top-0 w-full left-0 ${
          isTrue ? "" : "hidden"
        }`}
        id="modal"
      >
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>

        </div>
      </div> */}
      <Modal modalId="table-heading-modal" width="w-4/12 max-w-5/12">
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
                {dataSource.map((column: any, i) => (
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
          <Form form={form} onFinish={onFinish}>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={dataSource}
              size="small"
              pagination={false}
            />
          </Form>
          {/* <table className="text-left w-full border-collapse">
            <thead>
              <tr>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Heading
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-right	">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {table.map((column: any, i) => (
                <tr key={i} className="hover:bg-grey-lighter">
                  <td className="py-4 px-6 border-b border-grey-light">
                    {column.column_name}
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light text-right">
                    <a
                      href="#"
                      className="text-white font-bold py-1 px-3 rounded text-xs bg-gray-700 mr-2 hover:bg-blue-dark"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="text-white font-bold py-1 px-3 rounded text-xs bg-red-600 hover:bg-blue-dark"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
          <div className="px-4 py-3 text-right">
            <button className="bg-gray-700 py-2 px-6 text-white rounded hover:bg-slate-900">
              Update
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
