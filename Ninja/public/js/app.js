// Logic
const form = document.querySelector(".createBlog form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let form = new Form(e.target.title, e.target.snippet, e.target.content);
  form.validate();
});

// classes

class Form {
  constructor(title, snippet, content) {
    this.title = title;
    this.snippet = snippet;
    this.content = content;
  }
  validate() {
    if (this.title.value.length >= 5 && this.content.value.length >= 10) {
      this.title.style.border = "1px solid green";
      this.content.style.border = "1px solid green";
      setInterval(() => {
        this.content.style.border = "1px solid #ddd";
        this.title.style.border = "1px solid #ddd";
      }, 2000);
    } else {
      this.title.style.border = "1px solid red";
      this.content.style.border = "1px solid red";
      setInterval(() => {
        this.content.style.border = "1px solid #ddd";
        this.title.style.border = "1px solid #ddd";
      }, 2000);
    }
  }
}
