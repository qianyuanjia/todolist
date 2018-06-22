<template>
    <div>
        <section class="todoapp">
            <Head @add="addTodo"></Head>
			<!-- This section should be hidden by default and shown when there are todos -->
			<Todos v-model="completeAll" :todos="filterTodo" 
            @modify="modifyTodo"
            @minus="minusTodo" 
            @ifComplete="toggleCompleted"></Todos>
            <!-- This footer should hidden by default and shown when there are todos -->
			<Bot :remainItems="filterTodo.length" @cgTd="changeTodo" @clear="clearCompleted" v-show="todos.length"></Bot>
        </section>
    <Foot />
    </div>
    
</template>
<script>
import Foot from './foot.vue'
import Head from './head.vue'
import Todos from './todos.vue'
import Bot from './bot.vue'


export default {
    components:{Foot,Head,Todos,Bot},
    data(){
        return {
            todos:[{
                isCompleted:false,
                content:'买辆汽车'
            },{
                isCompleted:false,
                content:'买房子'
            }],
            state:'All'
        }
    },
    methods:{
        addTodo(value){
            this.todos.unshift(value)
        },
        minusTodo(idx){
            this.todos.splice(idx,1)
        },
        toggleCompleted(idx){
            this.todos[idx].isCompleted=!this.todos[idx].isCompleted
        },
        changeTodo(state){
            this.state=state
        },
        clearCompleted(){
            this.todos=this.todos.filter(item=>item.isCompleted===false)
        },
        modifyTodo(content,idx){
            this.todos[idx].content=content
        }
    },
    computed:{
        completeAll:{
            get:function(){
                return this.todos.filter(item=>item.isCompleted===false).length===0
            },
            set:function(value){
                this.todos.forEach(item=>{
                    item.isCompleted=value
                })
            }
        },
        filterTodo(){
            if(this.state==='All'){
                return this.todos
            }else if(this.state==="Active"){
                return this.todos.filter(item=>item.isCompleted===false)
            }else if(this.state==='Completed'){
                return this.todos.filter(item=>item.isCompleted===true)
            }else{
                return this.todos
            }
        }
    }
}

</script>

