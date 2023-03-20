const request = require('supertest');
const app = require('../src/app');
const User = require('../src/user/User');
const sequelize = require('../src/config/database');

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});
describe('User Registeration Test', () => {
  it('returns 200 when signup request is vallid', () => {
    request(app)
      .post('/api/1/users')
      .send({ username: 'admin', password: 'pass1' })
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  it('returns success msg  when signup request is vallid', () => {
    request(app)
      .post('/api/1/users')
      .send({ username: 'admin', password: 'pass1' })
      .then((response) => {
        expect(response.body.message).toBe('User created');
      });
  });

  it('saves user to database', () => {
    request(app)
      .post('/api/1/users')
      .send({ username: 'admin', password: 'pass1' })
      .then(() => {
        User.findAll().then((userlist) => {
          expect(userlist.length).toBe(1);
        });
      });
  });

  it('saves username and email to database', () => {
    request(app)
      .post('/api/1/users')
      .send({ username: 'admin', password: 'pass1' })
      .then(() => {
        User.findAll().then((userlist) => {
          const saveduser = userlist[0];
          expect(saveduser.username).toBe('user1');
          expect(saveduser.email).toBe('');
        });
      });
  });
});
