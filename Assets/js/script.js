// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

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
