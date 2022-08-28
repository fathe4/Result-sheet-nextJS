import type { NextPage } from "next";
import Head from "next/head";
import * as React from "react";
import "antd/dist/antd.css";
import ResultsDataTable from "../Component/ResultsDataTable";

const Home: NextPage = () => {
  const [file, setFile] = React.useState<any>();
  const [fileName, setFileName] = React.useState<any>();
  const saveFile = (e: any) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e: any) => {
    e.preventDefault();
    console.log(file, fileName);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    // setIsLoading(true)
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
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://cdn.tailwindcss.com"></script>
      </Head>
      <input
        onChange={saveFile}
        id="file-upload"
        name="file-upload"
        type="file"
      />
      <button
        onClick={(e) => uploadFile(e)}
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent drop-shadow-md text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        form="form2"
      >
        Upload
      </button>
      <ResultsDataTable />
    </div>
  );
};

export default Home;
