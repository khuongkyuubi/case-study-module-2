$(document).ready(function () {
    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Select/Deselect checkboxes
    let checkbox = $('table tbody input[type="checkbox"]');
    $("#selectAll").click(function () {
        if (this.checked) {
            checkbox.each(function () {
                this.checked = true;
            });
        } else {
            checkbox.each(function () {
                this.checked = false;
            });
        }
    });
    checkbox.click(function () {
        if (!this.checked) {
            $("#selectAll").prop("checked", false);
        }
    });

    if (location.pathname.includes("/employee/list/")) {
        let currentPage = location.pathname.slice("/employee/list/".length);
        if (!currentPage || isNaN(currentPage)) {
            currentPage = "1"
        }

        let pagination = $(".page-item");
        for (const paginationElement of pagination) {
            if (currentPage === paginationElement.querySelector("a").text) {
                paginationElement.classList.add("active")
            }
        }
    }

});