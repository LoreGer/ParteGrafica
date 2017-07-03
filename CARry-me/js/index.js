/**
 * Created by HP User on 22/06/2017.
 */
$(document).ready(function(){



    var login= function () {
        $( '.modal-footer .btn-primary').click(function () {  //ho cliccato sul tasto login


            var us=$('#username').val(); //recuperare il testo inserito nel label username
            var passw=$("#password").val(); //recuperare il testo inserito nel label password
            console.log("username: "+ us); //mi faccio stampare su console username : xxxxxxxxxx


            //da sincronizzare con $.when chiamata ajax
            $.when( $.get("http:127.0.0.1/LOGIN/CRegistrazione/login?"+"username="+us+"&password="+passw)).done(function (risposta){
                console.log(risposta);
                if(risposta=="OK"){
                    $('.navbar-nav .btn-primary').css("display","none"); //per non far apparire più i tasti di login e registrazione
                    $('#logout').css("display","block"); //per far apparire il tasto logout
                    $('.modal').modal('hide'); //per chiudere automaticamente il modal una volta che l'accesso è corretto
                    $('.benvenuto').css("display","block").append(us).css("font-weight","bold"); //fa apparire la scritta Benvenuto + concatena l'username della persona
                }
                else {
                    alert('Accesso Fallito ');}

            })
        })

    }
    login();


    var logout=function () {
        $('#logout').click(function () {
            
            $.when($.get("http:127.0.0.1/LOGIN/CRegistrazione/logout" )).done(function (risp) {
                alert(risp); //non capisco perchè facendo con console.log non appare: hai effettuato il logout
                if(risp=="Hai effettuato il logout"){
                    location.href="index.html"
                }
                else{
                    alert("Sei ancora loggato")
                }
            })

        })
    }
    logout();


/*
 var Prenota= function () {

     $(' #prenota').click(function (){
         location.href="index_prenota.html"
     })



 }
 Prenota();
*/
 var PaginaRegistrazione= function () {
     $('#registrati').click(function () {
         location.href="index_registrati.html"
     })
 }
 PaginaRegistrazione();

    });

