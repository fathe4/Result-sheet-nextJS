import executeQuery from "../../../config/db";
const results = async (req: any, res: any) => {
  const data = await executeQuery(
    `SELECT * FROM business WHERE date = '2022'`,
    []
  );
  res.send(data);
};

export { results };
