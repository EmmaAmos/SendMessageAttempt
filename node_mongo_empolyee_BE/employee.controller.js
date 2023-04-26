const { response } = require('express')
const Employee = require('./employee.model')
const nodemailer = require('nodemailer');

//Show list of employees
const index = (req, res, next) => {
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'Error getting all employees...'
        })
    })
}

//Get employee by id.
const show = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'Error getting employee by id...'
        })
    })
}

//Add employee
const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    employee.save()
    .then(response => {
        res.json({
            message: 'Employee added...'
        })
    })
    .catch(error => {
        res.json({
            message: 'Error adding employee...'
        })
    })
}

//Update employee
const update = (req, res, next) => {
    let employeeID = req.body.employeeID

    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }

    Employee.findByIdAndUpdate(employeeID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'Employee updated...'
        })
    })
    .catch(error => {
        res.json({
            message: 'Error updating employee...'
        })
    })
}

//Delete employee
const destory = (req, res, next) => {
    let employeeID = req.body.employeeID

    Employee.findByIdAndRemove(employeeID)
    .then(() => {
        res.json({
            message: 'Employee deleted...'
        })
    })
    .catch(error => {
        res.json({
            message: 'Error deleting employee...'
        })
    })
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'elovestodraw@gmail.com',
      pass: 'letmeingmail1'
    }
  });

  const mailOptions = {
    from: 'elovestodraw@gmail.com',
    to: 'elovestodraw@gmail.com',
    subject: 'Test email',
    text: 'This is a test email from Nodemailer'
  }; 

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });  
  

module.exports = {
    index, show, store, update, destory
}