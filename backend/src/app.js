// ****************************************************
// *                                                  *
// *                                                  *
// *                        SYSTEM                    *
// *                                                  *
// *                                                  *
// ****************************************************

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var formidable = require('formidable');
var fs = require('fs');
const mongdb = require('mongodb');
const mongodbClient = mongdb.MongoClient;
require('dotenv').config();

const encryption_decryption = require('../miscellaneous/encryption');
const databaseFunction = require('../models/db');
const dataStructure = require('../constants/dataStructure');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  next();
});

app.get('/', (req, res) => {
  res.send("<h1>Welcome to Rufsun's universe!</h1>!");
});

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

var publicDir = require('path').join(__dirname, '../public/');
// console.log(__dirname);
app.use(express.static(publicDir));

// ****************************************************
// *                                                  *
// *                                                  *
// *                        API VALIDATOR             *
// *                                                  *
// *                                                  *
// ****************************************************

// app.use((req, res, next) => {
//     const apiKey = req.body.api_key;
//     if(databaseFunction.apiValidatorFireFree(apiKey) || databaseFunction.apiValidatorHomie(apiKey)){
//         next();
//     }else {
//         res.status(400).json({
//             status: "failed",
//             response: `${apiKey} doesn't match!`
//         });
//     }
// });

// ****************************************************
// *                                                  *
// *                                                  *
// *                        REGISTRATION              *
// *                                                  *
// *                                                  *
// ****************************************************

app.post('/register', (req, res, next) => {
  let count;
  userInfo = {};
  console.log(req.body);
  // let data = {
  //     email: req.body.email
  // }
  var form = new formidable.IncomingForm();
  form.parse(req);
  form.on('fileBegin', (name, file) => {
    count = 0;
    file.path = `${__dirname}/../public/assets/profiles/${file.name}`;
  });
  // console.log(path);
  form.on('field', (fieldName, fieldValue, file) => {
    if (fieldName === 'userName') {
      Object.assign(userInfo, { userName: JSON.parse(fieldValue) });
    } else if (fieldName === 'email') {
      Object.assign(userInfo, { email: JSON.parse(fieldValue) });
    } else if (fieldName === 'password') {
      Object.assign(userInfo, { password: JSON.parse(fieldValue) });
    } else if (fieldName === 'imagePath') {
      Object.assign(userInfo, { image: JSON.parse(fieldValue) });
    }
    if (Object.keys(userInfo).length === 4 && count === 0) {
      console.log(userInfo);

      // console.log(req.body);
      let data = {
        userName: userInfo.userName,
        email: userInfo.email,
        password: JSON.stringify(
          encryption_decryption.encrytion(userInfo.password)
        ),
        image: userInfo.image[0],
      };
      databaseFunction.doRegister(data);
      console.log(req.body.email);

      res.status(201).json({
        email: userInfo.email,
        status: 'ok',
      });
      count++;
    }
  });
  form.on('error', (err) => {
    console.log(err);
  });
  form.on('end', () => {
    count = 0;
    console.log('finished');
  });
});

// ****************************************************
// *                                                  *
// *                                                  *
// *                        LOGIN                     *
// *                                                  *
// *                                                  *
// ****************************************************

app.post('/login', (req, res, next) => {
  let data = {
    email: req.body.email,
    password: req.body.password,
  };
  mongodbClient.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        console.log(`connection failed to "${process.env.DATABASE_NAME}!"`);
        return;
      } else {
        console.log(
          `successfully connected to "${process.env.DATABASE_NAME}"!`
        );
      }

      const db = client.db(process.env.DATABASE_NAME);
      const collection = db.collection(process.env.COLLECTION_AUTH);

      collection.find({ email: { $eq: data.email } }).toArray((err, result) => {
        if (err) {
          console.log(`"${data.email}" doesn't match with the API key!`);
          // return false;
        } else {
          console.log(`"${data.email}" successfully matched!`);
          if (
            data.password ===
            encryption_decryption.decryption(
              Buffer.from(JSON.parse(result[0].password).data)
            )
          ) {
            res.status(201).json({
              email: req.body.email,
              status: 'ok',
            });
          } else {
            res.status(404).json({
              status: 'null',
            });
          }
        }
      });
      // client.close();
    }
  );
});

// ****************************************************
// *                                                  *
// *                                                  *
// *                        USER_DATA                 *
// *                                                  *
// *                                                  *
// ****************************************************

