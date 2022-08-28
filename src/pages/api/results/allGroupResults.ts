import nc from "next-connect";
import { errorHandler } from "../../../../common/errorHandler";
import executeQuery from "../../../../config/db";
const handler = nc(errorHandler);

handler.get(async (req, res: any) => {
  const results = await executeQuery(
    `select * FROM Tables_list ORDER BY created_table_at DESC `,
    []
  );
  res.send(results);
});
export default handler;

// ALTER TABLE employees CHANGE id employ_id VARCHAR(25);
