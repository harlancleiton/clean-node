import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
  Hash
} from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hash: Hash,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async execute({
    email,
    name,
    password
  }: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hash.make(password);

    const account = await this.addAccountRepository.add({
      email,
      name,
      password: hashedPassword
    });

    return account;
  }
}
