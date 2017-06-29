document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	//document.addEventListener("resume", onResume, false);
	//$("body").bind('touchmove', function(e){e.preventDefault()})
	
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	
	
	
	openFB.init({appId: '202727853465076'});
	
	
	function loginFacebook() {
		
		openFB.login(
				function(response) {
					 if(response.status === 'connected') {
					   //alert('Facebook login succeeded, got access token: ' + response.authResponse.accessToken);
					   getInfo()
					 } else {
					   //alert('Facebook login failed: ' + response.error);
					    navigator.notification.alert(
												  'Login Facebook fallita, riprova in seguito o fai login con Ridy',  // message
												  alertDismissed,         // callback
												  'Login Facebook',            // title
												  'OK'                  // buttonName
												  );
					 }
				}, {scope: 'email,public_profile,user_friends'});
	}
	
	
	
	function getInfo() {
		
		openFB.api({
				   path: '/me',
				   success: function(data) {
				   console.log(JSON.stringify(data));
				   
				   //alert(data.name);
				   //alert(data.email);
				   
				   //alert('http://graph.facebook.com/' + data.id + '/picture?type=small');
				   //document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
				   
				   
				   LoginFacebookVera(data.email,data.name)
				   
		},
		
		error: errorHandler});
	}
	
	
	
	
	function errorHandler(error) {
		alert(error.message);
	}
	
	
	
	function logout() {
		openFB.logout(
			function() {
				localStorage.setItem("email", "");
				localStorage.setItem("emailpass", "");
				localStorage.setItem("patente", "");
			},
		
		 errorHandler);
		
		
		var ref = window.open('https://m.facebook.com/', '_blank', 'location=no');
	}
	
	
	localStorage.setItem("pagina","log")
	
     document.addEventListener('backbutton', function(e) {
							   
		if(localStorage.getItem("pagina")=="log"){
							   
	        navigator.notification.confirm(
	       'Vuoi chiudere purple miles?',  // message
	        onConfirm2,              // callback to invoke with index of button pressed
	       'Spegni',            // title
	       'Spegni,Annulla'      // buttonLabels
	        );
							   
		}
							   
		if(localStorage.getItem("pagina")=="imp"){
							   
		  $("#conferma").tap();
							   
		}
							   
	 }, false);
	
	
	
	var IDPage;
	
	if (localStorage.getItem("veicolo") === null || localStorage.getItem("veicolo")=="null" || typeof(localStorage.getItem("veicolo")) == 'undefined' || localStorage.getItem("veicolo")==0 || localStorage.getItem("veicolo")=="") {
		localStorage.setItem("veicolo", "Automobile")
	}

	
	if (localStorage.getItem("lingua") === null || localStorage.getItem("lingua")=="null" || typeof(localStorage.getItem("lingua")) == 'undefined' || localStorage.getItem("lingua")==0 || localStorage.getItem("lingua")=="") {
		localStorage.setItem("lingua", "it")
	}

	
	
	if(localStorage.getItem("lingua")=="it"){
	  document.getElementById("lingua").value = "it"
	}
	else if(localStorage.getItem("lingua")=="en"){
		document.getElementById("lingua").value = "en"
	}
	
    IDPage = getParameterByName('id');
	

	
	
	$(document).on("tap", "#emaildimenticata", function(e){
				   
			//alert()
				   
			navigator.notification.prompt(
				'Inserisci il tuo indirizzo email',  // message
				onPrompt,                  // callback to invoke
				'Recupera la Password',            // title
				['Invia','Annulla'],             // buttonLabels
				''                 // defaultText
			);
				   
	});
	
	function onPrompt(results) {
		if(results.buttonIndex==1){
			if (results.input1 == "") {
				navigator.notification.alert(
											 'inserire indirizzo email',  // message
											 alertDismissed,         // callback
											 'Email',            // title
											 'OK'                  // buttonName
											 );
				return;
			}
			
			EmailAddr = results.input1;
			Filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;
			if (Filtro.test(EmailAddr)) {
				
			}
			else {
				navigator.notification.alert(
											 'Caratteri email non consentiti',  // message
											 alertDismissed,         // callback
											 'Email',            // title
											 'OK'                  // buttonName
											 );
				return;
			}
			
			//Recupera la Password
			//alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
			
			$(".spinner").show();
			$.ajax({
				   type:"GET",
				   url:"http://msop.it/rides/Check_RecPassword.asp",
				   contentType: "application/json",
				   data: {email:results.input1},
				   timeout: 7000,
				   jsonp: 'callback',
				   crossDomain: true,
				   success:function(result){
				   
				   $.each(result, function(i,item){
						  if(item.Token==1024){
						  navigator.notification.alert(
													   'Invio eseguito correttamente',  // message
													   alertDismissed,         // callback
													   'Recupero Password',            // title
													   'OK'                  // buttonName
													   );
						  }
						  else{
						  navigator.notification.alert(
													   'Recupero fallito, riprova in seguito',  // message
													   alertDismissed,         // callback
													   'Errore Recupero',            // title
													   'OK'                  // buttonName
													   );
						  }
						  
						  
						  
						  });
				   
				   $(".spinner").hide();
				   
				   },
				   error: function(){
				   $(".spinner").hide();
				   
				   navigator.notification.alert(
												'Possibile errore di rete, riprova tra qualche minuto',  // message
												alertDismissed,         // callback
												'Attenzione',            // title
												'Done'                  // buttonName@
												);
				   
				   },
				   dataType:"jsonp"});
			
			
		}
		
	}

	
    $('#fuso').on('change', function(){
        var $this = $(this),
        $value = $this.val();
                   
        document.getElementById("fuso").value = $value;
				  
		//alert($value)

                  var citta = "<option value=''>Scegli la Citta</option>";
                  
                  $(".spinner").show();
                  $.ajax({
                         type:"GET",
                         url:"http://purplemiles.com/www2/check_prendicitta.php?nazione="+$value+"",
                         contentType: "application/json",
                         timeout: 7000,
                         jsonp: 'callback',
                         crossDomain: true,
                         success:function(result){
                         
                         $.each(result, function(i,item){
                                
                                
                                if (item.Token == 1){

                                  citta = citta + "<option value='"+item.id+"'>"+ item.city +"</option>"
								  //alert(item.city)

                                }
                                else{
                                navigator.notification.alert(
                                                             'Errore di rete',  // message
                                                             alertDismissed,         // callback
                                                             'Attenzione',            // title
                                                             'Done'                  // buttonName@
                                                             );
                                }
                        });
                         
                         $(".spinner").hide();
						 

						 //window.location.href = "#page8";
						 
						 $("#citta").html(citta);
						 
						 $("#citta").selectmenu("refresh");
						 
						 
                         },
                         error: function(){
                         $(".spinner").hide();
                         
                         navigator.notification.alert(
                                                      'Possibile errore di rete, riprova tra qualche minuto',  // message
                                                      alertDismissed,         // callback
                                                      'Attenzione',            // title
                                                      'Done'                  // buttonName
                                                      );
                         
                         },
					dataType:"jsonp"});
                  
    });
	
	
	$('#citta').on('change', function(){
				  var $this = $(this),
				  $value = $this.val();
				  
				  document.getElementById("citta").value = $value;
				   
				  $("#precitta").html("Fuso Orario: <b><font color='#cc33cc'>" + $value+"</font></b>");
				   
			      prendicittaid($value)
				  
				  
		});
	
	function prendicittaid(id){
		
		var citta = "";
		

		$.ajax({
			   type:"GET",
			   url:"http://purplemiles.com/www2/check_prendicittaid.php?id="+ id +"",
			   contentType: "application/json",
			   timeout: 7000,
			   jsonp: 'callback',
			   crossDomain: true,
			   success:function(result){
			   
			   $.each(result, function(i,item){
					  
					  if (item.Token == 1){

					    $("#precitta").html("Fuso Orario: <b><font color='#cc33cc'>" +item.city+"</font></b>");
					    localStorage.setItem("city", item.city);
					  
					  }
					  else{
					  
					  
					  }
				});
			   
			   $(".spinner").hide();
			   
			   
			   },
			   error: function(){
			   $(".spinner").hide();
			   
			   
			     navigator.notification.alert(
											'Possibile errore di rete, riprova tra qualche minuto',  // message
											alertDismissed,         // callback
											'Attenzione',            // title
											'Done'                  // buttonName
											);

			   
			   
			   },
			   dataType:"jsonp"});
		
	}
    
    $(document).on("tap", "#pagi7", function(e){
                   window.location.href = "#page7";
                   
                   var myScroll2;
                   
                   myScroll2 = new IScroll('#wrapper2', { click: true });
                   setTimeout (function(){
                            myScroll2.refresh();
                    }, 1000);
                   
                   document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 300); }, false);
                   
                   document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                   
                   
                   e.stopImmediatePropagation();
                   
                   e.preventDefault();
                   
                   return false;
                   
                   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
                   
    });
	
	
	$(document).on("tap", "#indietro8", function(e){
				   window.location.href = "#page6";
				   
				   var myScroll2;
				   
				   myScroll2 = new IScroll('#wrapper2', { click: true });
				   setTimeout (function(){
							   myScroll2.refresh();
							   }, 1000);
				   
				   document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 300); }, false);
				   
				   document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
				   
				   
				   
				   prendimezzi()
				   
				   prendinazione()
				   
				   //$("#fuso").html(nazione);
				   
				   //$("#fuso").selectmenu("refresh");
				   
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
				   });
	
	
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
	

	
	
	$(document).on("tap", "#prova", function(e){
				   if(localStorage.getItem("pagina")=="log"){
				   
				   navigator.notification.confirm(
												  'Vuoi chiudere purple miles?',  // message
												  onConfirm2,              // callback to invoke with index of button pressed
												  'Spegni',            // title
												  'Spegni,Annulla'      // buttonLabels
												  );
				   
				   }
				   
				   if(localStorage.getItem("pagina")=="imp"){
				   
				   $("#conferma").tap();
				   
				   }

				   
		e.stopImmediatePropagation();
				   
		e.preventDefault();
				   
		return false;
				   
		if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	$(document).on("tap", "#accedi1", function(e){
				   
		window.location.href = "#page";
				   
		e.stopImmediatePropagation();
				   
		e.preventDefault();
				   
		return false;
				   
		if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
    
    $(document).on("tap", "#pippo", function(e){
                   
        window.location.href = "index2.html";

    });
	
	
	$(document).on("tap", "#homepage", function(e){
				   
				   window.location.href = "index.html";
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	
	$(document).on("tap", "#conferma", function(e){
		//window.location.href = "#page1";
		localStorage.setItem("pagina","log")
				   
		localStorage.setItem("lingua", document.getElementById("lingua").value);
		localStorage.setItem("fuso", document.getElementById("fuso").value);
        localStorage.setItem("citta", document.getElementById("citta").value);
		
		localStorage.setItem("veicolo", document.getElementById("veicolo").value);
				   
		
		if(IDPage==2){
		  window.location.href = "mappass.html";
		}
		else{
				   
		  window.location.href = "#page";
				   
		}
				   
		e.stopImmediatePropagation();
				   
		e.preventDefault();
				   

		if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	$(document).on("tap", "#impostazioni", function(e){
				   window.location.href = "#page6";
				   localStorage.setItem("pagina","imp")
				   
				   var myScroll2;

				   myScroll2 = new IScroll('#wrapper2', { click: true });
				   setTimeout (function(){
					  myScroll2.refresh();
				   }, 1700);
				   
				   document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 300); }, false);
				   
				   document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
				   
				   
				   prendimezzi()
				   
                   prendinazione()
				   
				   //prendicittaid(localStorage.getItem("citta"))
				   
				   //$("#fuso").html(nazione);
				   
				   //$("#fuso").selectmenu("refresh");
				   
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
    });
	
	$(document).on("tap", "#home", function(e){
				   
			if(IDPage==2){
			  window.location.href = "mappass.html";
			}
			else{
			  window.location.href = "#page";
				   
			  setTimeout (function(){
				myScroll.refresh();
			  }, 1000);
				   
			}

			e.stopImmediatePropagation();
				   
			e.preventDefault();
				   
			return false;
				   
			if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});

	
	$(document).on("touchstart", "#accedi", function(e){
		//window.location.href = "index.html";
		login();
		if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
		
	});
	
	$(document).on("touchstart", "#iscriviti", function(e){
				   //window.location.href = "index.html";
				   iscriviti();
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
				   });
	
	$(document).on("tap", "#recuperopsw", function(e){
   
				   
		  var ref = window.open('http://www.purplemiles.com/www/rec_pw.php?lang='+ localStorage.getItem("lingua") +'', '_system', 'location=no');

	   	  e.stopImmediatePropagation();
				   
		  e.preventDefault();
				   
		  return false;
				   
		  if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
		
	});
	
	$(document).on("tap", "#logfacebook", function(e){
				   
		  loginFacebook()
		
				   
	   	  e.stopImmediatePropagation();
				   
		  e.preventDefault();
				   
		 return false;
				   
		 if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	$(document).on("tap", "#infofacebook", function(e){
				   
		getInfo()
				   
				   
	   	  e.stopImmediatePropagation();
				   
		  e.preventDefault();
				   
		  return false;
				   
		  if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	
	$(document).on("tap", "#logoutfacebook", function(e){
				   
		 logout()
				   
				   
		 e.stopImmediatePropagation();
				   
		 e.preventDefault();
				   
		 if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	
	$(document).on("tap", "#legenda", function(e){
				   
		var ref = window.open('http://www.purplemiles.com/www/legenda.php?lang='+ localStorage.getItem("lingua") +'', '_system', 'location=no');
				   
	});
	
	$(document).on("tap", "#regsito", function(e){
				   
		var ref = window.open('http://www.purplemiles.com/www/enter.php?lang='+ localStorage.getItem("lingua") +'', '_system', 'location=no');

		e.stopImmediatePropagation();
				   
		e.preventDefault();
				   
		return false;
				   
		if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	$(document).keydown(function (eventObj){
		getKey(eventObj);
	});
	
	
	if(IDPage==2){

		
		$("#impostazioni").tap();
		
	}
	

		document.addEventListener("showkeyboard", function(){ $("[data-role=footer]").hide();}, false);
		document.addEventListener("hidekeyboard", function(){ $("[data-role=footer]").show();}, false);
		
		// Workaround for buggy header/footer fixed position when virtual keyboard is on/off
		$('input, select')
		.on('focus', function (e) {
			$('header, footer').css('position', 'absolute');
			})
		.on('blur', function (e) {
			$('header, footer').css('position', 'fixed');
			//force page redraw to fix incorrectly positioned fixed elements
			//setTimeout( function() {
			//window.scrollTo( $.mobile.window.scrollLeft(), $.mobile.window.scrollTop() );
			//		   }, 20 );
			});
    
         setTimeout(function() {
           $(".spinner").hide();
         }, 5000);
	
	
		var connectionStatus = false;
		connectionStatus = navigator.onLine ? 'online' : 'offline';
		
		if(connectionStatus=='online'){


			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1;//January is 0, so always add + 1

			var ora = today.getHours()
			if(ora<10){ora="0"+ora}

			var minuti = today.getMinutes();
			if(minuti<10){minuti="0"+minuti}

			var secondi = today.getSeconds();
			if(secondi<10){secondi="0"+secondi}


			var yyyy = today.getFullYear();
			if(dd<10){dd="0"+dd}
			if(mm<10){mm="0"+mm}
			today = dd+'/'+mm+'/'+yyyy;

			$("#stamp").html(yyyy+"-"+mm+"-"+dd+" "+ora+":"+minuti+":00");
			var ora_cell = yyyy+"-"+mm+"-"+dd+" "+ora+":"+minuti+":00";
			
			localStorage.setItem("ora_cell", ora_cell);
			
			$(".spinner").hide();
			
			document.getElementById("email").value = localStorage.getItem("email2")
			
			//var watchID = navigator.geolocation.getCurrentPosition(gpsonSuccess, gpsonError, {timeout: 30000, enableHighAccuracy: true, maximumAge: 90000 });
			
		}
		else{
			
				navigator.notification.alert(
					'Nessuna connessione ad internet rilevata',  // message
					alertDismissed,         // callback
					'Attenzione',            // title
					'OK'                  // buttonName
                 );
		}
	

	
    }



function prendimezzi(){
	var mezzi = "<option value='Autovettura' selected>Autovettura</option>"
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://purplemiles.com/www2/check_prendimezzo.php",
		   contentType: "application/json",
		   //data: {email:email,pin:pin},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  //alert(item.Token);
				  
				  if (item.Token == 1){
				     if(localStorage.getItem("veicolo")==item.veicolo){
				       mezzi = "";
				       mezzi = mezzi + "<option value='"+item.veicolo+"' selected>"+ item.veicolo +"</option>"
					 }
				     else{
                        if (localStorage.getItem("veicolo") === null || localStorage.getItem("veicolo")=="null" || typeof(localStorage.getItem("veicolo")) == 'undefined' || localStorage.getItem("veicolo")==0 || localStorage.getItem("veicolo")=="") {
                           if(item.veicolo=="Car"){
                               mezzi = mezzi + "<option value='"+item.veicolo+"' selected>"+ item.veicolo +"</option>"
                           }
                           else{
                              mezzi = mezzi + "<option value='"+item.veicolo+"'>"+ item.veicolo +"</option>"
                           }
                        }
                        else{
                            mezzi = mezzi + "<option value='"+item.veicolo+"'>"+ item.veicolo +"</option>"
                        }
                     }
				         /*if(item.id_veicolo==6){
				            mezzi = mezzi + "<option value='"+item.id_veicolo+"' selected>"+ item.veicolo +"</option>"
				          }
				          else{
				            mezzi = mezzi + "<option value='"+item.id_veicolo+"'>"+ item.veicolo +"</option>"
				          }*/
				  
				  }
				  else{
				  navigator.notification.alert(
											   'Errore di rete',  // message
											   alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName@
											   );
				  }
			});
		   
		   $("#veicolo").html(mezzi);
		   
		   $("#veicolo").selectmenu("refresh");
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto',  // message
										alertDismissed,         // callback
										'Attenzione',            // title
										'Done'                  // buttonName
										);
		   
		   },
		   dataType:"jsonp"});
	
}

function prendinazione(){
    
	var nazione = "";
    
    $(".spinner").show();
     $.ajax({
		   type:"GET",
		   url:"http://purplemiles.com/www2/check_prendinazione.php",
		   contentType: "application/json",
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				 
     
     if (item.Token == 1){
       if(localStorage.getItem("fuso")==item.country){
			nazione = nazione + "<option value='"+item.country+"' selected>"+ item.country +"</option>"
				  
				  /*if(localStorage.getItem("citta")==item.id){
				    $("#citta").html("<option value="+ localStorage.getItem("citta") +">"+ localStorage.getItem("citta") +"</option>");
				  
				    $("#citta").selectmenu("refresh");
				  }*/
				  
       }
       else{
          if (localStorage.getItem("fuso") === null || localStorage.getItem("fuso")=="null" || typeof(localStorage.getItem("fuso")) == 'undefined' || localStorage.getItem("fuso")==0 || localStorage.getItem("fuso")=="") {
                  if(item.country=="Italy"){
                    nazione = nazione + "<option value='"+item.country+"' selected>"+ item.country +"</option>"
                  }
                  else{
                    nazione = nazione + "<option value='"+item.country+"'>"+ item.country +"</option>"
                  }

           }
           else{
               nazione = nazione + "<option value='"+item.country+"'>"+ item.country +"</option>"

            }
       }
     }
     else{
     navigator.notification.alert(
     'Errore di rete',  // message
     alertDismissed,         // callback
     'Attenzione',            // title
     'Done'                  // buttonName@
     );
     }
     });
		   
     $(".spinner").hide();
     
     $("#fuso").html(nazione);
     
     $("#fuso").selectmenu("refresh");
			
	 
    //document.getElementById("citta").value = localStorage.getItem("citta");
		   
    },
    error: function(){
    $(".spinner").hide();
		   
		   navigator.notification.alert(
     'Possibile errore di rete, riprova tra qualche minuto',  // message
     alertDismissed,         // callback
     'Attenzione',            // title
     'Done'                  // buttonName
     );
		   
		   },
		   dataType:"jsonp"});
}



function getKey(key){
 if ( key == null ) {
 keycode = event.keyCode;
 
 } else {
 keycode = key.keyCode;
 }
 
 if (keycode ==13){
	 
   setTimeout(function() {
	 login();
   }, 200);
 
 }
 
 }


function verificawifi(){
	$("#verifica").click();
}


function onResume() {
	app.initialize();
}


function login() {
	
	var email2 = self.document.formia2.email.value;
	var pin2 = self.document.formia2.password.value;
	
	if (email2 == "") {
		navigator.notification.alert(
									 'inserire Username',  // message
									 alertDismissed,         // callback
									 'Email',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	
	if (pin2 == "") {
		navigator.notification.alert(
									 'inserire una Password',  // message
									 alertDismissed,         // callback
									 'Password',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	EmailAddr = self.document.formia2.email.value;
	Filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;
	if (Filtro.test(EmailAddr)) {
	 
		
	}
	else {
		navigator.notification.alert(
									 'Caratteri email non consentiti',  // message
									 alertDismissed,         // callback
									 'Email',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	//var newpin = sha1(pin2);
	


	LoginVera(email2,pin2);
	
}


function LoginVera(email,pin){
	//alert(email+pin);
	var lat = localStorage.getItem("lat");
	var lng = localStorage.getItem("lng");
    
    var ciccio = $.base64.encode(email)
    var pluto = $.base64.decode(ciccio)
    
    alert(ciccio + " " + pluto)
    
    $(".spinner").show();
    
    $.ajax({
           type: "POST",
           url: "http://msop.it/microverba/api/loginV2.php",
           data: {email:ciccio,password:pin},
           cache: false,
           crossDomain: true,
           contentType: "application/x-www-form-urlencoded",
           success: function (result) {
           
              alert(result.Token)
           
              var pluto = $.base64.decode(result.messaggio)
           
              /*$.each(result, function(i,item){
                  alert("ok");
                  
                  
              });*/
           
               /*setTimeout (function(){
                  salvatutto()
               }, 500);*/
           
              //$.base64.decode(item.email)
		   
		   
		      localStorage.setItem("email", email);
		      window.location.href = "index.html";
           
           
           },
           error: function(){
           
               navigator.notification.alert(
                                        'Errore Imprevisto, contatta il fornitore',  // message
                                        alertDismissed,         // callback
                                        'Errore',            // title
                                        'OK'                  // buttonName
                                        );
           
           }
           
    });
	
	
	/*$.ajax({
		   type:"GET",
		   url:"http://msop.it/microverba/check_accesso.php?email="+ ciccio +"&pin="+ pin +"",
		   contentType: "application/json",
		   //data: {email:email,pin:pin},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				alert(item.Token);
				  
				if (item.Token == 1){
				  localStorage.setItem("email", email);
				  localStorage.setItem("email2", email);
				  localStorage.setItem("emailpass", email);
				  
				  localStorage.setItem("nick", item.nick);
				  
				  localStorage.setItem("fotoprof", item.foto.replace(".jpg","").replace(".png",""));
				  
				  
				  if(localStorage.getItem("fotoprof")=="default"){
				    localStorage.setItem("nomefoto", "default")
				    localStorage.setItem("nomeimg", "add_"+email.replace("@","").replace(".","").replace(".",""))
				  }
				  else{
				    localStorage.setItem("nomefoto", "add_"+email.replace("@","").replace(".","").replace(".",""))
				  }
				  

				  window.location.href = "index.html";
                  
                  
                  
                  //$.base64.decode(item.email)
                  
                  //var pluto = $.base64.decode(item.email.replace("uguale","="))
                  
                  alert($.base64.decode(item.email))
				  
				}
				else{
                  if (item.Token == 11){
				         navigator.notification.alert(
											   'Utente non verificato, attivati cliccando sul link dopo la registrazione',  // message
											   alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName@
                        );
                  }
                  else{
                      navigator.notification.alert(
                                               'Email e/o password non corretti',  // message
                                               alertDismissed,         // callback
                                               'Attenzione',            // title
                                               'Done'                  // buttonName@
                                               );
                  }
				}
			});
		   
    $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto',  // message
										alertDismissed,         // callback
										'Attenzione',            // title
										'Done'                  // buttonName
										);
		   
		   },
		   dataType:"jsonp"});*/
}



function LoginFacebookVera(email,nome){

	var lat = localStorage.getItem("lat");
	var lng = localStorage.getItem("lng");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://msop.it/addall/check_facebook.php?email="+ email +"&nome="+ nome +"&lat="+ lat +"&lon="+ lng +"",
		   contentType: "application/json",
		   //data: {email:email,pin:pin},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  //alert(item.Token);
				  
				  if (item.Token == 1){
				  localStorage.setItem("email", email);
				  localStorage.setItem("email2", email);
				  localStorage.setItem("emailpass", email);
				  
				  localStorage.setItem("nick", item.nick);
				 
				  
				  localStorage.setItem("fotoprof", item.foto.replace(".jpg","").replace(".png",""));
				  
				  if(localStorage.getItem("fotoprof")=="default"){
				  localStorage.setItem("nomefoto", "default")
				  }
				  else{
				  localStorage.setItem("nomefoto", "add_"+email.replace("@","").replace(".","").replace(".",""))
				  }

				  
				  window.location.href = "index.html";
				  
				  }
				  else{
				  if (item.Token == 11){
				  navigator.notification.alert(
											   'Utente non verificato, attivati cliccando sul link dopo la registrazione',  // message
											   alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName@
											   );
				  }
				  else{
				  navigator.notification.alert(
											   'Email e/o password non corretti',  // message
											   alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName@
											   );
				  }
				  }
				  });
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto',  // message
										alertDismissed,         // callback
										'Attenzione',            // title
										'Done'                  // buttonName
										);
		   
		   },
		   dataType:"jsonp"});
}



function iscriviti(){
	
	
	var emailreg = self.document.formia.emailreg.value;
	var pinreg = self.document.formia.pinreg.value;
	var nomereg = self.document.formia.nick.value;
	
	/*var cell = self.document.formia.cell.value;
    var patente = self.document.formia.patente.value;
    var patentemese = self.document.formia.patentemese.value;
    var patenteanno = self.document.formia.patenteanno.value;
	var sono = self.document.formia.sono.value;
	
	
	if (sono == "autista") {
		
		if (patente == "") {
			navigator.notification.alert(
										 'inserire N. di patente',  // message
										 alertDismissed,         // callback
										 'Email',            // title
										 'OK'                  // buttonName
										 );
			return;
		}
		
		if (patentemese == "Mese") {
			navigator.notification.alert(
										 'inserire mese di scadenza patente',  // message
										 alertDismissed,         // callback
										 'Email',            // title
										 'OK'                  // buttonName
										 );
			return;
		}
		
		if (patenteanno == "Anno") {
			navigator.notification.alert(
										 'inserire anno di scadenza patente',  // message
										 alertDismissed,         // callback
										 'Email',            // title
										 'OK'                  // buttonName
										 );
			return;
		}
	}*/
	
	if (emailreg == "") {
		navigator.notification.alert(
									 'inserire Email',  // message
									 alertDismissed,         // callback
									 'Email',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	
	if (pinreg == "") {
		navigator.notification.alert(
									 'inserire un Pin',  // message
									 alertDismissed,         // callback
									 'Pin',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	
	if (nomereg == "") {
		navigator.notification.alert(
									 'inserire il Nome',  // message
									 alertDismissed,         // callback
									 'Nome',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	
	
	EmailAddr = self.document.formia.emailreg.value;
	Filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;
	if (Filtro.test(EmailAddr)) {
		
	}
	else {
		navigator.notification.alert(
									 'Verificare la email',  // message
									 alertDismissed,         // callback
									 'Email',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	

	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://msop.it/addall/check_registrazione.php?email="+ emailreg +"&password="+ pinreg +"&nickname="+ nomereg +"",
		   contentType: "application/json",
		   //data: {email:emailreg,nickname:nomereg,pin:pinreg},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  if (item.Token == '1'){
				  
				  navigator.notification.alert(
											   'Registrazione effettuata correttamente.',  // message
											    alertDismissed,         // callback
											   'Registrazione Eseguita',            // title
											   'Done'                  // buttonName
											   );
				  
				  
				  }
				  else{
				  navigator.notification.alert(
											   'Cliente gia registrato',  // message
											   alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName
											   );
				  
				  }
			});
		   
		   $(".spinner").hide();
		   window.location.href = "#page";
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto',  // message
										alertDismissed,         // callback
										'Attenzione',            // title
										'Done'                  // buttonName
										);
		   
		   },
		   dataType:"jsonp"});
}



function alertDismissed() {
	
}


function gpsonSuccess(position){
	
	
	var ciao = position.coords.latitude;
	var ciao1 = position.coords.longitude;
	var gradi = position.coords.heading;
	
	localStorage.setItem("lat", ciao)
	localStorage.setItem("lng", ciao1)
	localStorage.setItem("gradi", gradi)
	
	localStorage.setItem("geostory", "SI")
	
	/*alert('Latitude: '          + position.coords.latitude          + '\n' +
	 'Longitude: '         + position.coords.longitude         + '\n' +
	 'Altitude: '          + position.coords.altitude          + '\n' +
	 'Accuracy: '          + position.coords.accuracy          + '\n' +
	 'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	 'Heading: '           + position.coords.heading           + '\n' +
	 'Speed: '             + position.coords.speed             + '\n' +
	 'Timestamp: '         + position.timestamp                + '\n');*/
	
	
	//$("#distanza").html("<span style = 'font-size: 18px;'>"+ position.coords.speed +","+ position.coords.heading  +"</span>");
	
}


function gpsonError(){
	
	var lat = "41.889191";
	var lng = "12.492475";
	
	localStorage.setItem("lat", lat)
	localStorage.setItem("lng", lng)
	
	navigator.notification.alert(
								 'Possibile errore GPS, assicurati di avere il gps del telefono attivato.',  // message
								 alertDismissed,         // callback
								 'Attenzione',           // title
								 'Done'                  // buttonName
								 );
	
}




function EmailDimenticata() {
	
	
}


function gomappa(){
	var addressLongLat = '41.862321,12.692804';
	
	window.open("http://maps.apple.com/?q="+addressLongLat, '_blank');
	//window.location.href = "http://maps.apple.com/?q="+addressLongLat
	
	//var ref = window.open('http://maps.apple.com/?q=Via di Acilia, 7', '_system');
	
}

function onConfirm2(button) {
	if(button==1){    //If User selected No, then we just do nothing

		
		for(i=0; i<10000; i++)
		{
			window.clearInterval(i);
		}
		
		for(i=0; i<3; i++)
		{
			navigator.app.exitApp();
		}
		
		//navigator.app.exitApp();
		
		navigator.device.exitApp();
		
		
		e.stopImmediatePropagation();
		
		e.preventDefault();
		
		return;
	}
	
}


function sha1(str) {
	//  discuss at: http://phpjs.org/functions/sha1/
	// original by: Webtoolkit.info (http://www.webtoolkit.info/)
	// improved by: Michael White (http://getsprink.com)
	// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	//    input by: Brett Zamir (http://brett-zamir.me)
	//   example 1: sha1('Kevin van Zonneveld');
	//   returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'
	
	var rotate_left = function(n, s) {
		var t4 = (n << s) | (n >>> (32 - s));
		return t4;
	};
	
	/*var lsb_hex = function (val) {
	 // Not in use; needed?
	 var str="";
	 var i;
	 var vh;
	 var vl;
	 for ( i=0; i<=6; i+=2 ) {
	 vh = (val>>>(i*4+4))&0x0f;
	 vl = (val>>>(i*4))&0x0f;
	 str += vh.toString(16) + vl.toString(16);
	 }
	 return str;
  };*/
	
	var cvt_hex = function(val) {
		var str = '';
		var i;
		var v;
		
		for (i = 7; i >= 0; i--) {
			v = (val >>> (i * 4)) & 0x0f;
			str += v.toString(16);
		}
		return str;
	};
	
	var blockstart;
	var i, j;
	var W = new Array(80);
	var H0 = 0x67452301;
	var H1 = 0xEFCDAB89;
	var H2 = 0x98BADCFE;
	var H3 = 0x10325476;
	var H4 = 0xC3D2E1F0;
	var A, B, C, D, E;
	var temp;
	
	// utf8_encode
	str = unescape(encodeURIComponent(str));
	var str_len = str.length;
	
	var word_array = [];
	for (i = 0; i < str_len - 3; i += 4) {
		j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
		word_array.push(j);
	}
	
	switch (str_len % 4) {
  case 0:
			i = 0x080000000;
			break;
  case 1:
			i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
			break;
  case 2:
			i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
			break;
  case 3:
			i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) <<
			8 | 0x80;
			break;
	}
	
	word_array.push(i);
	
	while ((word_array.length % 16) != 14) {
		word_array.push(0);
	}
	
	word_array.push(str_len >>> 29);
	word_array.push((str_len << 3) & 0x0ffffffff);
	
	for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
		for (i = 0; i < 16; i++) {
			W[i] = word_array[blockstart + i];
		}
		for (i = 16; i <= 79; i++) {
			W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
		}
		
		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;
		
		for (i = 0; i <= 19; i++) {
			temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}
		
		for (i = 20; i <= 39; i++) {
			temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}
		
		for (i = 40; i <= 59; i++) {
			temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}
		
		for (i = 60; i <= 79; i++) {
			temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}
		
		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;
	}
	
	temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
	return temp.toLowerCase();
}



function scatta(){
	
	//alert()
	
	navigator.camera.getPicture(Successo, onFail, { quality: 30,
								destinationType: Camera.DestinationType.DATA_URL,
								encodingType: Camera.EncodingType.PNG,
								targetWidth: 200,
								targetHeight: 200
	});
}

function getFoto() {
	
	navigator.camera.getPicture(uploadPhoto, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
								targetWidth: 200,
								targetHeight: 200
	});
}

function onFail(message) {
	navigator.notification.alert(
								 'Nessuna foto archiviata',  // message
								 alertDismissed,         // callback
								 'Foto',            // title
								 'OK'                  // buttonName
								 );
}

function onPhotoURISuccess(imageURI) {
	// Uncomment to view the image file URI
	// console.log(imageURI);
	// Get image handle
	//
	var largeImage = document.getElementById('foto');
	// Unhide image elements
	//
	largeImage.style.display = 'block';
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	//
	largeImage.src = imageURI;
}

function uploadPhoto(imageURI) {
	var largeImage = document.getElementById('foto');
	// Unhide image elements
	//
	largeImage.style.display = 'block';
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	//
	largeImage.src = imageURI;
	
	
	var options = new FileUploadOptions();
	options.fileKey="file";
	
	options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	options.mimeType="image/jpeg";
	
	var params = {};
	params.value1 = "test.jpg";
	params.value2 = "param";
	
	options.params = params;
	
	var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://msop.it/uploadIPHONE.php"), win, fail, options);
}



function Successo(imageData) {
	
	localStorage.setItem("Foto1", "data:image/png;base64," + imageData);
	
	var image000 = document.getElementById('foto');
	image000.src = localStorage.getItem("Foto1");
	
    salvafoto(1)
	
}


function salvafoto(n) {
	
	if (localStorage.getItem("Foto"+ n +"") === null || localStorage.getItem("Foto"+ n +"")=="null" || typeof(localStorage.getItem("Foto"+ n +"")) == 'undefined' || localStorage.getItem("Foto"+ n +"")==0 || localStorage.getItem("Foto"+ n +"")=="") {
		
		
	}
	else {
		
		$.ajax({
			   type: "POST",
			   url: "http://www.msop.it/check_foto.asp",
			   data: {NomeFoto:"sasa", Foto:localStorage.getItem("Foto"+ n +"")},
			   cache: false,
			   contentType: "application/x-www-form-urlencoded",
			   success: function (result) {
			   /*navigator.notification.alert(
				'Scheda salvata correttamente',  // message
				alertDismissed,         // callback
				'OK',            // title
				'Done'                  // buttonName
				);*/
			   
			   alert("ok")
			   },
			   error: function(){
			   $("#opzioni").show();
			   
			   navigator.notification.alert(
											'Errore imprevisto nel caricamento dei dati',  // message
											alertDismissed,         // callback
											'Connessione Internet',            // title
											'OK'                  // buttonName
											);
			   
			   $(".spinner").hide();
			   
			   }
			   
			   });
		
	}
}



function win(r) {
	console.log("Code = " + r.responseCode);
	console.log("Response = " + r.response);
	console.log("Sent = " + r.bytesSent);
	alert(r.response);
}

function fail(error) {
	alert("An error has occurred: Code = " + error.code);
}


function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
						  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
						  results = regex.exec(location.search);
						  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
						  }

