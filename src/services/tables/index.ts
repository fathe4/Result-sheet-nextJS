import executeQuery from "../../../config/db";
const tables = async (req: any, res: any) => {
  const data = await executeQuery(
    `SELECT Table_name as TablesName from information_schema.tables where table_schema = 'resultSheet'`,
    []
  );
  res.send(data);
};

export { tables };
