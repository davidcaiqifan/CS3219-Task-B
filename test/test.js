// Import the dependencies for testing
var chai = require('chai')
var assert = chai.assert
var should = chai.should
var expect = chai.expect
var chaiHttp = require('chai-http')
var app = require('../index')
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Contacts", () => {
    describe("GET /", () => {
        // Test to get all students record
        it("should get all contacts record", (done) => {
            chai.request(app)
                .get('/api/contacts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
});

describe('Array', function () {

    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});