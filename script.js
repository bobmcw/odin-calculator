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
        bigDisplay.textContent = calculate(expression.toString().replaceAll(",","").split(" "))
    // bigDisplay.textContent = eval(expression.toString().replaceAll(",",""))
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
        expression.push(value.textContent)
        nextCanBeOperator = true
    }
    miniDisplay.textContent = expression.toString().replaceAll(",","")
}

// let test = "55*3+7-2"
// console.log(test.split("*"))



// [15 + 3 * 5 - 8]  = 82
// [15 + 3 * 5 - 8] => [18 * 5 - 8] => [90 - 8] => 82
function calculate (nums){
    if (nums.length == 1) return nums
    else{
        let num1 = parseInt(nums[0])
        let operator = nums[1]
        let num2 = parseInt(nums[2])
        nums.shift()
        nums.shift()
        nums.shift()
        switch(operator){
            case "+":
                nums = nums.unshift(num1 + num2)
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
    }
    return(nums)
}
