import nc from "next-connect";
import { errorHandler } from "../../../../common/errorHandler";
import executeQuery from "../../../../config/db";
const handler = nc(errorHandler);

handler.post(async (req, res: any) => {
  const tableName = req.body.tableName;
  const columnHeading = req.body.heading;
  const afterColumn = req.body.afterColumn;
  let createTableSQL;
  if (afterColumn)
    createTableSQL = `ALTER TABLE ${tableName}  ADD COLUMN ${columnHeading}  VARCHAR(15) AFTER ${afterColumn}`;
  if (!afterColumn)
    createTableSQL = `ALTER TABLE ${tableName}  ADD COLUMN ${columnHeading}  VARCHAR(15)`;
  const data = await executeQuery(createTableSQL, []);
  res.send(data);
});
export default handler;

// ALTER TABLE employees CHANGE id employ_id VARCHAR(25);
