const excelToJson = require("convert-excel-to-json");
import xlsx from "node-xlsx";
import upload from "../../middleware/middleware";
import apiRoute from "./apiRoute";

apiRoute.use(upload.array("file"));

const calculateSubjectTotal = (total: number) => total;
const calculateSubjectPercentage = (subTotal: any) => {
  if (subTotal === 0) return 0;
  return (subTotal / 100) * 100 - 4;
};
const calculateGradePoint = (percentage: number) => {
  if (percentage === 0) return 0;
  let GP;
  if (percentage >= 80) GP = 5;
  if (percentage >= 70 && percentage <= 79) GP = 4;
  if (percentage >= 60 && percentage <= 69) GP = 3.5;
  if (percentage >= 50 && percentage <= 59) GP = 3;
  if (percentage >= 40 && percentage <= 49) GP = 2;
  if (percentage >= 33 && percentage <= 39) GP = 1;
  if (percentage < 33) GP = 0;
  return GP;
};

const calculateTotalMarks = (subjects: any) => {
  let total = 0;
  Object.keys(subjects).map(function (key: any, index) {
    if (
      subjects[key] !== "N" &&
      subjects[key] !== "A" &&
      subjects[key] !== "O"
    ) {
      total = subjects[key] + total;
    }
  });
  return total;
};

const calculateTotalGradePoint = (calculateGradePoints: any) => {
  return Object.entries(calculateGradePoints).reduce(
    (total: any, [key, value]) => total + value,
    0
  );
};
const calculateGPA = (
  totalGradePoint: number,
  calculateGradePoints: any,
  subjects: any
) => {
  const forthSub1 = calculateGradePoints.production_GP;
  const forthSub2 = calculateGradePoints.economics_GP;
  const totalSubWithoutFourthSub = 5;
  if (Object.values(subjects).includes("A")) return "Failed";
  if (forthSub1 == 0 || forthSub2 == 0) {
    if (forthSub2 >= 2 || forthSub1 >= 2) {
      totalGradePoint = totalGradePoint - 2;
    }
  }
  return totalGradePoint / totalSubWithoutFourthSub;
};
const calculateTotalFailed = (subjects: any) => {
  let totalFailed = 0;
  for (const key in subjects) {
    if (subjects[key] == "A") {
      ++totalFailed;
    }
  }
  return totalFailed;
};
const calculateSubjectNumbers = (
  object: any,
  isUnderscoreTrue: boolean,
  PropertySuffixText: string,
  callbackFunction: any
) => {
  return Object.entries(object).reduce((result: any, [key, value]) => {
    const [subjectName, subjectPosition, suffix] = key.split("_");
    const fullSubjectName = isUnderscoreTrue
      ? `${subjectName}_${subjectPosition}`
      : subjectName;
    if (value === "N" || value === "A" || value === "O") {
      value = 0;
    }
    if (!result[fullSubjectName + PropertySuffixText]) {
      result[fullSubjectName + PropertySuffixText] = 0;
    }
    result[fullSubjectName + PropertySuffixText] = callbackFunction(
      (result[fullSubjectName + PropertySuffixText] += value)
    );
    return result;
  }, {});
};

