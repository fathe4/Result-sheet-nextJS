import mysql from "mysql2";

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "resultSheet",
  // port: 3000,
  // socketPath: "/var/run/mysqld/mysqld.sock",
});

export default dbConnection;