app.post('/addUserData', (req, res, next) => {
  let count;
  ownerInfo = {};
  houseInfo = {};
  address = {};
  email = {};
  imagePath = {};
  // let data = {
  //     email: req.body.email
  // }
  var form = new formidable.IncomingForm();
  form.parse(req);
  form.on('fileBegin', (name, file) => {
    count = 0;
    file.path = `${__dirname}/../public/assets/houses/${file.name}`;
  });
  // console.log(path);
  form.on('field', (fieldName, fieldValue, file) => {
    if (fieldName === 'ownerInfo') {
      Object.assign(ownerInfo, JSON.parse(fieldValue));
    } else if (fieldName === 'houseInfo') {
      Object.assign(ownerInfo, JSON.parse(fieldValue));
    } else if (fieldName === 'address') {
      Object.assign(ownerInfo, JSON.parse(fieldValue));
    } else if (fieldName === 'email') {
      Object.assign(ownerInfo, { email: JSON.parse(fieldValue) });
    } else if (fieldName === 'imagePath') {
      Object.assign(ownerInfo, { imagePath: JSON.parse(fieldValue) });
    } else if (fieldName === 'isChecked') {
      Object.assign(ownerInfo, { isChecked: JSON.parse(fieldValue) });
      console.log(JSON.parse(fieldValue));
    } else if (fieldName === 'renterInfo') {
      Object.assign(ownerInfo, { renterInfo: JSON.parse(fieldValue) });
      console.log(JSON.parse(fieldValue));
    }
    if (Object.keys(ownerInfo).length >= 11 && count === 0) {
      console.log(ownerInfo);
      mongodbClient.connect(
        process.env.DATABASE_URL,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err, client) => {
          if (err) {
            console.log(`connection failed to "${process.env.DATABASE_NAME}!"`);
            return;
          } else {
            console.log(
              `successfully connected to "${process.env.DATABASE_NAME}"!`
            );
          }

          const db = client.db(process.env.DATABASE_NAME);
          const collection = db.collection(process.env.COLLECTION_OWNERS);

          collection
            .find({ email: { $eq: ownerInfo.email } })
            .toArray((err, result) => {
              if (err) {
                console.log(
                  `"${ownerInfo.email}" doesn't match with the API key!`
                );
              } else {
                if (result.length === 0) {
                  databaseFunction.sendDataOwners({
                    email: ownerInfo.email,
                    ownerInfo: [
                      {
                        personal: {
                          ownerName: ownerInfo.ownerName,
                          mobile1: ownerInfo.mobile1,
                          mobile2: ownerInfo.mobile2,
                        },
                        details: {
                          imagePath: ownerInfo.imagePath,
                          houseInfo: {
                            emptyRoom: ownerInfo.emptyRoom,
                            roomDetails: ownerInfo.roomDetails,
                            price: ownerInfo.price,
                          },
                          address: {
                            street: ownerInfo.street,
                            city: ownerInfo.city,
                            state: ownerInfo.state,
                            zip: ownerInfo.zip,
                          },
                          renterInfo: {
                            isChecked: ownerInfo.isChecked,
                            renterInfo: ownerInfo.renterInfo,
                          },
                        },
                      },
                    ],
                  });
                }
                collection.updateOne(
                  { email: { $eq: ownerInfo.email } },
                  {
                    $push: {
                      ownerInfo: {
                        $each: [
                          {
                            personal: {
                              ownerName: ownerInfo.ownerName,
                              mobile1: ownerInfo.mobile1,
                              mobile2: ownerInfo.mobile2,
                            },
                            details: {
                              imagePath: ownerInfo.imagePath,
                              houseInfo: {
                                emptyRoom: ownerInfo.emptyRoom,
                                roomDetails: ownerInfo.roomDetails,
                                price: ownerInfo.price,
                              },
                              address: {
                                street: ownerInfo.street,
                                city: ownerInfo.city,
                                state: ownerInfo.state,
                                zip: ownerInfo.zip,
                              },
                              renterInfo: {
                                isChecked: ownerInfo.isChecked,
                                renterInfo: ownerInfo.renterInfo,
                              },
                            },
                          },
                        ],
                      },
                    },
                  }
                );
              }
            });
        }
      );
      count++;
    }
  });
  form.on('error', (err) => {
    console.log(err);
  });
  form.on('end', () => {
    count = 0;
    console.log('finished');
  });
});

