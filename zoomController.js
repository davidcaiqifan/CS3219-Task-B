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
    zoom.name = req.body.classname ? req.body.classname : zoom.name;
    zoom.zoomlink = req.body.zoomlink;
    zoom.profemail = req.body.profemail;
    zoom.day = req.body.day;
    zoom.time = req.body.time;
    // save the zoomlink and check for errors
    zoom.save(function (err) {
        // Check for validation error
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New ZoomClass created!',
                data: zoom
            });
    });
};
// Handle view zoom info
exports.view = function (req, res) {
    Zoom.findById(req.params.zoom_id, function (err, zoomlink) {
        if (err)
            res.send(err);
        res.json({
            message: 'Zoom details loading..',
            data: zoomlink
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
    Zoom.findById(req.params.zoom_id, function (err, zoom) {
        if (err)
            res.send(err);
        zoom.name = req.body.classname ? req.body.classname : zoom.name;
        zoom.zoomlink = req.body.zoomlink;
        zoom.profemail = req.body.profemail;
        zoom.day = req.body.day;
        zoom.time = req.body.time;
        // save the contact and check for errors
        zoom.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Zoom Info updated',
                data: zoom
            });
        });
    });
};
// Handle delete zoom
exports.delete = function (req, res) {
    Zoom.remove({
        _id: req.params.zoom_id
    }, function (err, zoomlink) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Zoom detail deleted'
        });
    });
};