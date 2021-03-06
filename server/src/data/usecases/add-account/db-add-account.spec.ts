import { Hasher } from '~/data/protocols';
import { AddAccountModel } from '~/domain/usecases';

import { DbAddAccount } from './db-add-account';

describe('DbAddAccountUsecase', () => {
  let sut: DbAddAccount;
  let hasherStub: Hasher;

  beforeEach(() => {
    class HasherStub implements Hasher {
      async make(payload: string): Promise<string> {
        return `hashed_password:${payload}`;
      }
    }

    hasherStub = new HasherStub();
    sut = new DbAddAccount(hasherStub);
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
});
