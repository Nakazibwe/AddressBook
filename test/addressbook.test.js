/* eslint-disable no-undef */
const chai = require('chai').expect;

const request = require('request');

const sinon = require('sinon');

const mocha = require('mocha');

const app = require('../controllers/address.controller');

// Get Address tests.
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

// Post Addresses tests.
describe('with mock: postAddresses', () => {
  it('should postAddresses', async () => {
    const requestMock = sinon.mock(request);
    const User = {
      firstname: 'Pearl',
      lastname: 'Choko',
      phonenumber: 256779806798,
    };

    requestMock.expects('post')
      .withArgs('http://localhost:5000/addresses');

    app.postAddresses().then((newUser) => {
      newUser.expect(User).to.be.a('object');
      newUser.expect(User).firstname.to.be.a('String');
      newUser.expect(User).lastname.to.be.a('String');
      newUser.expect(User).phonenumber.to.be.a('Number');
      requestMock.verify();
      requestMock.restore();
    });
  });
});
