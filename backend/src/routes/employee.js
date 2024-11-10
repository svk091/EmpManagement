const express = require('express');
const { createEmployee, getEmployees, updateEmployee, deleteEmployee, getEmployeeById } = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.post('/', createEmployee);
router.get('/employee/:id', getEmployeeById);
router.get('/', getEmployees);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;