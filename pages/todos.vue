<template>
  <div>

      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <span v-if="todo.created">
          <input type="checkbox" v-bind:checked="todo.done" @change="toggle(todo)">

          <span v-bind:class="{ done: todo.done }">
            {{ todo.name }}
            <!-- filtre適応 -->
            {{ todo.created.toDate() | detaFilter }}
          </span>

          <button @click="remove(todo.id)">削除</button>
          </span>
        </li>
      </ul>


    <div class="form">
      <!-- submit時にaddメソッドを発火 preventでページのロードを無効にしている -->
      <form action="" @submit.prevent="add">
        <input type="text" name="" id="" v-model="name">
        <button>Add</button>
      </form>
    </div>
  </div>
</template>

<script>
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
      return this.$store.state.todos.todos
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

<style scoped>
li > span > span.done{
  text-decoration: line-through;
}
</style>
