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
        console.log(studentData);

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
  }

  function createTableBody(table,studentData){
      for(let studentRecord of studentData){
          let row = table.insertRow();
          // console.log(studentRecord)
          for(let values in studentRecord){
            console.log("hello",values)
            if(values === "students"){
              console.log("skipped again");
            }else{
              console.log(studentRecord[values]);
              let cell = row.insertCell();
              let text = document.createTextNode(studentRecord[values]);
              cell.appendChild(text);
            }
          }
          let newCell = row.insertCell();
          let myViewButton = document.createElement("a");
          let myButtonValue = document.createTextNode("View")
          myViewButton.className ="btn btn-danger";
          myViewButton.href="record.html?"+studentRecord.id
          myViewButton.appendChild(myButtonValue);
          newCell.appendChild(myViewButton)
      }
  }