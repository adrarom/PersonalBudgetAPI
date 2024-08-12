var express = require('express');
var router = express.Router();

router.post('/register', registerUser);

router.post('/login', authUser);

router.get('/profile', protect, getUserProfile);

router.put('/profile', protect, updateUserProfile);

module.exports = router;
