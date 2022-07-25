import executeQuery from "../../../config/db";
const createTableHeading = async (req: any, res: any) => {
  console.log(req.body);

  //   const data = await executeQuery(`SHOW COLUMNS FROM business`, []);
  //   res.send(data);
};

export { createTableHeading };
