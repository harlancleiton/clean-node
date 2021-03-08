import bcrypt from 'bcryptjs';

import { Hash } from '~/data/protocols';

export class BCryptAdapter implements Hash {
  async make(payload: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    await bcrypt.hash(payload, salt);

    return '';
  }
}
