<script setup>
import useTodoList from '../composition/useTodoList';
import newFn from '../composition/useAddTodo';
import edit from '../composition/editTodos';
 const {todoRef} = useTodoList();
 const {newTodoRef,addTodo} = newFn(todoRef);
 const {remove,visibility,lists,removeCompleted,pluralize,remain,editItem,editedItemRef,doneEdit,cancelEdit,seletedAll} = edit(todoRef);
</script>

<template>
  <div class="todo-container">
    <h1> todos</h1>
    <input type="text" class="new-todo" autofocus="" @keyup.enter="addTodo" v-model="newTodoRef" autocomplete="off" placeholder="what needs to be done?">
    <section class="main">
      <input type="checkbox" class="toggle-all" id="toggle-all" v-model="seletedAll">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list" >
        <li class="todo" v-for="item in lists" key="item.value.id" :class="{completed:item.complete,editing:item === editedItemRef}">
          <div class="view">
            <input type="checkbox" class="toggle"  v-model="item.complete">
            <label @dblclick="editItem(item)">{{item.title}}</label>
            <button class="destory" @click="remove(item)"></button>
          </div>
          <input class="edit" type="text" v-model="item.title" v-todo-focus="item == editedItemRef" @blur="doneEdit(item)" @keyup.enter="doneEdit(item)" @keyup.esc="cancelEdit(item)">
        </li>

      </ul>
    </section>
    <!-- 切卡片--->
    <footer class="footer" >
				<span class="todo-count" v-show="remain > 0">
					<strong v-text="remain"></strong> {{pluralize('item',remain)}} left
				</span>
      <ul class="filters">
        <li><a href="#/all" :class="{selected:visibility==='all'}">All</a></li>
        <li><a href="#/active" :class="{selected:visibility==='active'}" >Active</a></li>
        <li><a href="#/completed" :class="{selected:visibility==='completed'}" >Completed</a></li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" v-show="todoRef.length > remain">
        Clear completed
      </button>
    </footer>
  </div>
</template>

<style lang="less" scoped>
.todo-container{
  background-color:#fff;
  margin:130px 0 40px 0;
  position:relative;
  box-shadow:0 2px 4px 0 rgba(0,0,0,0.2),0 25px 50px 0 rgba(0,0,0,0.1);
  h1{
    position:absolute;
    top:-155px;
    width:100%;
    font-size:100px;
    font-weight:100;
    text-align:center;
    color:rgba(175,47,47,0.25);
    text-rendering:optimizeLegibility;
    user-select:none;
  }
  input::placeholder{
    font-style:italic;
    font-weight:300;
    color:#e6e6e6;

  }
  .new-todo{
   padding:16px 16px 16px 60px;
    border:none;
    background:rgba(0,0,0,0.003);
    box-shadow:inset 0 -2px 1px rgb(0 0 0 / 3%);
    box-sizing:border-box;
    outline-style:none;
  }
  .new-todo,.edit{
    position:relative;
    margin:0;
    width:100%;
    font-size:24px;
    line-height:1.4em;
    color:inherit;
    font-family:inherit;
    font-weight:inherit;
  }
  label[for='toggle-all']{
    display:none;
  }
  .toggle-all{
    position:absolute;
    width:60px;
    height:34px;
    text-align:center;
    border:none;
    top:10px;
    left:-12px;
    &:before{
      content:'❯';
      font-size:24px;
      padding:10px 27px 10px 27px;
      color:#e6e6e6;
    }


  }
  .toggle-all:checked::before{
    color:#737373;
  }
  .main{
    .todo-list{
      padding:0;
      margin:0;
      list-style:none;

      .todo{
       font-size:24px;
        position:relative;
        border-bottom:1px solid #ededed;
        padding:0 0 0 60px;
        .edit{
          display:none;
          padding:14px 14px 14px 4px;
          position:relative;
          outline:none;
          line-height:1.2;
          font-size:24px;
          border:1px solid #999;
          box-shadow:inset 0 -1px 5px 0 rgba(0,0,0,.2);
          box-sizing:border-box;
          font-smoothing:antialiased;
          width:100%;

        }
        &:hover{
          .destory{
            display:block;
            color: #af5b5e;
          }
        }
        .destory{
          width:34px;
          height:40px;
          margin:auto 0;
          display:none;
          transition:color 0.2s ease-out;
          position:absolute;
          top:0;
          right:10px;
          bottom:0;
          background-color:transparent;
          border:0;
          cursor:pointer;
          color:#fff;

          &:before{
            content:"×";
            font-size:40px;
            }
        }
        .toggle{
          position:absolute;
          left:0;
          top:0;
          height:55px;
          width:40px;
          outline-style:none;
          border:none;
          background-color:#fff;
          appearance:none;
          opacity:1;
          cursor:pointer;
          &::before{
            content:url('../public/1.svg');
            width:40px;
            height:40px;
            display:block;
            position:absolute;
            top:10px;

          }

        }
        label{
         padding:15px 15px 15px 5px;
          display:block;
          box-sizing:border-box;
          line-height:1.2;
        }
        button{
          position:absolute;
          right:10px;
          top:0;
        }
      }
      .editing{
        label{
          display:none;
        }
        .edit{
          display:block;
        }
      }
      .completed{
        label{
          text-decoration:line-through;
          color:#d9d9d9;
        }
        .toggle::before{
          content:url("../public/2.svg");
        }

      }
      li:last-child{
        border-bottom:0px;
      }
    }

  }
  .footer {
    color: #777;
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
  }

  .footer:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
    0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2),
    0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }

  .todo-count {
    float: left;
    text-align: left;
  }

  .todo-count strong {
    font-weight: 300;
  }

  .filters {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
  }

  .filters li {
    display: inline;
  }

  .filters li a {
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
  }

  .filters li a.selected,
  .filters li a:hover {
    border-color: rgba(175, 47, 47, 0.1);
  }

  .filters li a.selected {
    border-color: rgba(175, 47, 47, 0.2);
  }

  .clear-completed,.clear-completed:active {
    float: right;
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
    border:0;
    background-color:#fff;
    color:inherit;
  }

  .clear-completed:hover {
    text-decoration: underline;
  }

  .info {
    margin: 65px auto 0;
    color: #bfbfbf;
    font-size: 10px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    text-align: center;
  }

  .info p {
    line-height: 1;
  }

  .info a {
    color: inherit;
    text-decoration: none;
    font-weight: 400;
  }

  .info a:hover {
    text-decoration: underline;
  }

  @media screen and (-webkit-min-device-pixel-ratio:0){
    .toggle-all{
      transform:rotate(90deg);
      appearance: none;
    }

  }

}
</style>
