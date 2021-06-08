import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyDRMOyMN9luEv-feNR_2nvrJgZNNEpuCDQ",
    authDomain: "covid-helper-5f627.firebaseapp.com",
    projectId: "covid-helper-5f627",
    storageBucket: "covid-helper-5f627.appspot.com",
    messagingSenderId: "444261074823",
    appId: "1:444261074823:web:bd1d9467ae04ada2b33522"
};
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
