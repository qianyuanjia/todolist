<template>
    <footer class="footer">
        <!-- This should be `0 items left` by default -->
        <span class="todo-count"><strong>{{remainItems}}</strong> {{remainItems>1?'items':'item'}} left</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            <li v-for="(state,idx) in states" :key="idx">
                <a @click="changeTodo(state,idx)" :class="{selected:whichSelected===idx}" href="###">{{state}}</a>
            </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed" @click="clearCompleted">Clear completed</button>
    </footer>
</template>
<script>
export default {
    props:['remainItems'],
    data(){
        return {
            states:['All','Active','Completed'],
            whichSelected:0
        }
    },
    methods:{
        changeTodo(state,idx){
            this.whichSelected=idx
            this.$emit('cgTd',state)
        },
        clearCompleted(){
            this.$emit('clear')
        }
    }
}
</script>
