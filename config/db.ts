// import mysql from "mysql2";

// const dbConnection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "resultSheet",
//   // port: 3000,
//   // socketPath: "/var/run/mysqld/mysqld.sock",
// });

// export default dbConnection;

import { createPool } from "mysql2";
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "resultSheet",
  // port: 3000,
  // socketPath: "/var/run/mysqld/mysqld.sock",
});
pool.getConnection((err) => {
  if (err) {
    return console.log("error connecting to db", err);
  }
  console.log("Connected to db");
});

const executeQuery = (query: any, arrayParams: any) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, arrayParams, (err, data) => {
        if (err) {
          console.log("error in executing thr query");
          reject(err);
        }
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default executeQuery;
