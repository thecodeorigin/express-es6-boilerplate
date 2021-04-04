import { Mongoose } from "mongoose";
import { getDatabaseConfigs } from "../configs";

export default class MongooseProvider {
  static instance
  constructor() {
    this.connectionString = getDatabaseConfigs().connectionString
    this.mongoose = new Mongoose()
  }

  static getInstance() {
    if (!MongooseProvider.instance) {
      MongooseProvider.instance = new MongooseProvider()
    }
    return MongooseProvider.instance;
  }
  connect() {
    try {
      this.mongoose.connect(this.connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("MongoDB connection OK"))

    } catch (error) {
      console.log("MongoDB connection error, please check your connection")
    }
  }

  setSchema(collectionName, schemaConfig) {
    return this.mongoose.Schema(schemaConfig, { collection: collectionName })
  }

  setModel(modelName, schema) {
    return this.mongoose.model(modelName, schema)
  }

  exportModel(name, schemaConfig) {
    const schema = this.setSchema(name, schemaConfig);
    return this.setModel(name, schema)
  }
}
