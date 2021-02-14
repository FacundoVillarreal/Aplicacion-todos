import { Todo } from "./index";

export class TodoList {
  constructor(todos) {
    // this.todos = [];
    this.cargarLocalStorage();
  }
  //Nueva tarea dentro del arreglo
  nuevoTodo(todo) {
    this.todos.push(todo);
    this.guardarLocalStorage()
  }
  //eliminar tarea
  eliminarTodo(id) {
    this.todos = this.todos.filter( todo => todo.id != id )//este filter devuelve un arreglo nuevo 
                                              //excluyendo el todo que coincida con el id que yo tengo   
    this.guardarLocalStorage()
    
  }
  marcarCompletado(id){

    for ( const todo of this.todos ){

      if (todo.id == id ){
        todo.completado = !todo.completado;
        this.guardarLocalStorage();
        break 
      }
    }

  }
  eliminarCompletados(){
    this.todos = this.todos.filter( todo => !todo.completado) // retorna todos los que no esten completados
    this.guardarLocalStorage()
  }


  guardarLocalStorage(){
    localStorage.setItem('todo', JSON.stringify(this.todos));//JSON.stringify convierte mi objeto en un json string
  }

  cargarLocalStorage(){
    this.todos  = (localStorage.getItem('todo'))
                ? JSON.parse(localStorage.getItem('todo')) 
                : [];
    this.todos = this.todos.map(obj => Todo.fromJson(obj));
   
  //     if(localStorage.getItem('todo')){//Si existe el todo, entonces voy a ejecutar este codigo
  //       this.todos = JSON.parse( localStorage.getItem('todo'));//JSONPARSE convierte mi json string a su objeto original.
  //       console.log(this.todos);
  //     }else{//si no  
  //       this.todos = [];
  //     }
  // }
}
}