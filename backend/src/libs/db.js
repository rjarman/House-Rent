require('dotenv').config();
const mongodbClient = require('mongodb').MongoClient;

const databaseFunction = {
  clientCloser: null,
  a: {},
  doRegister: (data) => {
    sendData(process.env.DATABASE_NAME, process.env.COLLECTION_AUTH, data);
  },
  doLogin: (data) => {
    return findData(
      process.env.DATABASE_NAME,
      process.env.COLLECTION_AUTH,
      data
    );
  },
  sendDataOwners: (data) => {
    sendData(process.env.DATABASE_NAME, process.env.COLLECTION_OWNERS, data);
  },
  apiValidatorFireFree: (key) => {
    return validate(
      process.env.DATABASE_NAME_FIRE_FREE,
      process.env.COLLECTION_API_KEY,
      key
    );
  },
  apiValidatorHomie: (key) => {
    return validate(
      process.env.DATABASE_NAME_HOMIE,
      process.env.COLLECTION_API_KEY,
      key
    );
  },
};

function sendData(databaseName, collectionName, data) {
  mongodbClient.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        console.log(`connection failed to "${databaseName}!"`);
        return;
      } else {
        console.log(`successfully connected to ${databaseName}!`);
      }

      const db = client.db(databaseName);
      const collection = db.collection(collectionName);
      collection.insertOne(data, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(
            `added to the database "${databaseName}" under collection "${collectionName}", successfully!`
          );
        }
      });
      databaseFunction.clientCloser = client;
    }
  );
}

function findData(databaseName, collectionName, key) {
  mongodbClient.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        console.log(`connection failed to "${databaseName}!"`);
        return;
      } else {
        console.log(`successfully connected to "${databaseName}"!`);
      }

      const db = client.db(databaseName);
      const collection = db.collection(collectionName);

      collection.find({ email: { $eq: key } }).toArray((err, result) => {
        if (err) {
          console.log(err);
          console.log(`"${key}" doesn't match with the API key!`);
        } else {
          console.log(`"${key}" successfully matched!`);
          result.forEach((element) => {
            databaseFunction.a = Object.create(element);
          });
        }
      });
    }
  );
}

module.exports = databaseFunction;
