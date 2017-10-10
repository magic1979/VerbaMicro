/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		
		//StatusBar.hide();
		
        var watchID = navigator.geolocation.getCurrentPosition(gpsonSuccess, gpsonError, {timeout: 30000, enableHighAccuracy: true, maximumAge: 90000 });
		
		var crop_max_width = 400;
		var crop_max_height = 400;
		var jcrop_api;
		var canvas;
		var context;
		var image;
		var db;
        var dbCreated = false;
        var Badge10 = localStorage.getItem("Badge10");
        $("#badde5").attr("data-badge", Badge10);
        
        if (Badge10 > 0){
            $('#badde5').removeClass('badge2').addClass('badge1');
            $("#badde5").html('<img id="carro3" src="img/CartW.png" width="20px">');
        }
        else{
            var Badge10 = 0;
            localStorage.setItem("Badge10","0");
        }
		
        var db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Ordine (id unique, IdProdotto, Qta, Descrizione, Nome)');
        });
		
		$("#spinner").hide();
		
		var myScroll2;
		var myScroll;
		   
		   myScroll = new iScroll('wrapper', {
								click: true,
								useTransform: false,
								//bounce: false,
								onBeforeScrollStart: function (e)
								{
								var target = e.target;
								while (target.nodeType != 1) {
								target = target.parentNode;
								}
								
								if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA' && target.tagName != 'OPTION') {
								e.preventDefault();
								}
								}

			});
		   
		   
		   setTimeout (function(){
					   
				myScroll.refresh();
					   
			}, 500);
		
		
			var selectField = document.getElementById('radice');
			selectField.addEventListener('touchstart', function(e)
										 {
										 e.stopPropagation();
										 }, false);
			
			var selectField2 = document.getElementById('radice2');
			selectField2.addEventListener('touchstart', function(e)
										 {
										 e.stopPropagation();
										 }, false);
			
			var selectField3 = document.getElementById('foglia2');
			selectField3.addEventListener('touchstart', function(e)
										  {
										  e.stopPropagation();
										  }, false);
			
			var selectField4 = document.getElementById('foglia');
			selectField4.addEventListener('touchstart', function(e)
										  {
										  e.stopPropagation();
										  }, false);
		
		
		// SWIPE //
			
        window.addEventListener('orientationchange', handleOrientation, false);
			function handleOrientation() {
			if (orientation == 0) {
			   $("#orizzontale").hide();
								  
			   $("#verticale").show();
			}
			else if (orientation == 90) {
			   $("#orizzontale").show();
								  
			   $("#verticale").hide();
			}
			else if (orientation == -90) {
			  $("#orizzontale").show();
								  
			  $("#verticale").hide();
			}
			else if (orientation == 180) {
			  $("#orizzontale").hide();
								  
			  $("#verticale").show();
			}
			else {
			}
		}
        
		
        /*$(document).on("swipeleft", "#pippo", function(e){
                       
            alert("sinistra")
                       
        });*/
		
        
        $(function() {
		  
          $("#pippo").swipe( {
							
                           swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                            
                            $( "#radice" ).blur();
                            $( "#foglia" ).blur();
                            $( "#radice2" ).blur();
                            $( "#foglia2" ).blur();
                            
                           //alert("You swiped " + direction );
                           },
							
                           threshold:0
                           });
          });
		
		
		/*navigator.camera.getPicture(uploadPhoto, onFail, { quality: 50,
									allowEdit: true,
									destinationType: Camera.DestinationType.FILE_URI,
									sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
									targetWidth: 400,
									targetHeight: 400
									});*/
		
	
		/*navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 30,
									//allowEdit: true,
									destinationType: Camera.DestinationType.DATA_URL,
									encodingType: Camera.EncodingType.PNG,
									targetWidth: 400,
									targetHeight: 400
									});*/
		

		$("#spinner").hide();
		
		// START CODE //
		
		
		 function agg2(prod,prezz,nomi){
            
            var aggiornamento = 0;
            var msg;
            var prezzo=prezz;
            var test;
            var P1 = '110';
            var nome = nomi;
            
            
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM Ordine where id='+ prod +'', [], function (tx, results) {
                    var len = results.rows.length, i;
                              
                    alert(results.rows.length)
                              
                    for (i = 0; i < len; i++){
                        alert("id:" + results.rows.item(i).id)
                        alert("Qta:" +results.rows.item(i).Qta)
                        alert("Descrizione:" +results.rows.item(i).Descrizione)
                              
                    }
                              
                    if(results.rows.length==0){
                      tx.executeSql('INSERT INTO Ordine (id, IdProdotto, Qta, Descrizione, Nome) VALUES ('+ prod +', 1, 1, "'+ prezzo +'", "'+ nome +'")');
                              
                              localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))+1)
                              var Badge10 = localStorage.getItem("Badge10");
                              
                              
                              $('#badde5').removeClass('badge2').addClass('badge1');
                              $("#badde5").attr("data-badge", Badge10);
                              $("#badde5").html('<img id="carro3" src="img/CartW.png" width="20px">');
                              
                              alert("Insert")
                              seleziona()
                    }
                    else{
                       /* tx.executeSql('UPDATE Ordine set Qta=Qta+1, Descrizione=Descrizione + '+ prezzo +' where id='+ prod +'', [], function (tx, results) {
                                      
                            localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))+1)
                            var Badge10 = localStorage.getItem("Badge10");
                                      
                                      
                            $('#badde5').removeClass('badge2').addClass('badge1');
                            $("#badde5").attr("data-badge", Badge10);
                            $("#badde5").html('<img id="carro3" src="img/CartW.png" width="20px">');
                                      
                            alert("Update")
                            seleziona()

                        }, null);*/
                    }
                              
                })
                           
            })

            
        }
		
		
		function seleziona(){
            var msg=""
            
           //var db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
            
            db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM Ordine', [], function (tx, results) {
                    var len = results.rows.length, i;
                                         
                    var pippo = 0
                                         
                    for (i = 0; i < len; i++){
                          
                         //$('#TOTPrezzo').html(results.rows.item(i).quanti);
                          
                          if(pippo==0){
                            msg = msg + "" + results.rows.item(i).id + " - " + results.rows.item(i).IdProdotto + " - " + results.rows.item(i).Qta + " - " + results.rows.item(i).Descrizione + " - " + results.rows.item(i).Nome + "<br>";
                          }
                          else{
                            msg = msg + "," + results.rows.item(i).id + " - " + results.rows.item(i).IdProdotto + " - " + results.rows.item(i).Qta + " - " + results.rows.item(i).Descrizione + " - " + results.rows.item(i).Nome + "<br>";
                          }
                          
                          pippo = pippo+1
                          
                    }
                          

                    $('#TOTPrezzo').html(msg);
                                         
                                         
                    }, null);
            });
            
        }
		

  
		function seleziona2(){
            
            //var Badge10 = localStorage.getItem("Badge10");
            //$("#badde3").attr("data-badge", Badge10);
            
            $("#contenutoCart").html('');
            
            var tuttigliid = "";
            var conta = 0;
            
            
            db.transaction(function (tx) {
                           tx.executeSql('SELECT * FROM Ordine', [], function (tx, results) {
                                         var len = results.rows.length, i;
                                         var Punita;
                                         //alert(len);
                                         
                                         for (i = 0; i < len; i++){
                                         
                                         msg = results.rows.item(i).IdProdotto + "," + results.rows.item(i).Qta + "," + results.rows.item(i).Descrizione + "," + results.rows.item(i).Nome;
                                         
                                         Punita = (Number(results.rows.item(i).Descrizione).toFixed(2) / Number(results.rows.item(i).Qta).toFixed(2))
                                        
                                         var paperino2 = "cod_"+results.rows.item(i).id
                                         
                                         if(conta==0){
                                           tuttigliid = results.rows.item(i).id;
                                         
                                           $("#contenutoCart").append('<table class="tablesorter"><tr><td width="160"><font color="#000" size="2">ORDINE</font></td><td width="50"><font color="#000" size="2">QTA</font></td><td width="70"><font color="#000" size="2">COSTO</font></td><td width="40"><font color="#000" size="2"></font></td></tr><tr><td width="150"><font size="3">'+ results.rows.item(i).Nome +'</font></td><td width="50"><font size="3">'+ results.rows.item(i).Qta +'<font color="#000" size="1"> x('+ Number(Punita).toFixed(2) +'&euro;)</font></td><td width="70"><font size="3">'+ Number(results.rows.item(i).Descrizione).toFixed(2) +'&euro;</font></td><td align="center" width="40"><a id="'+ paperino2 +'"><img src="img/minus.png" width="25"></a></td></tr></table>');
                                         }
                                         else{
                                           tuttigliid = tuttigliid + "," + results.rows.item(i).id;
                                         
                                           $("#contenutoCart").append('<table class="tablesorter"><tr><td width="160"><font size="3">'+ results.rows.item(i).Nome +'</font></td><td width="50"><font size="3">'+ results.rows.item(i).Qta +'<font color="#000" size="1"> x('+ Number(Punita).toFixed(2) +'&euro;)</font></td><td width="70"><font size="3">'+ Number(results.rows.item(i).Descrizione).toFixed(2) +'&euro;</font></td width="40"><td align="center"><a id="'+ paperino2 +'"><img src="img/minus.png" width="25"></a></td></tr></table>');
                                         }
                                         
                                        
                                         
                                         
                                         $(document).on("touchstart", "#"+paperino2+"", function(e){
                                                        
                                            //alert(this.id)
                                                        
                                            var codice = this.id
                                                        
                                            codice = codice.replace("cod_","")
                                                        
                                            sottprod(codice)
                                                        
                                         });
                                         
                                         //alert(paperino2)
                                         
                                         
                                         conta = conta+1;

                                         }
                                         
                                         //$("#contenutoCart").append('</table>');
                                         //$('#contenutoCart').html(landmark);
                                         
                                         document.getElementById("idordine").value = tuttigliid;
                                         
                                        // $("#contenutoCart").append("jhdjahasj js djkas dsahkjsa kjash jkashdkjashdjkas <br><br>jhdjahasj js djkas dsahkjsa kjash jkashdkjashdjkas <br><br>jhdjahasj js djkas dsahkjsa kjash jkashdkjashdjkas <br><br>jhdjahasj js djkas dsahkjsa kjash jkashdkjashdjkas <br><br>jhdjahasj js djkas dsahkjsa kjash jkashdkjashdjkas <br><br>jhdjahasj js djkas dsahkjsa kjash jkashdkjashdjkas <br><br>jhdjahasj js djkas dsahkjsa kjash jkashdkjashdjkas <br><br>")
                                         
                                         selPrezzo();
                                         
                                         
                                         }, null);
                           });
        }
        
        function selPrezzo(){
            db.transaction(function (tx) {
                           tx.executeSql('SELECT SUM(Descrizione) as TOT FROM Ordine', [], function (tx, results) {
                                         var len = results.rows.length, i;
                                         
                                         for (i = 0; i < len; i++){
                                         
                                          $("#TOTCART").html(Number(results.rows.item(i).TOT).toFixed(2));
                                          document.getElementById("totordine").value = Number(results.rows.item(i).TOT).toFixed(2);
                                         
                                         }
                                         
                                         
                                         }, null);
                           });
            
            var myScroll2;
            
            myScroll2 = new IScroll('#wrapper2', { click: true });
            
            setTimeout (function(){
                myScroll2.refresh();
            }, 500);
            
        }
        
        function sottprod(prod){
            
            db.transaction(function (tx) {
                tx.executeSql('DELETE FROM Ordine where id='+prod+'', [], function (tx, results) {
                }, null);
                           
                           
                localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
                           
                seleziona2()
                           
            });
            
            
            alert(prod)
 
        }
        


        $(document).on("touchstart", "#meno", function(e){
                       
            //var  db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
                       
            var prezzo = "1.00"
            var prod= 1;
                       
                       db.transaction(function (tx) {
                                      tx.executeSql('SELECT * FROM Ordine where id='+ prod +'', [], function (tx, results) {
                                                    var len = results.rows.length, i;
                                                    
                                                    for (i = 0; i < len; i++){
                                                    
                                                      if (parseInt(results.rows.item(i).Qta) > 1){
                                                    
                                                         db.transaction(function (tx) {
                                                           tx.executeSql('UPDATE Ordine set Qta=Qta-1, Descrizione=Descrizione - '+ prezzo +' where id='+ prod +'', [], function (tx, results) {
                                                                         
                                                                         
                                                            localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
                                                                         
                                                            Badge10 = localStorage.getItem("Badge10");
                                                                         
                                                            $("#badde5").attr("data-badge", Badge10);
                                                                         
                                                            seleziona()
                                                                                 
                                                           }, null);
                                                                        
                                                            
                                                         });
                                                    
                                                     }
                                                     else{
                                                       tx.executeSql('DELETE FROM Ordine where id='+ prod +'', [], function (tx, results) {
                                                                  
                                                        localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
                                                        Badge10 = localStorage.getItem("Badge10");
                                                                  
                                                        $("#badde5").attr("data-badge", Badge10);
                                                        $("#badde5").html('<img id="carro3" src="img/CartW.png" width="20px">');
                                                                  
                                                        //$( "#carro5" ).effect( "bounce", "slow" );
                                                                  
                                                       }, null);
                                                    
                                                    }
                                                    
                                                    
                                                    }
                                        }, null);
                        });
                       
            /*if(parseInt(localStorage.getItem("Badge10"))>0){
                       
              localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
                       
              Badge10 = localStorage.getItem("Badge10");
                       
              $("#badde5").attr("data-badge", Badge10);
                       
   
              seleziona;
                       
            }*/
                       
        });
        
        
        $(document).on("touchstart", "#cancella", function(e){
                       
                      //var  db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
                       
                      	db.transaction(function (tx) {
                            tx.executeSql('DELETE FROM Ordine', [], function (tx, results) {
                                                     }, null);
                        });
                       
                       
                       localStorage.setItem("Badge10", 0)
                       
                       Badge10 = localStorage.getItem("Badge10");
                       
                       $("#badde5").attr("data-badge", Badge10);
                       
                       $("#spinner2").hide();
                       
                       window.location.href = "#page2";
                       
                       seleziona2()
                       
                       
                       setTimeout (function(){
                            myScroll2.refresh();
                        }, 500);
                       
        });
		
        
		$(document).on("touchstart", "#fotomia", function(e){
					   
			navigator.camera.getPicture(uploadPhoto, onFail, { quality: 50,
												   //allowEdit: true,
												   destinationType: Camera.DestinationType.FILE_URI,
												   sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
												   targetWidth: 400,
												   targetHeight: 400
			});
	   
					   
		});
		
		
		$(document).on("touchstart", "#scatta", function(e){
					   
			navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 30,
												   //allowEdit: true,
												   destinationType: Camera.DestinationType.DATA_URL,
												   encodingType: Camera.EncodingType.PNG,
												   targetWidth: 400,
												   targetHeight: 400
			});
   
		});
		

        $(document).on("touchstart", "#play", function(e){
                       
            playAudio2('successSound');
                       
        });
		
		$(document).on("touchstart", "#playvideo", function(e){
					   
			//playAudio2('successSound');
					   
        });
		
		
		$(document).on("touchstart", "#messaggino", function(e){
					   
			window.plugins.socialsharing.shareViaWhatsApp('Message via WhatsApp', null /* img */, null /* url */, function() {alert('share ok')}, function(errormsg){alert(errormsg)})
					   
		});
		
		
		$(document).on("touchstart", "#messaggino2", function(e){
					   
			//window.plugins.socialsharing.shareViaWhatsApp('Message via WhatsApp', null /* img */, null /* url */, function() {alert('share ok')}, function(errormsg){alert(errormsg)})
			window.plugins.socialsharing.shareViaWhatsAppToReceiver('+393663934483', 'Message via WhatsApp', null /* img */, null /* url */, function() {console.log('share ok')})
					   
		});
		
		$(document).on("touchstart", "#messaggino3", function(e){
					   
			//window.plugins.socialsharing.shareViaWhatsApp('Message via WhatsApp', null /* img */, null /* url */, function() {alert('share ok')}, function(errormsg){alert(errormsg)})
			window.plugins.socialsharing.shareViaWhatsAppToReceiver('+393476121058', 'Message via WhatsApp', null /* img */, null /* url */, function() {console.log('share ok')})
					   
		});
		
		
		
		$(document).on("touchstart", "#compra", function(e){
					   	   
				compraCarta("121","1","00,20")
					   
		});
		
		
		$(document).on("tap", "#altro", function(e){
                       
            $("#btnpanel").click();
                       
        });
		
		$(document).on("touchstart", "#indietro", function(e){
                       
            window.location.href = "#page";
                       
                       var Badge10 = localStorage.getItem("Badge10");
                       $("#badde5").attr("data-badge", Badge10);
                       
                       if (Badge10 > 0){
                       $('#badde5').removeClass('badge2').addClass('badge1');
                       $("#badde5").html('<img id="carro3" src="img/CartW.png" width="20px">');
                       }
                       else{
                       var Badge10 = 0;
                       localStorage.setItem("Badge10","0");
                       }
                       
            setTimeout (function(){
                seleziona()
                myScroll.refresh();
            }, 1000);
                       
                       
        });
		
		
		$(document).on("touchstart", "#badde5", function(e){
                       
            $("#spinner2").hide();
                       
            window.location.href = "#page2";
                
                var myScroll2;
                       
                myScroll2 = new IScroll('#wrapper2', { click: true });
                
                setTimeout (function(){
                    myScroll2.refresh();
                }, 500);
                       
                       
            seleziona2()
                       
                    
        });
		
		
				$(document).on("touchstart", "#richiedi", function(e){
					   
					   var posta = $.base64.encode("salvatore.bruni@gmail.com")
					   var lati = $.base64.encode(localStorage.getItem("lat"));
					   var longi = $.base64.encode(localStorage.getItem("lng"));
					   
					   var radice3;
					   var foglia3;
					   
					   
					   if(self.document.form.radice2.value != ""){
					   radice3 = self.document.form.radice2.value
					   }
					   else{
					   radice3 = self.document.form.radice.value
					   }
					   
					   
					   if(self.document.form.foglia2.value != ""){
					   foglia3 = self.document.form.foglia2.value
					   }
					   else{
					   foglia3 = self.document.form.foglia.value
					   }
					   
					   
					   if (radice3 == "") {
					   navigator.notification.alert(
													'inserire una Radice',  // message
													alertDismissed,         // callback
													'Radice',            // title
													'OK'                  // buttonName
													);
					   return;
					   }
					   
					   if (foglia3 == "") {
					   navigator.notification.alert(
													'inserire una Foglia',  // message
													alertDismissed,         // callback
													'Foglia',            // title
													'OK'                  // buttonName
													);
					   return;
					   }
					   
					   
					   var radice4 = radice3.toLowerCase();
					   var foglia4 = foglia3.toLowerCase();
					   
					   var radice = $.base64.encode(radice4);
					   var foglia = $.base64.encode(foglia4);
					   
					   
					   
					   $("#spinner").show();
					   
					   $.ajax({
							  type: "POST",
							  url: "http://www.microverba.com/leaf_root_request.php",
					    data: {email:posta,leaf:foglia,root:radice,latitudine:lati,longitudine:longi},
							  cache: false,
							  crossDomain: true,
							  contentType: "application/x-www-form-urlencoded",
							  success: function (result) {
                              
                              $("#testvideo").html("");
							  
							  if(result.Token==1){
							  
							  
							  // YOU TUBE
							  if(result.YT === null || typeof(result.YT) == 'undefined' || result.YT=="null" || result.YT==""){
							  
							  }
							  else{
							  
							  for (var i=0, l=10; i<l; i++) {
							  
							  if(i==1){
							  i="01"
							  }
							  if(i==2){
									i="02"
									}
							  if(i==3){
									i="03"
							  }
							  if(i==4){
									i="04"
							  }
							  if(i==5){
									i="05"
							  }
							  if(i==6){
									i="06"
							  }
							  if(i==7){
									i="07"
							  }
							  if(i==8){
									i="08"
							  }
							  if(i==9){
									i="09"
							  }
							  
							  
							  ciccio = "YT_cont_"+i
                              
                              
							  /*urlvideo = "VA_cont_"+i
								  
								  urlaudio = "FA_cont_"+i
								  
								  paginaweb = "PW_cont_"+i
								  
								  paginafb = "FB_cont_"+i
								  
								  urltwitter = "TW_cont_"+i
								  
								  urlinstagram = "IG_cont_"+i*/
							  
							  if(result[ciccio] === null || typeof(result[ciccio]) == 'undefined' || result[ciccio]=="null" || result[ciccio]==""){
							  
							  }
							  else{
							  
							  var tabella = "<table width='90%' align='center'>";
							  
							  paperino = "YT_cont_"+i
							  descyt = "YT_desc_"+i
                              
                              prezzoYT = "YT_pric_"+i
                              nomeYT = "YT_nome_"+i
                              identYT = "YT_iden_"+i
                              
                              if(result[prezzoYT] =="0.00"){
                                lock="unlock.png";
                            
                              }
                              else{
                                lock="cart.png";
                              
                              }
							  
                              tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_youtube.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[descyt])+"</td><td align='right' width='40'><a id='piu"+ identYT +"piu"+ prezzoYT +"piu"+ nomeYT +"'><img src='img/"+lock+"' width='40'></a></td></tr>"

							  tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
                              
							  
							  $("#testvideo").append(tabella);
							  
							  
							     $(document).on("touchstart", "#"+paperino+"", function(e){
											 
                                    passo(this.id) // passare la variabile in una nuova funzione
											 
                                });
                              
                                $(document).on("touchstart", "#piu"+ identYT +"piu"+ prezzoYT +"piu"+ nomeYT +"", function(e){
                                               
                                    alert(this.id)
                                               
                                    //SPLIT
                                    var str=this.id;
                                               
                                    var a1 = new Array();
                                               
                                    a1=str.split("piu");
                                               
                                    agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]))
                                               
                                               
                                    /*for (i=0;i<a1.length;i++)
                                    {
                                     alert(a1[1]);3
                                    }*/

  
                                });
							  
							  
							  }
							  
							  
							  }
							  
                              function passoV(eccolaV){
                              
                                alert(result[eccolaV])
                              
                              }
							  
							  
							  function passo(eccola){
							  
							  var pageNumber = 1;
							  eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
							  //alert(link1);
							  
							  var ref = window.open(link1, '_blank', 'location=no');
							  
							  }
							  
							  
							  }
							  
							  
							  // URL VIDEO
							  if(result.VA === null || typeof(result.VA) == 'undefined' || result.VA=="null" || result.VA==""){
							  
							  }
							  else{
							  
							  for (var i=0, l=10; i<l; i++) {
							  
							  if(i==1){
							  i="01"
							  }
							  if(i==2){
							  i="02"
							  }
							  if(i==3){
							  i="03"
							  }
							  if(i==4){
							  i="04"
							  }
							  if(i==5){
							  i="05"
							  }
							  if(i==6){
							  i="06"
							  }
							  if(i==7){
							  i="07"
							  }
							  if(i==8){
							  i="08"
							  }
							  if(i==9){
							  i="09"
							  }
							  
							  
							  urlvideo = "VA_cont_"+i
							  
							  /*
							   
							   urlaudio = "FA_cont_"+i
							   
							   paginaweb = "PW_cont_"+i
							   
							   paginafb = "FB_cont_"+i
							   
							   urltwitter = "TW_cont_"+i
							   
							   urlinstagram = "IG_cont_"+i*/
							  
							  if(result[urlvideo] === null || typeof(result[urlvideo]) == 'undefined' || result[urlvideo]=="null" || result[urlvideo]==""){
							  
							  }
							  else{
							  
							  var tabella = "<table width='90%' align='center'>";
							  
							  paperino = "VA_cont_"+i
							  descva = "VA_desc_"+i
                              
                              prezzoVA = "VA_pric_"+i
                              nomeVA = "VA_nome_"+i
                              identVA = "VA_iden_"+i
                              
                              if(result[prezzoVA] =="0.00"){
                               lock="unlock.png";
                              
                              }
                              else{
                               lock="cart.png";
                              
                              }

                              
                              tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_youtube.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[descva])+"</td><td align='right' width='40'><a id='piu"+ identVA +"piu"+ prezzoVA +"piu"+ nomeVA +"'><img src='img/"+lock+"' width='40'></a></td></tr>"
							  
							  tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
							  
							  $("#testvideo").append(tabella);
							  
							  
							  $(document).on("touchstart", "#"+paperino+"", function(e){
											 
											 passo2(this.id) // passare la variabile in una nuova funzione
											 
											 });
                              
                              $(document).on("touchstart", "#piu"+ identVA +"piu"+ prezzoVA +"piu"+ nomeVA +"", function(e){
                                             
                                             alert(this.id)
                                             
                                             //SPLIT
                                             var str=this.id;
                                             
                                             var a1 = new Array();
                                             
                                             a1=str.split("piu");
                                             
                                             agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]))
                                             
                                             
                                             /*for (i=0;i<a1.length;i++)
                                              {
                                              alert(a1[1]);3
                                              }*/
                                             
                                             
                                             });
                              
							  
							  
							  }
							  
							  
							  }
							  
							  
							  
							  function passo2(eccola){
							  
							  var pageNumber = 1;
							  eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
							  alert(link1);
							  
							  var ref = window.open(link1, '_blank', 'location=no');
							  
							  }
							  
							  
							  }
							  
							  
							  // URL AUDIO
							  if(result.FA === null || typeof(result.FA) == 'undefined' || result.FA=="null" || result.FA==""){
							  
							  }
							  else{
							  
							  for (var i=0, l=10; i<l; i++) {
							  
							  if(i==1){
							  i="01"
							  }
							  if(i==2){
							  i="02"
							  }
							  if(i==3){
							  i="03"
							  }
							  if(i==4){
							  i="04"
							  }
							  if(i==5){
							  i="05"
							  }
							  if(i==6){
							  i="06"
							  }
							  if(i==7){
							  i="07"
							  }
							  if(i==8){
							  i="08"
							  }
							  if(i==9){
							  i="09"
							  }
							  
							  
							  urlaudio = "FA_cont_"+i
							  
							  /*
							   paginaweb = "PW_cont_"+i
							   
							   paginafb = "FB_cont_"+i
							   
							   urltwitter = "TW_cont_"+i
							   
							   urlinstagram = "IG_cont_"+i*/
							  
							  if(result[urlaudio] === null || typeof(result[urlaudio]) == 'undefined' || result[urlaudio]=="null" || result[urlaudio]==""){
							  
							  }
							  else{
							  
							  var tabella = "<table width='90%' align='center'>";
							  
							  paperino = "FA_cont_"+i
							  descfa = "FA_desc_"+i
                              
                              prezzoFA = "FA_pric_"+i
                              nomeFA = "FA_nome_"+i
                              identFA = "FA_iden_"+i
                              
                              if(result[prezzoFA] =="0.00"){
                               lock="unlock.png";
                              
                              }
                              else{
                               lock="cart.png";
                              
                              }
							  
							  
                              tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_youtube.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[descfa])+"</td><td align='right' width='40'><a id='piu"+ identFA +"piu"+ prezzoFA +"piu"+ nomeFA +"'><img src='img/"+lock+"' width='40'></a></td></tr>"
                              
                              tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
                              
                              $("#testvideo").append(tabella);
							  
							  
							  $(document).on("touchstart", "#"+paperino+"", function(e){
											 
                                 passo3(this.id) // passare la variabile in una nuova funzione
											 
                              });
                              
                              $(document).on("touchstart", "#piu"+ identFA +"piu"+ prezzoFA +"piu"+ nomeFA +"", function(e){
                                             
                                             alert(this.id)
                                             
                                             //SPLIT
                                             var str=this.id;
                                             
                                             var a1 = new Array();
                                             
                                             a1=str.split("piu");
                                             
                                             agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]))

                                             
                                             
                               });
							  
							  
							  }
							  
							  
							  }
							  
							  
							  
							  function passo3(eccola){
							  
							  var pageNumber = 1;
							  eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
							  alert(link1);
							  
							  var ref = window.open(link1, '_blank', 'location=no');
							  
							  }
							  
							  
							  }
							  
							  
							  // URL Pagina Web
							  if(result.PW === null || typeof(result.PW) == 'undefined' || result.PW=="null" || result.PW==""){
							  
							  }
							  else{
							  
							  for (var i=0, l=10; i<l; i++) {
							  
							  if(i==1){
							  i="01"
							  }
							  if(i==2){
							  i="02"
							  }
							  if(i==3){
							  i="03"
							  }
							  if(i==4){
							  i="04"
							  }
							  if(i==5){
							  i="05"
							  }
							  if(i==6){
							  i="06"
							  }
							  if(i==7){
							  i="07"
							  }
							  if(i==8){
							  i="08"
							  }
							  if(i==9){
							  i="09"
							  }
							  
							  
							  paginaweb = "PW_cont_"+i
							  
							  /*
							   
							   
							   paginafb = "FB_cont_"+i
							   
							   urltwitter = "TW_cont_"+i
							   
							   urlinstagram = "IG_cont_"+i*/
							  
							  if(result[paginaweb] === null || typeof(result[paginaweb]) == 'undefined' || result[paginaweb]=="null" || result[paginaweb]==""){
							  
							  }
							  else{
							  
							  var tabella = "<table width='90%' align='center'>";
							  
							  paperino = "PW_cont_"+i
							  descpw = "PW_desc_"+i
							  
                              prezzoPW = "PW_pric_"+i
                              nomePW = "PW_nome_"+i
                              identPW = "PW_iden_"+i
                              
                              if(result[prezzoPW] =="0.00"){
                               lock="unlock.png";
                              
                              }
                              else{
                               lock="cart.png";
                              
                              }
                              
                              
                              tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_youtube.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[descpw])+"</td><td align='right' width='40'><a id='piu"+ identPW +"piu"+ prezzoPW +"piu"+ nomePW +"'><img src='img/"+lock+"' width='40'></a></td></tr>"
							  
							  tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
							  
							  $("#testvideo").append(tabella);
							  
							  
							  $(document).on("touchstart", "#"+paperino+"", function(e){
											 
											 passo4(this.id) // passare la variabile in una nuova funzione
											 
											 });
                              
                              $(document).on("touchstart", "#piu"+ identPW +"piu"+ prezzoPW +"piu"+ nomePW +"", function(e){
                                             
                                             alert(this.id)
                                             
                                             //SPLIT
                                             var str=this.id;
                                             
                                             var a1 = new Array();
                                             
                                             a1=str.split("piu");
                                             
                                             agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]))
                                             
                                             
                                             
                                             });
							  
							  }
							  
							  
							  }
							  
							  
							  
							  function passo4(eccola){
							  
							  var pageNumber = 1;
							  eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
							  alert(link1);
							  
							  var ref = window.open(link1, '_blank', 'location=no');
							  
							  }
							  
							  
							  }
							  
							  
							  // URL Pagina facebook
							  if(result.FB === null || typeof(result.FB) == 'undefined' || result.FB=="null" || result.FB==""){
							  
							  }
							  else{
							  
							  for (var i=0, l=10; i<l; i++) {
							  
							  if(i==1){
							  i="01"
							  }
							  if(i==2){
							  i="02"
							  }
							  if(i==3){
							  i="03"
							  }
							  if(i==4){
							  i="04"
							  }
							  if(i==5){
							  i="05"
							  }
							  if(i==6){
							  i="06"
							  }
							  if(i==7){
							  i="07"
							  }
							  if(i==8){
							  i="08"
							  }
							  if(i==9){
							  i="09"
							  }
							  
							  
							  paginafb = "FB_cont_"+i
							  
							  /*
							   
							   urltwitter = "TW_cont_"+i
							   
							   urlinstagram = "IG_cont_"+i*/
							  
							  if(result[paginafb] === null || typeof(result[paginafb]) == 'undefined' || result[paginafb]=="null" || result[paginafb]==""){
							  
							  }
							  else{
							  
							  var tabella = "<table width='90%' align='center'>";
							  
							  paperino = "FB_cont_"+i
							  descfb = "FB_desc_"+i
							  
                              prezzoFB = "FB_pric_"+i
                              nomeFB = "FB_nome_"+i
                              identFB = "FB_iden_"+i
                              
                              if(result[prezzoFB] =="0.00"){
                               lock="unlock.png";
                              
                              }
                              else{
                               lock="cart.png";
                              
                              }
                              
                              
                              tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_youtube.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[descfb])+"</td><td align='right' width='40'><a id='piu"+ identFB +"piu"+ prezzoFB +"piu"+ nomeFB +"'><img src='img/"+lock+"' width='40'></a></td></tr>"
							  
							  tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
							  
							  $("#testvideo").append(tabella);
							  
							  
							  $(document).on("touchstart", "#"+paperino+"", function(e){
											 
											 passo5(this.id) // passare la variabile in una nuova funzione
											 
											 });
                              
                              $(document).on("touchstart", "#piu"+ identFB +"piu"+ prezzoFB +"piu"+ nomeFB +"", function(e){
                                             
                                             alert(this.id)
                                             
                                             //SPLIT
                                             var str=this.id;
                                             
                                             var a1 = new Array();
                                             
                                             a1=str.split("piu");
                                             
                                             agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]))
                                             
                                             
                                             
                                             });
							  
							  
							  }
							  
							  
							  }
							  
							  
							  
							  function passo5(eccola){
							  
							  var pageNumber = 1;
							  eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
							  alert(link1);
							  
							  var ref = window.open(link1, '_blank', 'location=no');
							  
							  }
							  
							  
							  }
							  
							  // Telefono fisso
							  if(result.TF === null || typeof(result.TF) == 'undefined' || result.TF=="null" || result.TF==""){
							  
							  }
							  else{
							  
							  for (var i=0, l=10; i<l; i++) {
							  
							  if(i==1){
							  i="01"
							  }
							  if(i==2){
							  i="02"
							  }
							  if(i==3){
							  i="03"
							  }
							  if(i==4){
							  i="04"
							  }
							  if(i==5){
							  i="05"
							  }
							  if(i==6){
							  i="06"
							  }
							  if(i==7){
							  i="07"
							  }
							  if(i==8){
							  i="08"
							  }
							  if(i==9){
							  i="09"
							  }
							  
							  
							  telefono = "TF_cont_"+i
							  
							  /*
							   
							   urltwitter = "TW_cont_"+i
							   
							   urlinstagram = "IG_cont_"+i*/
							  
							  if(result[telefono] === null || typeof(result[telefono]) == 'undefined' || result[telefono]=="null" || result[telefono]==""){
							  
							  }
							  else{
							  
							  var tabella = "<table width='90%' align='center'>";
							  
							  paperino = "TF_cont_"+i
							  desctf = "TF_desc_"+i
							  
                              prezzoTF = "TF_pric_"+i
                              nomeTF = "TF_nome_"+i
                              identTF = "TF_iden_"+i
                              
                              if(result[prezzoTF] =="0.00"){
                               lock="unlock.png";
                              
                              }
                              else{
                               lock="cart.png";
                              
                              }
                              
                              
                              tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_youtube.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[desctf])+"</td><td align='right' width='40'><a id='piu"+ identTF +"piu"+ prezzoTF +"piu"+ nomeTF +"'><img src='img/"+lock+"' width='40'></a></td></tr>"
							  
							  tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
							  
							  $("#testvideo").append(tabella);
							  
							  
							  $(document).on("touchstart", "#"+paperino+"", function(e){
											 
									passo6(this.id) // passare la variabile in una nuova funzione
											 
							  });
                              
                              
                              $(document).on("touchstart", "#piu"+ identTF +"piu"+ prezzoTF +"piu"+ nomeTF +"", function(e){
                                             
                                             alert(this.id)
                                             
                                             //SPLIT
                                             var str=this.id;
                                             
                                             var a1 = new Array();
                                             
                                             a1=str.split("piu");
                                             
                                             agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]))
                                             
                                });
							  
							  }
							  
							  
							  }
							  
							  
							  
							  function passo6(eccola){
							  
							  var pageNumber = 1;
							  eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
							  alert(link1);
							  
							  window.location.href = "tel:"+link1+"";
							  
							  }
							  
							  
							  }
							  
							  // Twitter
							  if(result.TW === null || typeof(result.TW) == 'undefined' || result.TW=="null" || result.TW==""){
							  
							  }
							  else{
							  
							  for (var i=0, l=10; i<l; i++) {
							  
							  if(i==1){
							  i="01"
							  }
							  if(i==2){
							  i="02"
							  }
							  if(i==3){
							  i="03"
							  }
							  if(i==4){
							  i="04"
							  }
							  if(i==5){
							  i="05"
							  }
							  if(i==6){
							  i="06"
							  }
							  if(i==7){
							  i="07"
							  }
							  if(i==8){
							  i="08"
							  }
							  if(i==9){
							  i="09"
							  }
							  
							  
							  twitter = "TW_cont_"+i
							  
							  
							  if(result[twitter] === null || typeof(result[twitter]) == 'undefined' || result[twitter]=="null" || result[twitter]==""){
							  
							  }
							  else{
							  
							  var tabella = "<table width='90%' align='center'>";
							  
							  paperino = "TW_cont_"+i
							  desctw = "TW_desc_"+i
							  
                              prezzoTW = "TW_pric_"+i
                              nomeTW = "TW_nome_"+i
                              identTW = "TW_iden_"+i
                              
                              if(result[prezzoTF] =="0.00"){
                               lock="unlock.png";
                              
                              }
                              else{
                               lock="cart.png";
                              
                              }
                              
                              
                              tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_youtube.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[desctw])+"</td><td align='right' width='40'><a id='piu"+ identTW +"piu"+ prezzoTW +"piu"+ nomeTW +"'><img src='img/"+lock+"' width='40'></a></td></tr>"
							  
							  tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
							  
							  $("#testvideo").append(tabella);
							  
							  
							  $(document).on("touchstart", "#"+paperino+"", function(e){
											 
											 passo7(this.id) // passare la variabile in una nuova funzione
											 
											 });
                              
                              $(document).on("touchstart", "#piu"+ identTW +"piu"+ prezzoTW +"piu"+ nomeTW +"", function(e){
                                             
                                             alert(this.id)
                                             
                                             //SPLIT
                                             var str=this.id;
                                             
                                             var a1 = new Array();
                                             
                                             a1=str.split("piu");
                                             
                                             agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]))
                                             
                                });
							  
							  
							  }
							  
							  
							  }
							  
							  
							  
							  function passo7(eccola){
							  
							  var pageNumber = 1;
							  eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
							  alert(link1);

							  var ref = window.open(link1, '_blank', 'location=no');
							  
							  }
							  
							  
							  }
							  
							  
							  // Instagram
							  if(result.IG === null || typeof(result.IG) == 'undefined' || result.IG=="null" || result.IG==""){
							  
							  }
							  else{
							  
							  for (var i=0, l=10; i<l; i++) {
							  
							  if(i==1){
							  i="01"
							  }
							  if(i==2){
							  i="02"
							  }
							  if(i==3){
							  i="03"
							  }
							  if(i==4){
							  i="04"
							  }
							  if(i==5){
							  i="05"
							  }
							  if(i==6){
							  i="06"
							  }
							  if(i==7){
							  i="07"
							  }
							  if(i==8){
							  i="08"
							  }
							  if(i==9){
							  i="09"
							  }
							  
							  
							  instagram = "IG_cont_"+i
							  
							  
							  if(result[instagram] === null || typeof(result[instagram]) == 'undefined' || result[instagram]=="null" || result[instagram]==""){
							  
							  }
							  else{
							  
							  var tabella = "<table width='90%' align='center'>";
							  
							  paperino = "IG_cont_"+i
							  descig = "IG_desc_"+i
							  
                              prezzoIG = "IG_pric_"+i
                              nomeIG = "IG_nome_"+i
                              identIG = "IG_iden_"+i
                              
                              if(result[prezzoIG] =="0.00"){
                               lock="unlock.png";
                              
                              }
                              else{
                               lock="cart.png";
                              
                              }
                              
                              
                              tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_youtube.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[descig])+"</td><td align='right' width='40'><a id='piu"+ identIG +"piu"+ prezzoIG +"piu"+ nomeIG +"'><img src='img/"+lock+"' width='40'></a></td></tr>"
							  
							  tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
							  
							  $("#testvideo").append(tabella);
							  
							  
							  $(document).on("touchstart", "#"+paperino+"", function(e){
											 
											 passo8(this.id) // passare la variabile in una nuova funzione
											 
											 });
                              
                              $(document).on("touchstart", "#piu"+ identIG +"piu"+ prezzoIG +"piu"+ nomeIG +"", function(e){
                                             
                                             alert(this.id)
                                             
                                             //SPLIT
                                             var str=this.id;
                                             
                                             var a1 = new Array();
                                             
                                             a1=str.split("piu");
                                             
                                             agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]))
                                             
                                             });
							  
							  
							  }
							  
							  
							  }
							  
							  
							  
							  function passo8(eccola){
							  
							  var pageNumber = 1;
							  eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
							  alert(link1);
							  
							  var ref = window.open(link1, '_blank', 'location=no');
							  
							  }
							  
							  
							  }
							  
							  // Altro Social
							  if(result.US === null || typeof(result.US) == 'undefined' || result.US=="null" || result.US==""){
							  
							  }
							  else{
							  
							  for (var i=0, l=10; i<l; i++) {
							  
							  if(i==1){
							  i="01"
							  }
							  if(i==2){
							  i="02"
							  }
							  if(i==3){
							  i="03"
							  }
							  if(i==4){
							  i="04"
							  }
							  if(i==5){
							  i="05"
							  }
							  if(i==6){
							  i="06"
							  }
							  if(i==7){
							  i="07"
							  }
							  if(i==8){
							  i="08"
							  }
							  if(i==9){
							  i="09"
							  }
							  
							  
							  instagram = "US_cont_"+i
							  
							  
							  if(result[instagram] === null || typeof(result[instagram]) == 'undefined' || result[instagram]=="null" || result[instagram]==""){
							  
							  }
							  else{
							  
							  var tabella = "<table width='90%' align='center'>";
							  
							  paperino = "US_cont_"+i
							  descus = "US_desc_"+i
							  
                              prezzoUS = "US_pric_"+i
                              nomeUS = "US_nome_"+i
                              identUS = "US_iden_"+i
                              
                              if(result[prezzoUS] =="0.00"){
                               lock="unlock.png";
                              
                              }
                              else{
                               lock="cart.png";
                              
                              }
                              
                              
                              tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_youtube.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[descus])+"</td><td align='right' width='40'><a id='piu"+ identUS +"piu"+ prezzoUS +"piu"+ nomeUS +"'><img src='img/"+lock+"' width='40'></a></td></tr>"
							  
							  tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
							  
							  $("#testvideo").append(tabella);
							  
							  
							  $(document).on("touchstart", "#"+paperino+"", function(e){
											 
											 passo9(this.id) // passare la variabile in una nuova funzione
											 
											 });
                              
                              
                              $(document).on("touchstart", "#piu"+ identUS +"piu"+ prezzoUS +"piu"+ nomeUS +"", function(e){
                                             
                                             alert(this.id)
                                             
                                             //SPLIT
                                             var str=this.id;
                                             
                                             var a1 = new Array();
                                             
                                             a1=str.split("piu");
                                             
                                             agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]))
                                             
                                             });
							  
							  
							  }
							  
							  
							  }
							  
							  
							  
							  function passo9(eccola){
							  
							  var pageNumber = 1;
							  eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
							  alert(link1);
							  
							  var ref = window.open(link1, '_blank', 'location=no');
							  
							  }
							  
							  
							  }
							  
							  // Steaming Video
							  if(result.SV === null || typeof(result.SV) == 'undefined' || result.SV=="null" || result.SV==""){
							  
							  }
							  else{
							  
							  for (var i=0, l=10; i<l; i++) {
							  
							  if(i==1){
							  i="01"
							  }
							  if(i==2){
							  i="02"
							  }
							  if(i==3){
							  i="03"
							  }
							  if(i==4){
							  i="04"
							  }
							  if(i==5){
							  i="05"
							  }
							  if(i==6){
							  i="06"
							  }
							  if(i==7){
							  i="07"
							  }
							  if(i==8){
							  i="08"
							  }
							  if(i==9){
							  i="09"
							  }
							  
							  
							  stramingv = "SV_cont_"+i
							  
							  
							  if(result[stramingv] === null || typeof(result[stramingv]) == 'undefined' || result[stramingv]=="null" || result[stramingv]==""){
							  
							  }
							  else{
							  
							  var tabella = "<table width='90%' align='center'>";
							  
							  paperino = "SV_cont_"+i
							  descsv = "SV_desc_"+i
							  
                              prezzoSV = "SV_pric_"+i
                              nomeSV = "SV_nome_"+i
                              identSV = "SV_iden_"+i
                              
                              if(result[prezzoSV] =="0.00"){
                               lock="unlock.png";
                              
                              }
                              else{
                               lock="cart.png";
                              
                              }
                              
                              
                              tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_youtube.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[descsv])+"</td><td align='right' width='40'><a id='piu"+ identSV +"piu"+ prezzoSV +"piu"+ nomeSV +"'><img src='img/"+lock+"' width='40'></a></td></tr>"
							  
							  tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
							  
							  $("#testvideo").append(tabella);
							  
							  
							  $(document).on("touchstart", "#"+paperino+"", function(e){
											 
											 passo10(this.id) // passare la variabile in una nuova funzione
											 
											 });
                              
                              $(document).on("touchstart", "#piu"+ identSV +"piu"+ prezzoSV +"piu"+ nomeSV +"", function(e){
                                             
                                             alert(this.id)
                                             
                                             //SPLIT
                                             var str=this.id;
                                             
                                             var a1 = new Array();
                                             
                                             a1=str.split("piu");
                                             
                                             agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]))
                                             
                                });
							  
							  
							  }
							  
							  
							  }
							  
							  
							  
							  function passo10(eccola){
							  
							  var pageNumber = 1;
							  eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
							  alert(link1);
							  
							  var ref = window.open(link1, '_blank', 'location=no');
							  
							  }
							  
							  
							  }
							  
							  
							  // Steaming Audio
							  if(result.SA === null || typeof(result.SA) == 'undefined' || result.SA=="null" || result.SA==""){
							  
							  }
							  else{
							  
							  for (var i=0, l=10; i<l; i++) {
							  
							  if(i==1){
							  i="01"
							  }
							  if(i==2){
							  i="02"
							  }
							  if(i==3){
							  i="03"
							  }
							  if(i==4){
							  i="04"
							  }
							  if(i==5){
							  i="05"
							  }
							  if(i==6){
							  i="06"
							  }
							  if(i==7){
							  i="07"
							  }
							  if(i==8){
							  i="08"
							  }
							  if(i==9){
							  i="09"
							  }
							  
							  
							  straminga = "SA_cont_"+i
							  
							  
							  if(result[straminga] === null || typeof(result[straminga]) == 'undefined' || result[straminga]=="null" || result[straminga]==""){
							  
							  }
							  else{
							  
							  var tabella = "<table width='90%' align='center'>";
							  
							  paperino = "SA_cont_"+i
							  descsa = "SA_desc_"+i
							  
                              
                              prezzoSA = "SA_pric_"+i
                              nomeSA = "SA_nome_"+i
                              identSA = "SA_iden_"+i
                              
                              if(result[prezzoSA] =="0.00"){
                               lock="unlock.png";
                              
                              }
                              else{
                               lock="cart.png";
                              
                              }
                              
                              
                              tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_youtube.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[descsa])+"</td><td align='right' width='40'><a id='piu"+ identSA +"piu"+ prezzoSA +"piu"+ nomeSA +"'><img src='img/"+lock+"' width='40'></a></td></tr>"
							  
							  tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
							  
							  $("#testvideo").append(tabella);
							  
							  
							  $(document).on("touchstart", "#"+paperino+"", function(e){
											 
											 passo11(this.id) // passare la variabile in una nuova funzione
											 
											 });
                              
                              $(document).on("touchstart", "#piu"+ identSA +"piu"+ prezzoSA +"piu"+ nomeSA +"", function(e){
                                             
                                             alert(this.id)
                                             
                                             //SPLIT
                                             var str=this.id;
                                             
                                             var a1 = new Array();
                                             
                                             a1=str.split("piu");
                                             
                                             agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]))
                                             
                                             });
							  
							  
							  }
							  
							  
							  }
							  
							  
							  
							  function passo11(eccola){
							  
							  var pageNumber = 1;
							  eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
							  alert(link1);
							  
							  var ref = window.open(link1, '_blank', 'location=no');
							  
							  }
							  
							  
							  }
							  
							  // Telefono mobile
							  if(result.TM === null || typeof(result.TM) == 'undefined' || result.TM=="null" || result.TM==""){
							  
							  }
							  else{
							  
							  for (var i=0, l=10; i<l; i++) {
							  
							  if(i==1){
							  i="01"
							  }
							  if(i==2){
							  i="02"
							  }
							  if(i==3){
							  i="03"
							  }
							  if(i==4){
							  i="04"
							  }
							  if(i==5){
							  i="05"
							  }
							  if(i==6){
							  i="06"
							  }
							  if(i==7){
							  i="07"
							  }
							  if(i==8){
							  i="08"
							  }
							  if(i==9){
							  i="09"
							  }
							  
							  
							  telefonomb = "TM_cont_"+i
							  
							  /*
							   
							   urltwitter = "TW_cont_"+i
							   
							   urlinstagram = "IG_cont_"+i*/
							  
							  if(result[telefonomb] === null || typeof(result[telefonomb]) == 'undefined' || result[telefonomb]=="null" || result[telefonomb]==""){
							  
							  }
							  else{
							  
							  var tabella = "<table width='90%' align='center'>";
							  
							  paperino = "TM_cont_"+i
							  desctm = "TM_desc_"+i
							  
                              prezzoTM = "TM_pric_"+i
                              nomeTM = "TM_nome_"+i
                              identTM = "TM_iden_"+i
                              
                              if(result[prezzoTM] =="0.00"){
                                lock="unlock.png";
                              
                              }
                              else{
                                lock="cart.png";
                              
                              }
                              
                              
                              tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_youtube.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[desctm])+"</td><td align='right' width='40'><a id='piu"+ identTM +"piu"+ prezzoTM +"piu"+ nomeTM +"'><img src='img/"+lock+"' width='40'></a></td></tr>"
							  
							  tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
							  
							  $("#testvideo").append(tabella);
							  
							  
							  $(document).on("touchstart", "#"+paperino+"", function(e){
											 
											 passo12(this.id) // passare la variabile in una nuova funzione
											 
											 });
                              
                              $(document).on("touchstart", "#piu"+ identTM +"piu"+ prezzoTM +"piu"+ nomeTM +"", function(e){
                                             
                                             alert(this.id)
                                             
                                             //SPLIT
                                             var str=this.id;
                                             
                                             var a1 = new Array();
                                             
                                             a1=str.split("piu");
                                             
                                             agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]))
                                             
                                             });
							  
							  
							  }
							  
							  
							  }
							  
							  
							  
							  function passo12(eccola){
							  
							  var pageNumber = 1;
							  eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
							  alert(link1);
							  
							  window.location.href = "tel:"+link1+"";
							  
							  }
							  
							  
							  }
							  
							  
							  // Email
							  if(result.EM === null || typeof(result.EM) == 'undefined' || result.EM=="null" || result.EM==""){
							  
							  }
							  else{
							  
							  for (var i=0, l=10; i<l; i++) {
							  
							  if(i==1){
							  i="01"
							  }
							  if(i==2){
							  i="02"
							  }
							  if(i==3){
							  i="03"
							  }
							  if(i==4){
							  i="04"
							  }
							  if(i==5){
							  i="05"
							  }
							  if(i==6){
							  i="06"
							  }
							  if(i==7){
							  i="07"
							  }
							  if(i==8){
							  i="08"
							  }
							  if(i==9){
							  i="09"
							  }
							  
							  
							  email2 = "EM_cont_"+i
							  
							  /*
							   
							   urltwitter = "TW_cont_"+i
							   
							   urlinstagram = "IG_cont_"+i*/
							  
							  if(result[email2] === null || typeof(result[email2]) == 'undefined' || result[email2]=="null" || result[email2]==""){
							  
							  }
							  else{
							  
							  var tabella = "<table width='90%' align='center'>";
							  
							  paperino = "EM_cont_"+i
							  descem = "EM_desc_"+i
							  
                              prezzoEM = "EM_pric_"+i
                              nomeEM = "EM_nome_"+i
                              identEM = "EM_iden_"+i
                              
                              if(result[prezzoEM] =="0.00"){
                               lock="unlock.png";
                              
                              }
                              else{
                               lock="cart.png";
                              
                              }
                              
                              
                              tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_youtube.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[descem])+"</td><td align='right' width='40'><a id='piu"+ identEM +"piu"+ prezzoEM +"piu"+ nomeEM +"'><img src='img/"+lock+"' width='40'></a></td></tr>"
							  
							  tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
							  
							  $("#testvideo").append(tabella);
							  
							  
							    $(document).on("touchstart", "#"+paperino+"", function(e){
											 
									passo13(this.id) // passare la variabile in una nuova funzione
											 
							    });
                              
                              $(document).on("touchstart", "#piu"+ identEM +"piu"+ prezzoEM +"piu"+ nomeEM +"", function(e){
                                             
                                             alert(this.id)
                                             
                                             //SPLIT
                                             var str=this.id;
                                             
                                             var a1 = new Array();
                                             
                                             a1=str.split("piu");
                                             
                                             agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]))
                                             
                                             });
							  
							  
							  }
							  
							  
							  }
							  
							  
							  
							  function passo13(eccola){
							  
							  var pageNumber = 1;
							  eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
							  alert(link1);
							  
							   window.plugin.email.open({
													   to:      link1,
													   subject: "Email",
													   body:    "Ciao,",
													   isHtml:  true
								});
							  
							  }
							  
							  
							  }
							  
							  
							  //window.plugins.socialsharing.shareViaWhatsApp('Message via WhatsApp', null /* img */, null /* url */, function() {alert('share ok')}, function(errormsg){alert(errormsg)})
							  //<button onclick="window.plugins.socialsharing.shareViaWhatsAppToReceiver(receiver, 'Message via WhatsApp', null /* img */, null /* url */, function() {console.log('share ok')})">msg via WhatsApp for Addressbook ID 101</button>
							  
							  
							  // FINE IF TOKEN
							  }
							  else {
							  
							  var tabella = "<table width='' align='center'>";
							  
							  tabella = tabella + "<tr><td align='left' width='80'>X </td><td align='left' width='100%'>"+$.base64.decode(result.messaggio)+"</td></tr><tr><td align='left' width='80'>X </td><td align='left' width='100%'>"+$.base64.decode(result.radice)+"</td></tr><tr><td align='left' width='80'>X </td><td align='left' width='100%'>"+$.base64.decode(result.foglia)+"</td></tr>"
							  
							  tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
							  
							  $("#testvideo").append(tabella);
							  
							  }

							
							  $("#spinner").hide();
							  
							  
							  
							  /*var myScroll3;
							  
							  myScroll3 = new IScroll('#wrapper', {
													  click: true,
													  useTransform: false,
													  //bounce: false,
													  onBeforeScrollStart: function (e)
													  {
													  var target = e.target;
													  while (target.nodeType != 1) {
													  target = target.parentNode;
													  }
													  
													  if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA' && target.tagName != 'OPTION') {
													  e.preventDefault();
													  }
													  }
													  });*/
							  
							   setTimeout (function(){
									myScroll.refresh();
								}, 500);
							  
							  
							  //document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 300); }, false);
							  
							  //document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
							  
							  
							  
							  
							  },
							  
							  error: function(){
							  
							  $(".spinner").hide();
							  
							  navigator.notification.alert(
														   'Errore Imprevisto, contatta il fornitore',  // message
														   alertDismissed,         // callback
														   'Errore',            // title
														   'OK'                  // buttonName
														   );
							  
							  }
							  
				});
					   
        });
	
		
		
		

		function compraCarta(id_richiesta,id_autista,totale) {
			
			//alert("2")
			
			var num1 = Math.floor((Math.random() * 20) + 1);
			var num2 = Math.floor((Math.random() * 20) + 1);
			var num3 = Math.floor((Math.random() * 20) + 1);
			var num4 = Math.floor((Math.random() * 20) + 1);
			var num5 = Math.floor((Math.random() * 20) + 1);
			var num6 = Math.floor((Math.random() * 20) + 1);
			var num7 = Math.floor((Math.random() * 20) + 1);
			var num8 = Math.floor((Math.random() * 20) + 1);
			
			transazioneprodotto = id_richiesta+""+num2+""+num3+""+num4+""+num5+""+num6+""+num7+""+num8;
			
			var item_number= transazioneprodotto;
			
			var nome = "";
			var email = "salvatore.bruni@gmail.com";
			var EmailEsercente = "";
			
			var NomeRegalo = "Trasporto Aermes";
			var ordinazione = "Microverba";
			var Indirizzo = "Address";
			var Telefono = "Tel";
			var amount = totale;
			var amountPunti = 1;
			var OraConsegna = "Ora";
			var Note = id_autista;
			var Richiesta = id_richiesta;
			
			if ((email == "")||(!email)) {
				navigator.notification.alert(
											 'Devi prima effettuare il Login',
											 alertDismissed,
											 'Login',
											 'OK'
											 );
				return;
			}
			
			if (NomeRegalo == "") {
				navigator.notification.alert(
											 'inserire Nome Destinario',
											 alertDismissed,
											 'Nome Destinatario',
											 'OK'
											 );
				return;
			}
			if (Indirizzo == "") {
				navigator.notification.alert(
											 'inserire un indirizzo corretto',
											 alertDismissed,
											 'Indirizzo',
											 'OK'
											 );
				return;
			}
			
			
			if (Telefono == "") {
				navigator.notification.alert(
											 'inserire un telefono valido',
											 alertDismissed,
											 'Telefono',
											 'OK'
											 );
				return;
			}
			
			if (amount == 0) {
				navigator.notification.alert(
											 'Non hai prodotti nel carrello',
											 alertDismissed,
											 'Ordine',
											 'OK'
											 );
				return;
			}
			
			if (OraConsegna == "") {
				navigator.notification.alert(
											 'Non hai inserito un orario di consegna desiderata',
											 alertDismissed,
											 'Ora Consegna',
											 'OK'
											 );
				return;
			}
			
			$(".spinner").show();
			
			
			
			$.ajax({
				   type:"GET",
				   url:"http://msop.it/microverba/Check_TransactionV2.asp",
				   contentType: "application/json",
				   data: {email:email,id_prodotto:transazioneprodotto,qta:1,tot:amount,totPunti:amountPunti,transazionemia:transazioneprodotto,NomeProdotto:"Ordine Aermes",EmailEsercente:"info@pokeranswer.it",idTransazione:"CC",Ordine:ordinazione,Indirizzo:Indirizzo,Telefono:Telefono,OraConsegna:OraConsegna,Note:Note,Richiesta:id_richiesta},
				   timeout: 7000,
				   jsonp: 'callback',
				   crossDomain: true,
				   success:function(result){
				   
				   $.each(result, function(i,item){
						  
						  //alert(item.Token)
						  
						  if (item.Token == "1"){
						  
						  var ref = window.open('http://msop.it/microverba/wbspaypal.asp?Transprodotto='+ transazioneprodotto +'', '_blank', 'location=no');
						  
						  ref.addEventListener('loadstop', function(event) { if (event.url.match("mobile/close")) { ref.close(); } });
						  
						  }
						  else{
						  navigator.notification.alert(
													   'Possibile errore di rete, riprova tra qualche minuto',  // message
													   alertDismissed,         // callback
													   'Attenzione',            // title
													   'Done'                  // buttonName
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
												'Done'                  // buttonName
												);
				   
				   },
				   dataType:"jsonp"});
			
			
			
		}
		
		
		
        function playAudio2(id) {
            
            var audioElement = document.getElementById(id);
            var url =  ""+ localStorage.getItem("path") +"" //"sound/pool.mp3" //localStorage.getItem("path").toString() //audioElement.getAttribute('src');
            
            var my_media2 = new Media(url,
                                      // success callback
                                      function () { console.log("playAudio():Audio Success"); },
                                      // error callback
                                      function (err) { console.log("playAudio():Audio Error: " + err); }
                                      );
            
            my_media2.play();
            
            
            
            setTimeout(function() {
                my_media2.stop();
            }, 10000);
            
        }
		
		
		
		// FOTO //
		
		function uploadPhoto(imageURI) {
			
			
			// Convert image
			getFileContentAsBase64(imageURI,function(base64Image){
								   
								   console.log(base64Image.replace("data:image/jpeg;base64,",""));
								   // Then you'll be able to handle the myimage.png file as base64
								   
								   localStorage.setItem("imgutente2", base64Image);
								   localStorage.setItem("imgutente3", base64Image.replace("data:image/jpeg;base64,",""));
								   
								   $("#cropbutton").show();
								   $("#rotatebutton").show();
								   
								   
		   });

		}
		
		
		function onPhotoDataSuccess(imageData) {
	  
			localStorage.setItem("biliard", "data:image/png;base64," + imageData);
	  
			canvas = null;
			
			image = new Image();
			image.onload = validateImage;
			image.src = localStorage.getItem("biliard");
			
			$("#cropbutton").show();
			$("#rotatebutton").show();
	  
			
         }
		
		
		function getFileContentAsBase64(path,callback){
			window.resolveLocalFileSystemURL(path, gotFile, fail);
	  
			function fail(e) {
			alert('Cannot found requested file');
			}
	  
			function gotFile(fileEntry) {
				fileEntry.file(function(file) {
						 var reader = new FileReader();
						 canvas = null;
						 reader.onloadend = function(e) {
						 var content = this.result;
						 
						 image = new Image();
						 image.onload = validateImage;
						 image.src = this.result;
						 
						 callback(content);
						 };
						 // The most important point, use the readAsDatURL Method from the file plugin
						 reader.readAsDataURL(file);
						 });
			}
	  
	  
		}
		
		
		function onFail(message) {
			
			
			navigator.notification.alert(
										 'Nessuna foto caricata',  // message
										 alertDismissed,         // callback
										 'Foto',            // title
										 'OK'                  // buttonName
										 );
										 
			
			setTimeout (function(){
					   
				$("#spinner").hide();
					   
			}, 1500);
		}
		
		
		
		
		// MEDIA //
		
		$(document).on("touchstart", "#mediacattura", function(e){
			
			
			// capture callback
			var captureSuccess = function(mediaFiles) {
				var i, path, len;
				for (i = 0, len = mediaFiles.length; i < len; i += 1) {
					path = mediaFiles[i].fullPath;
					// do something interesting with the file
					
					
					localStorage.setItem("path", mediaFiles[i].fullPath);
					
					//alert(localStorage.getItem("path"))
					
					uploadFile(mediaFiles[i]);
				}
			};
			
			
			
			// capture error callback
			var captureError = function(error) {
				navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
			};
			
			
			
			function uploadFile(mediaFile) {
				
				$("#spinner").show();
				
				var ft = new FileTransfer(),
				path = mediaFile.fullPath,
				name = mediaFile.name;
				
				ft.upload(path,
						  "http://microverba.com/filesu.php",
						  function(result) {
							  
					        $("#spinner").hide();
							  
						    //console.log('Upload success: ' + result.responseCode);
						    //console.log(result.bytesSent + ' bytes sent');
						  },
						  function(error) {
						    //alert('Error uploading file ' + path + ': ' + error.code);
							$("#spinner").hide();
						  },
						  { fileName: name });
						  
						  
				setTimeout (function(){
					   
				   $("#spinner").hide();
					   
			    }, 10000);
			}
			
			
			// start audio capture
			navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:2});
			
			
		});
		
		$(document).on("touchstart", "#mediacatturavideo", function(e){
					   
					   
					   // capture callback
					  var captureSuccess = function(mediaFiles) {
					   var i, path, len;
					   for (i = 0, len = mediaFiles.length; i < len; i += 1) {
					    path = mediaFiles[i].fullPath;
					    // do something interesting with the file
					   
					   
					    localStorage.setItem("path", mediaFiles[i].fullPath);
					   
					    //alert(localStorage.getItem("path"))
					   
					    uploadFile(mediaFiles[i]);
					   }
					  };
					   
					   
					   // capture error callback
					   var captureError = function(error) {
					     navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
					   };
					   
					   
					   
					   function uploadFile(mediaFile) {
						   
					    $("#spinner").show();
						   
					    var ft = new FileTransfer(),
					    path = mediaFile.fullPath,
					    name = mediaFile.name;
					   
					   ft.upload(path,
								 "http://microverba.com/filesu.php",
								 function(result) {
									 
									 $("#spinner").hide();
									 
								    //console.log('Upload success: ' + result.responseCode);
								    //console.log(result.bytesSent + ' bytes sent');
								 },
								 function(error) {
								   //alert('Error uploading file ' + path + ': ' + error.code);
								   $("#spinner").hide();
								 },
								 { fileName: name });
								 
								 
							setTimeout (function(){
					   
								$("#spinner").hide();
							   
							}, 10000);
							
					   }
					   
					   
					   // start audio capture
					   
					   navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:2});
					   
					   
		 });
		
		
		$(document).on("touchstart", "#ciccio1", function(e){
					   
			ciccio();
					   
		});
		
		
		$(document).on("touchstart", "#avanti", function(e){
			
			window.location.href = "indexFoto.html";
				   
		});
		
		
		function ciccio() {
			
			//$("#spinner").show();

			var blob = dataURLtoBlob(canvas.toDataURL('image/png'));

		}
		
		
		
		function alertDismissed() {
			$("#spinner").hide();
		}
		
		
		//// CROP ////
		
		var crop_max_width = 400;
		var crop_max_height = 400;
		var jcrop_api;
		var canvas;
		var context;
		var image;
		
		var prefsize;
		
		//document.getElementById("nome").innerHTML = "Base64";
		
		
		$("#file").change(function() {
				loadImage(this);
		});
		
		
		function loadImage(input) {
			if (input.files && input.files[0]) {
            var reader = new FileReader();
           canvas = null;
           reader.onload = function(e) {
		   image = new Image();
		   image.onload = validateImage;
		   image.src = e.target.result;
	       }
				
            reader.readAsDataURL(input.files[0]);
			}
		}
		
		
		function dataURLtoBlob(dataURL) {
			
			$("#spinner").show();
			
			var pippo = dataURL.toString()
			
			document.getElementById("nome").innerHTML = pippo.replace("data:image/png;base64,","").replace("data:image/jpeg;base64,","");
			
			localStorage.setItem("imgutente3", pippo.replace("data:image/png;base64,","").replace("data:image/jpeg;base64,",""));
			
			$.ajax({
				   type: "POST",
				   url: "http://microverba.com/picture.php",
				   data: {imgdata:localStorage.getItem("imgutente3")},
				   cache: false,
				   crossDomain: true,
				   contentType: "application/x-www-form-urlencoded",
				   success: function (result) {
					   
					$("#spinner").hide();
				   
					navigator.notification.alert(
										 'File caricato correttamente.',  // message
										 alertDismissed,         // callback
										 'File Upload',           // title
										 'Done'                  // buttonName
										 );
				   
				   
				   },
				   error: function(){
					   
					$("#spinner").hide();
				   
				   navigator.notification.alert(
												'Errore Imprevisto, contatta il fornitore',  // message
												alertDismissed,         // callback
												'Errore',            // title
												'OK'                  // buttonName
												);
				   
				   }
				   
			});
			
			
			//alert("fine")
			
			//alert(dataURL.toString().replace("data:image/jpeg;base64,",""))
			
			var BASE64_MARKER = ';base64,';
			if (dataURL.indexOf(BASE64_MARKER) == -1) {
			var parts = dataURL.split(',');
			var contentType = parts[0].split(':')[1];
			var raw = decodeURIComponent(parts[1]);
    
				
			return new Blob([raw], {
					type: contentType
					});
    
    
			}
			var parts = dataURL.split(BASE64_MARKER);
			var contentType = parts[0].split(':')[1];
			var raw = window.atob(parts[1]);
			var rawLength = raw.length;
			
   
			var uInt8Array = new Uint8Array(rawLength);
			for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
			}
			
			
			return new Blob([uInt8Array], {
							type: contentType
							});
			
		}
		
		function validateImage() {
			
			if (canvas != null) {
				image = new Image();
				image.onload = restartJcrop;
				image.src = canvas.toDataURL('image/png');
			} else restartJcrop();
		}
		
		function restartJcrop() {
			if (jcrop_api != null) {
				jcrop_api.destroy();
			}
			$("#views").empty();
			$("#views").append("<canvas id=\"canvas\">");
			canvas = $("#canvas")[0];
			context = canvas.getContext("2d");
			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage(image, 0, 0);
			$("#canvas").Jcrop({
							   onSelect: selectcanvas,
							   onRelease: clearcanvas,
							   boxWidth: crop_max_width,
							   boxHeight: crop_max_height
							   }, function() {
							   jcrop_api = this;
							   });
			clearcanvas();
		}
		
		function clearcanvas() {
			prefsize = {
			x: 0,
			y: 0,
			w: canvas.width,
			h: canvas.height,
			};
		}
		
		function selectcanvas(coords) {
			prefsize = {
			x: Math.round(coords.x),
			y: Math.round(coords.y),
			w: Math.round(coords.w),
			h: Math.round(coords.h)
			};
		}
		
		function applyCrop() {
			canvas.width = prefsize.w;
			canvas.height = prefsize.h;
			context.drawImage(image, prefsize.x, prefsize.y, prefsize.w, prefsize.h, 0, 0, canvas.width, canvas.height);
			validateImage();
			
			$("#ciccio1").show();
			
			
			$(function() {
              
              $("#pippo").swipe( {
                                
                                swipe:function(event, direction, distance, duration, fingerCount, fingerData) {

                                    alert("You swiped " + direction );
                                
                                },
                                
                                threshold:0
                                });
              });
		}
		
		function applyScale(scale) {
			if (scale == 1) return;
			canvas.width = canvas.width * scale;
			canvas.height = canvas.height * scale;
			context.drawImage(image, 0, 0, canvas.width, canvas.height);
			validateImage();
		}
		
		function applyRotate() {
			canvas.width = image.height;
			canvas.height = image.width;
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.translate(image.height / 2, image.width / 2);
			context.rotate(Math.PI / 2);
			context.drawImage(image, -image.width / 2, -image.height / 2);
			validateImage();
		}
		
		function applyHflip() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.translate(image.width, 0);
			context.scale(-1, 1);
			context.drawImage(image, 0, 0);
			validateImage();
		}
		
		function applyVflip() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.translate(0, image.height);
			context.scale(1, -1);
			context.drawImage(image, 0, 0);
			validateImage();
		}
		
		$("#cropbutton").click(function(e) {
							   applyCrop();
							   });
		$("#scalebutton").click(function(e) {
								var scale = prompt("Scale Factor:", "1");
								applyScale(scale);
								});
		$("#rotatebutton").click(function(e) {
								 applyRotate();
								 });
		$("#hflipbutton").click(function(e) {
								applyHflip();
								});
		$("#vflipbutton").click(function(e) {
								applyVflip();
								});
		
		$("#form").submit(function(e) {
						  e.preventDefault();
						  formData = new FormData($(this)[0]);
						  var blob = dataURLtoBlob(canvas.toDataURL('image/png'));
						  
						  //---Add file blob to the form data
						  });
		
		///// FINE CROP ////
		
		
		
		
		function gpsonSuccess(position){
			
			var ciao = position.coords.latitude;
			var ciao1 = position.coords.longitude;
			var gradi = position.coords.heading;
			
			localStorage.setItem("lat", ciao)
			localStorage.setItem("lng", ciao1)
			localStorage.setItem("gradi", gradi)
			
			localStorage.setItem("geostory", "SI")
			
			
			$("#lati").html(ciao +", "+ ciao1);
			
			
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
		
		
		// FINE CARICAMENTO //
		
		//alert("fine caricamento pagina")
		
    }
};


