let burger = document.querySelector(".burger")
let Links = document.querySelector(".navbar")
let textArea = document.querySelector(".text-area")

burger.addEventListener('click',()=> {
    Links.classList.toggle("nav-show");
    textArea.classList.toggle("textareahide");
})