import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const dbconnection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    // port: 3000,
    // socketPath: "/var/run/mysqld/mysqld.sock",
  });
  res.status(200).json({ success: "Hello" });

  //   try {
  //     const query = "SELECT productid, productname, productimage FROM products";
  //     const values = [];
  //     const [data] = await dbconnection.execute(query, values);
  //     dbconnection.end();

  //     res.status(200).json({ products: data });
  //   } catch (error) {
  //     // unhide to check error
  //     // res.status(500).json({ error: error.message });
  //   }
}

// sudo /opt/lampp/manager-linux-x64.run
// cd /opt/lampp
// sudo ./lampp start
// service mysql stop
// service mysql status
// sudo ./lampp start
