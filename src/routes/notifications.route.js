const express = require("express");
// auth middleware
const auth = require('../middlewares/auth');
const controller = require('../controllers/notification.controller');

const router = express.Router();

router.route('/').get(auth, controller.getAllNotifications);

router.route('/read').patch(auth, controller.readNotification);

router.route('/:id').delete(auth, controller.deleteNotification);

module.exports = router;