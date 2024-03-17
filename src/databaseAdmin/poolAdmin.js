const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "103.74.254.49",
  user: "User2",
  password: "ccgrp16200224",
  database: "GROUP2",
  port: "3206",
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
