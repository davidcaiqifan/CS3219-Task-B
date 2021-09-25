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
// Import contact controller
var contactController = require('./contactController');
// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);

router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

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