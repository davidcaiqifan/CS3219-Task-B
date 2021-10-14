// Import the dependencies for testing
var chai = require('chai')
var assert = chai.assert
// var should = chai.should
// var expect = chai.expect
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
            // }).timeout(5000);
        }).timeout(10000);

    });
});

const sampleZoomClass = {
    classname: 'zoomnametestotot',
    zoomlink: 'zoomlinktestotot',
    profemail: '123',
    day: '123',
    time: '123'
}

const invalidZoomClass = {
    classname: 'zoomlinktestotot',
    profemail: '123',
    day: '123',
    time: '123'
}

describe("Add zoomclass", () => {
    describe("Create", () => {
        // Test to get all students record
        it("should add new zoomlink", (done) => {
            chai.request(app)
                .post('/api/zoom')
                .type('form')
                .send(sampleZoomClass)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body['data'].should.have.property('classname')
                        .which.is.a('string').eq("zoomnametestotot")
                    res.body['data'].should.have.property('zoomlink')
                        .which.is.a('string').eq("zoomlinktestotot")
                    // console.log(res.body['data'])
                    // res.body.should.have.property('_id');
                    // newAuctionDetailId = res.body._id;
                    // assert.equal(res.body['data'], sampleZoomClass)
                    done();
                });

        });

        it("should return error 409", (done) => {
            chai.request(app)
                .post('/api/zoom')
                .type('form')
                .send(invalidZoomClass)
                .end((err, res) => {
                    res.should.have.status(409);
                    res.body.should.be.a('object');
                    done();
                });

        });

    }).timeout(10000);;
});

describe("Read zoomclass", () => {
    describe("Read", () => {
        // Test to read specified zoomclass record
        it("should add read specified zoomclass", (done) => {
            chai.request(app)
                .get('/api/zoom/zoomnametestotot')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('classname')
                        .which.is.a('string').eq("zoomnametestotot")
                    res.body.should.have.property('zoomlink')
                        .which.is.a('string').eq("zoomlinktestotot")
                    done();
                });
        });

        it("should return error 404 when classname does not exist", (done) => {
            chai.request(app)
                .get('/api/zoom/nonexisitingclassname')
                .end((err, res) => {
                    res.should.have.status(404);
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
                .put('/api/zoom/zoomnametestotot')
                .type('form')
                .send({
                    'classname': 'zoomnametestotot',
                    'zoomlink': 'zoomlinktestedited',
                    'profemail': '123',
                    'day': '123',
                    'time': '123'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    console.log(res.body);
                    res.body.should.have.property('classname')
                        .which.is.a('string').eq("zoomnametestotot")
                    res.body.should.have.property('zoomlink')
                        .which.is.a('string').eq("zoomlinktestedited")
                    done();
                });

        });
        it("should return error 404 when classname does not exist", (done) => {
            chai.request(app)
                .put('/api/zoom/nonexisitingclassname')
                .type('form')
                .send({
                    'classname': 'zoomnametestotot',
                    'zoomlink': 'zoomlinktestedited',
                    'profemail': '123',
                    'day': '123',
                    'time': '123'
                })
                .end((err, res) => {
                    res.should.have.status(404);
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
                .delete('/api/zoom/zoomnametestotot')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should return error 404 when classname does not exist", (done) => {
            chai.request(app)
                .delete('/api/zoom/zoomnametestotot')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
});