// ****************************************************
// *                                                  *
// *                                                  *
// *                        UPDATE_USER_DATA          *
// *                                                  *
// *                                                  *
// ****************************************************

app.post('/updateUserData', (req, res, next) => {
  let count;
  ownerInfo = {};
  houseInfo = {};
  address = {};
  email = {};
  imagePath = {};
  tempOldData = {};
  // let data = {
  //     email: req.body.email
  // }
  var form = new formidable.IncomingForm();
  form.parse(req);
  form.on('fileBegin', (name, file) => {
    file.path = `${__dirname}/../public/assets/houses/${file.name}`;
  });
  // console.log(path);
  count = 0;
  form.on('field', (fieldName, fieldValue, file) => {
    // console.log('filedName ==> ' + fieldName);
    // console.log('value ==> ' + fieldValue);
    if (fieldName === 'ownerInfo') {
      Object.assign(ownerInfo, JSON.parse(fieldValue));
    } else if (fieldName === 'houseInfo') {
      Object.assign(ownerInfo, JSON.parse(fieldValue));
    } else if (fieldName === 'address') {
      Object.assign(ownerInfo, JSON.parse(fieldValue));
    } else if (fieldName === 'email') {
      Object.assign(ownerInfo, { email: JSON.parse(fieldValue) });
    } else if (fieldName === 'imagePath') {
      Object.assign(ownerInfo, { imagePath: JSON.parse(fieldValue) });
    } else if (fieldName === 'isChecked') {
      Object.assign(ownerInfo, { isChecked: JSON.parse(fieldValue) });
    } else if (fieldName === 'renterInfo') {
      Object.assign(ownerInfo, { renterInfo: JSON.parse(fieldValue) });
    } else if (fieldName === 'tempOldData') {
      Object.assign(tempOldData, JSON.parse(fieldValue));
      // console.log(tempOldData);
      // console.log(ownerInfo);
    }
    // console.log(Object.keys(ownerInfo).length);
    // console.log(tempOldData);
    if (
      Object.keys(ownerInfo).length >= 14 &&
      count === 0 &&
      Object.keys(tempOldData).length > 0
    ) {
      console.log(ownerInfo);
      // console.log(tempOldData);
      mongodbClient.connect(
        process.env.DATABASE_URL,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err, client) => {
          if (err) {
            console.log(`connection failed to "${process.env.DATABASE_NAME}!"`);
            return;
          } else {
            console.log(
              `successfully connected to "${process.env.DATABASE_NAME}"!`
            );
          }

          const db = client.db(process.env.DATABASE_NAME);
          const collection = db.collection(process.env.COLLECTION_OWNERS);

          collection
            .find({ email: { $eq: ownerInfo.email } })
            .toArray((err, result) => {
              if (err) {
                console.log(
                  `"${ownerInfo.email}" doesn't match with the API key!`
                );
              } else {
                result.forEach((res) => {
                  res.ownerInfo.forEach((res2) => {
                    // console.log(tempOldData);
                    if (
                      res2.personal.ownerName ===
                        tempOldData.ownerInfo.ownerName &&
                      res2.personal.mobile1 === tempOldData.ownerInfo.mobile1 &&
                      res2.personal.mobile2 === tempOldData.ownerInfo.mobile2
                    ) {
                      let data = {
                        personal: {
                          ownerName: ownerInfo.ownerName,
                          mobile1: ownerInfo.mobile1,
                          mobile2: ownerInfo.mobile2,
                        },
                        details: {
                          imagePath: ownerInfo.imagePath,
                          houseInfo: {
                            emptyRoom: ownerInfo.emptyRoom,
                            roomDetails: ownerInfo.roomDetails,
                            price: ownerInfo.price,
                          },
                          address: {
                            street: ownerInfo.street,
                            city: ownerInfo.city,
                            state: ownerInfo.state,
                            zip: ownerInfo.zip,
                          },
                          renterInfo: {
                            isChecked: ownerInfo.isChecked,
                            renterInfo: ownerInfo.renterInfo,
                          },
                        },
                      };
                      index = res.ownerInfo.indexOf(res2);
                      console.log(index);
                      res.ownerInfo[index] = data;
                      console.log(res.ownerInfo[index]);
                    }
                    // console.log(res.ownerInfo.indexOf(res2));
                    // console.log(res2);
                  });
                  console.log(res.ownerInfo);
                });
                console.log(result);
                collection.deleteOne({ email: { $eq: result[0].email } });
                databaseFunction.sendDataOwners(result[0]);
              }
            });
        }
      );
      count++;
    }
  });
  form.on('error', (err) => {
    console.log(err);
  });
  form.on('end', () => {
    count = 0;
    console.log('finished');
  });
});

