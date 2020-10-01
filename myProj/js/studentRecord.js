const params = new URLSearchParams(window.location.search);

for(let param of params ){
    console.log("here i am",param)
    let id = param[1];
    console.log(id);
    getSingleRecord(id)
}

function getSingleRecord(id){
fetch('http://localhost:9092/Student/read/'+id)
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

        document.getElementById("studentId").value=data.id
        document.getElementById("studentFirstName").value=data.firstName
        document.getElementById("studentSecondName").value=data.secondName
        document.getElementById("studentAge").value=data.age
        document.getElementById("studentYearGroup").value=data.yearGroup
       
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

document.querySelector("form.studentRecord").addEventListener("submit",function(stop){
stop.preventDefault();

let formElements = document.querySelector("form.studentRecord").elements;
// console.log(formElements);
let id = formElements["studentId"].value;
let firstName = formElements["studentFirstName"].value;
let secondName = formElements["studentSecondName"].value;
let age = formElements["studentAge"].value;
let yearGroup = formElements["studentYearGroup"].value;

console.log(id);
console.log(secondName)
updateStudent(id,firstName,secondName,age,yearGroup)

})

function updateStudent(id,firstName,secondName,age,yearGroup){

    let updateID= parseInt(id);
    let updateAge =parseInt(age);
    let UpdateYearGroup = parseInt(yearGroup);

    // console.log(updateID,updateAge,UpdateYearGroup)

    let dataToPost ={
        
            "firstName": firstName,
            "secondName": secondName,
            "age": updateAge,
            "yearGroup": UpdateYearGroup,
            "room": {
                "id": 3
            },
            "id":updateID
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

