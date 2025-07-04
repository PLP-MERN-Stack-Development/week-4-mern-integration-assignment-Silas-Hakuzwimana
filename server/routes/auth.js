const express = require('express');
const { register, getAllUsers, getUserById, updateUser, deleteUser, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', authMiddleware, updateUser);
router.delete('/users/:id', authMiddleware,deleteUser);
router.post('/register', register); 
router.post('/login', login);

module.exports = router;
