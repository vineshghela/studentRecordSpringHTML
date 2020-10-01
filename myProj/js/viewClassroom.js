// fetch('http://localhost:9092/Student/readAll')
fetch('http://localhost:9092/ClassRoom/readAll')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(studentData) {
        console.log(studentData[1]);
        console.log(studentData[1].students[0]);
        let myvar = studentData[1].students[0];
        for(let key in myvar){
          console.log(myvar[key]);
        }

        let table = document.querySelector("table");
        let data = Object.keys(studentData[0]);
        
        createTableHead(table,data);
        createTableBody(table,studentData);
        
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

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
          // myDelButton.onclick = function(){
          //   alert(studentRecord.id);return false;
          // };
          myDelButton.onclick = function(){
            delStudent(studentRecord.id);return false;
          };
          // myDelButton.href="http://localhost:9092/Student/delete/"+studentRecord.id
          myDelButton.appendChild(myButtonValue1);
          newCellDelete.appendChild(myDelButton)
      }
  }

 

  
    function delStudent(id){
      fetch("http://localhost:9092/ClassRoom/delete/"+id, {
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
          mydiv.textContent ="Class Room Deleted";
          removeEl(mydiv)
          
        })
        .catch(function (error) {
          console.log('Request failed', error);
          let mydiv = document.getElementById("create");
          mydiv.className ="alert alert-success"
          mydiv.textContent ="Error deleting Class Room";
          removeEl(mydiv)
        });
  }

  function removeEl(el){
  setTimeout(function () {
    el.style ="display:none";
    location.reload();
  }, 1000);
}