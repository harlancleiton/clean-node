import { Collection, MongoClient } from 'mongodb';

export class MongoHelper {
  private static client: MongoClient;

  static async connect(uri: string): Promise<MongoClient> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    return this.client;
  }

  static async disconnect(): Promise<void> {
    await this.client.close();
  }

  static getCollection<TSchema extends { [key: string]: any } = any>(
    collection: string
  ): Collection<TSchema> {
    return this.client.db().collection(collection);
  }
}
