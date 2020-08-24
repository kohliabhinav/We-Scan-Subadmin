import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAbmftWV2oYvdh65HcwDMhL_p7au4wq7pM",
    authDomain: "wescan-in.firebaseapp.com",
    databaseURL: "https://wescan-in.firebaseio.com",
    projectId: "wescan-in",
    storageBucket: "wescan-in.appspot.com",
    messagingSenderId: "557646814015",
    appId: "1:557646814015:web:aaac4052dfeaae383d518a",
}
firebase.initializeApp(config);
export default firebase