var firebaseConfig = {
    apiKey: "AIzaSyB3joK7piWfPY72fuahSjMaGBc93iVDj_U",
    authDomain: "homes-2a852.firebaseapp.com",
    projectId: "homes-2a852",
    storageBucket: "homes-2a852.appspot.com",
    databaseURL: "https://homes-2a852-default-rtdb.asia-southeast1.firebasedatabase.app",
    messagingSenderId: "955002264254",
    appId: "1:955002264254:web:affa022685ce5d39461cef"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Initialize firebase db
    let db = firebase.firestore();

    var Name, PropertyURL, BHK, Price, Flat;
    var files = [];
    var reader;

    // Triggered when select image button is pressed (to upload picture)

    function selectImage(){

        // Taking file
        var input = document.createElement('input');
        input.type = 'file';


        input.onchange = e => {
            files = e.target.files;
            reader = new FileReader();
            reader.onload= function(){
                document.getElementById("myimg").src = reader.result;
            }    
            reader.readAsDataURL(files[0]);
        }
        input.click(); 
    }


    // Triggered when "Upload property" is pressed, also adds details to firestore
    function uploadProperty(){
        
        Name = document.getElementById('name').value;
        Price = document.getElementById('price').value;
        BHK = document.getElementById('bhk').value;
        Flat = document.getElementById('flat').value;
        Broker_Name = document.getElementById('bname').value;
        Broker_Contact = document.getElementById('bcontact').value;

        var uploadTask = firebase.storage().ref('Images/'+Name+".png").put(files[0]);

        uploadTask.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById('UpProgress').innerHTML = 'Upload'+progress+"% complete";
        },
        
        function(error){
            alert('Error occured, please try again')
        },

        // Upload to firestore
        function(){
            uploadTask.snapshot.ref.getDownloadURL().then(function(url){
                
                PropertyURL = url;

                db.collection("Apartments").add({
                    BHK : BHK,
                    Name : Name,
                    Price : Price,
                    URL : PropertyURL,
                    Broker : Broker_Name,
                    BrokerNo : Broker_Contact,
                    Flat : Flat,
                }).then(function(){
                    //Redirect after upload
                    alert('Apartment added successfully');
                    window.location.href = "http://localhost:5000/catalog.html"; 
                })
            
            });
        }); 
    }