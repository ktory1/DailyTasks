const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let id = 0;
let toDos = [];

function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode.parentNode;
    toDoList.removeChild(li);

    const newToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    })
    toDos = newToDos
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function handleMouseEnterDeleteTodo(event){
    event.srcElement.setAttribute('src', "https://img.icons8.com/metro/26/ff4d4d/delete-sign.png");
}

function handleMouseLeaveDeleteTodo(event){
    event.srcElement.setAttribute('src', "https://img.icons8.com/metro/26/ffffff/delete-sign.png");
}

function checkTodo(event){
    event.srcElement.classList.toggle("unchecked");
    console.log(event)
    event.srcElement.classList.toggle("checked");
    event.srcElement.parentElement.childNodes[1].classList.toggle("done-todo");
    if (event.srcElement.classList.contains("unchecked")){
        event.srcElement.setAttribute('src', "https://img.icons8.com/material-outlined/50/ffffff/checked-2--v3.png");
    } else {
        event.srcElement.setAttribute('src', "https://img.icons8.com/material-outlined/50/ffffff/checked-2--v1.png");
    }
}

function paintToDo(text){
    const li = document.createElement("li");
    const taskDiv = document.createElement("div");
    const checkbox = document.createElement("img");
    const delBtn = document.createElement("img");
    const span = document.createElement("span");
    const newId = id++;

    li.appendChild(taskDiv);
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(span);
    taskDiv.appendChild(delBtn);

    checkbox.src = "https://img.icons8.com/material-outlined/50/ffffff/checked-2--v3.png";
    checkbox.classList.add("todo-checkbox");
    checkbox.classList.add("unchecked");
    checkbox.addEventListener("click", checkTodo);

    delBtn.src = "https://img.icons8.com/metro/26/ffffff/delete-sign.png";
    delBtn.classList.add("remove-todo");
    delBtn.addEventListener("click", deleteTodo);
    delBtn.addEventListener("mouseenter", handleMouseEnterDeleteTodo)
    delBtn.addEventListener("mouseleave", handleMouseLeaveDeleteTodo)
    delBtn.setAttribute("title","Remove this task");

    span.innerText = text;

    li.id = newId;
    toDoList.appendChild(li);
    taskDiv.classList.add("todo-item")
    
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmitTodo(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmitTodo)
}

init();