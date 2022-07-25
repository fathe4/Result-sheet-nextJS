import { Button, DatePicker, message, Select, Upload } from "antd";
import type { UploadProps } from "antd";
import React from "react";
import Modal from "../Elements/Modal";
import { InboxOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
const { Dragger } = Upload;
const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const UploadResultModal = () => {
  return (
    <div>
      <Modal modalId="upload-result-modal" width="w-11/12 max-w-5xl">
        <h1 className="font-bold text-2xl text-gray-700 my-2">Upload Result</h1>
        <Dragger {...props}>
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
        <div className="flex flex-row gap-3 justify-center my-6">
          <Select
            className="md:w-56 w-full md:py-0 py-2"
            size="large"
            placeholder="Select Group"
            //   onChange={setGroup}
          >
            <Option value="science">Science</Option>
            <Option value="business">Commerce</Option>
            <Option value="arts">Arts</Option>
          </Select>
          <DatePicker className="md:w-56 w-full py-2 rounded" picker="year" />
          <button className="bg-gray-800 py-2 px-6 text-white rounded hover:bg-slate-900">
            Upload
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UploadResultModal;
