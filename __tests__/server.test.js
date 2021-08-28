'user strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const request = supertest(server);

describe('middleware server', () => {
    it('404', () => { });
    it('500', () => { });
    it('hello', () => { });
});