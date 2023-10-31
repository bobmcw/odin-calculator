const buttons = document.querySelectorAll(".row > button")
buttons.forEach(element => {
    element.addEventListener('click', () => console.log(element.textContent))
});