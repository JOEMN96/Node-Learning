// Logic
const form = document.querySelector(".createBlog form");
const deleteBTn = document.querySelector("a.delete");
form &&
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let form = new Form(e.target.title, e.target.snippet, e.target.content);
    let res = form.validate();
    if (res) {
      const formAck = document.querySelector(".formAck");
      let data = form.data();
      fetch("http://localhost:3000/createNewBlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((data) => {
          console.log("Success:", data);
          formAck.innerText = "sucess";
          setTimeout(() => {
            form.clear();
            formAck.innerText = "";
          }, 3000);
          setTimeout(() => {
            window.location.href = "http://localhost:3000/";
          }, 2000);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      // .finally(() => console.log("all done"));
    }
  });

deleteBTn &&
  deleteBTn.addEventListener("click", (e) => {
    const apiEnd = `/blog/${deleteBTn.dataset.doc}`;
    console.log(apiEnd);
    fetch(apiEnd, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then((data) => {
        window.location.href = data.redirect;
      })
      .catch((err) => console.log(err));
  });

// classes

class Form {
  constructor(title, snippet, content) {
    this.title = title;
    this.snippet = snippet;
    this.content = content;
  }

  data() {
    return {
      title: this.title.value,
      snippet: this.snippet.value,
      content: this.content.value,
    };
  }

  validate() {
    if (this.title.value.length >= 5 && this.content.value.length >= 10) {
      this.title.style.border = "1px solid green";
      this.content.style.border = "1px solid green";
      setInterval(() => {
        this.content.style.border = "1px solid #ddd";
        this.title.style.border = "1px solid #ddd";
      }, 2000);
      return true;
    } else {
      this.title.style.border = "1px solid red";
      this.content.style.border = "1px solid red";
      setInterval(() => {
        this.content.style.border = "1px solid #ddd";
        this.title.style.border = "1px solid #ddd";
      }, 2000);
    }
  }

  clear() {
    this.title.value = "";
    this.snippet.value = "";
    this.content.value = "";
  }
}
