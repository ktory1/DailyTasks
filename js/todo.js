const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let id = 0;
let toDos = [];

function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
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

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = id++;

    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    
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