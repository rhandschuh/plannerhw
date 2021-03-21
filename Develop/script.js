//decaling my variables
var theDay = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    
]
// data in local storage for viewing 
function displaytheReminders() {
    theDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}
// data for header
function theHeader() {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

// saving to the local storage
function savetheReminders() {
    localStorage.setItem("theDay", JSON.stringify(theDay));
}

// adds already storage if it is there 
function init() {
    var storetheDay = JSON.parse(localStorage.getItem("theDay"));

    if (storedtheDay) {
        theDay = storethedDay;
    }

    savetheReminders();
    displaytheReminders();
}




// loads  the header date on screen 
theHeader();

// creates what you see for the scheduler 
theDay.forEach(function(thisHour) {
    // creates timeblocks row
    var hourRows = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRows);

    // the time
    var thehourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // creates schdeduler
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    // the save button
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savethePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savethePlan.append(saveButton);
    hourRows.append(thehourField, hourPlan, savethePlan);
})

// loads any existing localstorage data after components created
init();


// data for using local storage
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    theDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    displaytheReminders();
    savetheReminders();
   
})