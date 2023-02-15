const MongoClient = require("mongodb").MongoClient;

let _db;

function mongoConnect(callback) {
  const db_url = process.env.DB_URL;

  MongoClient.connect(db_url)
    .then((client) => {
      callback();
      _db = client.db();
    })
    .catch((err) => {
      console.log(err);
    });
}

getDb = () => {
  if (_db) {
    return _db;
  }

  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
