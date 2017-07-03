/**
 * Created by HP User on 29/06/2017.
 */

$(document).ready(function() {



    var sesso= $('input[name="maschiofemmina"]:checked','.radio-inline').val();
    var name = $('#nome').val();//recuperare il testo inserito nel label nome
    var cognome = $('#cognome').val();
    var date = $('#bday').val();
    var email = $("#email").val();
    var cell= $("#cell").val();
    var username = $('#username').val();
    var pass = $("#passw").val();
    var ripass = $('#confpassw').val();


    var iscrizione = function (sesso,name,cognome,datadinascita,email,cell,username,pass,ripass) {

        $(".btn-primary").click( function () {
            console.log("sesso:" +sesso);
            if(!checknome(name) & !checkcognome(cognome) & !checkdata(datadinascita) & !checkemail(email) & !checkcellulare(cell) &  !checkusername(username) & !checkpass(pass) & !checkripass(ripass) ){

                console.log("Non tutti i campi sono corretti")
            }
            else{
                console.log("Tutti i campi sono corretti")
                var nome=$("#nome").val();
                var cognome = $('#cognome').val();
                var date = $('#bday').val();
                var email = $("#email").val();
                var cell= $("#cell").val();
                var username = $('#username').val();
                var pass = $("#passw").val();
                var ripass = $('#confpassw').val();

                //non ho passato ripass che non serve ho già controllato che l'ha scritta bene
                //http://localhost/LOGIN/CRegistrazione/registrazione?sesso=M&nome=chiara&cognome=benedetti&datadinascita=12/02/1995&email=chiara.ben@hotmail.it&username=marta&password=ciao
                $.when($.get("http:127.0.0.1/LOGIN/CRegistrazione/registrazione?"+"sesso="+sesso+"&nome="+name+"&cognome="+cognome+"&datadinascita="+datadinascita+"&email="+email+"&username="+username+"&cellulare="+cell+"&password="+pass)).done(function(rx)
                {

                    console.log(rx);

                    if(rx==="done"){

                      //location.href="index.html";
                        login(username,pass);
                        //location.href="index.html";
                        
                            $('.navbar-nav .btn-primary').href("index.html").css("display","none"); //per non far apparire più i tasti di login e registrazione
                            //$('#logout').css("display","block"); //per far apparire il tasto logout
                            //$('.benvenuto').css("display","block").append(username).css("font-weight","bold"); //fa apparire la scritta Benvenuto + concatena l'username della persona

                        } //aggiungere modifiche benvenuto marta




                    else{
                        $('#username_error_message').html('Username già utilizzato');
                        $('#username_error_message').show().css("color","red");
                    }



                })
            }
        })
    }

    iscrizione(sesso,name,cognome,date,email,cell,username,pass,ripass);

    var login= function (username,pass) {
        console.log("username 2: "+ username); //mi faccio stampare su console username : xxxxxxxxxx
        console.log("pass 2: "+ pass); //mi faccio stampare su console username : xxxxxxxxxx


            $.when( $.get("http:127.0.0.1/LOGIN/CRegistrazione/login?"+"username="+username+"&password="+pass)).done(function (risposta){
                console.log(risposta);
            })
    }




//controllo NOME
    var checknome= function (n) {
        var n = $('#nome').val();
        console.log("nome: " + n);
            var nomelenght = $('#nome').val().length;
            //console.log(nomelenght);
            if (nomelenght < 1) {
                $('#name_error_message').html('Inserisci il Nome');
                $('#name_error_message').show().css("color", "red");
                return false;
            }
            else {
                //$("#name_error_message").hide();
                console.log("NOME CORRETTO");
                return true;
                }

        }

    //controllo COGNOME
    var checkcognome= function (cogn) {
        var cogn = $('#cognome').val();
        console.log("cognome: " + cogn);
        var cognomelenght = $('#cognome').val().length;
            //console.log(nomelenght);
            if (cognomelenght < 1) {
                $('#cognome_error_message').html('Inserisci il Cognome');
                $('#cognome_error_message').show().css("color", "red");
                return false;
            }
            else {
                //$("#cognome_error_message").hide();
                console.log("COGNOME CORRETTO");
                return true;

            }
    }

    //controllo DATA
    // facciamo registrare tutti? solo i maggiorenni? o tutti basta che nati prima di oggi? --> da verificare
// esiste anche oggetto Date() ma l'anno che mi stampava non era corretto


    var checkdata= function (datanascita) {
        var datanascita = $('#bday').val();
            console.log("datanascita: " +  datanascita);

            if (datanascita==="") // mi prende come sbagliate anche le date inserite a mano che non sono nel calendario : mi dice Inserire Data
            {
                $('#data_error_message').html('Inserire la Data');
                $('#data_error_message').show().css("color", "red");
                return false;
            }
            else {

                //$("#data_error_message").hide();
                console.log("DATA CORRETTA");
                return true;
            }
    }


    //controllo EMAIL
    var checkemail= function (ema) {

            var e = $('#email').val().length;
            var ema= $('#email').val();
            console.log("email:"+ema);
            var reg= /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/; //espressione regolare per validità email
            if (e<1) {
                $('#email_error_message').html('Inserire email');
                $('#email_error_message').show().css("color", "red");
                return false;
            }
            else {
                if(!reg.test(ema)){
                    $('#email_error_message').html('Inserire una email valida');
                    $('#email_error_message').show().css("color", "red");
                    return false;
                }
                else {
                    $("#email_error_message").hide();
                    console.log("EMAIL CORRETTA");
                    return true;
                }
            }

    }

//cellulare
    var checkcellulare= function (cell) {
        var cell = $('#cell').val();
        console.log("cellulare: " + cell);
        var cellenght = $('#cell').val().length;
        //console.log(cellenght);
        if (cellenght < 1) {
            $('#cellulare_error_message').html('Inserisci il Cellulare');
            $('#cellulare_error_message').show().css("color", "red");
            return false;
        }
        else {
            //$("#name_error_message").hide();
            console.log("CELLULARE CORRETTO");
            return true;
        }

    }

//controllo USERNAME
    //controlli con db per vedere se già usato +fare diventare spunta verde, se non riusciamo a cambiare dinamicamente username mettere icona profilo
    var checkusername= function  (us) {
        var us = $('#username').val();
        console.log("username: " + us);
            var usernamelenght = $('#username').val().length;
            //console.log(usernamelenght);
            if(usernamelenght<5 || usernamelenght>20){
                $('#username_error_message').html('Deve essere compreso tra 5 e 20 caratteri');
                $('#username_error_message').show().css("color","red");
                return false;
            }
            else
            {

                $(".glyphicon-remove").css("display","none");
                //da attivare il glyphon-ok ma non ci riesco
                $("#username_error_message").hide();
                console.log("USERNAME CORRETTO");
                return true;
            }
    }


    //password OK
    var checkpass = function (passw) {

            var passw = $('#passw').val();
        console.log("password: " + passw);
            var espressione = new RegExp("((?=.*[0-9])(?=.*[a-zA-Z]).{8,})");
            if (passw.length < 1) {
                $('#password_error_message').html('Inserire la password');
                $('#password_error_message').show().css("color", "red");
                return false;
            }
            else {
                if (!espressione.test(passw)) {
                    $('#password_error_message').html('La password non è sicura ');
                    $('#password_error_message').show().css("color", "red");
                    return false;

                }
                else {
                    $('#password_error_message').hide();
                    console.log("PASSWORD CORRETTA");
                    return true;

                }
            }


    }




    //conferma password OK
    var checkripass = function (ripassw) {

            var ripassw = $('#confpassw').val();
        console.log("riconferma password: " + ripassw);
            var pas= $('#passw').val();
            if(ripassw.length<1){
                $('#ripassword_error_message').html('Inserire la password');
                $('#ripassword_error_message').show().css("color","red");
                return false;
            }

            else {
                if(ripassw!=pas){
                    $('#ripassword_error_message').html('Le due password non coincidono');
                    $('#ripassword_error_message').show().css("color","red");
                    return false;
                }

                else {
                    $("#username_error_message").hide();
                    console.log("RICONFERMA PASSWORD CORRETTA");
                    return true;

                }}

    }


})
