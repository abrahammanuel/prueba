const {config} = require('../config/index')
const {
  MongoClient
} = require('mongodb');

const DB_USER = encodeURIComponent(config.DB_USER)
const DB_PASSWORD = encodeURIComponent(config.DB_PASSWORD)
const DB_NAME = encodeURIComponent(config.DB_NAME)

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${config.DB_HOST}/${DB_NAME}?retryWrites=true;` //una linea sola

class MongoLib {
  constructor() {
    console.log("MONGO URI: ",MONGO_URI);
    
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
            .find()
            .toArray()
        })
      }
  }


module.exports = MongoLib