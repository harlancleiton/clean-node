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

  it('should return a hash on success', async () => {
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementationOnce(async () => 'hashed_any_value');

    const hash = await sut.make('any_value');

    expect(hash).toBeDefined();
    expect(hash).toBe('hashed_any_value');
  });

  it('should throw if bcrypt throws', async () => {
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.make('any_value')).rejects.toThrow();
  });
});
