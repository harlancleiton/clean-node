import bcrypt from 'bcryptjs';

import { BCryptAdapter } from './bcrypt-adapter';

describe('BCryptAdpter', () => {
  let sut: BCryptAdapter;

  beforeEach(() => {
    sut = new BCryptAdapter();
  });

  it('should call bcrypt with correct values', async () => {
    jest.spyOn(bcrypt, 'hash');

    await sut.make('any_value');

    expect(bcrypt.hash).toBeCalledWith('any_value', expect.any(String));
  });
});
