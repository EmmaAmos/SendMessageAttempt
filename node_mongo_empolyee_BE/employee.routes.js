const express = require('express')
const router = express.Router()

const EmployeeController = require('./employee.controller')

router.get('/', EmployeeController.index)
router.post('/show', EmployeeController.show)
router.post('/store', EmployeeController.store)
router.post('/update', EmployeeController.update)
router.post('/destory', EmployeeController.destory)

module.exports = router