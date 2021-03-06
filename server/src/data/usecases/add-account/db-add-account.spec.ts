import { DbAddAccount } from './db-add-account';
import {
  AccountModel,
  AddAccountModel,
  AddAccountRepository,
  Hasher
} from './db-add-account-protocols';

describe('DbAddAccountUsecase', () => {
  let sut: DbAddAccount;
  let addAccountRepositoryStub: AddAccountRepository;
  let hasherStub: Hasher;

  beforeEach(() => {
    class AddAccountRepositoryStub implements AddAccountRepository {
      async add(addAccountModel: AddAccountModel): Promise<AccountModel> {
        return { ...addAccountModel, id: 'id' };
      }
    }

    class HasherStub implements Hasher {
      async make(payload: string): Promise<string> {
        return `hashed_password:${payload}`;
      }
    }

    hasherStub = new HasherStub();
    addAccountRepositoryStub = new AddAccountRepositoryStub();
    sut = new DbAddAccount(hasherStub, addAccountRepositoryStub);
  });

  it('should call Hasher with correct password', async () => {
    jest.spyOn(hasherStub, 'make');

    const addAccountModel: AddAccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    };

    await sut.execute(addAccountModel);

    expect(hasherStub.make).toBeCalledWith('valid_password');
  });

  it('should throw if Hasher throws', async () => {
    jest.spyOn(hasherStub, 'make').mockImplementationOnce(() => {
      throw new Error();
    });

    const addAccountModel: AddAccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    };

    await expect(sut.execute(addAccountModel)).rejects.toThrow();

    expect(hasherStub.make).toBeCalledWith('valid_password');
  });

  it('should call AddAccountRepository with correct values', async () => {
    jest.spyOn(addAccountRepositoryStub, 'add');

    const addAccountModel: AddAccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    };

    await sut.execute(addAccountModel);

    expect(addAccountRepositoryStub.add).toBeCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: await hasherStub.make('valid_password')
    });
  });
});
