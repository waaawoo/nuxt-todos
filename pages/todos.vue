<template>
  <div>
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
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
