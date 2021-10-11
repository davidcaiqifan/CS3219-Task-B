// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// Import zoom controller
var zoomController = require('./zoomController');
// Zoom routes
router.route('/zoom')
    .get(zoomController.index)
    .post(zoomController.new);

router.route('/zoom/:id')
    .get(zoomController.view)
    .patch(zoomController.update)
    .put(zoomController.update)
    .delete(zoomController.delete);

router.all('*', function(req, res){
    res.send('api what???', 404);
    });


// router.use((req, res, next) => {
//     next({
//         status: 404,
//         message: 'Not Found',
//     });
// });

router.use((err, req, res, next) => {
    if (err.status === 404) {
        return res.status(400).render('404');
    }

    if (err.status === 500) {
        return res.status(500).render('500');
    }

    if (err.status === 503) {
        return res.status(404).render('404');
    }

    next();
});
// Export API routes
module.exports = router;