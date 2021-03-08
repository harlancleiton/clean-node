import { MongoHelper } from '../helpers';
import { AccountMongoRepository } from './account-repository';

describe('AccountMongoRepository', () => {
  let sut: AccountMongoRepository;

  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL));
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});

    sut = new AccountMongoRepository();
  });

  it('should return an account on success', async () => {
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    });

    expect(account).toBeDefined();
    expect(account.id).toBeDefined();
    expect(account).toMatchObject({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    });
  });
});
