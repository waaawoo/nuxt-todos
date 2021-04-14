import firebase from "firebase"

const config = {
  projectId: ProcessingInstruction.env.FIREBASE_PROJECT_ID
}

// 二重初期化防止
if(!firebase.apps.length){
  firebase.initializeApp(config)
}

export default firebase