// ****************************************************
// *                                                  *
// *                                                  *
// *                        ALL_DATA                  *
// *                                                  *
// *                                                  *
// ****************************************************

app.post('/allData', (req, res, next) => {
  const data = dataStructure;
  const dataArray = [];

  mongodbClient.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        console.log(`connection failed to "${process.env.DATABASE_NAME}!"`);
        return;
      } else {
        console.log(
          `successfully connected to "${process.env.DATABASE_NAME}"!`
        );
      }

      const db = client.db(process.env.DATABASE_NAME);
      const collection = db.collection(process.env.COLLECTION_OWNERS);

      collection
        .find({ email: { $ne: req.body.email } })
        .toArray((err, result) => {
          if (err) {
            console.log(err);
            console.log(`"${req.body.email}" doesn't match with the API key!`);
            // return false;
          } else {
            // console.log(`"${req.body.email}" successfully matched!`);
            result.forEach((element) => {
              data.id = element._id;
              data.email = element.email;
              data.ownerInfo = element.ownerInfo;
              dataArray.push(data);
            });
            res.status(201).json({
              status: 'success',
              data: dataArray,
            });
          }
        });
      // client.close();
    }
  );
});

// ****************************************************
// *                                                  *
// *                                                  *
// *                        USER_DATA                 *
// *                                                  *
// *                                                  *
// ****************************************************

app.post('/userData', (req, res, next) => {
  const data = dataStructure;
  const dataArray = [];

  mongodbClient.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        console.log(`connection failed to "${process.env.DATABASE_NAME}!"`);
        return;
      } else {
        console.log(
          `successfully connected to "${process.env.DATABASE_NAME}"!`
        );
      }

      const db = client.db(process.env.DATABASE_NAME);
      const collection = db.collection(process.env.COLLECTION_OWNERS);

      collection
        .find({ email: { $eq: req.body.email } })
        .toArray((err, result) => {
          if (err) {
            console.log(err);
            console.log(`"${req.body.email}" doesn't match with the API key!`);
            // return false;
          } else {
            // console.log(`"${req.body.email}" successfully matched!`);
            console.log(result);
            result.forEach((element) => {
              data.id = element._id;
              data.email = element.email;
              data.ownerInfo = element.ownerInfo;
              dataArray.push(data);
            });
            res.status(201).json({
              status: 'success',
              data: dataArray,
            });
          }
        });
      // client.close();
    }
  );
});

app.post('/userAuthData', (req, res, next) => {
  let data = {
    userName: '',
    email: '',
    image: '',
  };
  mongodbClient.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        console.log(`connection failed to "${process.env.DATABASE_NAME}!"`);
        return;
      } else {
        console.log(
          `successfully connected to "${process.env.DATABASE_NAME}"!`
        );
      }

      const db = client.db(process.env.DATABASE_NAME);
      const collection = db.collection(process.env.COLLECTION_AUTH);

      collection
        .find({ email: { $eq: req.body.email } })
        .toArray((err, result) => {
          console.log(result);
          console.log(req.body.email);
          if (err) {
            console.log(err);
            console.log(`"${req.body.email}" doesn't match with the API key!`);
            // return false;
          } else if (Object.keys(result).length > 0) {
            // console.log(`"${req.body.email}" successfully matched!`);
            // console.log(result);
            data.userName = result[0].userName;
            data.email = result[0].email;
            data.image = result[0].image;
            // console.log(data)

            res.status(200).json({
              status: 'success',
              data: data,
            });
          } else {
            console.log('no data');
          }
        });
    }
  );
});

// ****************************************************
// *                                                  *
// *                                                  *
// *                        SYSTEM                    *
// *                                                  *
// *                                                  *
// ****************************************************

// process.on('exit', (code) => {
//     databaseFunction.clientCloser.close();
//     console.log(`exit on status: '${code}'`);
// });

// process.on('SIGINT', () => {
//     console.log("interrupted by external signal!");
//     process.exit();
// });

module.exports = app;
