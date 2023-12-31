const buttons = document.querySelectorAll(".row > button")
const miniDisplay = document.querySelector(".miniScreen")
const bigDisplay = document.querySelector(".bigScreen")
buttons.forEach(element => {
    element.addEventListener("click",() => display(element))
});

let nextCanBeOperator = false
let expression = []

function display(value){
    if (value.className == "enter"){
        if (nextCanBeOperator == false) alert("please enter a valid equasion")
        else{
        bigDisplay.textContent = calculate(expression.toString().replaceAll(",","").split(" "))
        expression = [parseFloat(bigDisplay.textContent)]
        }
    }
    else if (value.className == "clear") location.reload()
    else if (value.className == "backspace"){
        expression.pop()
        if (expression[expression.length-2] == " ") {
            expression.pop()
            expression.pop()
        }
    }
    //we dont want an operator to be at the beggining of the expression
    //or for 2 operators to be next to each other
    else if (value.className == "operator" && nextCanBeOperator){
        expression.push(" ")
        expression.push(value.textContent)
        expression.push(" ")
        nextCanBeOperator = false
    }
    else if (value.className != "operator"){
        if (typeof(value) == "number"){
            expression.push(value)
            nextCanBeOperator = true
        }
        else{
            expression.push(value.textContent)
            nextCanBeOperator = true
        }

    }
    // if (expression.length > 2 && nextCanBeOperator){
    //     bigDisplay.textContent = calculate(expression.toString().replaceAll(",","").split(" "))
    // }
    miniDisplay.textContent = expression.toString().replaceAll(",","")
}

// simple visualization of what the code does
// [15 + 3 * 5 - 8] => [18 * 5 - 8] => [90 - 8] => 82
function calculate (nums){
    if (nums.length == 1) return Math.floor(nums * 10)/10
    else{
        let num1 = parseFloat(nums[0])
        let operator = nums[1]
        let num2 = parseFloat(nums[2])
        nums.shift()
        nums.shift()
        nums.shift()
        switch(operator){
            case "+":
                nums.unshift(num1 + num2)
                break
            case "-":
                nums.unshift(num1 - num2)
                break
            case "*":
                nums.unshift(num1 * num2)
                break
            case "/":
                nums.unshift(num1 / num2)
                break
        }
        // console.log(Object.values(nums))
    return(calculate(Object.values(nums)))
    }
}
function handleKeys(element){
    if (!isNaN(parseInt(element))) display(parseInt(element))
    else if (element == "+" || element == "-" || element == "*" || element == "/") {
    const temp = document.createElement("div")
    temp.className = "operator"
    temp.textContent = element
    console.log(temp.className)
    console.log(temp.textContent)
    display(temp)
    }
    else if (element == "Backspace"){
        const temp = document.createElement("div")
        temp.className = "backspace"
        display(temp)
    }
    else if (element == "Enter"){
        const temp = document.createElement("div")
        temp.className = "enter"
        display(temp)
    }
}
document.querySelector("body").addEventListener(("keydown"),(e) => handleKeys(e.key))
