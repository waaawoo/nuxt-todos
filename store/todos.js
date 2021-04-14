// firebase関連のインポート
import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'


// DB設定
const db = firebase.firestore()
const todosRef = db.collection('todos')

// todosを配列で用意
export const state = ()  => ({
  todos: []
})

// アクションの設定
export const actions = {
  // 初期化 vuexfireが用意してるfirestoreActionを呼び出す
  init: firestoreAction(({ bindFirestoreRef }) => {
    // todosへdbのコレクション(todoRef)を関連付け
    bindFirestoreRef('todos', todosRef)
  }),
  // 追加
  add: firestoreAction((context, name) =>{
    // 入力値判定
    if(name.trim()){
      // addメソッドを使って追加
      todosRef.add({
        name: name,
        done: false,
        // サーバから時刻をとって登録
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }),
  // 削除
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()
  }),
  // チェックボックス todoの完了未完了を判定
  toggle: firestoreAction((context, todo)=> {
    todosRef.doc(todo.id).update({
      // 反転させて登録
      done: !todo.done
    })
  })
}

// lodashでソート
export const getters = {
  orderdTodos: state => {
    return _.sortBy(state.todos, 'created')
  }
}
