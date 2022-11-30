// console.log("SCRIPT LINKED")

let listButton = document.querySelectorAll('.add-new')

// console.log("BUTTONS", listButton)

let parent = document.getElementById('list')

document.querySelector('.add-new').addEventListener("click", function(e){
    let child = document.createElement('li')
    child.innerHTML = `<input type="text" name="content">`
    document.getElementById('list').appendChild(child)
  });