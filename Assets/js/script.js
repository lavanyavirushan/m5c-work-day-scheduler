// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  const saveBtns = document.querySelectorAll(".saveBtn");
  const eventDescription = document.querySelectorAll(".description"); 
  const timeBlocks = document.querySelectorAll(".time-block");

  // set current date
  let today = dayjs().format('dddd, MMMM, D');
  const d = new Date();
  let hour = d.getHours();
  $('#currentDay').text(today);



  // when save button clicked save textarea content into local storage 
  function saveCalenderEvent(time, description){
    let daysEvent = {};
    daysEvent[time] = {
      time: time,
      desc: description
    }

    let calEvent = JSON.parse(localStorage.getItem("events"));

    if(calEvent == null){
      calEvent = daysEvent;
    }else{
      calEvent[time] = {
        time: time,
        desc: description
      }
    } 

    localStorage.setItem("events", JSON.stringify(calEvent));

  }



  function printEvents (){
    let calEvent = JSON.parse(localStorage.getItem("events"));
    // console.log(calEvent)

    eventDescription.forEach((description, key)=> {
      if(hour == key+9){
        description.style.background = "Red"
      }

      if(hour > key+9){
        description.style.background = "Gray"
      }

      if(hour < key+9){
        description.style.background = "Green"
      }

      if(calEvent[key+9] != undefined ){
        description.value = calEvent[key+9].desc; 
      }
    });
  }



  saveBtns.forEach((saveBtn, index)=> {
  
    saveBtn.addEventListener("click", function(){
      saveCalenderEvent(9+index, this.parentElement.getElementsByTagName("textarea")[0].value)
    });
  })

  printEvents();
});
