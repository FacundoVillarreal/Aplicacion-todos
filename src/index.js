import  './style.css';

import {Todo, TodoList} from './classes'
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList() ;

todoList.todos.forEach(todo => {crearTodoHtml(todo);});// este ciclo foreach obtiene las tareas del localStorage y las crea en el html








