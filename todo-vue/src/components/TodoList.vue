<template>
 <div>
     <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">

    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
     <todo-item v-for="(todo, index) in todosFiltered" :key="todo.id" v-bind:todo="todo" v-bind:index="index" @removedTodo="removeTodo" @finishedEdit="finishedEdit" v-bind:checkAll="!anyRemaining">
       <!-- <div class="todo-item-left">
         <input type="checkbox" v-model="todo.completed">
       <div v-if="!todo.editing" v-on:dblclick="editToDo(todo)" class="todo-item-labe" v-bind:class="[todo.completed ? 'complete' : '']">{{ todo.title }}</div>
      <input v-else class="todo-item-edit" type="text" v-model="todo.title" v-on:blur ="doneEdit(todo)" v-on:keyup.enter="doneEdit(todo)" v-focus v-on:keyup.esc="cancelEdit(todo)">
       </div>

       <div class="remove-item" v-on:click="removeTodo(index)">
         &times;
       </div> -->
     </todo-item>
    </transition-group>

     <div class="extra-container">
       <div><label><input type="checkbox" v-bind:checked="!anyRemaining" v-on:change="checkAllTodos()"> Check All </label></div> <!--Binds the checked if return true-->
       <div> {{ remaining }} item left</div>
     </div>

     <div class="extra-container">
       <div>
         <button v-bind:class="{ active: filter == 'all' }" v-on:click="filter = 'all' "> All </button> <!--Conditional binding of class-->
         <button v-bind:class="{ active: filter == 'active' }" v-on:click="filter = 'active' "> Active </button>
         <button v-bind:class="{ active: filter == 'completed' }" v-on:click="filter = 'completed' "> Completed </button>
       </div>

       <div>
         <transition name="fade">
         <button v-if="showClearCompletedButton" v-on:click="clearCompleted"> Clear Completed</button>
         </transition>
       </div>
     </div>
 </div>
</template>

<script>
import TodoItem from './ToDoItem'
export default {
  name: 'todo-list',
  components: {
    TodoItem,
  },
  data () {
    return {
      idForTodo:3,
      newTodo: '',
      beforeEditCache: '',
      filter: 'all',
      todos: [
        {
          'id': 1,
          'title': 'buy milk',
          'completed': false,
          'editing': false
        },
        {
          'id': 2,
          'title': 'meet a friend',
          'completed': false,
          'editing': false
        }
      ]
    }
  },

  computed: {
    remaining: function(){
      return this.todos.filter(todo => !todo.completed).length 
    },
    anyRemaining: function(){
      return this.remaining != 0
    },
    todosFiltered: function(){
      if(this.filter == 'all'){
        return this.todos
      } else if(this.filter == 'active'){
         return this.todos.filter(todo => !todo.completed)
      } else if(this.filter == 'completed'){
         return this.todos.filter(todo => todo.completed)
      }

    },
    showClearCompletedButton: function(){
      return this.todos.filter(todo => todo.completed).length > 0
    }
  },
  methods:{
    addTodo: function(){
      //alert('adding');
      if(this.newTodo.trim().length == 0) {
        return 
        }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false
      })
      this.newTodo = ''
      this.idForTodo++
      
    },

    removeTodo: function(index){
    this.todos.splice(index, 1) // Not removing, but deletes 1 item at  index position
  },
  // editToDo: function(todo){
  //   //alert('editToDo works !')
  //   this.beforeEditCache = todo.title
  //   todo.editing = true;
  // },
  // doneEdit: function(todo){
  //   if(todo.title.trim() == ''){
  //     todo.title = this.beforeEditCache
  //   }
  //   todo.editing = false;
  // },
  // cancelEdit:function(todo){
  //   todo.title = this.beforeEditCache;
  //   todo.editing = false
  // },
  checkAllTodos: function(){
    this.todos.forEach((todo) => todo.completed = event.target.checked)
  },
  clearCompleted: function(){
    this.todos = this.todos.filter(todo => !todo.completed)
  },
  finishedEdit(data) {
    this.todos.splice(data.index, 1, data.todo)
  }

  }

} 
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");
.todo-input {
  width: 100%;
  padding: 10px 10px;
  font-size: 18px;
  margin-bottom: 16px;

  &:focus {
  outline: 0;
}
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover{
    color: #41B883;
  }
  animation-duration: 1s;
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: 'Avenir', Arial, Helvetica, sans-serif;

  &:focus {
    outline: none;
  }
}

.complete {
  text-decoration: line-through;
  color: gray;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgray;
  padding-top: 14px;
  margin-bottom: 14px;
}

button {
  font-size: 14px;
  background-color: white;
  appearance: none;

  &:hover {
    background: lightgreen;
  }

  &:focus {
    outline: none;
  }
}

.active {
  background: lightgreen;
}

//CSS transition
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}




</style>
