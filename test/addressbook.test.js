/* eslint-disable no-undef */
const chai = require('chai').expect;

const request = require('request');

const chaiHttp = require('chai-http');

const sinon = require('sinon');

const mocha = require('mocha');

const app = require('../controllers/address.controller');

// chai.use(chaiHttp);

describe('with mock: getAddresses', () => {
  it('should getAllAddresses', async () => {
    const requestMock = sinon.mock(request);
    requestMock.expects('get')
      .withArgs('http://localhost:5000/addresses');

    app.getAddresses().then((Addressbook) => {
      Addressbook.forEach((user) => {
        expect(user).to.have.property('firstname');
        expect(user).to.have.property('lastname');
        expect(user).to.have.property('phonenumber');
      });

      requestMock.verify();
      requestMock.restore();
    });
  });
});
