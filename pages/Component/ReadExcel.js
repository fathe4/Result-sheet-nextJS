import React from "react";
import * as XLSX from "xlsx";

export default function ReadExcel() {
  const onChange = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      convertToJson(data);
      //   console.log(data);
    };
    reader.readAsBinaryString(file);
  };
  const convertToJson = (csv) => {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    //return result; //JavaScript object
    const d = JSON.stringify(result); //JSON
    console.log(result);
  };
  return (
    <div>
      <input type="file" onChange={onChange} />
    </div>
  );
}
