const fs = require("fs");
const XLSX = require("xlsx");
import executeQuery from "../../../config/db";
var Excel = require("exceljs");

const downloadResults = async (req: any, res: any) => {
  //   const workbook = XLSX.readFile("./public/results/testUpload.xlsx");
  //   const workSheet = workbook.Sheets.markSheet;
  //   console.log(workSheet["!ref"]);
  //   //With this function you can see the range of your sheet that had data
  //   //You can create a function to parse this information
  //   //and obtain the range of cell where you want to obtain the values
  //   const valuesRange = ["A1", "B1", "C1", "D1"];
  //   let desiredCell: any = [];
  //   valuesRange.forEach((cell) => desiredCell.push(workSheet[cell]));
  //   const desiredValues = desiredCell
  //     ? desiredCell.map((cell: any) => cell.w)
  //     : undefined;
  //   console.log(desiredValues);
  // A new Excel Work Book
  const workbook = XLSX.readFile("./public/results/testUpload.xlsx");

  // Convert the XLSX to JSON
  let worksheets: any = {};
  for (const sheetName of workbook.SheetNames) {
    // Some helper functions in XLSX.utils generate different views of the sheets:
    //     XLSX.utils.sheet_to_csv generates CSV
    //     XLSX.utils.sheet_to_txt generates UTF16 Formatted Text
    //     XLSX.utils.sheet_to_html generates HTML
    //     XLSX.utils.sheet_to_json generates an array of objects
    //     XLSX.utils.sheet_to_formulae generates a list of formulae
    worksheets[sheetName] = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );
  }

  // Show the data as JSON
  console.log("json:\n", JSON.stringify(worksheets.markSheet), "\n\n");

  // Modify the XLSX
  worksheets.markSheet.push({
    Name: "Bob",
    Roll: "1",
  });

  // // Update the XLSX file
  // XLSX.utils.sheet_add_json(workbook.Sheets["Sheet1"], worksheets.Sheet1)
  // XLSX.writeFile(workbook, "file-example.xlsx");

  // Create a new XLSX file
  const newBook = XLSX.utils.book_new();
  const newSheet = XLSX.utils.json_to_sheet(worksheets.markSheet);
  XLSX.utils.book_append_sheet(newBook, newSheet, "markSheet");
  XLSX.writeFile(newBook, "./public/results/testUpload.xlsx");
  //   XLSX.utils.sheet_add_json(workbook.Sheets["markSheet"], worksheets.markSheet);
  //   XLSX.writeFile(workbook, "./public/results/testUpload.xlsx");
};

export { downloadResults };
