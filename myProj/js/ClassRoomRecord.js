const params = new URLSearchParams(window.location.search);

for(let param of params ){
    console.log("here i am",param)
    let id = param[1];
    console.log(id);
    getSingleRecord(id)
}

function getSingleRecord(id){
fetch('http://localhost:9092/ClassRoom/read/'+id)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);

        document.getElementById("ClassRoomID").value=data.id
        document.getElementById("ClassTeacherName").value=data.subject
        document.getElementById("ClassSubject").value=data.teacherName
        document.getElementById("classSize").value=data.classSize
       
        console.log("123",data.students)
        let studentData = data.students
        for (const iterator of studentData) {
          
        }
        let table = document.querySelector("table");
        let data2 = Object.keys(data.students[0]);
        
        createTableHead(table,data2);
        createTableBody(table,data.students);
        
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

document.querySelector("form.ClassRoomRecord").addEventListener("submit",function(stop){
stop.preventDefault();

let formElements = document.querySelector("form.ClassRoomRecord").elements;
// console.log(formElements);
let id = formElements["ClassRoomID"].value;
let teacherName = formElements["ClassTeacherName"].value;
let classSubject = formElements["ClassSubject"].value;
let classSize = formElements["classSize"].value;

console.log(id);
console.log(secondName)
updateClass(id,teacherName,classSubject,classSize)

})

function updateClass(id,classSubject,teacherName,classSize){

    let updateID= parseInt(id);

    // console.log(updateID,updateAge,UpdateYearGroup)

    let dataToPost ={
      "subject":classSubject,
      "teacherName": teacherName,
      "classSize": classSize
    }
    // console.log(dataToPost)


    fetch("http://localhost:9092/Student/update/"+updateID, {
        method: 'put',
        headers: {
          "Content-type": "application/json"
        },
        body:JSON.stringify(dataToPost)
      })
      // .then(res => res.json())
      .then(function (data) {
        console.log('Request succeeded with JSON response', data);
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
}

function createTableHead(table,data){
  let tableHead= table.createTHead();
  let row = tableHead.insertRow();
  for(let keys of data){
    if(keys == "students"){
      console.log("skip");
    }else{
      // console.log("data",data)
      let th = document.createElement("th");
      let text = document.createTextNode(keys);
      th.appendChild(text);
      row.appendChild(th)
    }
  }
  let th2 = document.createElement("th")
  let text2 = document.createTextNode("View");
  th2.appendChild(text2);
  row.appendChild(th2);
  let th3 = document.createElement("th")
  let text3 = document.createTextNode("Delete");
  th3.appendChild(text3);
  row.appendChild(th3);
}

function createTableBody(table,studentData){
  for(let studentRecord of studentData){
      let row = table.insertRow();
      // console.log(studentRecord)
      for(let values in studentRecord){
        // console.log("hello",values)
        if(values === "students"){
          console.log("skipped again");
        }else{
          // console.log(studentRecord[values]);
          let cell = row.insertCell();
          let text = document.createTextNode(studentRecord[values]);
          cell.appendChild(text);
        }
      }
      let newCell = row.insertCell();
      let myViewButton = document.createElement("a");
      let myButtonValue = document.createTextNode("View/Edit")
      myViewButton.className ="btn btn-success";
      myViewButton.href="classRoomRecord.html?id="+studentRecord.id
      myViewButton.appendChild(myButtonValue);
      newCell.appendChild(myViewButton)
      let newCellDelete = row.insertCell();
      let myDelButton = document.createElement("button");
      let myButtonValue1 = document.createTextNode("Delete")
      myDelButton.className ="btn btn-danger";
     
      myDelButton.onclick = function(){
        delStudent(studentRecord.id);return false;
      };
      // myDelButton.href="http://localhost:9092/Student/delete/"+studentRecord.id
      myDelButton.appendChild(myButtonValue1);
      newCellDelete.appendChild(myDelButton)
  }
}

function delStudent(id){
  fetch("http://localhost:9092/Student/delete/"+id, {
      method: 'delete',
      headers: {
        "Content-type": "application/json"
      },
    })
    // .then(res => res.json())
    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
      let mydiv = document.getElementById("create");
      mydiv.className ="alert alert-danger"
      mydiv.textContent ="Student Deleted";
      removeEl(mydiv)
      
    })
    .catch(function (error) {
      console.log('Request failed', error);
      let mydiv = document.getElementById("create");
      mydiv.className ="alert alert-success"
      mydiv.textContent ="Error deleting student";
      removeEl(mydiv)
    });
}

function removeEl(el){
setTimeout(function () {
el.style ="display:none";
location.reload();
}, 1000);
}