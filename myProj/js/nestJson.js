fetch('http://localhost:9092/ClassRoom/readAll')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
          console.log(data)
        for(let stuRecord of data){
            console.log("here is my stuRecord",stuRecord.students);
            for(let singleRecord in stuRecord.students){
                console.log("Single Record here",stuRecord.students[singleRecord])
              for (let a of singleRecord){
                console.log(a);
                for(let b of a){
                  console.log(b);
                }
              }
            }
        }
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });