import {ref} from 'vue';
import store from '../Units/store';
export default function userAddTodo(todoRef){
    const newTodoRef = ref("");
    const {genrateId} = store();
    const addTodo = ()=>{
        let v = newTodoRef && newTodoRef.value.trim();
        if(!v) return;
        const todo = {
            title: v,
            complete:false,
            id:genrateId()
        }

        todoRef.value.push(todo);
        newTodoRef.value = '';
    }
    return{
        newTodoRef,
        addTodo
    }

}
