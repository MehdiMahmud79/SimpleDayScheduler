//_________________Display current day & time on the jumbotron__________
$("#currentDay").text(moment().format("MMMM Do YYYY, h:mm a"));

//____________________________Creats work day object___________________
var workDays = [];
const startHour=9;
const endHour=17;

for (var i=startHour;i<=endHour;i++){
    var obj = {};
        obj["id"] =i-startHour; //`#hour${i-startHour}`
        if(i<12)obj["time"] = `${i} am`; 
        if(i>=12)obj["time"] = `${i} pm`; 
        obj["reminder"] = ""; 
     workDays.push(obj); 
} 
console.log(workDays)

// ________________________Export the rminders to the local storage_____________
function saveToLocal() {
    // localStorage.removeItem("workDays", JSON.stringify(workDays));
    localStorage.setItem("workDays", JSON.stringify(workDays));
}

//________________________Sets any data in localStorage to the view page________
function updateThePgae() {
    workDays.forEach(function (_thisHour) {
    $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

//____________Sets any existing reminder to the local storage and   update the view if it exists
function reloadLocal() {
    var storedDay = JSON.parse(localStorage.getItem("workDays"));
    if (storedDay) {
        workDays = storedDay;
    }
    saveToLocal();
    updateThePgae();
}


// Creat the elements and reload the existing data as asoon as the page is ready
$(document).ready(function () {
    
reloadLocal() 

//______________________Craet and appent DOM elements______________________________
function creatEl(){
    for (var i=startHour;i<=endHour;i++){
            // create row card
            var hourForm = $("<form>").attr( {"class": "row"});
            $(".container").append(hourForm);

            // create time field
            var hourField = $("<div>")
            .text(workDays[i-startHour].time)
            .attr({"class": "col-md-2 hour"});

            // create reminder data
            var reminderSection = $("<div>")
            .attr({"class": "col-md-9 description p-0"});

            var reminder = $("<textarea>");
            reminderSection.append(reminder);

            reminder.attr({"class": "textarea"});
            reminder.attr("id", workDays[i-startHour].id);

            // creates save button
            var saveButton = $("<i class='far fa-save fa-lg'></i>")
            var savePlan = $("<button>")
            .attr({
                "class": "col-md-1 saveBtn"
            });

            savePlan.append(saveButton);
            hourForm.append(hourField, reminderSection, savePlan);
    }
}

function formStyling() {

    //___________get currenttime______
    var currentHour = moment().hour();

    // loop over time blocks
    $(".row").each(function () {
        var blockHour = parseInt($(this).text());

        //check if we've moved past this time
        if (blockHour < currentHour) {
            $(this.children[1]).addClass("past");
            $(this.children[1]).removeClass("future");
            $(this.children[1]).removeClass("present");
        }
        else if (blockHour === currentHour) {
            $(this.children[1]).removeClass("past");
            $(this.children[1]).addClass("present");
            $(this.children[1]).removeClass("future");
        }
        else {
            $(this.children[1]).removeClass("present");
            $(this.children[1]).removeClass("past");
            $(this.children[1]).addClass("future");
        }
    })
}

// call the following function to creat time blocks and styling them according the past, future and present
creatEl()
formStyling();

// _______adding event to the save buttons________________
$(".saveBtn").on("click", function(event) {
        event.preventDefault();
        var saveIndex = $(this).siblings(".description").children(".textarea").attr("id");
        workDays[saveIndex].reminder = $(this).siblings(".present").children(".textarea").val(); // only save the present and future reminders
        workDays[saveIndex].reminder = $(this).siblings(".future").children(".textarea").val();
        
        console.log(saveIndex);
        saveToLocal();
        updateThePgae();
    })


    reloadLocal() 

})    




 

