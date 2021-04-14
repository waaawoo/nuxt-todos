

<template>
  <div class="content">
    <h1>TODOAPP</h1>
      <div class="form">
        <!-- submit時にaddメソッドを発火 preventでページのロードを無効にしている -->
        <form action="" @submit.prevent="add">
          <input type="text" name="" id="" v-model="name">
          <button class="add-btn">Add</button>
        </form>
      </div>
      <ul class="todos">
        <li v-for="todo in todos" :key="todo.id">
          <!-- createdが登録されるまで表示しない -->
          <span v-if="todo.created">
            <div>
              <input type="checkbox" v-bind:checked="todo.done" @change="toggle(todo)">
              <span class="dele" v-bind:class="{ done: todo.done }">
                {{ todo.name }}
                <!-- filtre適応 -->
                {{ todo.created.toDate() | detaFilter }}
              </span>
            </div>
            <div>
              <button class="re-btn" @click="remove(todo.id)">削除</button>
            </div>
          </span>
        </li>
      </ul>
  </div>
</template>

<script>
import "~/assets/css/todos.scss"
// momentのインポート
import moment from "moment"
export default {
  // createdのタイミングでtodosの初期化
  created(){
    this.$store.dispatch('todos/init')
  },

  data() {
    return {
      name: "",
      done: false
    };
  },
  mounted() {

  },
  methods: {
    // submitボタンをオスと呼ばれるメソッド
    add(){
      // storeのtodos.jsないのaddメソッドを実行(contexに入力したnameが入る)
      this.$store.dispatch('todos/add', this.name)
      // 処理が終わったら入力値を空にする
      this.name = ""
    },
    remove(id){
      this.$store.dispatch('todos/remove', id)
    },
    toggle(todo){
      this.$store.dispatch('todos/toggle', todo)
    }
  },
  computed: {
    todos(){
      // 共通のtodosを読んでいる
      // return this.$store.state.todos.todos
      return this.$store.getters['todos/orderdTodos']
    }
  },
  filters: {
    // 日付フォーマット用filter
    detaFilter(data){
      return moment(data).format('YYYY/MM/DD HH:mm:ss')
    }
  }
};
</script>

<style lang="scss" scoped>
  .todos{
    margin-top: 50px;
    padding: 0;
    width: 100%;
    li{
      list-style: none;
      margin-top: 5px;
      > span{
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .done{
    background-color: gray;
    transition: 1s;
  }

</style>
