import nc from "next-connect";
import { errorHandler } from "../../../../common/errorHandler";
import executeQuery from "../../../../config/db";
const handler = nc(errorHandler);

handler.post(async (req, res: any) => {
  const tableName = req.body.tableName;
  const previousColumnName = req.body.previousColumnName;
  const currentColumnName = req.body.currentColumnName;
  const createTableSQL = `ALTER TABLE ${tableName} CHANGE ${previousColumnName} ${currentColumnName} VARCHAR(15)`;
  const data = await executeQuery(createTableSQL, []);
  res.send(data);
});
export default handler;

// ALTER TABLE employees CHANGE id employ_id VARCHAR(25);
