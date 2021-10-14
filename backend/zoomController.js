// zoomController.js
// Import zoom model
Zoom = require('./zoomModel');
// Handle index actions
exports.index = function (req, res) {
    Zoom.get(function (err, zoomlinks) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Zoomlinks retrieved successfully",
            data: zoomlinks
        });
    });
};
// Handle create zoom actions
exports.new = function (req, res) {
    var zoom = new Zoom();
    zoom.classname = req.body.classname ? req.body.classname : zoom.name;
    zoom.zoomlink = req.body.zoomlink;
    zoom.profemail = req.body.profemail;
    zoom.day = req.body.day;
    zoom.time = req.body.time;
    // save the zoomlink and check for errors
    zoom.save(function (err) {
        // Check for validation error
        if (err)
            res.json({
                status: "error",
                message: "There was a problem creating a new zoom class. There is already another existing class with the same name or requried parameters are not filled." + err,
            }, 409);
        //res.json(err);
        else
            res.json({
                message: 'New ZoomClass created!',
                data: zoom
            });
    });
};
// Handle view zoom info
// exports.view = function (req, res) {
//     Zoom.findOne({ classname: req.params.classname }, function (err, zoomlink) {
//         if (err)
//             res.send(err, 404);
//         res.json({
//             message: 'Zoom details loading..',
//             data: zoomlink
//         });
//     });
// };

exports.view = (req, res) => {
    Zoom.findOne({classname : req.params.classname})
        .then(zoom => {
            if (!zoom) {
                return res.status(404).send({
                    message: "Zoomclass not found with classname " + req.params.classname
                });
            }
            res.send(zoom);
        }).catch(err => {
            console.log(err)
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Zoom Class not found with classname " + req.params.classname
                });
            }
            return res.status(500).send({
                message: "Error getting Zoom Class with classname " + req.params.classname
            });
        });
};
// Handle update contact info
// exports.update = function (req, res) {
//     Zoom.findOne({classname: req.params.classname}, function (err, zoom) {
//         if (err)
//             res.send(err);
//         zoom.classname = req.body.classname ? req.body.classname : zoom.name;
//         zoom.zoomlink = req.body.zoomlink;
//         zoom.profemail = req.body.profemail;
//         zoom.day = req.body.day;
//         zoom.time = req.body.time;
//         // save the contact and check for errors
//         zoom.save(function (err) {
//             if (err)
//                 res.json(err, 404);
//             res.json({
//                 message: 'Zoom Info updated',
//                 data: zoom
//             });
//         });
//     });
// };


// Find user and update it with the request body
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
    Zoom.findOneAndUpdate({classname : req.params.classname}, {
        classname: req.body.classname,
        zoomlink: req.body.zoomlink,
        profemail: req.body.profemail,
        day: req.body.day,
        time: req.body.time
    }, { new: true })
        .then(zoom => {
            if (!zoom) {
                return res.status(404).send({
                    message: "zoom not found with classname " + req.params.classname
                });
            }
            res.send(zoom);
        }).catch(err => {
            // console.log(err)
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "zoom not found with classname " + req.params.classname
                });
            }
            return res.status(500).send({
                message: "Error updating zoomclass with classname " + req.params.classname
            });
        });
};
// Handle delete zoom
// exports.delete = function (req, res) {
//     Zoom.findOneAndDelete({classname: req.params.classname}, function (err, zoomlink) {
//         if (err)
//             res.send(err, 404);
//         res.json({
//             status: "success",
//             message: 'Zoom detail deleted'
//         });
//     });
// };
exports.delete = (req, res) => {
    Zoom.findOneAndRemove({classname : req.params.classname})
        .then(zoomclass => {
            if (!zoomclass) {
                return res.status(404).send({
                    message: "Zoom not found with class name " + req.params.classname
                });
            }
            res.send({ message: "ZoomClass deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "ZoomClass not found with classname " + req.params.classname
                });
            }
            return res.status(500).send({
                message: "Could not delete ZoomClass with classname " + req.params.classname
            });
        });
};