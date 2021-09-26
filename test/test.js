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

describe("Get zoomlinks", () => {
    describe("GET /", () => {
        
        // Test to get all students record
        it("should get all zoomlinks record", (done) => {
            chai.request(app)
                .get('/api/zoom')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(5000);

    });
});

describe("Add zoomclass", () => {
    describe("Create", () => {
        // Test to get all students record
        it("should add new zoomlink", (done) => {
            chai.request(app)
                .post('/api/zoom')
                .type('form')
                .send({
                    'classname': 'zoomlinktest1',
                    'zoomlink': '123',
                    'profemail': '123',
                    'day': '123',
                    'time': '123'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
});

describe("Read zoomclass", () => {
    describe("Read", () => {
        // Test to read specified zoomclass record
        it("should add read specified zoomclass", (done) => {
            chai.request(app)
                .get('/api/zoom/zoomlinktest1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
});

describe("Update zoomclass", () => {
    describe("Update /", () => {
        // Test to get all students record
        it("Should read new zoomlink", (done) => {
            chai.request(app)
                .put('/api/zoom/zoomlinktest1')
                .type('form')
                .send({
                    'classname': 'zoomlinktest1',
                    'zoomlink': '123',
                    'profemail': '123',
                    'day': '123',
                    'time': '123'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
});

describe("Delete zoomclass", () => {
    describe("Delete /", () => {
        // Test to get all students record
        it("Should read new zoomlink", (done) => {
            chai.request(app)
                .delete('/api/zoom/zoomlinktest1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
});