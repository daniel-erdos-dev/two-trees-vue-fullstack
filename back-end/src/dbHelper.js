import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoUser = process.env.MONGODB_USER;
const mongoPassword = process.env.MONGODB_PASSWORD;
const mongoClusterUrl = process.env.MONGODB_CLUSTER_URL;
const mongoDbName = process.env.MONGODB_DB_NAME;
const mongoProductsCollection = "Products";
const mongoUsersCollection = "Users";

const uri = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoClusterUrl}/${mongoDbName}?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

export const mongoConnect = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(mongoDbName);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export const findProducts = async () =>
  await db.collection(mongoProductsCollection).find({}).toArray();

export const findProductById = async (productId) =>
  await db.collection(mongoProductsCollection).findOne({ id: productId });

export const findUserById = async (userId) =>
  await db.collection(mongoUsersCollection).findOne({ id: userId });

export const updatedCartItems = async (userId, cartItems) => {
  await db
    .collection(mongoUsersCollection)
    .updateOne({ id: userId }, { $set: { cartItems: cartItems } });
};

export const createUser = async (user) => {
  await db.collection(mongoUsersCollection).insertOne(user);
};
