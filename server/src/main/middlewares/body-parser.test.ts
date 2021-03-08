import request from 'supertest';

import { app } from '../config/app';

describe('BodyParser Middleware', () => {
  it('should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.json(req.body);
    });

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Harlan' })
      .expect({ name: 'Harlan' });
  });
});
