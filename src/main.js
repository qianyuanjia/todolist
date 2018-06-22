import 'todomvc-app-css/index.css'
import Vue from 'vue'
import App from './components/app.vue' 


new Vue({
    el:'#app',
    render:h=>h(App)
})
