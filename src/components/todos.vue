<template>
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" @change="dispatchComplete" v-model="value">
        <label for="toggle-all" v-show="todos.length">Mark all as complete</label>
        <ul class="todo-list">
            <li v-for="(item,idx) in todos" 
            :key="idx" 
            @dblclick="edit($event,idx)"
            :class="{completed:item.isCompleted,editing:isEditing===idx}">
                <div class="view">
                    <input class="toggle" type="checkbox" :checked="item.isCompleted" @click.stop="toggleCompleted(idx)">
                    <label>{{item.content}}</label>
                    <button class="destroy" @click="minusTodo(idx)"></button>
                </div>
                <input class="edit" :value="item.content" 
                @keyup.enter="modifyTodo($event,idx)"
                @keyup.esc="modifyRevert($event,idx)"
                @blur="modifyTodo($event,idx)">
            </li>
        </ul>
    </section>
</template>
<script>
export default {
    props:['todos','value'],
    data(){
        return {
            isEditing:-1
        }
    },
    methods:{
        minusTodo(idx){
            this.$emit('minus',idx)
        },
        toggleCompleted(idx){
            this.$emit('ifComplete',idx)
        },
        dispatchComplete(){
            this.$emit('input',this.value)
        },
        edit(event,idx){
            let oInp=event.currentTarget.querySelector('.edit')
            setTimeout(()=>{
                oInp.focus()
            },40)  
            this.isEditing=idx
        },
        modifyTodo(event,idx){
            this.isEditing=-1
            this.$emit('modify',event.target.value,idx)
        },
        modifyRevert(event,idx){
            this.isEditing=-1
            event.target.value=this.todos[idx].content
        }
    }
}
</script>

