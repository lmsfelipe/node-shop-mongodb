const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }

    return dbOp
      .then(resp => console.log("resp model ========>", resp))
      .catch(error => console.log("error model ========>", error));
  }

  static fetchAll() {
    const db = getDb();

    return db
      .collection("products")
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(error => console.log(error));
  }

  static findById(id) {
    const db = getDb();

    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectID(id) })
      .next() // Retorna o último elemento achado
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(error => console.log(error));
  }

  static deleteById(prodId) {
    const db = getDb();

    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then(result => console.log("result", result))
      .catch(error => console.log("error", error));
  }
}

module.exports = Product;