apiRoute.post(async (req: any, res) => {
  const file = req.files[0];
  const filename = file.filename;
  const worksheetsArray = xlsx.parse(`./public/uploads/${filename}`);
  const excelData = excelToJson({
    sourceFile: `./public/uploads/${filename}`,
    sheets: [
      {
        // Excel Sheet Name
        name: worksheetsArray[0].name,
        // Header Row -> be skipped and will not be present at our result object.
        header: {
          rows: 3,
        },
        // Mapping columns to keys
        columnToKey: {
          A: "roll",
          B: "name",
          C: "bangla_1st_CQ",
          D: "bangla_1st_MCQ",
          E: "bangla_2nd_CQ",
          F: "bangla_2nd_MCQ",
          G: "english_1st_CQ",
          H: "english_2nd_CQ",
          I: "accounting_1st_CQ",
          J: "accounting_1st_MCQ",
          K: "accounting_2nd_CQ",
          L: "accounting_2nd_MCQ",
          M: "business_1st_CQ",
          N: "business_1st_MCQ",
          O: "business_2nd_CQ",
          P: "business_2nd_MCQ",
          Q: "production_1st_CQ",
          R: "production_1st_MCQ",
          S: "production_2nd_CQ",
          T: "production_2nd_MCQ",
          U: "finance_1st_CQ",
          V: "finance_1st_MCQ",
          W: "finance_2nd_CQ",
          X: "finance_2nd_MCQ",
          Y: "economics_1st_CQ",
          Z: "economics_1st_MCQ",
          AA: "economics_2nd_CQ",
          AB: "economics_2nd_MCQ",
        },
      },
    ],
  });

  const values = excelData.markSheet.map((markSheet: any) => {
    const { roll, name, ...subjects } = markSheet;

    const subjectTotal = calculateSubjectNumbers(
      subjects,
      true,
      "",
      calculateSubjectTotal
    );
    const subjectPercentages = calculateSubjectNumbers(
      subjectTotal,
      false,
      "_percentage",
      calculateSubjectPercentage
    );
    const subjectGradePoints = calculateSubjectNumbers(
      subjectPercentages,
      false,
      "_GP",
      calculateGradePoint
    );
    console.log(subjectTotal, "subjectTotal");
    console.log(subjectPercentages, "subjectPercentages");
    console.log(subjectGradePoints, "subjectGradePoints");

    const totalMarks = calculateTotalMarks(subjects);
    const totalGradePoint = calculateTotalGradePoint(subjectGradePoints);
    const GPA = calculateGPA(totalGradePoint, subjectGradePoints, subjects);
    const totalFailed = calculateTotalFailed(subjects);
    console.log(totalMarks, totalGradePoint, GPA, totalFailed);

    // return [
    // //   null,
    // //   roll,
    // //   name,
    // //   "2022",
    // //   "business",
    // //   rest,
    //   //   bangla_1st_CQ.toString(),
    //   //   bangla_1st_MCQ.toString(),
    //   //   subjectTotal.bangla_1st.toString(),
    //   //   bangla_2nd_CQ.toString(),
    //   //   bangla_2nd_MCQ.toString(),
    //   //   subjectTotal.bangla_2nd.toString(),
    //   //   bangla_percentage.percentage.toString(),
    //   //   bangla_GP.GP.toString(),
    //   //   english_1st_CQ.toString(),
    //   //   english_2nd_CQ.toString(),
    //   //   (subjectTotal.english_1st + subjectTotal.english_2nd).toString(),
    //   //   english_percentage.percentage.toString(),
    //   //   english_percentage.GP.toString(),
    //   //   accounting_1st_CQ.toString(),
    //   //   accounting_1st_MCQ.toString(),
    //   //   subjectTotal.accounting_1st.toString(),
    //   //   accounting_2nd_CQ.toString(),
    //   //   accounting_2nd_MCQ.toString(),
    //   //   subjectTotal.accounting_2nd.toString(),
    //   //   accounting_percentage.percentage.toString(),
    //   //   accounting_percentage.GP.toString(),
    //   //   business_1st_CQ.toString(),
    //   //   business_1st_MCQ.toString(),
    //   //   subjectTotal.business_1st.toString(),
    //   //   business_2nd_CQ.toString(),
    //   //   business_2nd_MCQ.toString(),
    //   //   subjectTotal.business_2nd.toString(),
    //   //   business_percentage.percentage.toString(),
    //   //   business_percentage.GP.toString(),
    //   //   production_1st_CQ.toString(),
    //   //   production_1st_MCQ.toString(),
    //   //   subjectTotal.production_1st.toString(),
    //   //   production_2nd_CQ.toString(),
    //   //   production_2nd_MCQ.toString(),
    //   //   subjectTotal.production_2nd.toString(),
    //   //   production_percentage.percentage.toString(),
    //   //   production_percentage.GP.toString(),
    //   //   finance_1st_CQ.toString(),
    //   //   finance_1st_MCQ.toString(),
    //   //   subjectTotal.finance_1st.toString(),
    //   //   finance_2nd_CQ.toString(),
    //   //   finance_2nd_MCQ.toString(),
    //   //   subjectTotal.finance_2nd.toString(),
    //   //   finance_percentage.percentage.toString(),
    //   //   finance_percentage.GP.toString(),
    //   //   economics_1st_CQ.toString(),
    //   //   economics_1st_MCQ.toString(),
    //   //   subjectTotal.economics_1st.toString(),
    //   //   economics_2nd_CQ.toString(),
    //   //   economics_2nd_MCQ.toString(),
    //   //   subjectTotal.economics_2nd.toString(),
    //   //   economics_percentage.percentage.toString(),
    //   //   economics_percentage.GP.toString(),
    //   calculateTotalMarks(rest).toString(),
    //   totalGP().GP.toString(),
    //   totalGP().GPA.toString(),
    //   totalGP().totalFailed.toString(),
    //   "",
    //   //   res.status(200).json({ data: worksheetsArray });
    // ];
    // return [
    //   roll,
    //   name,
    //   date: "2022",
    //   group: "business",
    //   bangla_1st_CQ,
    //   bangla_1st_MCQ,
    //   bangla_1st_total: subjectTotal.bangla_1st,
    //   bangla_2nd_CQ,
    //   bangla_2nd_MCQ,
    //   bangla_2nd_total: subjectTotal.bangla_2nd,
    //   bangla_percentage: bangla_percentage.percentage,
    //   bangla_GP: bangla_GP.GP,
    //   english_1st_CQ,
    //   english_2nd_CQ,
    //   english_total: subjectTotal.english_1st + subjectTotal.english_2nd,
    //   english_percentage: english_percentage.percentage,
    //   english_GP: english_percentage.GP,
    //   accounting_1st_CQ,
    //   accounting_1st_MCQ,
    //   accounting_1st_total: subjectTotal.accounting_1st,
    //   accounting_2nd_CQ,
    //   accounting_2nd_MCQ,
    //   accounting_2nd_total: subjectTotal.accounting_2nd,
    //   accounting_percentage: accounting_percentage.percentage,
    //   accounting_GP: accounting_percentage.GP,
    //   business_1st_CQ,
    //   business_1st_MCQ,
    //   business_1st_total: subjectTotal.business_1st,
    //   business_2nd_CQ,
    //   business_2nd_MCQ,
    //   business_2nd_total: subjectTotal.business_2nd,
    //   business_percentage: business_percentage.percentage,
    //   business_GP: business_percentage.GP,
    //   production_1st_CQ,
    //   production_1st_MCQ,
    //   production_1st_total: subjectTotal.production_1st,
    //   production_2nd_CQ,
    //   production_2nd_MCQ,
    //   production_2nd_total: subjectTotal.production_2nd,
    //   production_percentage: production_percentage.percentage,
    //   production_GP: production_percentage.GP,
    //   finance_1st_CQ,
    //   finance_1st_MCQ,
    //   finance_1st_total: subjectTotal.finance_1st,
    //   finance_2nd_CQ,
    //   finance_2nd_MCQ,
    //   finance_2nd_total: subjectTotal.finance_2nd,
    //   finance_percentage: finance_percentage.percentage,
    //   finance_GP: finance_percentage.GP,
    //   economics_1st_CQ,
    //   economics_1st_MCQ,
    //   economics_1st_total: subjectTotal.economics_1st,
    //   economics_2nd_CQ,
    //   economics_2nd_MCQ,
    //   economics_2nd_total: subjectTotal.economics_2nd,
    //   economics_percentage: economics_percentage.percentage,
    //   economics_GP: economics_percentage.GP,
    //   total_marks: calculateTotalMarks(rest),
    //   total_gp: totalGP().GP,
    //   GPA: totalGP().GPA,
    //   Total_Failed_Sub: totalGP().totalFailed,
    //   merit: "",
    //   //   res.status(200).json({ data: worksheetsArray });
    // ];
  });
  //   console.log(values);
  //   const sql =
  //     "INSERT INTO business (id, roll, name, date, group_name, bangla_1st_CQ, bangla_1st_MCQ,bangla_1st_total,bangla_2nd_CQ,bangla_2nd_MCQ,bangla_2nd_total,bangla_percentage,bangla_GP,english_1st_CQ,english_2nd_CQ,english_total,english_percentage,english_GP,accounting_1st_CQ,accounting_1st_MCQ,accounting_1st_total,accounting_2nd_CQ,accounting_2nd_MCQ,accounting_2nd_total,accounting_percentage,accounting_GP,business_1st_CQ,business_1st_MCQ,business_1st_total,business_2nd_CQ,business_2nd_MCQ,business_2nd_total,business_percentage,business_GP,production_1st_CQ,production_1st_MCQ,production_1st_total,production_2nd_CQ,production_2nd_MCQ,production_2nd_total,production_percentage,production_GP,finance_1st_CQ,finance_1st_MCQ,finance_1st_total,finance_2nd_CQ,finance_2nd_MCQ,finance_2nd_total,finance_percentage,finance_GP,economics_1st_CQ,economics_1st_MCQ,economics_1st_total,economics_2nd_CQ,economics_2nd_MCQ,economics_2nd_total,economics_percentage,economics_GP,total_marks,total_gp,GPA,Total_Failed_Sub,merit) values ?;";
  //   const sql = `INSERT INTO test (ID, Name, Address, Phone, HomeAddress) values ?;`;
  //   const sql =
  // "INSERT INTO test (ID, Name, Address, Phone, HomeAddress) VALUES (1, 'Ajeet Kumar','madhabdi', 27, 'Allahabad')";
  //   const values = [
  //     [2, "fathe", "Dhaka", 1017310, "Madhabdi"],
  //     [3, "fathe", "Dhaka", 1017310, "Madhabdi"],
  //   ];
  //   dbconnection.query(sql, [values], function (err: any, result: any) {
  //     if (err) throw err;
  //     console.log("Number of records inserted: " + result.affectedRows);
  //   });
  //   dbconnection.query(sql, [values], function (err: any, results: any) {
  //     console.log(results, err);
  //   });
  //   dbconnection.query(sql, [values], function (err: any, results: any) {
  //     console.log(results, err);
  //   });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