/*function testa(testo) {
	
	alert("registrazione")
	
	
	if (localStorage.getItem("RegToken") === null || typeof(localStorage.getItem("RegToken")) == 'undefined' || localStorage.getItem("RegToken")=="null" || localStorage.getItem("RegToken")==""){
		
		setTimeout (function(){
					
					
					$.ajax({
						   type:"GET",
						   url:"http://www.msop.it/microverba/Check_RegToken.asp",
						   data: {email:localStorage.getItem("email"),token:testo,platform:"ios"},
						   contentType: "application/json",
						   json: 'callback',
						   timeout: 7000,
						   crossDomain: true,
						   success:function(result){
						   
						   $.each(result, function(i,item){
								  
								  localStorage.setItem("RegToken", "1");
								  alert(testo);
								  
								  });
						   
						   },
						   error: function(){
						   
						   
						   },
						   dataType:"json"});
					
					}, 500);
		
	}
}*/


$(document).on("touchstart", "#video", function(e){
			   
			   var ref = window.open('https://www.quirksmode.org/html5/videos/big_buck_bunny.mp4', '_blank', 'location=no');
			   
			   /*var videoUrl = "https://www.quirksmode.org/html5/videos/big_buck_bunny.mp4";
				
				// Just play a video
				window.plugins.streamingMedia.playVideo(videoUrl);
				
				// Play a video with callbacks
				var options = {
				successCallback: function() {
				console.log("Video was closed without error.");
				},
				errorCallback: function(errMsg) {
				console.log("Error! " + errMsg);
				},
				orientation: 'landscape',
				shouldAutoClose: true,  // true(default)/false
				controls: true // true(default)/false. Used to hide controls on fullscreen
				};
				
				
				window.plugins.streamingMedia.playVideo(videoUrl, options);*/
			   
			   });
			   

$(document).on("touchstart", "#audio", function(e){
			   
			   var ref = window.open('https://www.computerhope.com/jargon/m/example.mp3', '_blank', 'location=no');
			   
			   /*var audioUrl = "https://www.computerhope.com/jargon/m/example.mp3";
				
				// Play an audio file (not recommended, since the screen will be plain black)
				window.plugins.streamingMedia.playAudio(audioUrl);
				
				// Play an audio file with options (all options optional)
				var options = {
				bgColor: "#FFFFFF",
				bgImage: "<SWEET_BACKGROUND_IMAGE>",
				bgImageScale: "fit", // other valid values: "stretch"
				initFullscreen: false, // true(default)/false iOS only
				successCallback: function() {
				console.log("Player closed without error.");
				},
				errorCallback: function(errMsg) {
				console.log("Error! " + errMsg);
				}
				};
				
				window.plugins.streamingMedia.playAudio(audioUrl, options);*/
			   
			   // Stop current audio
			   //window.plugins.streamingMedia.stopAudio();
			   
			   // Pause current audio (iOS only)
			   //window.plugins.streamingMedia.pauseAudio();
			   
			   // Resume current audio (iOS only)
			   //window.plugins.streamingMedia.resumeAudio();
			   
			   });