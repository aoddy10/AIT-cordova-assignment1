var data = [
    { task: "Task 1", completed: false },
    { task: "Task 2", completed: true },
];

var app = {
    // Application Constructor
    initialize: function () {
        // DeviceReady is main one
        document.addEventListener(
            "deviceready",
            this.deviceReadyAction.bind(this),
            false
        );

        // when user move to another application
        // document.addEventListener("pause", null, false);

        // when user move back to application
        document.addEventListener(
            "resume",
            this.resumeAction.bind(this),
            false
        );

        // add new task button click
        $("#addTaskButton").click(() => {
            $("#taskDetail").val("");
        });

        // save new task
        $("#addTaskSaveButton").click(() => {
            // get value form text field
            var taskDetail = $("#taskDetail").val();

            // check if have value
            if (taskDetail) {
                // add to data
                data.push({
                    task: taskDetail,
                    completed: false,
                });
                // refresh table
                this.generateList();
            } else {
                alert("No data");
            }
        });
    },

    deviceReadyAction: function () {
        // display welcome screen
        $("#welcome").removeClass("d-none");
        setTimeout(function () {
            // get data
            // display to do list screen
            $("#welcome").addClass("d-none");
            $("#list").removeClass("d-none");
        }, 1000);

        this.generateList();
    },

    resumeAction: function () {},

    getData: function () {},

    generateList: function () {
        var listHtml = "";
        if (data.length > 0) {
            data.forEach((item) => {
                listHtml +=
                    '<div class="item-list row p-1 border-bottom align-items-center"><div class="col">' +
                    item.task +
                    '</div><button type="button" class="btn ';

                if (item.completed == false) listHtml += "d-none";

                listHtml +=
                    '" data-toggle="modal" data-target="#completeModal"> <img src="./img/completed.png" class="icon" alt="completed"/></button></div>';
            });
        }

        $("#itemList").html(listHtml);
    },
};

app.initialize();
