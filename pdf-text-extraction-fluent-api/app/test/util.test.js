const { describe, it } = require('mocha');
const { expect } = require('chai');

const { InvalidRegexError, evaluateRegex } = require('../src/util');

describe('Util', () => {

    it('#evaluateRegex should throw an error using an unsafe regex', () => {

        const usafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/;

        expect(() => evaluateRegex(usafeRegex)).to.throw(InvalidRegexError, `This ${usafeRegex} is unsafe bro`);

    });

    it('#evaluateRegex should bot throw an error using an safe regex', () => {

        const safeRegex = /^([a-z])$/;

        expect(() => evaluateRegex(safeRegex)).to.not.throw();

        expect(evaluateRegex(safeRegex)).to.be.ok();

    });

});