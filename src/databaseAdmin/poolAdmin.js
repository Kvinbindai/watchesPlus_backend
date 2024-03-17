const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
}); // ค่อยมาเปลี่ยนเป็น database บน

const execute = async (sql, values) => {
  const [data] = await pool.execute(sql, values);
  return data;
};

module.exports = execute;

// host: "localhost",
// user: "root",
// password: "Pong_2540",
// database: "watchesplus",
