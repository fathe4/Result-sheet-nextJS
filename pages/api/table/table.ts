import dbConnection from "../../../config/db";
import apiRoute from "../apiRoute";

apiRoute.get(async (req: any, res) => {
  const sql = `SHOW COLUMNS FROM business`;
  dbConnection.query(sql, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

export default apiRoute;
