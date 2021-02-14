import { Todo } from "../classes";

import { todoList } from "../index";

//Refencias en el HTML
const divTodoList            = document.querySelector(".todo-list");
const txtInput               = document.querySelector(".new-todo");
const btnEliminarCompletados = document.querySelector('.clear-completed');
const ulFiltros              = document.querySelector('.filters');
const anchorFiltros          = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
  const todoHtml = `
    <li class="${todo.completado ? "completed" : " "}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${
              todo.completado ? "checked" : " "
            }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

  const div = document.createElement("div");

  div.innerHTML = todoHtml;

  divTodoList.append(div.firstElementChild);

  return div.firstElementChild;
};

// Eventos:

//Evento para saber que tecla fue presionada y el valor del texto.
txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && txtInput.value.length > 0) {
    // console.log(txtInput.value);
    const nuevoTodo = new Todo(txtInput.value);
    todoList.nuevoTodo(nuevoTodo);
    crearTodoHtml(nuevoTodo);
    txtInput.value = "";
  }
});

divTodoList.addEventListener("click", (event) => {
  const nombreElemento = event.target.localName; // input, label, button
  const todoElemento = event.target.parentElement.parentElement; //<li>, referencia al elemento html
  const todoId = todoElemento.getAttribute("data-id");

  if (nombreElemento.includes("input")) { //Click en el input
   
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle("completed"); // class list para hacer referencia a todas las clases, si yo quiero estar agregando o cambiando una clase, es toggle, si existe la quita y si no existe la pone.
  }else if(nombreElemento.includes('button')){//eliminar todo
    todoList.eliminarTodo(todoId);//Elimina el todo del arreglo
    divTodoList.removeChild(todoElemento);//Elimina la etiquta <li> del html;
  }

});

btnEliminarCompletados.addEventListener('click', ()=>{
  todoList.eliminarCompletados();//Elimina todos los completados de mi arreglo

  for (let i = divTodoList.children.length - 1; i >= 0; i--){
    const elemento = divTodoList.children[i];
    if(elemento.classList.contains('completed')){//Si tiene la clase completed entonces :
      divTodoList.removeChild(elemento)//Elimina el elemento 
    }
  }

})

ulFiltros.addEventListener('click', (event)=>{

  const filtro = event.target.text;
  if(!filtro){return;}
  anchorFiltros.forEach( elem => elem.classList.remove('selected') );
  event.target.classList.add('selected');  

  console.log(event.target);

  for(const elemento of divTodoList.children){
    elemento.classList.remove('hidden');
    const completado = elemento.classList.contains('completed');
  

  switch (filtro) {
    case 'Pendientes':
        if(completado){
          elemento.classList.add('hidden');
        }
    break;
    case 'Completados':
        if(!completado){
          elemento.classList.add('hidden');
        }
    break;
  }
  }
})









