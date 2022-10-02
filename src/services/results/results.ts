import executeQuery from "../../../config/db";
const results = async (req: any, res: any) => {
  const { group, year, roll } = req.query;
  let query;
  if (roll) {
    query = `SELECT * FROM ${group} WHERE year = ${year} && roll = ${roll}`;
  } else {
    query = `SELECT * FROM ${group} WHERE year = ${year}`;
  }
  const data = await executeQuery(query, []);
  res.send(data);
};

export { results };
