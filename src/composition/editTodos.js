import {ref,onMounted,onUnmounted,computed,resolveDirective} from 'vue';
export default function(data){
    let editedItemRef = ref(null);
    let visibility = ref('all');
    let beforeValue = ref(null);
    const remove = (e)=>{
        let index = data.value.indexOf(e);
        data.value.splice(index,1);
    }
    let hashChange=()=>{
        location.hash.replace(/(?<=#\/?)(\w+)[^\/]?/g,($,$1)=>{
            ['all','active','completed'].forEach(v=>{
                if($1 === v){
                    visibility.value = v;
                }
            });
            if($1 !== visibility.value){
                location.hash = '/' + visibility.value;
            }
        });
    }
    onMounted(()=>{
      window.addEventListener('hashchange',hashChange);
    });
    onUnmounted(()=>{
        window.removeEventListener('hashchange',hashChange);
    });

     const removeCompleted = ()=>{
         data.value = filter['active'](data);
     }
    const filter ={
        'all':d=> d.value,
        'completed':d=>d.value.filter(v=>v.complete),
        'active':d=>d.value.filter(v=>!v.complete),
    }


   const lists = computed(()=>{
       return filter[visibility.value](data)
   });

     const pluralize = (s,n)=> s +  (n > 1 ? 's':'');

     const remain = computed(()=>{
         return filter['active'](data).length;});

     const editItem = e=>{
         beforeValue.value = e.title;
         editedItemRef.value = e;
     }
     const doneEdit = e=>{
          if(!editedItemRef.value) return;
              editedItemRef.value = null;
              e.title = e.title.trim();
              if(!e.title){
                  remove(e);
              }
     }
     const cancelEdit=e=>{
         editedItemRef.value = null;
           e.title = beforeValue.value;
    }
    let seletedAll = computed({
        get(){
            return remain.value === 0},
        set(v){
            data.value.forEach(e=>e.complete =v);
        }
    });

    return {
        remove,
        visibility,
         lists,
        removeCompleted,
        remain,
        pluralize,
        editItem,
        editedItemRef,
        doneEdit,
        cancelEdit,
        seletedAll,
    }
}
