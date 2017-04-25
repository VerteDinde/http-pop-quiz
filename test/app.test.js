const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

const app = require('../lib/app');

chai.use(chaiHttp);

describe('app', () => {

  const request = chai.request(app);

  it('returns supercat', () => {
    return request.get('/cat')
      .then(res => {
        assert.deepEqual(res.body, { name: 'super cat', type: 'top secret' });
      });
  });

  it('gets cat.html', () => {
    return request.get('/cat.html')
      .then(res => {
        assert.equal(res.text, '<h1>Super Cat FTW!</h1>');
      });
  });

  it('returns 404 for no GET', () => {
    return request.post('/')
      .then(() => {
        throw new Error('should not succeed, 404 expected');
      },
      res => {
        assert.equal(res.status, 404);
      });
  });

});