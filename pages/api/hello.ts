import nextConnect from "next-connect";
import multer from "multer";
const excelToJson = require("convert-excel-to-json");
import xlsx from "node-xlsx";
// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) =>
      cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res: any) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array("file"));

apiRoute.post((req: any, res) => {
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
  //   console.log(excelData);
  //   const calculatePercentage = (sub1st:number,sub2nd:number)=> ();
  const calculatePercentage = (subTotal: any) => {
    if (subTotal === 0) return { percentage: 0, GP: 0 };
    // console.log(subTotal);
    const percentage = (subTotal / 100) * 100 - 4;
    let GP;
    if (percentage >= 80) GP = 5;
    if (percentage >= 70 && percentage <= 79) GP = 4;
    if (percentage >= 60 && percentage <= 69) GP = 3.5;
    if (percentage >= 50 && percentage <= 59) GP = 3;
    if (percentage >= 40 && percentage <= 49) GP = 2;
    if (percentage >= 33 && percentage <= 39) GP = 1;
    if (percentage < 33) GP = 0;
    return { percentage, GP };
  };

  // const result = excelData.Customers.map(row => row)
  const withImages = excelData.markSheet.map((customer: any) => {
    const {
      roll,
      name,

      ...rest
    } = customer;
    const {
      bangla_1st_CQ,
      bangla_1st_MCQ,
      bangla_2nd_CQ,
      bangla_2nd_MCQ,
      english_1st_CQ,
      english_2nd_CQ,
      accounting_1st_CQ,
      accounting_1st_MCQ,
      accounting_2nd_CQ,
      accounting_2nd_MCQ,
      business_1st_CQ,
      business_1st_MCQ,
      business_2nd_CQ,
      business_2nd_MCQ,
      production_1st_CQ,
      production_1st_MCQ,
      production_2nd_CQ,
      production_2nd_MCQ,
      finance_1st_CQ,
      finance_1st_MCQ,
      finance_2nd_CQ,
      finance_2nd_MCQ,
      economics_1st_CQ,
      economics_1st_MCQ,
      economics_2nd_CQ,
      economics_2nd_MCQ,
    } = rest;
    // const imgIds = customer.image_id.split(",");
    // console.log(customer);
    const subjectTotal = Object.entries(rest).reduce(
      (result: any, [key, value]) => {
        const [subjectName, subjectPosition, suffix] = key.split("_");
        const fullSubjectName = `${subjectName}_${subjectPosition}`;
        if (!result[fullSubjectName]) {
          result[fullSubjectName] = 0;
        }
        if (value === "N" || value === "A" || value === "O") {
          value = 0;
        }

        result[fullSubjectName] += value;
        return result;
      },
      {}
    );
    // console.log(subjectTotal.bangla_1st);

    const bangla_percentage: any = calculatePercentage(
      subjectTotal.bangla_1st + subjectTotal.bangla_2nd
    );
    const bangla_GP: any = calculatePercentage(
      subjectTotal.bangla_1st + subjectTotal.bangla_2nd
    );
    const english_percentage: any = calculatePercentage(
      english_1st_CQ + english_2nd_CQ
    );
    const accounting_percentage: any = calculatePercentage(
      subjectTotal.accounting_1st + subjectTotal.accounting_2nd
    );
    const business_percentage: any = calculatePercentage(
      subjectTotal.business_1st + subjectTotal.business_2nd
    );
    const production_percentage: any = calculatePercentage(
      subjectTotal.production_1st + subjectTotal.production_2nd
    );
    const finance_percentage: any = calculatePercentage(
      subjectTotal.finance_1st + subjectTotal.finance_2nd
    );
    const economics_percentage: any = calculatePercentage(
      subjectTotal.economics_1st + subjectTotal.economics_2nd
    );

    const calculateTotalMarks = (nums: any) => {
      let total = 0;
      Object.keys(nums).map(function (key: any, index) {
        if (nums[key] !== "N" && nums[key] !== "A" && nums[key] !== "O") {
          total = nums[key] + total;
        }
      });
      return total;
    };

    const totalGP = () => {
      const allSubjectNumbers = [
        bangla_GP.GP,
        english_percentage.GP,
        accounting_percentage.GP,
        production_percentage.GP,
        business_percentage.GP,
        finance_percentage.GP,
        economics_percentage.GP,
      ];
      let totalGP = 0;
      allSubjectNumbers
        .filter((sub: any) => sub !== "O")
        .map((num: number) => (totalGP += num));
      const { GPA, totalFailed } = calculateGPA(totalGP);
      return {
        GPA: totalFailed > 0 ? "Failed" : GPA,
        GP: totalGP,
        totalFailed,
      };
    };
    const calculateGPA = (totalGP: number) => {
      const forthSub1 = production_percentage.GP;
      const forthSub2 = economics_percentage.GP;
      if (forthSub1 != "O") {
        totalGP = totalGP - 2;
      }
      if (forthSub2 != "O") {
        totalGP = totalGP - 2;
      }

      let totalFailed: any = 0;
      for (const key in rest) {
        if (rest[key] == "A") {
          ++totalFailed;
        }
      }
      return { GPA: totalGP / 5, totalFailed };
    };

    return {
      roll,
      name,
      bangla_1st_CQ,
      bangla_1st_MCQ,
      bangla_1st_total: subjectTotal.bangla_1st,
      bangla_2nd_CQ,
      bangla_2nd_MCQ,
      bangla_2nd_total: subjectTotal.bangla_2nd,
      bangla_percentage: bangla_percentage.percentage,
      bangla_GP: bangla_GP.GP,
      english_1st_CQ,
      english_2nd_CQ,
      english_total: subjectTotal.english_1st + subjectTotal.english_2nd,
      english_percentage: english_percentage.percentage,
      english_GP: english_percentage.GP,
      accounting_1st_CQ,
      accounting_1st_MCQ,
      accounting_1st_total: subjectTotal.accounting_1st,
      accounting_2nd_CQ,
      accounting_2nd_MCQ,
      accounting_2nd_total: subjectTotal.accounting_2nd,
      accounting_percentage: accounting_percentage.percentage,
      accounting_GP: accounting_percentage.GP,
      business_1st_CQ,
      business_1st_MCQ,
      business_1st_total: subjectTotal.business_1st,
      business_2nd_CQ,
      business_2nd_MCQ,
      business_2nd_total: subjectTotal.business_2nd,
      business_percentage: business_percentage.percentage,
      business_GP: business_percentage.GP,
      production_1st_CQ,
      production_1st_MCQ,
      production_1st_total: subjectTotal.production_1st,
      production_2nd_CQ,
      production_2nd_MCQ,
      production_2nd_total: subjectTotal.production_2nd,
      production_percentage: production_percentage.percentage,
      production_GP: production_percentage.GP,
      finance_1st_CQ,
      finance_1st_MCQ,
      finance_1st_total: subjectTotal.finance_1st,
      finance_2nd_CQ,
      finance_2nd_MCQ,
      finance_2nd_total: subjectTotal.finance_2nd,
      finance_percentage: finance_percentage.percentage,
      finance_GP: finance_percentage.GP,
      economics_1st_CQ,
      economics_1st_MCQ,
      economics_1st_total: subjectTotal.economics_1st,
      economics_2nd_CQ,
      economics_2nd_MCQ,
      economics_2nd_total: subjectTotal.economics_2nd,
      economics_percentage: economics_percentage.percentage,
      economics_GP: economics_percentage.GP,
      total_marks: calculateTotalMarks(rest),
      total_gp: totalGP().GP,
      GPA: totalGP().GPA,
      Total_Failed_Sub: totalGP().totalFailed,
      merit: "",
      //   res.status(200).json({ data: worksheetsArray });
    };
  });
  console.log(withImages);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

// const workbook = XLSX.readFile("./public/uploads/product.xlsx", {
// 	sheetStubs: true,
//   });
//   // const ws = workbook.Sheets["Customers"];
//   // let worksheet = workbook.Sheets[workbook.SheetNames[0]];
//   var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets["Customers"], {
// 	defval: null,
//   });
//   console.log(XL_row_object);
