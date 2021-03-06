import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Hasher
} from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
  constructor(private readonly hasher: Hasher) {}

  async execute({ password }: AddAccountModel): Promise<AccountModel> {
    await this.hasher.make(password);

    return { id: 'id', name: 'name', email: 'email', password: 'password' };
  }
}
