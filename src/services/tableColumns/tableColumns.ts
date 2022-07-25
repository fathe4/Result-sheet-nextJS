import executeQuery from "../../../config/db";
const tableColumns = async (req: any, res: any) => {
  const data = await executeQuery(`SHOW COLUMNS FROM business`, []);
  res.send(data);
};

export { tableColumns };
