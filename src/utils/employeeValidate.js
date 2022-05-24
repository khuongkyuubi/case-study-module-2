const Employee = require("../models/employee.model");

class EmployeeValidate {
    async insertRecord(req, res) {
        const employee = new Employee();
        const
            fullName = req.body.fullName,
            email = req.body.email,
            mobile = req.body.mobile,
            city = req.body.city;

        try {
            // await employee.save();
            await Employee.create({fullName, email, mobile, city});
            res.redirect('employee/list');
        } catch (err) {
            if (err.name === 'ValidationError') {
                this.handleValidationError(err, req.body); // gọi hàm sử lý lỗi, truyền vào err và req.body
                res.render("employee/addOrEdit", {
                    viewTitle: "Add",
                    employee: req.body
                });
            } else
                console.log('Error during record insertion : ' + err);
        }
    }


    // khi dùng async - await phải dùng try - catch để bắt lỗi
    async updateRecord(req, res) {
        // phải thêm config run validator thì findOneAndUpdate mới chạy validator
        try {
            await Employee.findOneAndUpdate({_id: req.body._id}, req.body, {
                new: true,
                runValidators: true,
                context: 'query'
            })
            res.redirect('employee/list');

        } catch (err) {
            if (err.name === 'ValidationError') {
                this.handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update',
                    employee: req.body
                });
            } else {
                console.log('Error during record update : ' + err);
            }
        }
    }

    handleValidationError(err, body) {
        for (let field in err.errors) {
            switch (err.errors[field].path) {
                case 'fullName':
                    body['fullNameError'] = err.errors[field].message;
                    break;
                case 'email':
                    body['emailError'] = err.errors[field].message;
                    break;
                case 'mobile':
                    body['mobileError'] = err.errors[field].message;
                    break;
                default:
                    break;
            }
        }
    }


}

module.exports = new EmployeeValidate();