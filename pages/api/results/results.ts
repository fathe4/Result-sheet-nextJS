import dbConnection from "../../../config/db";
import apiRoute from "../apiRoute";

apiRoute.get(async (req: any, res) => {
  const sql = `SELECT * FROM business WHERE date = '2022'`;
  dbConnection.query(sql, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

export default apiRoute;
