<template>
    <div class="todo-item">
        
         <div class="todo-item-left">
            <input type="checkbox" v-model="completed" @change="doneEdit">
            <div v-if="!editing" v-on:dblclick="editToDo" class="todo-item-labe" v-bind:class="[completed ? 'complete' : '']">{{ title }}</div>
            <input v-else class="todo-item-edit" type="text" v-model="title" v-on:blur ="doneEdit" v-on:keyup.enter="doneEdit" v-focus v-on:keyup.esc="cancelEdit">
        </div>

       <div class="remove-item" v-on:click="removeTodo(index)">
         &times;
       </div>

    </div>
</template>>

<script>
export default {
    name: 'todo-item',
    props: {
        todo: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        checkAll: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            'id': this.todo.id,
            'title': this.todo.title,
            'completed': this.todo.completed,
            'editing': this.todo.editing,
            'beforeEditCache': ''
        }
    },
      directives: {
    focus: {
      inserted: function(el){
        el.focus()
      }
    }
  },

    watch: {
        checkAll() {
            if(this.checkAll) {
                this.completed = true
            } else {
                this.completed = this.todo.completed
            }
        }
    },

    methods: {
        removeTodo(index) {
            this.$emit('removedTodo', index)
        },
        editToDo: function(){
        //alert('editToDo works !')
        this.beforeEditCache = this.title
        this.editing = true;
        },
        doneEdit: function(){
            if(this.title.trim() == ''){
            this.title = this.beforeEditCache
            }
            this.editing = false
            this.$emit('finishedEdit',{
                'index': this.index,
                'todo': {
                    'id': this.id,
                    'title': this.title,
                    'completed': this.completed,
                    'editing': this.editing
                }
            })
        },
        cancelEdit:function(){
            this.title = this.beforeEditCache;
            this.editing = false
         }
    }
}
</script>

