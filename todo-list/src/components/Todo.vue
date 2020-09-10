<template>
    <div class="todos">
        <h1>Todo App</h1>
        <input placeholder="What you want to do ?" v-model="title" @keyup.enter='add'>
        <button @click="add">Add to list</button>
        <ul>
            <li v-for="(todo, index) in todos" v-bind:key="todo">{{ todo }}
                <span class="remove" @click="remove(index)">x</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'todo',
        props: {
            msg: String
        },
        data() {
            return {
                title: '',
                todos: []
            }
        },
        methods: {
            add() {
                if (this.title != '') {
                    this.todos.push(this.title)
                    this.title = ''
                }
            },
            remove(i) {
                // this.todos.splice(i,1)
                this.$delete(this.todos, i)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .remove {
        padding: 1px 2px;
        background-color: red;
        color: #fff;
        border-radius: 20px;
    }
</style>
