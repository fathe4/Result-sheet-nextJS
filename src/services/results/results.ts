import executeQuery from "../../../config/db";
const results = async (req: any, res: any) => {
  const { group, year } = req.query;
  console.log(group, year);

  const data = await executeQuery(
    `SELECT * FROM ${group} WHERE year = ${year}`,
    []
  );
  res.send(data);
};

export { results };
