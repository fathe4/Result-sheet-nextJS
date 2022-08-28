import nc from "next-connect";
import { errorHandler } from "../../../../common/errorHandler";
import executeQuery from "../../../../config/db";
const handler = nc(errorHandler);

handler.post(async (req, res: any) => {
  console.log(req.body.tableName);
  console.log(req.body.year);
  //   const query = `DELETE FROM Tables_list WHERE year = 2021; DELETE FROM Business WHERE year = 2021`;
  const deleteFromTableList = `DELETE FROM Tables_list WHERE year = '${req.body.year}' ;`;
  const deleteFromSelectedTable = `DELETE FROM ${req.body.tableName} WHERE year = '${req.body.year}';`;
  //   console.log(query);

  const tableListResponse = await executeQuery(deleteFromTableList, []);
  const selectedTableResponse = await executeQuery(deleteFromSelectedTable, []);
  res.send({ tableListResponse, selectedTableResponse });
});
export default handler;

// ALTER TABLE employees CHANGE id employ_id VARCHAR(25);
