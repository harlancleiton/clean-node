import { DbAddAccount } from './db-add-account';
import {
  AccountModel,
  AddAccountModel,
  AddAccountRepository,
  Hash
} from './db-add-account-protocols';

describe('DbAddAccountUsecase', () => {
  let sut: DbAddAccount;
  let addAccountRepositoryStub: AddAccountRepository;
  let hashStub: Hash;

  beforeEach(() => {
    class AddAccountRepositoryStub implements AddAccountRepository {
      async add(addAccountModel: AddAccountModel): Promise<AccountModel> {
        return { ...addAccountModel, id: 'valid_id' };
      }
    }

    class HashStub implements Hash {
      async make(payload: string): Promise<string> {
        return `hashed_password:${payload}`;
      }
    }

    hashStub = new HashStub();
    addAccountRepositoryStub = new AddAccountRepositoryStub();
    sut = new DbAddAccount(hashStub, addAccountRepositoryStub);
  });

  it('should call Hash with correct password', async () => {
    jest.spyOn(hashStub, 'make');

    const addAccountModel: AddAccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    };

    await sut.execute(addAccountModel);

    expect(hashStub.make).toBeCalledWith('valid_password');
  });

  it('should throw if Hash throws', async () => {
    jest.spyOn(hashStub, 'make').mockImplementationOnce(() => {
      throw new Error();
    });

    const addAccountModel: AddAccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    };

    await expect(sut.execute(addAccountModel)).rejects.toThrow();

    expect(hashStub.make).toBeCalledWith('valid_password');
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
      password: await hashStub.make('valid_password')
    });
  });

  it('should throw if AddAccountRepository throws', async () => {
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });

    const addAccountModel: AddAccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    };

    await expect(sut.execute(addAccountModel)).rejects.toThrow();

    expect(addAccountRepositoryStub.add).toBeCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: await hashStub.make('valid_password')
    });
  });

  it('should return an account on success', async () => {
    const addAccountModel: AddAccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    };

    jest.spyOn(addAccountRepositoryStub, 'add');

    const account = await sut.execute(addAccountModel);

    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: await hashStub.make('valid_password')
    });
    expect(addAccountRepositoryStub.add).toBeCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: await hashStub.make('valid_password')
    });
  });
});
