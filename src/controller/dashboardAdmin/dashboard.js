const execute = require("../../databaseAdmin/poolAdmin");

exports.dashboradBrand = async (req, res, next) => {
  const sumBrand = await execute(
    `SELECT count(b.id) sumBrand FROM GROUP2.brands b;`
  );
  const sumWatches = await execute(
    `SELECT count(w.id) sumWatches FROM GROUP2.watches w;`
  );
  const sumUser = await execute(
    `SELECT count(u.id) sumUser FROM GROUP2.users u;`
  );
  const sumShipping = await execute(
    `SELECT count(s.id) sumShipping FROM GROUP2.shipping s where s.status = "SUCCESS";`
  );
  const totalWallet = await execute(
    `SELECT sum(w.amount) totalWallet FROM GROUP2.wallets w;`
  );
  const totalTransaction = await execute(
    `SELECT sum(wt.price) totalTransaction FROM GROUP2.transaction_wallets wt where wt.type = "TRANSFER";`
  );
  const chartBrand = await execute(
    `SELECT b.name,count(b.name) value FROM GROUP2.watches w join brands b on w.brand_id = b.id group by w.brand_id`
  );
  const chartTransaction = await execute(
    `SELECT DATE(wt.created_at) as name, SUM(wt.price) as sumprice 
    FROM GROUP2.transaction_wallets wt 
    WHERE wt.type = 'TRANSFER' 
    GROUP BY DATE(wt.created_at) 
    ORDER BY DATE(wt.created_at) asc
    `
  );

  const chartBrandTransaction = await execute(
    `SELECT 
    b.name, COUNT(b.name) value
FROM
    GROUP2.transaction_wallets wt
        JOIN
    GROUP2.watches w ON wt.watch_id = w.id
        JOIN
    GROUP2.brands b ON w.brand_id = b.id
WHERE
    wt.type = 'TRANSFER'
GROUP BY w.brand_id`
  );

  res.status(200).json({
    sumBrand,
    sumWatches,
    sumUser,
    sumShipping,
    totalWallet,
    totalTransaction,
    chartBrand,
    chartTransaction,
    chartBrandTransaction,
  });
};

// SELECT count(b.id) sumBrand FROM watchesplus.brands b;
// SELECT count(w.id) sumWatches FROM watchesplus.watches w;
// SELECT count(u.id) sumUser FROM watchesplus.users u;
// SELECT count(s.id) sumShipping FROM watchesplus.shipping s where s.status = "SUCCESS";
// SELECT sum(wt.price) totalWallet FROM watchesplus.transaction_wallets wt where wt.type = "DEPOSIT";
// SELECT sum(wt.price) totalTransaction FROM watchesplus.transaction_wallets wt where wt.type = "TRANSFER";
