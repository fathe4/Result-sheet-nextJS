import executeQuery from "../../../config/db";
const tableColumns = async (req: any, res: any) => {
  const tableName = req.query.tableName;
  //   console.log("SHOW COLUMNS FROM " + tableName);
  //   const data = await executeQuery("SHOW COLUMNS FROM " + tableName, []);
  const data = await executeQuery(
    `SELECT column_name FROM information_schema.columns WHERE table_name=${tableName}`,
    []
  );
  //   const data = await executeQuery(
  //     `SELECT "COLUMN_NAME"
  // 	FROM "INFORMATION_SCHEMA".COLUMNS
  // 	WHERE "TABLE_SCHEMA"=resultSheet
  // 		AND "TABLE_NAME"=${tableName};`,
  //     []
  //   );
  res.send(data);
};

export { tableColumns };
// SELECT column_name FROM information_schema.columns WHERE table_name='Ars';
