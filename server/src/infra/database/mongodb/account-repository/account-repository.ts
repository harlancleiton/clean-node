import { AddAccountRepository } from '~/data/protocols';
import { AccountModel } from '~/domain/models';
import { AddAccountModel } from '~/domain/usecases';

import { MongoHelper } from '../helpers';

export class AccountMongoRepository implements AddAccountRepository {
  async add({ name, email, password }: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne({ name, email, password });
    const { _id, ...account } = result.ops[0];

    return { ...account, id: _id };
  }
}
