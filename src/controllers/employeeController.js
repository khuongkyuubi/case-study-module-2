const Employee = require("../models/employee.model");
const employeeValidate = require("../utils/employeeValidate")

const paginateHelper = require('express-handlebars-paginate');

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
        let page = +req.params.page || 1;
        try {
            const total = await Employee.countDocuments();
            let numbersPage = Math.ceil(total / perPage);
            if (page <= 0) {
                page = 1
                res.redirect("/employee/list/1");
            } else if (page > numbersPage) {
                page = numbersPage;
                res.redirect(`/employee/list/${numbersPage}`);

            } else if (isNaN(page)) {
                res.redirect("/employee/list/1");
            }
            const limitFrom = (page - 1) * perPage;
            const limitTo = page < numbersPage ? limitFrom + perPage : total;


            let docs, sortStr ; /*= await Employee.find()
                .skip(limitFrom)
                .limit(perPage)
                .lean();*/

            if (req.query.hasOwnProperty("_sort")) {
                docs = await Employee.find()
                    .sort({
                        fullName: "asc"
                    })
                    .skip(limitFrom)
                    .limit(perPage)
                    .lean();
                sortStr = "?_sort&column=name&type=asc"
            } else {
                docs = await Employee.find()
                    .skip(limitFrom)
                    .limit(perPage)
                    .lean();
            }

            docs.sortStr = sortStr;
            docs.page = page;
            docs.total = total;
            const size = [];
            for (let i = 1; i <= numbersPage; i++) {
                size.push({page : i, sortStr})
            }
            docs.prevPage = page > 1 ? page - 1 : 1;
            docs.nextPage = page < numbersPage ? page + 1 : numbersPage;

            docs.size = size;
            docs.numbersPage = numbersPage;
            docs.limitFrom = limitFrom + 1; // phần tử bắt đầu phải cộng thêm 1 so với phần tử xét
            docs.limitTo = limitTo;
            res.render("employee/list", {
                list: docs
            });

        } catch (err) {
            console.log(err)
        }
    }

    // [GET] /employee/list
    _sort;
    async sortByName(req, res) {
        if (req.query.hasOwnProperty("_sort")) {
        }

    }


}

module.exports = new EmployeeController();