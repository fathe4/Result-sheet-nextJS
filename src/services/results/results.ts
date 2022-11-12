import executeQuery from "../../../config/db";
const results = async (req: any, res: any) => {
  const { group, year, roll } = req.query;
  console.log(group, "group");

  let query;
  if (roll) {
    query = `SELECT * FROM ${group} WHERE year = ${year} && roll = ${roll}`;
  } else {
    query = `SELECT * FROM ${group} WHERE year = ${year}`;
  }
  const totalFailedQuery = `SELECT * FROM ${group} WHERE year = ${year} AND GPA = 'Failed'`;
  const data = await executeQuery(query, []);
  const totalFailed = await executeQuery(totalFailedQuery, []);
  res.send({ data, totalFailed });
};

export { results };
