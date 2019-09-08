/**
 * Set up the firebase on load.
 */
// Your web app's Firebase configuration
(function(){

    // Initialize Firebase
    var config = {

        apiKey: "AIzaSyBjDDnNiFBc04JaUSRIf1edD5YyUqWyQgg",
        authDomain: "stranded-5589d.firebaseapp.com",
        databaseURL: "https://stranded-5589d.firebaseio.com",
        projectId: "stranded-5589d",
        storageBucket: "stranded-5589d.appspot.com",
        messagingSenderId: "86071154150",
        appId: "1:86071154150:web:65a5d655af6b55a8"
    };
    firebase.initializeApp(config);
    app_firebase = firebase;

    // load performance analytics from Firebase

    // Initialize Performance Monitoring and get a reference to the service
    var perf = firebase.performance();
})();