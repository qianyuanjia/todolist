<template>
    <header class="header">
        <h1>todos</h1>
        <input 
        class="new-todo" 
        placeholder="What needs to be done?" 
        @keyup.enter="addTodo"
        v-focus>
    </header>
</template>
<script>
export default {
    directives:{
        focus:{
            inserted:function(el){
                el.focus()
            }
        }
    },
    methods:{
        addTodo(event){
            this.$emit('add',{
                isCompleted:false,
                content:event.target.value
            })
            event.target.value=""
        }
    }
}
</script>
