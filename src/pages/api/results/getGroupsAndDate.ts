import nc from "next-connect";
import { errorHandler } from "../../../../common/errorHandler";
import executeQuery from "../../../../config/db";
const handler = nc(errorHandler);

handler.get(async (req, res: any) => {
  let groupQuery = "SELECT group_name, TABLE_NAME FROM Tables_list";
  const groups = await executeQuery(groupQuery, []);
  const tables: any = await executeQuery(
    `SELECT Table_name as TablesName from information_schema.tables where table_schema = 'resultSheet'`,
    []
  );
  let dateQuery = "";
  for (let i = 0; i < tables.length; i++) {
    if (tables[i].TablesName !== "Tables_list") {
      console.log(i === tables.length - 2);

      if (i === tables.length - 2) {
        dateQuery += ` SELECT year FROM ${tables[i].TablesName}`;
      } else {
        dateQuery += ` SELECT year FROM ${tables[i].TablesName} UNION`;
      }
    }
  }
  const dates = await executeQuery(dateQuery, []);
  res.send({ groups, dates });
});
export default handler;

// ALTER TABLE employees CHANGE id employ_id VARCHAR(25);
