const Employee = require("../models/employee.model");
const employeeValidate = require("../utils/employeeValidate")

class EmployeeController {

    //[GET] employee/
    renderInsertPage(req, res) {
        res.render("employee/addOrEdit", {
            viewTitle: "Add"
        });
    }

    //[POST] employee/
    insertNewEmployee(req, res) {
        if (req.body._id === '')
            employeeValidate.insertRecord(req, res);
        else
            employeeValidate.updateRecord(req, res);
    }

    //[GET] /employee/list
    async renderList(req, res) {
        try {
            const docs = await Employee.find().lean();
            res.render("employee/list", {
                list: docs
            });
        } catch (err) {
            console.log('Error in retrieving employee list :' + err);

        }
    }

    //[GET] /employee/:id
    async renderUpdatePage(req, res) {
        try {
            const doc = await Employee.findById(req.params.id).lean()
            res.render("employee/addOrEdit", {
                viewTitle: "Update",
                employee: doc
            });

        } catch (err) {
            console.log(err)
        }


    }

    // [DELETE] /employee/delete/:id
    async removeEmployee(req, res) {
        try {
            await Employee.findByIdAndRemove(req.params.id)
            res.redirect('/employee/list');
        } catch (err) {
            console.log('Error in employee delete :' + err);
        }
    }

    //[GET] /employee/list/ :page
    page;

    async pagination(req, res, next) {
        let perPage = 5; // số bài mỗi page
        let page = req.params.page || 1;
        try {
            const total = await Employee.countDocuments();
            let numbersPage = Math.ceil(total / perPage);
            if (page <= 0) {
                page = 1
            } else if (page > numbersPage) {
                page = numbersPage;
            }
            const limitFrom = (page - 1) * perPage;
            const limitTo = total - (numbersPage -page )* perPage;
            const docs = await Employee.find()
                .skip(limitFrom)
                .limit(perPage)
                .lean();

            docs.page = page;
            docs.total = total;
            docs.numbersPage = numbersPage;
            docs.limitFrom = limitFrom;
            docs.limitTo = limitTo;
            res.render("employee/list", {
                list: docs
            });

        } catch (err) {
            console.log(err)
        }


    }


}

module.exports = new EmployeeController();