import store from '../Units/store'
import {ref,watchEffect} from 'vue'
export default function useTodoList(){
    let _store = store();
    const todoRef = ref(_store.fetch());
    watchEffect(()=>{
        _store.save(todoRef.value);
    });
    return {
        todoRef
    }

}
