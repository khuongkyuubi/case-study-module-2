const express = require('express');
const router = express.Router();

const employeeController = require("../controllers/employeeController")

router.get('/', employeeController.renderInsertPage);

router.post('/', employeeController.insertNewEmployee);

router.get('/list', employeeController.pagination);

router.get('/list/:page', employeeController.pagination);

router.get('/:id', employeeController.renderUpdatePage);

// router.get('/delete/:id', employeeController.removeEmployee);
router.delete('/delete/:id', employeeController.removeEmployee);

module.exports = router;