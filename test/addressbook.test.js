/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/order */
// /* eslint-disable no-undef */

const request = require('request');

const sinon = require('sinon');

const { expect } = require('chai');

const app = require('../controllers/address.controller');

const AddressBook = require('../models/addressbook.model');

const mocha = require('mocha');

const { describe } = require('mocha');

// Get Address tests.
describe('with mock: getAddresses', () => {
  it('Get All Addresses', async () => {
    const requestMock = sinon.mock(request);
    requestMock.expects('get');
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

// Address posting tests
describe('Create User Address', () => {
  it('Posting an address to the database', async () => {
    const stubUser = {
      firstname: 'Pearl',
      lastname: 'Choko',
      phonenumber: 256779806798,
    };
    const stub = sinon.stub(AddressBook, 'create').returns(stubUser);
    const newUser = new AddressBook.create(stubUser.firstname, stubUser.lastname, stubUser.phonenumber);
    expect(newUser.firstname).to.equal(stubUser.firstname);
    expect(newUser.lastname).to.equal(stubUser.lastname);
    expect(newUser.phonenumber).to.equal(stubUser.phonenumber);
  });
});
