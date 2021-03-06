import { AddAccountRepository } from '~/data/protocols';

import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Hasher
} from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async execute({
    email,
    name,
    password
  }: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.make(password);

    const account = await this.addAccountRepository.add({
      email,
      name,
      password: hashedPassword
    });

    return account;
  }
}
