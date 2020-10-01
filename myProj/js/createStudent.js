document.querySelector("form.NewStudent").addEventListener("submit",function(stop){
    stop.preventDefault();
    
    let formElements = document.querySelector("form.NewStudent").elements;
    // console.log(formElements);
    // let id = formElements["studentId"].value;
    let firstName = formElements["studentFirstName"].value;
    let secondName = formElements["studentSecondName"].value;
    let age = formElements["studentAge"].value;
    let yearGroup = formElements["studentYearGroup"].value;
    
    // console.log(id);
    console.log(yearGroup)
    newStudent(firstName,secondName,age,yearGroup)
    
    })
  
    function newStudent(firstName,secondName,age,yearGroup){
  
      console.log(typeof(yearGroup))
      let updateAge =parseInt(age);
      let UpdateYearGroup = parseInt(yearGroup);
  
      // console.log(updateID,updateAge,UpdateYearGroup)
  
      let dataToPost ={
          
              "firstName": firstName,
              "secondName": secondName,
              "age": updateAge,
              "yearGroup": UpdateYearGroup
      }
      // console.log(dataToPost)
  
  
      fetch("http://localhost:9092/Student/Create", {
          method: 'Post',
          headers: {
            "Content-type": "application/json"
          },
          body:JSON.stringify(dataToPost)
        })
        // .then(res => res.json())
        .then(function (data) {
          console.log('Request succeeded with JSON response', data);
          let mydiv = document.getElementById("create");
          mydiv.className ="alert alert-success"
          mydiv.textContent ="Student created";
          removeEl(mydiv)
          
        })
        .catch(function (error) {
          console.log('Request failed', error);
          let mydiv = document.getElementById("create");
          mydiv.className ="alert alert-danger"
          mydiv.textContent ="Student not created";
          removeEl(mydiv)
        });
  }

  function removeEl(el){
  setTimeout(function () {
    el.style ="display:none";
  }, 3000);
}