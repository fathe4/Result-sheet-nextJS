import nc from "next-connect";
import { errorHandler } from "../../../../common/errorHandler";
import executeQuery from "../../../../config/db";
const handler = nc(errorHandler);

handler.post(async (req, res: any) => {
  const tableName = req.body.tableName;
  //   console.log("ss", tableName);

  const createTableSQL =
    "CREATE TABLE IF NOT EXISTS " +
    tableName +
    " (id INT AUTO_INCREMENT PRIMARY KEY, group_name VARCHAR(255) NOT NULL,date int(4) NOT NULL, created_table_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)  ENGINE=INNODB";
  console.log(createTableSQL);

  const data = await executeQuery(createTableSQL, []);
  res.send(data);
});
export default handler;
