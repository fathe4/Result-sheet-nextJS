import nc from "next-connect";
import { errorHandler } from "../../../../common/errorHandler";
import executeQuery from "../../../../config/db";
const handler = nc(errorHandler);

handler.post(async (req, res: any) => {
  const tableName = req.body.tableName;
  const columnName = req.body.columnName;
  const deleteTable = req.body.deleteTable;
  let createTableSQL;
  if (columnName)
    createTableSQL = `ALTER TABLE ${tableName} DROP COLUMN ${columnName};`;
  if (deleteTable) createTableSQL = `DROP TABLE ${deleteTable};`;
  //   if (!afterColumn)
  //     createTableSQL = `ALTER TABLE ${tableName}  ADD COLUMN ${columnHeading}  VARCHAR(15)`;
  const data = await executeQuery(createTableSQL, []);
  res.send(data);
});
export default handler;

// ALTER TABLE employees CHANGE id employ_id VARCHAR(25);
