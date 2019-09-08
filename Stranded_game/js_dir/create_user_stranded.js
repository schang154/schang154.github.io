/**
 * Set up writing logged-in user to firebase database on load.
 */
// Writing user information to firebase database.
(function(){

    var firebase = app_firebase;
    var user = firebase.auth().currentUser;

    localStorage.setItem('login', 'false');

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            localStorage.setItem('login', 'true');
            // for the current user
            // create this user node in the datebase
            firebase.auth().onAuthStateChanged(function(user){
                // updates the database to the designated path
                firebase.database().ref("users/"+user.uid).update(
                    {
                        "name":user.displayName,
                        "email":user.email,
                    });
            });
        } else {
            {}
            // No user is signed in.
        }
    });


})();

