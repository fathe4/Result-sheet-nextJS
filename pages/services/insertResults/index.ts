const excelToJson = require("convert-excel-to-json");
import xlsx from "node-xlsx";

const calculateSubjectTotal = (total: number) => total;
const calculateSubjectPercentage = (subTotal: any) => {
  if (subTotal === 0) return 0;
  const percentage = ((subTotal / 100) * 100).toFixed(2);
  return Number(percentage);
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
const defineMerit = (markSheet: any) => {
  let merit = 1;
  for (let i = 0; i < markSheet.length; i++) {
    if (markSheet[i].total_failed == 0) {
      markSheet[i].merit = merit;
      merit++;
    } else {
      markSheet[i].merit = "Failed";
    }
  }
  const sorted = markSheet
    .filter((item: any) => item.merit !== "Failed")
    .sort((a: any, b: any) => a.merit - b.merit);
  return sorted.concat(
    markSheet.filter((item: any) => item.merit === "Failed")
  );
};

const insertResults = async (markSheetFile: Record<string, any>) => {
  const file = markSheetFile;
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
      "_total",
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
    const totalMarks = calculateTotalMarks(subjects);
    const totalGradePoint = calculateTotalGradePoint(subjectGradePoints);
    const GPA = calculateGPA(totalGradePoint, subjectGradePoints, subjects);
    const totalFailed = calculateTotalFailed(subjects);
    const merge = {
      id: null,
      roll,
      name,
      date: "2022",
      group_name: "business",
      english_total: subjects.english_1st_CQ + subjects.english_2nd_CQ,
      ...subjects,
      ...subjectTotal,
      ...subjectPercentages,
      ...subjectGradePoints,
      total_marks: totalMarks,
      total_GP: totalGradePoint,
      GPA,
      total_failed: totalFailed,
    };
    return merge;
  });

  return defineMerit(values);
};

export { insertResults };
