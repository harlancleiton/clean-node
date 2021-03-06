import { Hasher } from '~/data/protocols';
import { AccountModel } from '~/domain/models';
import { AddAccount, AddAccountModel } from '~/domain/usecases';

export class DbAddAccount implements AddAccount {
  constructor(private readonly hasher: Hasher) {}

  async execute({ password }: AddAccountModel): Promise<AccountModel> {
    await this.hasher.make(password);

    return { id: 'id', name: 'name', email: 'email', password: 'password' };
  }
}
