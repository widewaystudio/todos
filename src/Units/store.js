
export default function(){
    let STORAGE_KEY ="todos-vue3";
    let save = (todos)=>{
        localStorage.setItem(STORAGE_KEY,JSON.stringify(todos));
    }
    let fetch = ()=>{
        let Arr = [];
         Arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
         return Arr;
    }
    let genrateId = ()=>{
        return new Date().getTime().toString(16);
    }
    return {
        save,
        fetch,
        genrateId,
    };

};
