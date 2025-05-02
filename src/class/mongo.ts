import { Db, MongoClient } from 'mongodb';

export class Mongo {
  private client: MongoClient;
  private dbName: string;
  public db: any;
  private static instance: Mongo;

  private constructor() {
    this.client = new MongoClient(process.env.MONGO_URI as string);
    this.dbName = process.env.DB_NAME as string;
  }

  private async connect() {
    const client = await this.client.connect();
    this.db = client.db(this.dbName);
    console.log('Connected to MongoDB');
  }

  public static async getDb(): Promise<Db> {
    if (!Mongo.instance) {
      const mongo = new Mongo();
      await mongo.connect();
      Mongo.instance = mongo;
    }
    return Mongo.instance.db;
  }
}
