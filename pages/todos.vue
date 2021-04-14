<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{todo.id}}{{ todo.done }} {{ todo.name }} {{ todo.created }}
        <button @click="remove(todo.id)">削除</button>
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
    }
  },
  computed: {
    todos(){
      // 共通のtodosを読んでいる
      return this.$store.state.todos.todos
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
