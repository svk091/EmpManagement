const Employee = require('../models/Employee');

const createEmployee = async (req, res) => {
  const { email, mobile } = req.body;
  const existingEmployee = await Employee.findOne({ $or: [{ email }, { mobile }] });
  if (existingEmployee) {
    return res.status(400).json({ error: 'Email or mobile number already exists' });
  }
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await employee.save();
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Employee deleted!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createEmployee, getEmployees, updateEmployee, deleteEmployee, getEmployeeById };