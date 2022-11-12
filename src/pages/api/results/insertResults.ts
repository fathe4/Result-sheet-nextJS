import multer from "multer";
import nc from "next-connect";
import { insertResults } from "../../../services/insertResults";
import { errorHandler } from "../../../../common/errorHandler";
import executeQuery from "../../../../config/db";
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
const handler = nc(errorHandler);

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) =>
      cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname),
  }),
});
handler.use(upload.single("file"));

const makeArrayOfArray = (values: any) => {
  return values.map((item: any, i: number) => Object.values(item));
};
const query = (
  firstObject: any,
  arrayOfArrayResults: any,
  tableName: string
) => {
  let allData = "INSERT INTO " + tableName + " (";
  const keys = Object.keys(firstObject);
  for (let i = 0; i < keys.length; i++) {
    let data = keys[i];
    if (i == 0) allData += data;
    else allData += ", " + data;
  }
  allData += ") values ?";
  return allData;
};
handler.post(async (req, res: any) => {
  const result: any = await insertResults(
    req.file,
    req.body.table,
    req.body.group,
    req.body.year
  );
  console.log(result, "result");
  const arrayOfArrayResults = makeArrayOfArray(result);
  const sql = query(result[0], arrayOfArrayResults, req.body.table);
  const insertTableListQuery = `INSERT INTO Tables_list(
    group_name,
    table_name,
    year,
    total_student
)
VALUES(
    '${req.body.group}',
    '${req.body.table}',
    ${req.body.year},
    ${arrayOfArrayResults.length})`;
  //   console.log(insertTableListQuery, "insertTableListQuery");
  //   console.log(arrayOfArrayResults, "arrayOfArrayResults");

  //   const resultManagementUpdate = await executeQuery(insertTableListQuery, []);

  //   const data = await executeQuery(sql, [arrayOfArrayResults]);
  //   res.send(data);
});
export default handler;
