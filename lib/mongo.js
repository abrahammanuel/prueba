const {
  config
} = require('../config/index')
const {
  MongoClient,
  ObjectId
} = require('mongodb');

const DB_USER = encodeURIComponent(config.DB_USER)
const DB_PASSWORD = encodeURIComponent(config.DB_PASSWORD)
const DB_NAME = encodeURIComponent(config.DB_NAME)

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${config.DB_HOST}/${DB_NAME}?retryWrites=true;` //prettier-ignore
// const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${DB_NAME}`
class MongoLib {
  constructor() {
    // console.log("MONGO URI: ", MONGO_URI);

    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true
    })
    this.DB_NAME = DB_NAME
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect(async error => {
        if (error) {
          reject(error)
        }

        console.log('Connected succesfully to Mongo')
        resolve(this.client.db(this.DB_NAME))
      })


    })
  }
  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .toArray()
    })
  }

  get(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({
        _id: ObjectId(id)
      });
    });
  }

  create(collection, data) {
    return this.connect()
      .then(db => {
        return db
        .collection(collection)
        .insertOne(data);
      })
      .then(result => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .updateOne({
            _id: ObjectId(id)
          }, {
            $set: data
          }, {
            upsert: true
          });
      })
      .then(result => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
      .then(db => {
        return db.collection(collection).deleteOne({
          _id: ObjectId(id)
        });
      })
      .then(() => id);
  }

}


module.exports = MongoLib