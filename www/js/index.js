var localStorage = window.localStorage;
var data = [];
var selectionRecord = null;

var app = {
    // Application Constructor
    initialize: function () {
        // DeviceReady is main one
        document.addEventListener(
            "deviceready",
            this.deviceReadyAction.bind(this),
            false
        );

        // add new task button click
        $("#addTaskButton").click(() => {
            $("#textAreaTaskDetail").val("");
        });

        // save new task
        $("#addTaskSaveButton").click(() => {
            // get value form text field
            var taskDetail = $("#textAreaTaskDetail").val();

            // check if have value
            if (taskDetail) {
                // add to data
                data.push({
                    task: taskDetail,
                    completed: false,
                });

                // refresh table
                this.generateList();

                // update data in local storage
                localStorage.setItem("TASK_DATA", JSON.stringify(data));
            } else {
                alert("No data");
            }
        });

        // complete button click
        $("#completeTaskButton").click(() => {
            // if do not have selectionRecord, do not do any thing
            if (selectionRecord == null) return;

            // update completed for the record in data with selectRecord.
            data[selectionRecord].completed = true;
            this.generateList();

            // update data in local storage
            localStorage.setItem("TASK_DATA", JSON.stringify(data));
        });

        // delete button click
        $("#deleteTaskButton").click(() => {
            if (selectionRecord == null) return;

            // update completed for the record in data with selectRecord.
            data.splice(selectionRecord, 1);
            this.generateList();

            // update data in local storage
            localStorage.setItem("TASK_DATA", JSON.stringify(data));
        });

        console.log(data);
    },

    deviceReadyAction: function () {
        // get data
        if (localStorage.getItem("TASK_DATA")) {
            data = JSON.parse(localStorage.getItem("TASK_DATA"));
        }

        // display to do list screen
        $("#list").removeClass("d-none");

        this.generateList();
    },

    // generate list and display in DOM
    generateList: function () {
        var listHtml = "";

        // check if have record in data, create list and add to DOM
        if (data.length > 0) {
            // loop to create list
            data.forEach((item, i) => {
                listHtml +=
                    '<div id="itemList" data-id="' +
                    i +
                    '" class="item-list row p-1 border-bottom align-items-center" data-toggle="modal" data-target="#confirmModalCenter"><div class="col">' +
                    (i + 1) +
                    ". " +
                    item.task +
                    '</div><img src="./img/completed.png" class="icon ';

                if (item.completed == false) listHtml += "d-none";

                listHtml += '" alt="completed"/></button></div>';
            });
        }
        // add html to DOM
        $("#itemListSection").html(listHtml);

        // blind click event item list
        $(".item-list").click(function () {
            selectionRecord = $(this).data("id");

            $("#taskDetail").html(data[selectionRecord].task);

            // check if task not complete, show complete title and button
            // if completed, show delete title and button
            if (data[selectionRecord].completed == false) {
                // change title
                $("#confirmModalLongTitle").html(
                    "Please confirm to complete task"
                );
                // show/hide button
                $("#completeTaskButton").removeClass("d-none");
                $("#deleteTaskButton").addClass("d-none");
            } else {
                // change title
                $("#confirmModalLongTitle").html(
                    "Please confirm to delete task"
                );
                // show/hide button
                $("#deleteTaskButton").removeClass("d-none");
                $("#completeTaskButton").addClass("d-none");
            }
        });
    },
};

app.initialize();
