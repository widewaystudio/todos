import { createApp } from 'vue'
import App from './App.vue'
import '/src/public/index.css'
import todoFocus from '/src/Units/todo-focus';
const app = createApp(App);
app.directive('todo-focus',todoFocus);
app.mount('#app')
