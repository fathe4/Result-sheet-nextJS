import nc from "next-connect";
import { errorHandler } from "../../../../common/errorHandler";
import executeQuery from "../../../../config/db";
const handler = nc(errorHandler);

handler.post(async (req, res: any) => {
  const deleteFromTableList = `DELETE FROM Tables_list WHERE year = '${req.body.year}' ;`;
  const deleteFromSelectedTable = `DELETE FROM ${req.body.tableName} WHERE year = '${req.body.year}';`;
  //   console.log(query);

  const tableListResponse = await executeQuery(deleteFromTableList, []);
  const selectedTableResponse = await executeQuery(deleteFromSelectedTable, []);
  res.send({ tableListResponse, selectedTableResponse });
});
// export default handler;
