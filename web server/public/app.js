let form = document.querySelector("form");
let sucssMSg = document.querySelector(".sucessMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchVal = form.text.value;
  if (!searchVal) {
    return alert("enterVAlidVAlue");
  }
  sucssMSg.textContent = "Loading ...";
  fetch(`http://localhost:3000/weather?location=${searchVal}`).then((res) => {
    res.json().then((data) => {
      if (data.body.error) {
        console.log(data.body.error.info);
        sucssMSg.textContent = data.body.error.info;
      } else {
        let op = `Current weather is ${data.body.current.temperature} it feels like ${data.body.current.feelslike} in ${data.body.location.name}, ${data.body.location.region}, ${data.body.location.country}`;
        console.log(op);
        sucssMSg.textContent = op;
      }
    });
  });
});
