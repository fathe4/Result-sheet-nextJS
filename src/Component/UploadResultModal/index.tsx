import { Button, DatePicker, Form, message, Select, Upload } from "antd";
import type { UploadProps } from "antd";
import React, { useEffect, useState } from "react";
import Modal from "../Elements/Modal";
import { InboxOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import { Config } from "../../common/config";
const { Dragger } = Upload;

const UploadResultModal = () => {
  const [form] = Form.useForm();
  const [tables, setTables] = useState([]);
  const [year, setYear] = useState();
  const [fileName, setFileName] = useState();
  useEffect(() => {
    fetch(`${Config.baseUrl}/table/allTables`)
      .then((res) => res.json())
      .then((data) => setTables(data));
  }, []);
  //   const props: UploadProps = {
  //     name: "file",
  //     multiple: false,
  //     action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  //     onChange(info: any) {
  //       const { status } = info.file;
  //       if (status !== "uploading") {
  //         console.log(info.file, info.fileList);
  //       }
  //       if (status === "done") {
  //         message.success(`${info.file.name} file uploaded successfully.`);
  //         setFile(info.file.originFileObj);
  //         setFileName(info.file.name);
  //       } else if (status === "error") {
  //         message.error(`${info.file.name} file upload failed.`);
  //       }
  //     },
  //     onDrop(e) {
  //       console.log("Dropped files", e.dataTransfer.files);
  //     },
  //   };
  //   console.log(date);
  console.log(tables);

  const uploadResult = (values: any) => {
    console.log("s", values);

    const formData: any = new FormData();
    formData.append("file", values.file.file.originFileObj);
    formData.append("fileName", values.file.file.name);
    formData.append("group", values.group);
    formData.append("table", values.table);
    formData.append("year", year);
    fetch("/api/results/insertResults", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <Modal modalId="upload-result-modal" width="w-11/12 max-w-5xl">
        <Form form={form} name="result_form" onFinish={uploadResult}>
          <h1 className="font-bold text-2xl text-gray-700 my-2">
            Upload Result
          </h1>
          <Form.Item
            name="file"
            rules={[
              {
                required: true,
                message: "Please upload file",
              },
            ]}
          >
            <Dragger>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Dragger>
          </Form.Item>
          <div className="flex flex-row gap-3 justify-center my-6">
            <Form.Item
              name="group"
              rules={[
                {
                  required: true,
                  message: "Please select group",
                },
              ]}
            >
              <Select
                className="md:w-56 w-full md:py-0 py-2"
                size="large"
                placeholder="Select Group"
                aria-required
                //   onChange={setGroup}
              >
                <Option value="science">Science</Option>
                <Option value="business">Commerce</Option>
                <Option value="arts">Arts</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="table"
              rules={[
                {
                  required: true,
                  message: "Please select table",
                },
              ]}
            >
              <Select
                className="md:w-56 w-full md:py-0 py-2"
                size="large"
                placeholder="Select Table"
                aria-required
                //   onChange={setGroup}
              >
                {tables.map((table: { TablesName: string }, i: any) => (
                  <Option key={i} value={table.TablesName}>
                    {table.TablesName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please select date",
                },
              ]}
            >
              <DatePicker
                onChange={(date, dateString: any) => setYear(dateString)}
                className="md:w-56 w-full py-2 rounded"
                picker="year"
              />
            </Form.Item>
            <button
              type="submit"
              className="bg-gray-800 py-2 px-6 text-white rounded hover:bg-slate-900"
            >
              Upload
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default UploadResultModal;
