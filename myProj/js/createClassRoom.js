document.querySelector("form.NewClass").addEventListener("submit",function(stop){
    stop.preventDefault();
    
    let formElements = document.querySelector("form.NewClass").elements;
    // console.log(formElements);
    // let id = formElements["studentId"].value;
    let subject = formElements["classSubject"].value;
    let teacherName = formElements["classTeacherName"].value;
    let classSize = formElements["classSize"].value;
    
    // console.log(id);
    console.log(teacherName)
    newClass(subject,teacherName,classSize)
    
    })
  
    function newClass(subject,teacherName,classSize){
  
      let classSizeint =parseInt(classSize);
  
      // console.log(updateID,updateAge,UpdateYearGroup)
  
      let dataToPost ={
          "subject": subject,
          "teacherName": teacherName,
          "classSize": classSizeint
      }
      
      fetch("http://localhost:9092/ClassRoom/create", {
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