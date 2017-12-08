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
		
		document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
		
		 /*$("input").focus(function(){
			$("#footer").hide();
        });
        
        $("input").blur(function(){
			$("#footer").show();
        });*/
		
	
		window.addEventListener('native.keyboardhide', keyboardHideHandler);
  
		function keyboardHideHandler(e){
		  $("#footer").show();
		}
	  
	    window.addEventListener('native.keyboardshow', keyboardShowHandler);
  
		function keyboardShowHandler(e){
			$("#footer").hide();
		}
		
		
		$("#miclock").hide()
        $("#prolock").hide()
		
		$("#iddevice").html(localStorage.getItem("deviceid"))
		
		/*last_click_time = new Date().getTime();

		document.addEventListener('touchstart', function (e) {
						  
		  click_time = e['timeStamp'];
		  
		  if (click_time && (click_time - last_click_time) < 1000) { e.stopImmediatePropagation();
		  
		  e.preventDefault();
		  
		  return false;
		  
		  }
		  
		  last_click_time = click_time;
						  
		}, true);*/
		
		
		$("#prolock").hide()
		$("#miclock").hide()
		$("#celllock").hide()

		//navigator.geolocation.watchPosition(gpsonSuccess, gpsonError, {timeout: 10000, enableHighAccuracy: true });
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
        //$("#badde5").attr("data-badge", Badge10);
        
        if (Badge10 > 0){
            $("#prova").html(Badge10);
        }
        else{
            var Badge10 = 0;
            localStorage.setItem("Badge10","0");
        }
		
		
		window.sqlitePlugin.selfTest(function() {
			//alert('DataBase WORK');
		});
		
		
	    var db = window.sqlitePlugin.openDatabase({name: 'mydb.db', location: 'default'});
		//var db = window.sqlitePlugin.openDatabase({name: "my.db", androidDatabaseImplementation: 2});
		
        //var db = window.sqlitePlugin.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
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
			
			
			//alert('Se arriva qui ok');
		
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
        
		
		if(localStorage.getItem("carrello")=="1"){
            
            seleziona()
        }
		
		
        
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
		
		
		$(document).on("touchstart", "#piu", function(e){
                       
            agg2(1,"1.00","Test 1","c")
                       
                       
        });
        
        $(document).on("touchstart", "#piu2", function(e){
                       
            agg2(2, "2.00", "Test 2","p")
                       
        });
        
        
        
        $(document).on("touchstart", "#piu3", function(e){
                       
		   localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))+1)
		   var Badge10 = localStorage.getItem("Badge10");
		   
		   
		   /*$('#badde5').removeClass('badge2').addClass('badge1');
		   $("#badde5").attr("data-badge", Badge10);
		   $("#badde5").html('<img id="carro3" src="img/CartW.png" width="20px">');*/
		   $("#prova").html(Badge10);
                       
        });
        
        
        
        $(document).on("touchstart", "#meno3", function(e){
                       
		   localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
		   var Badge10 = localStorage.getItem("Badge10");
		   
		   
		   /*$('#badde5').removeClass('badge2').addClass('badge1');
		   $("#badde5").attr("data-badge", Badge10);
		   $("#badde5").html('<img id="carro3" src="img/CartW.png" width="20px">');*/
		   $("#prova").html(Badge10);
                       
        });
		
		
		function agg2(prod,prezz,nomi,dove){
            
            var aggiornamento = 0;
            var msg;
            var prezzo=prezz;
            var test;
            var P1 = '110';
            var nome = nomi;
			var nomeprod = dove+prod
			
            
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM Ordine where id='+ prod +' and IdProdotto="'+ nomeprod +'"', [], function (tx, results) {
                    var len = results.rows.length, i;
                              
                    //alert(results.rows.length)
                              
                    for (i = 0; i < len; i++){
                        //alert("id:" + results.rows.item(i).id)
                        //alert("Qta:" +results.rows.item(i).Qta)
                        //alert("Descrizione:" +results.rows.item(i).Descrizione)
                              
                    }
                              
                    if(results.rows.length==0){
                      tx.executeSql('INSERT INTO Ordine (id, IdProdotto, Qta, Descrizione, Nome) VALUES ('+ prod +', "'+nomeprod+'", 1, "'+ prezzo +'", "'+ nome +'")');
                              
						  localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))+1)
						  var Badge10 = localStorage.getItem("Badge10");
						  
						  
						  /*$('#badde5').removeClass('badge2').addClass('badge1');
						  $("#badde5").attr("data-badge", Badge10);
						  $("#badde5").html('<img id="carro3" src="img/CartW.png" width="20px">');*/
						  $("#prova").html(Badge10);
						  
						  return;
						  e.preventDefault();
                    }
                    else{
						return;
						e.preventDefault();
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
			
			//alert("enter")
            
            $("#contenutoCart").html("");
            
            var tuttigliid = "";
			var tuttigliid2 = "";
            var conta = 0;
			$("#IDCART").html("");
			$("#NOMEORD").html("");
			
			if(localStorage.getItem("Badge10")!="0"){
            
            
					db.transaction(function (tx) {
                         tx.executeSql('SELECT * FROM Ordine', [], function (tx, results) {
                                         var len = results.rows.length, i;
                                         var Punita;
                                         //alert("len:"+len);
                                         
                                         for (i = 0; i < len; i++){
									 
										 if(i==0){
                                           msg = results.rows.item(i).IdProdotto
										 }
										 else{
										   msg = msg + "|" + results.rows.item(i).IdProdotto
										 }
										 
										 $("#IDCART").html(msg);
										 $("#NOMEORD").html("Ordinazione Microverba");
										 
                                         Punita = (Number(results.rows.item(i).Descrizione).toFixed(2) / Number(results.rows.item(i).Qta).toFixed(2))
                                        
                                         var paperino2 = "_"+results.rows.item(i).id+"_"+results.rows.item(i).IdProdotto
										 
										 tuttigliid = results.rows.item(i).IdProdotto;
										 tuttigliid2 = results.rows.item(i).id;
                                         
                                         if(conta==0){
                                            msg2 = "<table cellpadding='5' cellspacing='0' border='0' align='center' class='tabella_ordine'><tr><td><span class='text_dati'>"+ results.rows.item(i).IdProdotto +" (descrizione)</span></td><td><span class='text_dati'><b>"+ Number(results.rows.item(i).Descrizione).toFixed(2)+"&euro;</b></span></td><td width='32'><a id="+ paperino2 +"><img src='img/delete.png'></a></td></tr></table>"

                                         }
                                         else{
                                            msg2 = msg2 + "<table cellpadding='5' cellspacing='0' border='0' align='center' class='tabella_ordine'><tr><td><span class='text_dati'>"+ results.rows.item(i).IdProdotto +" (descrizione)</span></td><td><span class='text_dati'><b>"+ Number(results.rows.item(i).Descrizione).toFixed(2)+"&euro;</b></span></td><td width='32'><a id="+ paperino2 +"><img src='img/delete.png'></a></td></tr></table>"

                                         }
  
                                         
                                         $(document).on("touchstart", "#"+paperino2+"", function(e){
														
                                            var codice = this.id
														
											//SPLIT
			
											var a1 = new Array();
														
											a1=codice.split("_");
														
											//alert(a1[1]+" "+a1[2])
       
                                            //codice = codice.replace("cod_","")
                                                        
                                            sottprod(a1[1],a1[2])
                                                        
                                         });
                                         
                                         //alert("p:"+paperino2)
										 
                                         conta = conta+1;

                                         }
                                         
                                         //$("#contenutoCart").append('</table>');
                                         //$('#contenutoCart').html(landmark);
										 
										 document.getElementById("idordine").value = tuttigliid2;
                                         document.getElementById("products").value = tuttigliid;
										 
										 $("#contenutoCart").append(msg2);
                                         
                                        // $("#contenutoCart").append("jhdjahasj js djkas dsahkjsa kjash jkashdkjashdjkas <br><br>jhdjahasj js djkas dsahkjsa kjash jkashdkjashdjkas <br><br>jhdjahasj js djkas dsahkjsa kjash jkashdkjashdjkas <br><br>jhdjahasj js djkas dsahkjsa kjash jkashdkjashdjkas <br><br>jhdjahasj js djkas dsahkjsa kjash jkashdkjashdjkas <br><br>jhdjahasj js djkas dsahkjsa kjash jkashdkjashdjkas <br><br>jhdjahasj js djkas dsahkjsa kjash jkashdkjashdjkas <br><br>")
                                         
                                         setTimeout (function(){
										    myScroll2.refresh();
										 
										  }, 500);
										 
										 selPrezzo();
										 
											return;
											e.preventDefault();
                                         
                                         
                                         }, null);
                           });
						   
						   
				}
        }
  
        function selPrezzo(){
			
			//alert("prezzo")
			
            db.transaction(function (tx) {
				   tx.executeSql('SELECT SUM(Descrizione) as TOT FROM Ordine', [], function (tx, results) {
					 var len = results.rows.length, i;
					 
					 for (i = 0; i < len; i++){
					 
					  $("#TOTCART").html(Number(results.rows.item(i).TOT).toFixed(2) + "€");
					  document.getElementById("totordine").value = Number(results.rows.item(i).TOT).toFixed(2);
					 
					 }
					 
					 selQta();
					 
					 
					 }, null);
				   });
            
        }
	
  
		function selQta(){
			db.transaction(function (tx) {
			   tx.executeSql('SELECT SUM(Qta) as TOT FROM Ordine', [], function (tx, results) {
							 var len = results.rows.length, i;
										 
					 for (i = 0; i < len; i++){
							 
						 $("#QTA").html(Number(results.rows.item(i).TOT));
						 document.getElementById("qta").value = Number(results.rows.item(i).TOT);
						 
						  setTimeout (function(){
							myScroll2.refresh();
										 
						  }, 500);
						 
						 return;
							 
					 }
							 
					 }, null);
			   });
			
			
			setTimeout (function(){
				myScroll2.refresh();
				
				return;
			}, 500);
		}
  
  
  
        function sottprod(prod,vedo){
			
			db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM Ordine where id='+ prod +' and IdProdotto="'+ vedo +'"', [], function (tx, results) {
					var len = results.rows.length, i;
					
					//alert("len:" + len)
				
					if(results.rows.length==0){
						$("#prova").html("0");
						$("#contenutoCart").html("");
						$("#IDCART").html("");
						$("#NOMEORD").html("");
						$("#QTA").html("");
						
						
                        tx.executeSql('DELETE FROM Ordine where id='+prod+' and IdProdotto="'+ vedo +'"', [], function (tx, results) {
						}, null);
						
						//seleziona2()
						document.getElementById("idordine").value = "";
                        document.getElementById("products").value = "";
						$("#contenutoCart").html("");
						 
						return;
						e.preventDefault();
					}
					else{
						tx.executeSql('DELETE FROM Ordine where id='+prod+' and IdProdotto="'+ vedo +'"', [], function (tx, results) {
						}, null);
								   
						localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
						
						$("#prova").html(localStorage.getItem("Badge10"));
								   
								   
						seleziona2()
						return;
						e.preventDefault();
					}
                                                          
                }, null);
            });
			
            //alert(prod)
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
                                                                         
                                                            //$("#badde5").attr("data-badge", Badge10);
															$("#prova").html(Badge10);
                                                                         
                                                            seleziona()
                                                                                 
                                                           }, null);
                                                                        
                                                            
                                                         });
                                                    
                                                     }
                                                     else{
                                                       tx.executeSql('DELETE FROM Ordine where id='+ prod +'', [], function (tx, results) {
                                                                  
                                                        localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
                                                        Badge10 = localStorage.getItem("Badge10");
                                                                  
                                                        //$("#badde5").attr("data-badge", Badge10);
                                                        //$("#badde5").html('<img id="carro3" src="img/CartW.png" width="20px">');
                                                                  
                                                        //$( "#carro5" ).effect( "bounce", "slow" );
														$("#prova").html(Badge10);
                                                                  
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
                       
                       //$("#badde5").attr("data-badge", Badge10);
					   $("#prova").html(Badge10);
                       
                       $("#spinner2").hide();
                       
                       //window.location.href = "#page2";
                       
                       seleziona2()
                       
                       
                      /* setTimeout (function(){
                            myScroll2.refresh();
                        }, 500);*/
                       
        });
	

  
		$("#spinner").hide();
		
		// START CODE //

        
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
		
	
		$(document).on("touchstart", "#ciccio2", function(e){
			
			window.plugins.nativepagetransitions.fade({
				"duration"       :  600, // in milliseconds (ms), default 400
				"iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
				"androiddelay"   :  300,
				"href" : "#page"
			});
                       
            //window.location.href = "#page";
                       
		   var Badge10 = localStorage.getItem("Badge10");
		   //$("#badde5").attr("data-badge", Badge10);
		   
		   if (Badge10 > 0){
		    $("#prova").html(Badge10);
		   }
		   else{
		    var Badge10 = 0;
		   	localStorage.setItem("Badge10","0");
			$("#prova").html(Badge10);
		   }
                       
            setTimeout (function(){
                seleziona()
                myScroll.refresh();
            }, 1000);
                       
                       
        });
  
		
		$(document).on("touchstart", "#badde5", function(e){
                       
            $("#spinner2").hide();
			
			window.plugins.nativepagetransitions.fade({
				"duration"       :  600, // in milliseconds (ms), default 400
				"iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
				"androiddelay"   :  300,
				"href" : "#page2"
			});
                       

			// SCROLL"
			
			var myScroll2
			
			myScroll2 = new iScroll('wrapper2', {
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
			
			
			seleziona2()
			
			
			setTimeout (function(){
				
				myScroll2.refresh();
				
			}, 500);
					   
        });
		
		
		
		$(document).on("touchstart", "#richiedi", function(e){
			   
	      richiesta(0,0)
		  
		})
		
				
				
		$(document).on("touchstart", "#richiediA", function(e){
			   
	      richiesta(0,0)
		  
		})
		
				$(document).on("touchstart", "#richiediB", function(e){
			   
	      richiesta(0,0)
		  
		})
		
		
		
		$(document).on("touchstart", "#richiedi11", function(e){
			   
	      richiesta(0,0)
		  
		})
		
		
		$(document).on("touchstart", "#richiedi2", function(e){
					   
		   richiesta(localStorage.getItem("pagina"),localStorage.getItem("pagina1"))
	   })
	   
	   	
		
	   $(document).on("touchstart", "#richiedi22", function(e){
		   
			var email2 = self.document.form.emailphone.value;
			
			//alert("email: "+email2)
		   
		   
			if (email2 == "") {
				navigator.notification.alert(
				 'inserire Email Valida',  // message
				 alertDismissed,         // callback
				 'Email',            // title
				 'OK'                  // buttonName
				 );
				return;
			}

			var posta2 = $.base64.encode(email2)
		   
			var num1 = Math.floor((Math.random() * 20) + 1);
			var num2 = Math.floor((Math.random() * 20) + 1);
			var num3 = Math.floor((Math.random() * 20) + 1);
			var num4 = Math.floor((Math.random() * 20) + 1);
			var num5 = Math.floor((Math.random() * 20) + 1);
			var num6 = Math.floor((Math.random() * 20) + 1);
			var num7 = Math.floor((Math.random() * 20) + 1);
			var num8 = Math.floor((Math.random() * 20) + 1);
			
			var num9 = Math.floor((Math.random() * 20) + 1);
			var num10 = Math.floor((Math.random() * 20) + 1);
			var num11 = Math.floor((Math.random() * 20) + 1);
			var num12 = Math.floor((Math.random() * 20) + 1);
			var num13 = Math.floor((Math.random() * 20) + 1);
			var num14 = Math.floor((Math.random() * 20) + 1);
			var num15 = Math.floor((Math.random() * 20) + 1);
			var num16 = Math.floor((Math.random() * 20) + 1);
			
			
			var deviceid = num1+""+num2+""+num3+""+num4+""+num5+""+num6+""+num7+""+num8+""+num9+""+num10+""+num11+""+num12+""+num13+""+num14+""+num15+""+num16;
			
			var posta2 = $.base64.encode(email2)
			
			var device2 = $.base64.encode(deviceid)
			
			
			$.ajax({
				   type: "POST",
				   url: "http://www.microverba.com/change_device.php",
				   data: {email3:posta2,device_id:device2,submit_change_device:"1"},
				   cache: false,
				   crossDomain: true,
				   contentType: "application/x-www-form-urlencoded",
				   success: function (result) {
					   
					if(result.status=="0"){
						
						navigator.notification.alert(
							'Email non trovata',  // message
							alertDismissed,         // callback
							'Controlla la tua email',            // title
							'OK'                  // buttonName
						);
						
					}
					else{
					   
						localStorage.setItem("deviceid", deviceid);
						localStorage.setItem("email", email2);
				   
						navigator.notification.alert(
							'Email spedita',  // message
							alertDismissed,         // callback
							'Controlla la tua email',            // title
							'OK'                  // buttonName
						);
						
						
						$("#celllock").hide()
					
					}

				   
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
			
	   })
	   
	   
	   $(document).on("touchstart", "#richiedi23", function(e){
		   
		   var codsblocco =  self.document.form.codsblocco.value
		   
		   
		   alert("codice: "+codsblocco)
		   
			var posta3 = $.base64.encode(localStorage.getItem("email"))
			
			var device3 = $.base64.encode(localStorage.getItem("deviceid"))
			
			$.ajax({
				   type: "GET",
				   url: "http://www.microverba.com/activate_change_device.php?em="+posta3+"&dvid="+device3+"?ac="+codsblocco+"",
				   cache: false,
				   crossDomain: true,
				   contentType: "application/x-www-form-urlencoded",
				   success: function (result) {
				   
					navigator.notification.alert(
						'Telefono Sbloccato',  // message
						alertDismissed,         // callback
						'Sblocco',            // title
						'OK'                  // buttonName
					);
					
					
					$("#emailphone").show()
					$("#richiedi22").show()
					
					$("#sblocco").hide()
					$("#richiedi23").hide()
					
					$("#celllock").hide()
				     
				   
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
			
		  
	   })
	   
	   
		
		$(document).on("touchstart", "#annulla33", function(e){
					   
			$("#contlock").hide()
					   
	   })
	   
	   		$(document).on("touchstart", "#annullaA", function(e){
					   
			$("#prolock").hide()
					   
	   })
	   
	   		$(document).on("touchstart", "#annullaB", function(e){
					   
			$("#miclock").hide()
					   
	   })
		
		$(document).on("touchstart", "#annulla22", function(e){
					   
			$("#celllock").hide()
					   
		})
		
		
		$(document).on("touchstart", "#sbloccacell", function(e){
					   
			$("#celllock").show()
			
			//$("#emailphone").focus()
			
					   
		})
		
		
		 function agg(){
            var db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
            var msg;
            var test;
            var P1 = '110';
            
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Ordine (id unique, IdProdotto, Qta, Descrizione, Nome)');
                //tx.executeSql('INSERT INTO Ordine (id, IdProdotto, Qta, Descrizione, Nome) VALUES (1, 1, 1, "Omaggio", "Omaggio")');
            });
            
            
        }
		
		$(document).on("touchstart", "#mandaordine", function(e){
					   
		     if (localStorage.getItem("email") === null || typeof(localStorage.getItem("email")) == 'undefined' || localStorage.getItem("email")=="null" || localStorage.getItem("email")==""){
					   
			   navigator.notification.prompt(
				 'Inserisci il tuo indirizzo email',  // message
				  onPrompt,                  // callback to invoke
				 'Recupera la Password',            // title
				 ['Invia','Annulla'],             // buttonLabels
				 ''                 // defaultText
			   );
			   
		     }
		   else{
			 compraCarta()
		   }
            

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
				
				
				var num1 = Math.floor((Math.random() * 20) + 1);
				var num2 = Math.floor((Math.random() * 20) + 1);
				var num3 = Math.floor((Math.random() * 20) + 1);
				var num4 = Math.floor((Math.random() * 20) + 1);
				var num5 = Math.floor((Math.random() * 20) + 1);
				var num6 = Math.floor((Math.random() * 20) + 1);
				var num7 = Math.floor((Math.random() * 20) + 1);
				var num8 = Math.floor((Math.random() * 20) + 1);
				
				var num9 = Math.floor((Math.random() * 20) + 1);
				var num10 = Math.floor((Math.random() * 20) + 1);
				var num11 = Math.floor((Math.random() * 20) + 1);
				var num12 = Math.floor((Math.random() * 20) + 1);
				var num13 = Math.floor((Math.random() * 20) + 1);
				var num14 = Math.floor((Math.random() * 20) + 1);
				var num15 = Math.floor((Math.random() * 20) + 1);
				var num16 = Math.floor((Math.random() * 20) + 1);
				
				
				var deviceid = num1+""+num2+""+num3+""+num4+""+num5+""+num6+""+num7+""+num8+""+num9+""+num10+""+num11+""+num12+""+num13+""+num14+""+num15+""+num16;
				
				localStorage.setItem("deviceid", deviceid);
				
				localStorage.setItem("email", results.input1);
				
			    compraCarta()
			}
			
		}
  
  
		function richiesta2(pagina,pagina1){
			
			//alert("1")
			
			$("#testvideo").html("");
			$("#tutto").html("");
			var tabella = "";
			
			$("#contlock").hide()
			$("#miclock").hide()
			$("#prolock").hide()
			
			var posta = $.base64.encode(localStorage.getItem("email"))
			var lati = $.base64.encode(localStorage.getItem("lat"));
			var longi = $.base64.encode(localStorage.getItem("lng"));
			
			var pswp = self.document.form.pswp.value;
			var pswm = self.document.form.pswm.value;
			
			var pswYTT = self.document.form.pswYTT.value;
			var pswVAA = self.document.form.pswVAA.value;
			var pswFAA = self.document.form.pswFAA.value;
			
			document.getElementById("pswYTT").value = ""
			document.getElementById("pswVAA").value = ""
			document.getElementById("pswFAA").value = ""
			document.getElementById("pswYTTBLOC").value = ""
			
		
			var pag1= $.base64.encode(pagina);
			var pag2= $.base64.encode(pagina1);
			
			//alert(pag1)
			
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
			
			
			if ((radice3 == "") && (foglia3 == "")) {
				
				navigator.notification.alert(
											 'inserire una Radice o una Foglia',  // message
											 alertDismissed,         // callback
											 'Ricerca di un Microverba',            // title
											 'OK'                  // buttonName
											 );
				return;
				
			}
			
			
			
			if (radice3 == ""){
				
				var radice4 = "";
				var foglia4 = foglia3.toLowerCase();
				
				var radice = "";
				var foglia = $.base64.encode(foglia4);
				
				
			}
			else if(foglia3 == ""){
				
				var radice4 = radice3.toLowerCase();
				var foglia4 = "";
				
				var radice = $.base64.encode(radice4);
				var foglia = "";
				
	
			}
			else{
				var radice4 = radice3.toLowerCase();
				var foglia4 = foglia3.toLowerCase();
				
				var radice = $.base64.encode(radice4);
				var foglia = $.base64.encode(foglia4);
				
			}
			
			//alert("2")
			
			var lock_microverba = "";
			var lock_progetto = "";
			
			$("#spinner").show();
			
		}
		
		$(document).on("touchstart", "#vediinfo", function(e){
					   
			$("#informazioni1").show()
					   
		})
		
		$(document).on("touchstart", "#vediinfomic", function(e){
					   
		   $("#informazioni2").show()
		   
		   })
		
		$(document).on("touchstart", "#informazioni1_close", function(e){
					   
			$("#informazioni1").hide()
					   
		})
		
		$(document).on("touchstart", "#informazioni2_close", function(e){
					   
		   $("#informazioni2").hide()
		   
		   })
		

		
		function richiesta(pagina,pagina1){
			
			$("#radice").blur()
            $("#radice2").blur()
            $("#foglia").blur()
            $("#foglia2").blur()
			
			$("#box2").show()
			
			$("#testvideo").html("");
			$("#tutto").html("");
			var tabella = "";
			
			$("#contlock").hide()
			$("#miclock").hide()
			$("#prolock").hide()
			
			
			var posta = $.base64.encode(localStorage.getItem("email"))
			var lati = $.base64.encode(localStorage.getItem("lat"));
			var longi = $.base64.encode(localStorage.getItem("lng"));
			var DevId = $.base64.encode(localStorage.getItem("deviceid"));
			
			var pswp = self.document.form.pswp.value;
			var pswm = self.document.form.pswm.value;
			
			var pswYTT = self.document.form.pswYTT.value;
			var pswVAA = self.document.form.pswVAA.value;
			var pswFAA = self.document.form.pswFAA.value;
			var pswPWW = self.document.form.pswPWW.value;
			var pswFBB = self.document.form.pswFBB.value;
			var pswTFF = self.document.form.pswTFF.value;
			var pswTWW = self.document.form.pswTWW.value;
			var pswIGG = self.document.form.pswIGG.value;
			var pswUSS = self.document.form.pswUSS.value;
			var pswSVV = self.document.form.pswSVV.value;
			var pswSAA = self.document.form.pswSAA.value;
			var pswTMM = self.document.form.pswTMM.value;
			var pswEMM = self.document.form.pswEMM.value;
			
			var pswUII = self.document.form.pswUII.value;
			var pswUDD = self.document.form.pswUDD.value;
			var pswUAA = self.document.form.pswUAA.value;
			var pswUVV = self.document.form.pswUVV.value;
			
			document.getElementById("pswYTT").value = ""
			document.getElementById("pswVAA").value = ""
			document.getElementById("pswFAA").value = ""
			document.getElementById("pswPWW").value = ""
			document.getElementById("pswFBB").value = ""
			document.getElementById("pswTFF").value = ""
			document.getElementById("pswTWW").value = ""
			document.getElementById("pswIGG").value = ""
			document.getElementById("pswUSS").value = ""
			document.getElementById("pswSVV").value = ""
			document.getElementById("pswSAA").value = ""
			document.getElementById("pswTMM").value = ""
			document.getElementById("pswEMM").value = ""
			
			document.getElementById("pswUII").value = ""
			document.getElementById("pswUDD").value = ""
			document.getElementById("pswUAA").value = ""
			document.getElementById("pswUVV").value = ""
			
			document.getElementById("pswYTTBLOC").value = ""
			
			//alert(pswp + pswm)
			
			var pag1= $.base64.encode(pagina);
			var pag2= $.base64.encode(pagina1);
			
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
			
			
			if ((radice3 == "") && (foglia3 == "")) {
				
				navigator.notification.alert(
				 'inserire una Radice o una Foglia',  // message
				 alertDismissed,         // callback
				 'Ricerca di un Microverba',            // title
				 'OK'                  // buttonName
				 );
				 
				
				$("#contengo").hide();
				 
				return;
				
			}
			
			
			
			if (radice3 == ""){
				
				var radice4 = "";
				var foglia4 = foglia3.toLowerCase();
				
				var radice = "";
				var foglia = $.base64.encode(foglia4);
				
				//alert("R" + radice + "F" + foglia)
				
			}
			else if(foglia3 == ""){
				
				var radice4 = radice3.toLowerCase();
				var foglia4 = "";
				
				var radice = $.base64.encode(radice4);
				var foglia = "";
				
				//alert("R" + radice + "F" + foglia)
				
			}
			else{
				var radice4 = radice3.toLowerCase();
				var foglia4 = foglia3.toLowerCase();
				
				var radice = $.base64.encode(radice4);
				var foglia = $.base64.encode(foglia4);
				
				//alert("R" + radice + "F" + foglia)
			}
			
			$("#ricerca").html(foglia3 + " :: " + radice3);
			$("#ricercainfomicro").html(foglia3 + " :: " + radice3);
			
			var lock_microverba = "";
			var lock_progetto = "";
			
			$("#spinner").show();
			
			$.ajax({
				   type: "POST",
				   url: "http://www.microverba.com/leaf_root_request.php",
				   data: {email:posta,leaf:foglia,root:radice,device_id:DevId,latitudine:lati,longitudine:longi,nextPaginationRootStart:pag1,nextPaginationLeafStart:pag2},
				   cache: false,
				   crossDomain: true,
				   contentType: "application/x-www-form-urlencoded",
				   success: function (result) {
				   
				   $("#testvideo").html("");
				   $("#tutto").html("");
				    $("#paginazione").html("");
				   $("#titoloricerca").html("");
				   $("#contengo").show();
				  
				   
				   //TUTTO
				   
				   if(result.Token==0){
					   
				   $("#contengo").hide();
				   
				   
				   if((result.radice!="")&&(result.foglia!="")){
				     $("#compra1").show();
				   
				   		$(document).on("touchstart", "#acquistamicro", function(e){
							window.open('  http://microverba.com/register.php?lang=it&root='+ radice3 +'', '_blank', 'location=no');
								  
						})
					 
					 
				   }
				   else{
				   var tabella = "<table width='90%' align='center' border='0'>";
				   
				   if((result.messaggio=="TmVzc3VuIE1pY3JvdmVyYmEgdHJvdmF0bw==")||(result.messaggio=="TmVzc3VuYSBmb2dsaWEgZGlzcG9uaWJpbGU=")){
				   
				    	tabella = tabella + "<tr><td align='left' width='150'>-</td><td align='left' width='100%'><p class='testo1'><font color='#fff'> "+$.base64.decode(result.messaggio)+"</font></p> </td></tr><tr><td align='left' width='150'><p class='testo1'><font color='#fff'>Progetto:</font></p> </td><td align='left' width='100%'></td></tr><tr><td align='left' width='150'><p class='testo1'><font color='#fff'>Descrizione Progetto: </font></p></td><td align='left' width='100%'></td></tr>"
				   
				   		tabella = tabella + "</table><br>";
				   
				  	    $("#tutto").append(tabella);
				   }
				   else if(result.messaggio=="TGEgcmFkaWNlIG5vbiBlc2lzdGUuIFZ1b2kgYWNxdWlzdGFybGE\/"){
				   
				   	// La radice non esiste
				   
				     $("#compra1").show();
				     //$("#compra2").show();
				     $("#contengo").hide();
				   
				     $(document).on("touchstart", "#acquistamicro", function(e){
						window.open('  http://microverba.com/register.php?lang=it&root='+ radice3 +'', '_blank', 'location=no');
								  
					 })
				   
				   }
				   else if(result.messaggio=="TGEgZm9nbGlhIG5vbiBlc2lzdGUu"){
				   
				   $("#compra1").hide();
				   $("#compra2").hide();
				   $("#contengo").hide();
				   
				     navigator.notification.alert(
					  'La Foglia non esiste',  // message
					   alertDismissed,         // callback
					   'Alert',            // title
					   'OK'                  // buttonName
					  );
				   
				   }
				   else{
				   
				   if(result.foglia!=""){
				   
				   if(result.roots!=""){
					   
				   	$("#compra1").hide();
				     $("#compra2").hide();
				     $("#contengo").show();
				   
				      if(result.totalRoot!="0"){
				   
						 var pagina = parseInt(localStorage.getItem("pagina"))
						 var totale = result.totalRoot
				   
						 var nextPagina = 4
				         var schema2 = 4
				   
						 var pag = "0"
				   
				         var next = totale/nextPagina
				   
				   		  //alert(next)
				   
				   		$("#paginazione").html("<div class='cart_page'><table cellpadding='5' cellspacing='0' border='0' align='center' class='tabella_ordine'><tr><td colspan='2' height='30' align='center'><p id='test'></p></td></tr></table></div>")
				   
						   for (var i=0, l=next; i<l; i++) {
				   
							   pag = i+1
				   
							   if (pag==1){
				   
								   nextPagina = 0
				   
								   if(pagina!=nextPagina){
									   $("#test").append("<a id='pag_"+nextPagina+"'><span class='paginazione_on'>"+pag+"</span></a>")
				   
									   $(document).on("touchstart", "#pag_"+ nextPagina +"", function(e){
										  var paginazione = this.id
										  paginazione = paginazione.replace("pag_","")
													  
										  //alert(paginazione)
										  localStorage.setItem("pagina",paginazione);
										  
										  richiesta(paginazione,0)
										  e.stopImmediatePropagation()
										  return
										  
										})
								   }
								   else{
								  		$("#test").append("<span class='paginazione_off'>"+pag+"</span>")
								   }
				   
							   }
				   
							   else{
				   
								   nextPagina = schema2 + nextPagina
				   
								   if(pagina!=nextPagina){
									   $("#test").append("<a id='pag_"+nextPagina+"'><span class='paginazione_on'>"+pag+"</span></a>")
				   
									   $(document).on("touchstart", "#pag_"+ nextPagina +"", function(e){
										  var paginazione = this.id
										  paginazione = paginazione.replace("pag_","")
													  
										  //alert(paginazione)
										  localStorage.setItem("pagina",paginazione);
										  
										  richiesta(paginazione,0)
										  e.stopImmediatePropagation()
										  return
										})
								   }
								   else{
								   	 $("#test").append("<span class='paginazione_off'>"+pag+"</span>")
								   }
				   
							   }
						   }
				   
						   $("#test").append("<a id='pag2_"+nextPagina+"'><div class='paginazione_next'></div></a>")
				   
						   $(document).on("touchstart", "#pag2_"+ nextPagina +"", function(e){
								  var paginazione = this.id
								  paginazione = paginazione.replace("pag2_","")
								  
								  //alert(paginazione)
								  localStorage.setItem("pagina",paginazione);
								  
								  richiesta(paginazione,0)
								  e.stopImmediatePropagation()
								  return
								  
							})

				       }
				   
					  $("#titoloricerca").html("<div class='cart_page'><table cellpadding='5' cellspacing='0' border='0' align='center' class='tabella_ordine'><p class='titolo_ordine'><b>MICROVERBA ESISTENTI</b></p></td></tr></table>");
				   
					   var str = $.base64.decode(result.roots);
					   //alert(str)
				   
					   var a1 = new Array();
				   
					   a1=str.split("|");
				   
					   for (i=0;i<a1.length;i++)
				   
					   {
					    var tabella = "<div class='cart_page'><table cellpadding='5' cellspacing='0' border='0' align='center' class='tabella_ordine'>";
				   
						tabella = tabella + "<tr><td><span class='text_dati'>"+foglia3+" :: "+a1[i]+"</span></td><td width='32'><a id='root_"+a1[i]+"'><img src='img/ico_arrow_dx.png'></a></td></tr>"
				   
						tabella = tabella + "</table></div><br>";
						$("#tutto").append(tabella);

						$(document).on("touchstart", "#root_"+ a1[i] +"", function(e){
									  
						  var radicchio = this.id
						  radicchio = radicchio.replace("root_","")
						  
						  if(self.document.form.foglia2.value != ""){
						     document.getElementById("radice2").value = radicchio;
                             document.getElementById("radice").value = "";
							 //$("#radice2").focus()
							 myScroll.scrollToElement("#radice2", "1s");
						  }
						  else{
						     document.getElementById("radice").value = radicchio;
                             document.getElementById("radice2").value = "";
							 //$("#radice").focus()
							 myScroll.scrollToElement("#radice", "1s");
						  }
						  
						  })
					   }
				   
				   }
				   else{
				   	 alert("paginazione massima, ritorno alla ricerca 1")
				     richiesta(0,0)
				   }
				   
				   // end nuovo controllo
				   
				   }
				   
				   
				   if(result.radice!=""){
				   
				   if(result.leafs!=""){
					   
				   	 $("#compra1").hide();
				   $("#compra2").hide();
				   $("#contengo").show();
				   

                   if(result.totalRoot!="0"){
                   
                    var pagina = parseInt(localStorage.getItem("pagina"))
                    var totale = result.totalLeaf
                   
                    var nextPagina = 4
                    var schema2 = 4
                   
                    var pag = "0"
                   
                    var next = totale/nextPagina
                   
                    //alert(next)
                   
                    $("#paginazione").html("<div class='cart_page'><table cellpadding='5' cellspacing='0' border='0' align='center' class='tabella_ordine'><tr><td colspan='2' height='30' align='center'><p id='test'></p></td></tr></table></div>")
                   
                   for (var i=0, l=next; i<l; i++) {
                   
                    pag = i+1
                   
                    if (pag==1){
                   
                        nextPagina = 0
                   
                       if(pagina!=nextPagina){
                           $("#test").append("<a id='pag_"+nextPagina+"'><span class='paginazione_on'>"+pag+"</span></a>")
                   
                           $(document).on("touchstart", "#pag_"+ nextPagina +"", function(e){
                              var paginazione = this.id
                              paginazione = paginazione.replace("pag_","")
                              
                              //alert(paginazione)
                              localStorage.setItem("pagina",paginazione);
                              
                              richiesta(0,paginazione)
                              e.stopImmediatePropagation()
                              return
                              
                              })
                       }
                       else{
                        $("#test").append("<span class='paginazione_off'>"+pag+"</span>")
                       }
                   
                   }
                   
                   else{
                   
                       nextPagina = schema2 + nextPagina
                   
                       if(pagina!=nextPagina){
                       $("#test").append("<a id='pag_"+nextPagina+"'><span class='paginazione_on'>"+pag+"</span></a>")
                   
                       $(document).on("touchstart", "#pag_"+ nextPagina +"", function(e){
                          var paginazione = this.id
                          paginazione = paginazione.replace("pag_","")
                          
                          //alert(paginazione)
                          localStorage.setItem("pagina",paginazione);
                          
                          richiesta(0,paginazione)
                          e.stopImmediatePropagation()
                          return
                          })
                       }
                       else{
                       $("#test").append("<span class='paginazione_off'>"+pag+"</span>")
                       }
                   
                   }
                   }
                   
                   $("#test").append("<a id='pag2_"+nextPagina+"'><div class='paginazione_next'></div></a>")
                   
                   $(document).on("touchstart", "#pag2_"+ nextPagina +"", function(e){
                      var paginazione = this.id
                      paginazione = paginazione.replace("pag2_","")
                      
                      //alert(paginazione)
                      localStorage.setItem("pagina",paginazione);
                      
                      richiesta(0,paginazione)
                      e.stopImmediatePropagation()
                      return
                      
                      })
                   
                   }
					   
				   
					   var risultato = ""
				   
					   var str=$.base64.decode(result.leafs);
					   //alert(str)
				   
					   var a1 = new Array();
				   
					   a1=str.split("|");
				   
					   $("#titoloricerca").html("<div class='cart_page'><table cellpadding='5' cellspacing='0' border='0' align='center' class='tabella_ordine'><p class='titolo_ordine'><b>MICROVERBA ESISTENTI</b></p></td></tr></table>");
				   
					   for (i=0;i<a1.length;i++)
				   
					   {
							var tabella = "<div class='cart_page'><table cellpadding='5' cellspacing='0' border='0' align='center' class='tabella_ordine'>";
				   
						   if(risultato!=a1[i]){
				   
							  tabella = tabella + "<tr><td><span class='text_dati'>"+a1[i]+" :: "+radice3+"</span></td><td width='32'><a id='root_"+a1[i]+"'><img src='img/ico_arrow_dx.png'></a></td></tr>"
						   }

						   tabella = tabella + "</table></div><br>";
						   $("#tutto").append(tabella);
				   
						   $(document).on("touchstart", "#root_"+ a1[i] +"", function(e){
										  
							  var radicchio = this.id
							  radicchio = radicchio.replace("root_","")
							  
							  if(self.document.form.radice2.value != ""){
								document.getElementById("foglia2").value = radicchio;
                                document.getElementById("foglia").value = "";
								myScroll.scrollToElement("#foglia2", "1s");
							  }
							  else{
								document.getElementById("foglia").value = radicchio;
                                document.getElementById("foglia2").value = "";
								myScroll.scrollToElement("#foglia", "1s");
							  }
							  
							})
				   
						   risultato = a1[i]
					   }
				   
				   }
				   else{
				    alert("paginazione massima, ritorno alla ricerca 1")
				    richiesta(0,0)
				   }
				   // end se 0
				   
				   }
				   
				   }
				   
				   }
				   
				   
				   }
				   
				   
				   if(result.Token==1){
					   
					$("#ricerca").show()
					$("#compra1").hide();
				    $("#compra2").hide();
					
					if ((radice3 != "") && (foglia3 != "")) {
                      $("#contengo").hide();
                    }
				   
				   //PROGETTO
				   
				   var tabella = "<table width='90%' align='center' border='0'>";
				   
				   if(result.pr_pric==""){
				   
					   if((result.project_lock=="")||(result.project_lock==$.base64.encode(pswp))){
				   
						   if(result.pric==""){
				   
							   if((result.lock=="")||(result.lock==$.base64.encode(pswm))){
				   
							   		var lock="unlock.png";
				   
				   					tabella = tabella + "<tr><td align='left' width='150'><div class='titolo_div_contenuti'><span class='titolo_testo_albero'>"+$.base64.decode(result.project)+"</span><a id='vediinfo'><div class='ico_info'></div></a></div></td></tr>"
				   
				   
				   					$("#_sblocca_mic").hide();
									$("#_ident_prezzo_nome").hide();
									$("#eurmic").hide();
				   
				   					$("#testoinfoprogetto").html($.base64.decode(result.project_description))
				   					$("#testoinfomicro").html($.base64.decode(result.description_microverba))
				   
				   					//<img src='img/"+lock+"' width='40'></td><td align='left' width='100%'> "+$.base64.decode(result.messaggio)+" </td></tr><tr><td align='left' width='150'>Progetto: </td><td align='left' width='100%'>"+$.base64.decode(result.project)+"</td></tr><tr><td align='left' width='150'>Descrizione Progetto: </td><td align='left' width='100%'>"+$.base64.decode(result.description_microverba)+"
							   }
							   else{
				   
								var lock_microverba ="cart.png";
				   
								//PASSWORD MICROVERBA

								//tabella = tabella + "<tr><td align='center' width='100%' colspan='2'><a id='_sblocca_prj'>SBLOCCA MICROVERBA</a></td><td align='left' width='100%'></td></tr>"
				   
				   				tabella = tabella + "<tr><td align='left' width='150'><div class='titolo_div_contenuti'><span class='titolo_testo_albero'>"+$.base64.decode(result.messaggio)+"</span><a id='vediinfo'><div class='ico_info'></div></a></div></td></tr>"
				   
				   				$("#_sblocca_mic").show();
				   				$("#testoinfoprogetto").html($.base64.decode(result.project_description))
				   				$("#testoinfomicro").html($.base64.decode(result.description_microverba))
				   
							   }
				   
						   }
						   else{
							   var lock_microverba ="cart.png";
				   
							   //tabella = tabella + "<tr><td align='left' width='150'><a id='_ident_prezzo_nome'> <img src='img/"+lock_microverba+"' width='40'></a></td><td align='left' width='100%'>"+$.base64.decode(result.messaggio)+"</td></tr><tr><td align='left' width='120'> Prezzo: </td><td align='left' width='100%'>"+$.base64.decode(result.pric)+" </td></tr><tr><td align='left' width='120'>Microverba: </td><td align='left' width='100%'>"+$.base64.decode(result.description_microverba)+"</td></tr>"
				   
				   				tabella = tabella + "<tr><td align='left' width='150'><div class='titolo_div_contenuti'><span class='titolo_testo_albero'>"+$.base64.decode(result.messaggio)+"</span><a id='vediinfo'><div class='ico_info'></div></a></div></td></tr>"
				   
				                //<a id='_ident_prezzo_nome'><div class='ico_buy'></div></a><br><div class='euro'>€ "+$.base64.decode(result.pric)+"</div>
				   
				   				$("#_ident_prezzo_nome").show();
				   				$("#eurmic").show();
				   				$("#eurmic").html("€ "+$.base64.decode(result.pric)+"");
				   
				   				$("#testoinfoprogetto").html($.base64.decode(result.project_description))
				   				$("#testoinfomicro").html($.base64.decode(result.description_microverba))
							}
				   
					   }
					   else{
						   var lock_progetto ="cart.png";
						   //$("#prolock").show()
				   
						    //tabella = tabella + "<tr><td align='center' width='100%' colspan='2'><a id='_sblocca_prj'>SBLOCCA PROGETTO</a></td><td align='left' width='100%'></td></tr>"
				   
				   			tabella = tabella + "<tr><td align='left' width='150'><div class='titolo_div_contenuti'><span class='titolo_testo_albero'>"+$.base64.decode(result.project)+"</span><a id='vediinfo'><div class='ico_info'></div></a><a id='_sblocca_prj'><div class='ico_lock_microverba'></div></a></div></td></tr><tr><td align='left' width='150'></td></tr>"
				   
				   			$("#testoinfoprogetto").html($.base64.decode(result.project_description))
				   			$("#testoinfomicro").html($.base64.decode(result.description_microverba))
					   }
				   
				   }
				   else{
					   var lock_progetto ="cart.png";
				   
					   //tabella = tabella + "<tr><td align='left' width='150'><a id='pr_ident_prezzo_nome'> <img src='img/"+lock_progetto+"' width='40'></a></td><td align='left' width='100%'></td></tr><tr><td align='left' width='120'> Prezzo: </td><td align='left' width='100%'>"+$.base64.decode(result.pr_pric)+" </td></tr><tr><td align='left' width='120'>Progetto: </td><td align='left' width='100%'>"+$.base64.decode(result.project_description)+"</td></tr>"
				   
					   tabella = tabella + "<tr><td align='left' width='150'><div class='titolo_div_contenuti'><span class='titolo_testo_albero'>"+$.base64.decode(result.project)+"</span><a id='vediinfo'><div class='ico_info'></div></a><a id='pr_ident_prezzo_nome'><div class='ico_buy'></div></a><br><div class='euro'>€ "+$.base64.decode(result.pr_pric)+"</div></div></td></tr>"
				   
					   $("#testoinfoprogetto").html($.base64.decode(result.project_description))
					   $("#testoinfomicro").html($.base64.decode(result.description_microverba))
				   
				   }
				   
				   tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
				   
				   $("#tutto").append(tabella);
				   
				   
				   $(document).on("touchstart", "#_ident_prezzo_nome", function(e){
								  
								  var ident = result.iden
								  var prezzo = $.base64.decode(result.pric)
								  var nome = $.base64.decode(result.description_microverba)
								  
								  //alert(ident + " " + prezzo + " " + nome)
								  
								  agg2(ident,prezzo,nome,"m")
								  
				  });
				   
				   $(document).on("touchstart", "#pr_ident_prezzo_nome", function(e){
								  
								  var ident = result.pr_iden
								  var prezzo = $.base64.decode(result.pr_pric)
								  var nome = $.base64.decode(result.project_description)
								  
								  //alert(ident + " " + prezzo + " " + nome)
								  
								  agg2(ident,prezzo,nome,"p")
								  
				  });
				   
				   
				   $(document).on("touchstart", "#_sblocca_prj", function(e){
								  
					  $("#prolock").show()
					  
					   var selectField = document.getElementById('pswp');
					 
					  selectField.addEventListener('touchstart', function(e)
					  {
						e.stopPropagation();
					  }, false);
					  
					  
					   //$("#pswp").focus()

					});
					
								  
					$(document).on("touchstart", "#_sblocca_mic", function(e){
					  
					 $("#miclock").show()
					 
					 var myScroll33;
					 
					 
					 var selectField = document.getElementById('pswm');
					 
					  selectField.addEventListener('touchstart', function(e)
					  {
						e.stopPropagation();
					  }, false);
					  
					  
					  //$("#pswm").focus()
		   
					  
					});
				   
				   
				   // YOU TUBE
				   if(result.YT === null || typeof(result.YT) == 'undefined' || result.YT=="null" || result.YT==""){
				   
				   }
				   else{
				   
				   
				   for (var i=0, l=30; i<l; i++) {
				   
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
				   
				   
				   ciccio = "YT_desc_"+i
				   
				   /*urlvideo = "VA_cont_"+i
					
					urlaudio = "FA_cont_"+i
					
					paginaweb = "PW_cont_"+i
					
					paginafb = "FB_cont_"+i
					
					urltwitter = "TW_cont_"+i
					
					urlinstagram = "IG_cont_"+i*/
				   
				   if(result[ciccio] === null || typeof(result[ciccio]) == 'undefined' || result[ciccio]=="null" || result[ciccio]==""){
				   
				   }
				   else{
				   
				   var tabella = "<table width='90%' align='center' class='tabella_contenuti'>";
				   
				   paperino = "YT_cont_"+i
				   descyt = "YT_desc_"+i
				   nomeYT = "YT_nome_"+i
				   identYT = "YT_iden_"+i
				   prezzoYT = "YT_pric_"+i
				   
				   
				   pswYT = "YT_lock_"+i
				   
				   if(lock_progetto!="cart.png"){
					   if(lock_microverba=="cart.png"){
				   
						   lock="cart.png";
				   
						   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_youtube.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descyt])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
					   }
					   else{
				   
						   if(result[prezzoYT] === null || typeof(result[prezzoYT]) == 'undefined' || result[prezzoYT]=="null" || result[prezzoYT]==""){

								if((result[pswYT]=="")||(result[pswYT]==$.base64.encode(pswYTT))){
				   
									 lock="unlock.png";
				   
									 tabella = tabella + "<tr><td align='left' width='60'><a id='"+paperino+"'><img src='img/ico_youtube.png' class='icona_contenuti'></a></td><td colspan='2'><span class='testo_contenuti'>"+$.base64.decode(result[descyt])+"</span></td></tr>"

								}
								else{
								  tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_youtube.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'><input id='fff_"+pswYT+"' name='password' class='testo_contenuti_pw' placeholder='password' readonly></span></td><td align='right' width='40'></td></tr>"
				                   //<a id='fff_"+pswYT+"'><div class='ico_lock_microverba'></div></a>

								}
						   }
						   else{
							   lock="cart.png";
				   
							   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_youtube.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'> "+$.base64.decode(result[descyt])+"</span></td><td align='center' width='40'><a id='piu"+ identYT +"piu"+ prezzoYT +"piu"+ nomeYT +"'> <div class='ico_cart'></div></a><br><span class='testo_contenuti'>"+result[prezzoYT]+"€</span></td></tr>"
							   
						   }
					  }
				   }
				   else{
						   lock="cart.png";
				   
						   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_youtube.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descyt])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   
				   }
				   
				   
				   $("#testvideo").append(tabella);
				   
				   
				   $(document).on("touchstart", "#"+paperino+"", function(e){
								  
						passo(this.id) // passare la variabile in una nuova funzione
								  
					});
				   
				   // SBLOCCA
				   
				   
				   $(document).on("touchstart", "#fff_"+pswYT+"", function(e){
								  
					  var nomefun = this.id
					  nomefun = nomefun.replace("fff_","")
							  
					  $("#prolock").hide()
					  $("#miclock").hide()
					  $("#contlock").show()
							  
					  $("#pswVAA").attr("type","hidden")
					  $("#pswFAA").attr("type","hidden")
					  $("#pswPWW").attr("type","hidden")
					  $("#pswFBB").attr("type","hidden")
					  $("#pswTFF").attr("type","hidden")
					  $("#pswTWW").attr("type","hidden")
					  $("#pswIGG").attr("type","hidden")
					  $("#pswUSS").attr("type","hidden")
					  $("#pswSVV").attr("type","hidden")
					  $("#pswSAA").attr("type","hidden")
					  $("#pswTMM").attr("type","hidden")
					  $("#pswEMM").attr("type","hidden")
					  $("#pswUII").attr("type","hidden")
					  $("#pswUDD").attr("type","hidden")
					  $("#pswUAA").attr("type","hidden")
					  $("#pswUVV").attr("type","hidden")
					   
					  $("#pswYTT").attr("type","text")
							  
					   localStorage.setItem("pagina",pagina);
					   localStorage.setItem("pagina1",pagina1);
							  
					   
					   //$("#pswYTT").focus()
								  
 				  });
				   
				   
				   $(document).on("touchstart", "#piu"+ identYT +"piu"+ prezzoYT +"piu"+ nomeYT +"", function(e){
								  
								  //alert(this.id)
								  
								  //SPLIT
								  var str=this.id;
								  
								  var a1 = new Array();
								  
								  a1=str.split("piu");
								  
								  agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]),"c")
								  
								  /*for (i=0;i<a1.length;i++)
								   {
								   alert(a1[1]);3
								   }*/
								  
					  });
				   
				   
				   function passo(eccola){
				   
				   var pageNumber = 1;
				   eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
				   //alert(link1);
				   
				   var ref = window.open(link1, '_blank', 'location=no');
				   
				   }
				   
				   
				   }
				   
				   
				   }
				   
				   function passoV(eccolaV){
				   
				   alert(result[eccolaV])
				   
				   }
				   
	
				   
				   }
				   
				   
				   // URL VIDEO
				   if(result.VA === null || typeof(result.VA) == 'undefined' || result.VA=="null" || result.VA==""){
				   
				   }
				   else{
				   
				   for (var i=0, l=30; i<l; i++) {
				   
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
				   
				   
				   urlvideo = "VA_desc_"+i
				   
				   /*
					
					urlaudio = "FA_cont_"+i
					
					paginaweb = "PW_cont_"+i
					
					paginafb = "FB_cont_"+i
					
					urltwitter = "TW_cont_"+i
					
					urlinstagram = "IG_cont_"+i*/
				   
				   if(result[urlvideo] === null || typeof(result[urlvideo]) == 'undefined' || result[urlvideo]=="null" || result[urlvideo]==""){
				   
				   }
				   else{
				   
				   var tabella = "<table width='90%' align='center' class='tabella_contenuti'>";
				   
				   paperino = "VA_cont_"+i
				   descva = "VA_desc_"+i
				   prezzoVA = "VA_pric_"+i
				   nomeVA = "VA_nome_"+i
				   identVA = "VA_iden_"+i
				   
				   pswVA = "VA_lock_"+i
				   
				  
				  if(lock_progetto!="cart.png"){
					   if(lock_microverba=="cart.png"){
				   
						   lock="cart.png";
				   
						   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_video.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descva])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
					   }
					   else{
				   
						   if(result[prezzoVA] === null || typeof(result[prezzoVA]) == 'undefined' || result[prezzoVA]=="null" || result[prezzoVA]==""){
				   
							   if((result[pswVA]=="")||(result[pswVA]==$.base64.encode(pswVAA))){
				   
								   lock="unlock.png";
				   
								   tabella = tabella + "<tr><td align='left' width='60'><a id='"+paperino+"'><img src='img/ico_video.png' class='icona_contenuti'></a></td><td colspan='2'><span class='testo_contenuti'>"+$.base64.decode(result[descva])+"</span></td></tr>"
				   
							   }
							   else{
							   	tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_video.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'><input id='fff_"+pswVA+"' name='password' class='testo_contenuti_pw' placeholder='password' readonly></span></td><td align='right' width='40'></td></tr>"
				   
							   }
						   }
						   else{
						   lock="cart.png";
					   
						   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_video.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'> "+$.base64.decode(result[descva])+"</span></td><td align='center' width='40'><a id='piu"+ identVA +"piu"+ prezzoVA +"piu"+ nomeVA +"'> <div class='ico_cart'></div></a><br><span class='testo_contenuti'>"+result[prezzoVA]+"€</span></td></tr>"
						   
						   }
					   }
				   }
				   else{
					   lock="cart.png";
				   
					   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_video.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descva])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   
				   } 
				  
				   
				   $("#testvideo").append(tabella);
				   
				   
				   $(document).on("touchstart", "#"+paperino+"", function(e){
								  
						passo2(this.id) // passare la variabile in una nuova funzione
								  
					});
				   
				   
				   $(document).on("touchstart", "#fff_"+pswVA+"", function(e){
								  
						  var nomefun = this.id
						  nomefun = nomefun.replace("fff_","")
								  
						  $("#prolock").hide()
						  $("#miclock").hide()
								  
						  $("#contlock").show()
								  
						  $("#pswVAA").attr("type","text")
						  $("#pswYTT").attr("type","hidden")
						  $("#pswFAA").attr("type","hidden")
						  $("#pswPWW").attr("type","hidden")
						  $("#pswFBB").attr("type","hidden")
						  $("#pswTFF").attr("type","hidden")
						  $("#pswTWW").attr("type","hidden")
						  $("#pswIGG").attr("type","hidden")
						  $("#pswUSS").attr("type","hidden")
						  $("#pswSVV").attr("type","hidden")
						  $("#pswSAA").attr("type","hidden")
						  $("#pswTMM").attr("type","hidden")
						  $("#pswEMM").attr("type","hidden")
						  $("#pswUII").attr("type","hidden")
						  $("#pswUDD").attr("type","hidden")
						  $("#pswUAA").attr("type","hidden")
						  $("#pswUVV").attr("type","hidden")
						  
						  $("#pswVAA").attr("type","text")
								  
						  localStorage.setItem("pagina",pagina);
						  localStorage.setItem("pagina1",pagina1);
								  
								  
						  //$("#pswVAA").focus()
								  
								  
					  });
				   
				   $(document).on("touchstart", "#piu"+ identVA +"piu"+ prezzoVA +"piu"+ nomeVA +"", function(e){
								  
								 // //alert(this.id)
								  
								  //SPLIT
								  var str=this.id;
								  
								  var a1 = new Array();
								  
								  a1=str.split("piu");
								  
								  agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]),"c")
								  
								  });
				   
				   
				    function passo2(eccola){
				   
				    alert(eccola)
				   
					 //alert($.base64.decode(result[eccola]))
				   
				     var pageNumber = 1;
				     eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
				     //alert(link1);
				   
				     var ref = window.open(link1, '_blank', 'location=no');
				   
				    }
				   

				   }
				   
				   
				   }
				   

				   }
				   
				   
				   // URL AUDIO
				   if(result.FA === null || typeof(result.FA) == 'undefined' || result.FA=="null" || result.FA==""){
				   
				   }
				   else{
				   
				   for (var i=0, l=30; i<l; i++) {
				   
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
				   
				   
				   urlaudio = "FA_desc_"+i
				   
				   /*
					paginaweb = "PW_cont_"+i
					
					paginafb = "FB_cont_"+i
					
					urltwitter = "TW_cont_"+i
					
					urlinstagram = "IG_cont_"+i*/
				   
				   if(result[urlaudio] === null || typeof(result[urlaudio]) == 'undefined' || result[urlaudio]=="null" || result[urlaudio]==""){
				   
				   }
				   else{
				   
				   var tabella = "<table width='90%' align='center' class='tabella_contenuti'>";
				   
				   paperino = "FA_cont_"+i
				   descfa = "FA_desc_"+i
				   prezzoFA = "FA_pric_"+i
				   nomeFA = "FA_nome_"+i
				   identFA = "FA_iden_"+i
				   
				   pswFA = "FA_lock_"+i
				   
				  if(lock_progetto!="cart.png"){
				   if(lock_microverba=="cart.png"){
				   
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_audio.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descfa])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   }
				   else{
				   
				   if(result[prezzoFA] === null || typeof(result[prezzoFA]) == 'undefined' || result[prezzoFA]=="null" || result[prezzoFA]==""){
				   
				   if((result[pswFA]=="")||(result[pswFA]==$.base64.encode(pswFAA))){
				   
				   lock="unlock.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='"+paperino+"'><img src='img/ico_audio.png' class='icona_contenuti'></a></td><td colspan='2'><span class='testo_contenuti'>"+$.base64.decode(result[descfa])+"</span></td></tr>"
				   
				   }
				   else{
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_audio.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'><input id='fff_"+pswFA+"' name='password' class='testo_contenuti_pw' placeholder='password' readonly></span></td><td align='right' width='40'></td></tr>"
				   
				   }
				   }
				   else{
				   lock="cart.png";
				   
				    tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_audio.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'> "+$.base64.decode(result[descfa])+"</span></td><td align='center' width='40'><a id='piu"+ identFA +"piu"+ prezzoFA +"piu"+ nomeFA +"'> <div class='ico_cart'></div></a><br><span class='testo_contenuti'>"+result[prezzoFA]+"€</span></td></tr>"
				   }
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_audio.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descfa])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   
				   }
				   
				   
				   $("#testvideo").append(tabella);
				   
				   
				   $(document).on("touchstart", "#"+paperino+"", function(e){
								  
								  passo3(this.id) // passare la variabile in una nuova funzione
								  
								  });
				   
				   $(document).on("touchstart", "#fff_"+pswFA+"", function(e){
								  
								  var nomefun = this.id
								  nomefun = nomefun.replace("fff_","")
								  
								  $("#prolock").hide()
								  $("#miclock").hide()
								  $("#contlock").show()
								  
								  $("#pswVAA").attr("type","hidden")
								  $("#pswYTT").attr("type","hidden")
								  $("#pswPWW").attr("type","hidden")
								  $("#pswFBB").attr("type","hidden")
								  $("#pswTFF").attr("type","hidden")
								  $("#pswTWW").attr("type","hidden")
								  $("#pswIGG").attr("type","hidden")
								  $("#pswUSS").attr("type","hidden")
								  $("#pswSVV").attr("type","hidden")
								  $("#pswSAA").attr("type","hidden")
								  $("#pswTMM").attr("type","hidden")
								  $("#pswEMM").attr("type","hidden")
								  $("#pswUII").attr("type","hidden")
								  $("#pswUDD").attr("type","hidden")
								  $("#pswUAA").attr("type","hidden")
								   $("#pswUVV").attr("type","hidden")
								   
								  $("#pswFAA").attr("type","text")
								  
								  localStorage.setItem("pagina",pagina);
								  localStorage.setItem("pagina1",pagina1);
								  
								  //$("#pswFAA").focus()
								  
								  
								  });
				   
				   $(document).on("touchstart", "#piu"+ identFA +"piu"+ prezzoFA +"piu"+ nomeFA +"", function(e){
								  
								  ////alert(this.id)
								  
								  //SPLIT
								  var str=this.id;
								  
								  var a1 = new Array();
								  
								  a1=str.split("piu");
								  
								  agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]),"c")
								  
								  });
				   
				   
				   }
				   
				   
				   }
				   
				   
				   
				   function passo3(eccola){
				   
				   var pageNumber = 1;
				   eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
				   //alert(link1);
				   
				   var ref = window.open(link1, '_blank', 'location=no');
				   
				   }
				   
				   
				   }
				   
				   // URL Pagina Web
				   if(result.PW === null || typeof(result.PW) == 'undefined' || result.PW=="null" || result.PW==""){
				   
				   }
				   else{
				   
				   for (var i=0, l=30; i<l; i++) {
				   
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
				   
				   
				   paginaweb = "PW_desc_"+i
				   
				   /*
					
					
					paginafb = "FB_cont_"+i
					
					urltwitter = "TW_cont_"+i
					
					urlinstagram = "IG_cont_"+i*/
				   
				   if(result[paginaweb] === null || typeof(result[paginaweb]) == 'undefined' || result[paginaweb]=="null" || result[paginaweb]==""){
				   
				   }
				   else{
				   
				   var tabella = "<table width='90%' align='center' class='tabella_contenuti'>";
				   
				   paperino = "PW_cont_"+i
				   descpw = "PW_desc_"+i
				   
				   prezzoPW = "PW_pric_"+i
				   nomePW = "PW_nome_"+i
				   identPW = "PW_iden_"+i
				   
				   pswPW = "PW_lock_"+i
				   
				   
				   if(lock_progetto!="cart.png"){
				   if(lock_microverba=="cart.png"){
				   
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_www.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descfa])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   }
				   else{
				   
				   if(result[prezzoPW] === null || typeof(result[prezzoPW]) == 'undefined' || result[prezzoPW]=="null" || result[prezzoPW]==""){
				   
				   if((result[pswPW]=="")||(result[pswPW]==$.base64.encode(pswPWW))){
				   
				   lock="unlock.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='"+paperino+"'><img src='img/ico_www.png' class='icona_contenuti'></a></td><td colspan='2'><span class='testo_contenuti'>"+$.base64.decode(result[descpw])+"</span></td></tr>"
				   
				   }
				   else{
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_www.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'><input id='fff_"+pswPW+"' name='password' class='testo_contenuti_pw' placeholder='password' readonly></span></td><td align='right' width='40'></td></tr>"
				   
				   }
				   }
				   else{
				   lock="cart.png";
				   			   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_www.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'> "+$.base64.decode(result[descpw])+"</span></td><td align='center' width='40'><a id='piu"+ identPW +"piu"+ prezzoPW +"piu"+ nomePW +"'> <div class='ico_cart'></div></a><br><span class='testo_contenuti'>"+result[prezzoPW]+"€</span></td></tr>"
				   
				   }
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_www.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descpw])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   
				   }
				   
				   
				   $("#testvideo").append(tabella);
				   
				   
				   $(document).on("touchstart", "#"+paperino+"", function(e){
								  
								  passo4(this.id) // passare la variabile in una nuova funzione
								  
								  });
								  
								  
					$(document).on("touchstart", "#fff_"+pswPW+"", function(e){
								  
								  var nomefun = this.id
								  nomefun = nomefun.replace("fff_","")
								  
								  $("#prolock").hide()
								  $("#miclock").hide()
								  $("#contlock").show()
								  
								  $("#pswVAA").attr("type","hidden")
								  $("#pswYTT").attr("type","hidden")
								  $("#pswFAA").attr("type","hidden")
								  $("#pswFBB").attr("type","hidden")
								  $("#pswTFF").attr("type","hidden")
								  $("#pswTWW").attr("type","hidden")
								  $("#pswIGG").attr("type","hidden")
								  $("#pswUSS").attr("type","hidden")
								  $("#pswSVV").attr("type","hidden")
								  $("#pswSAA").attr("type","hidden")
								  $("#pswTMM").attr("type","hidden")
								  $("#pswEMM").attr("type","hidden")
								  $("#pswUII").attr("type","hidden")
								  $("#pswUDD").attr("type","hidden")
								  $("#pswUAA").attr("type","hidden")
								   $("#pswUVV").attr("type","hidden")
								   
								  $("#pswPWW").attr("type","text")
								  
								  
								  localStorage.setItem("pagina",pagina);
								  localStorage.setItem("pagina1",pagina1);
								  
								  
								  //$("#pswPWW").focus()
								  
					});
					
				   
				   $(document).on("touchstart", "#piu"+ identPW +"piu"+ prezzoPW +"piu"+ nomePW +"", function(e){
								  
								  //alert(this.id)
								  
								  //SPLIT
								  var str=this.id;
								  
								  var a1 = new Array();
								  
								  a1=str.split("piu");
								  
								  agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]),"c")
								  
					});
				   
				   }
				   
				   
				   }
				   
				   
				   
				   function passo4(eccola){
				   
				   var pageNumber = 1;
				   eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
				  //alert(link1);
				   
				   var ref = window.open(link1, '_blank', 'location=no');
				   
				   }
				   
				   
				   }
				   
				   
				   // URL Pagina facebook
				   if(result.FB === null || typeof(result.FB) == 'undefined' || result.FB=="null" || result.FB==""){
				   
				   }
				   else{
				   
				   for (var i=0, l=30; i<l; i++) {
				   
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
				   
				   
				   paginafb = "FB_desc_"+i
				   
				   /*
					
					urltwitter = "TW_cont_"+i
					
					urlinstagram = "IG_cont_"+i*/
				   
				   if(result[paginafb] === null || typeof(result[paginafb]) == 'undefined' || result[paginafb]=="null" || result[paginafb]==""){
				   
				   }
				   else{
				   
				   var tabella = "<table width='90%' align='center' class='tabella_contenuti'>";
				   
				   paperino = "FB_cont_"+i
				   descfb = "FB_desc_"+i
				   
				   prezzoFB = "FB_pric_"+i
				   nomeFB = "FB_nome_"+i
				   identFB = "FB_iden_"+i
				   
				   pswFB = "FB_lock_"+i

				   
				   if(lock_progetto!="cart.png"){
				   if(lock_microverba=="cart.png"){
				   
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_facebook.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descfb])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   }
				   else{
				   
				   if(result[prezzoFB] === null || typeof(result[prezzoFB]) == 'undefined' || result[prezzoFB]=="null" || result[prezzoFB]==""){
				   
				   if((result[pswFB]=="")||(result[pswFB]==$.base64.encode(pswFBB))){
				   
				   lock="unlock.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='"+paperino+"'><img src='img/ico_facebook.png' class='icona_contenuti'></a></td><td colspan='2'><span class='testo_contenuti'>"+$.base64.decode(result[descfb])+"</span></td></tr>"
				   
				   }
				   else{
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_facebook.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'><input id='fff_"+pswFB+"' name='password' class='testo_contenuti_pw' placeholder='password' readonly></span></td><td align='right' width='40'></td></tr>"
				   
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_facebook.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'> "+$.base64.decode(result[descfb])+"</span></td><td align='center' width='40'><a id='piu"+ identFB +"piu"+ prezzoFB +"piu"+ nomeFB +"'> <div class='ico_cart'></div></a><br><span class='testo_contenuti'>"+result[prezzoFB]+"€</span></td></tr>"
				   }
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_facebook.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descfb])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   
				   }
				   
				   $("#testvideo").append(tabella);
				   
				   
				   $(document).on("touchstart", "#"+paperino+"", function(e){
								  
								  passo5(this.id) // passare la variabile in una nuova funzione
								  
								  });
								  
					$(document).on("touchstart", "#fff_"+pswFB+"", function(e){
								  
								  var nomefun = this.id
								  nomefun = nomefun.replace("fff_","")
								  
								  $("#prolock").hide()
								  $("#miclock").hide()
								  $("#contlock").show()
								  
								  $("#pswVAA").attr("type","hidden")
								  $("#pswYTT").attr("type","hidden")
								  $("#pswFAA").attr("type","hidden")
								  $("#pswPWW").attr("type","hidden")
								  $("#pswTFF").attr("type","hidden")
								  $("#pswTWW").attr("type","hidden")
								  $("#pswIGG").attr("type","hidden")
								  $("#pswUSS").attr("type","hidden")
								  $("#pswSVV").attr("type","hidden")
								  $("#pswSAA").attr("type","hidden")
								  $("#pswTMM").attr("type","hidden")
								  $("#pswEMM").attr("type","hidden")
								  $("#pswUII").attr("type","hidden")
								  $("#pswUDD").attr("type","hidden")
								  $("#pswUAA").attr("type","hidden")
								   $("#pswUVV").attr("type","hidden")
								   
								  $("#pswFBB").attr("type","text")
								  
								  
								  localStorage.setItem("pagina",pagina);
								  localStorage.setItem("pagina1",pagina1);
								  
								  
								  //$("#pswFBB").focus()
								  
								  
								  });
				   
				   $(document).on("touchstart", "#piu"+ identFB +"piu"+ prezzoFB +"piu"+ nomeFB +"", function(e){
								  
								  //alert(this.id)
								  
								  //SPLIT
								  var str=this.id;
								  
								  var a1 = new Array();
								  
								  a1=str.split("piu");
								  
								  agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]),"c")
								  
								  
								  
								  });
				   
				   
				   }
				   
				   
				   }
				   

				   function passo5(eccola){
				   
				   var pageNumber = 1;
				   eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
				  //alert(link1);
				   
				   var ref = window.open(link1, '_blank', 'location=no');
				   
				   }
				   
				   
				   }
				   
				   // Telefono fisso
				   if(result.TF === null || typeof(result.TF) == 'undefined' || result.TF=="null" || result.TF==""){
				   
				   }
				   else{
				   
				   for (var i=0, l=30; i<l; i++) {
				   
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
				   
				   
				   telefono = "TF_desc_"+i
				   
				   /*
					
					urltwitter = "TW_cont_"+i
					
					urlinstagram = "IG_cont_"+i*/
				   
				   if(result[telefono] === null || typeof(result[telefono]) == 'undefined' || result[telefono]=="null" || result[telefono]==""){
				   
				   }
				   else{
				   
				   var tabella = "<table width='90%' align='center' class='tabella_contenuti'>";
				   
				   paperino = "TF_cont_"+i
				   desctf = "TF_desc_"+i
				   
				   prezzoTF = "TF_pric_"+i
				   nomeTF = "TF_nome_"+i
				   identTF = "TF_iden_"+i
				   
				   pswTF = "TF_lock_"+i
				   
				    if(lock_progetto!="cart.png"){
				   if(lock_microverba=="cart.png"){
				   
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_telephone.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[desctf])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   }
				   else{
				   
				   if(result[prezzoTF] === null || typeof(result[prezzoTF]) == 'undefined' || result[prezzoTF]=="null" || result[prezzoTF]==""){
				   
				   if((result[pswTF]=="")||(result[pswTF]==$.base64.encode(pswTFF))){
				   
				   lock="unlock.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='"+paperino+"'><img src='img/ico_telephone.png' class='icona_contenuti'></a></td><td colspan='2'><span class='testo_contenuti'>"+$.base64.decode(result[desctf])+"</span></td></tr>"
				   
				   }
				   else{
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_telephone.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'><input id='fff_"+pswTF+"' name='password' class='testo_contenuti_pw' placeholder='password' readonly></span></td><td align='right' width='40'></td></tr>"
				   
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_telephone.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'> "+$.base64.decode(result[desctf])+"</span></td><td align='center' width='40'><a id='piu"+ identTF +"piu"+ prezzoTF +"piu"+ nomeTF +"'> <div class='ico_cart'></div></a><br><span class='testo_contenuti'>"+result[prezzoTF]+"€</span></td></tr>"
				   }
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_telephone.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[desctf])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   
				   }
				   
				   $("#testvideo").append(tabella);
				   
				   
				   $(document).on("touchstart", "#"+paperino+"", function(e){
								  
								  passo6(this.id) // passare la variabile in una nuova funzione
								  
								  });
								  
					$(document).on("touchstart", "#fff_"+pswTF+"", function(e){
								  
								  var nomefun = this.id
								  nomefun = nomefun.replace("fff_","")
								  
								  $("#prolock").hide()
								  $("#miclock").hide()
								  $("#contlock").show()
								  
								  $("#pswVAA").attr("type","hidden")
								  $("#pswYTT").attr("type","hidden")
								  $("#pswFAA").attr("type","hidden")
								  $("#pswPWW").attr("type","hidden")
								  $("#pswFBB").attr("type","hidden")
								  $("#pswTWW").attr("type","hidden")
								  $("#pswTFF").attr("type","text")
								  $("#pswIGG").attr("type","hidden")
								  $("#pswUSS").attr("type","hidden")
								  $("#pswSVV").attr("type","hidden")
								  $("#pswSAA").attr("type","hidden")
								  $("#pswTMM").attr("type","hidden")
								  $("#pswEMM").attr("type","hidden")
								  $("#pswUII").attr("type","hidden")
								  $("#pswUDD").attr("type","hidden")
								  $("#pswUAA").attr("type","hidden")
								  $("#pswUVV").attr("type","hidden")
								  
								  $("#pswTFF").attr("type","text")
								  
								  
								  localStorage.setItem("pagina",pagina);
								  localStorage.setItem("pagina1",pagina1);
								  
								  
								  //$("#pswTFF").focus()
								  
								  
								  });			  
								  
				   
				   
				   $(document).on("touchstart", "#piu"+ identTF +"piu"+ prezzoTF +"piu"+ nomeTF +"", function(e){
								  
								  //alert(this.id)
								  
								  //SPLIT
								  var str=this.id;
								  
								  var a1 = new Array();
								  
								  a1=str.split("piu");
								  
								  agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]),"c")
								  
								  });
				   
				   }
				   
				   
				   }
				   
				   
				   
				   function passo6(eccola){
				   
				   var pageNumber = 1;
				   eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
				  //alert(link1);
				   
				   window.location.href = "tel:"+link1+"";
				   
				   }
				   
				   
				   }
				   
				   // Twitter
				   if(result.TW === null || typeof(result.TW) == 'undefined' || result.TW=="null" || result.TW==""){
				   
				   }
				   else{
				   
				   for (var i=0, l=30; i<l; i++) {
				   
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
				   
				   
				   twitter = "TW_desc_"+i
				   
				   
				   if(result[twitter] === null || typeof(result[twitter]) == 'undefined' || result[twitter]=="null" || result[twitter]==""){
				   
				   }
				   else{
				   
				   var tabella = "<table width='90%' align='center' class='tabella_contenuti'>";
				   
				   paperino = "TW_cont_"+i
				   desctw = "TW_desc_"+i
				   
				   prezzoTW = "TW_pric_"+i
				   nomeTW = "TW_nome_"+i
				   identTW = "TW_iden_"+i
				   
				   pswTW = "TW_lock_"+i
				   
				   
				   if(lock_progetto!="cart.png"){
				   if(lock_microverba=="cart.png"){
				   
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_twitter.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[desctw])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   }
				   else{
				   
				   if(result[prezzoTW] === null || typeof(result[prezzoTW]) == 'undefined' || result[prezzoTW]=="null" || result[prezzoTW]==""){
				   
				   if((result[pswTW]=="")||(result[pswTW]==$.base64.encode(pswTWW))){
				   
				   lock="unlock.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='"+paperino+"'><img src='img/ico_twitter.png' class='icona_contenuti'></a></td><td colspan='2'><span class='testo_contenuti'>"+$.base64.decode(result[desctw])+"</span></td></tr>"
				   
				   }
				   else{
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_twitter.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'><input id='fff_"+pswTW+"' name='password' class='testo_contenuti_pw' placeholder='password' readonly></span></td><td align='right' width='40'></td></tr>"
				   
				   }
				   }
				   else{
				   lock="cart.png";
				   			   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_twitter.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'> "+$.base64.decode(result[desctw])+"</span></td><td align='center' width='40'><a id='piu"+ identTW +"piu"+ prezzoTW +"piu"+ nomeTW +"'> <div class='ico_cart'></div></a><br><span class='testo_contenuti'>"+result[prezzoTW]+"€</span></td></tr>"
				   }
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_twitter.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[desctw])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   
				   }
				   
				   $("#testvideo").append(tabella);
				   
				   
				   $(document).on("touchstart", "#"+paperino+"", function(e){
								  
								  passo7(this.id) // passare la variabile in una nuova funzione
								  
								  });
								  
					$(document).on("touchstart", "#fff_"+pswTW+"", function(e){
								  
						  var nomefun = this.id
						  nomefun = nomefun.replace("fff_","")
						  
						  $("#prolock").hide()
						  $("#miclock").hide()
						  $("#contlock").show()
						  
						  $("#pswVAA").attr("type","hidden")
						  $("#pswYTT").attr("type","hidden")
						  $("#pswFAA").attr("type","hidden")
						  $("#pswPWW").attr("type","hidden")
						  $("#pswFBB").attr("type","hidden")
						  $("#pswTFF").attr("type","hidden")
						  $("#pswIGG").attr("type","hidden")
						  $("#pswUSS").attr("type","hidden")
						  $("#pswSVV").attr("type","hidden")
						  $("#pswSAA").attr("type","hidden")
						  $("#pswTMM").attr("type","hidden")
						  $("#pswEMM").attr("type","hidden")
						  $("#pswUII").attr("type","hidden")
						  $("#pswUDD").attr("type","hidden")
						  $("#pswUAA").attr("type","hidden")
						   $("#pswUVV").attr("type","hidden")
						  
						  $("#pswTWW").attr("type","text")
						  
						  localStorage.setItem("pagina",pagina);
						  localStorage.setItem("pagina1",pagina1);
						  
						  
						  //$("#pswTWW").focus()
								  
								  
					});			  
				   
				   $(document).on("touchstart", "#piu"+ identTW +"piu"+ prezzoTW +"piu"+ nomeTW +"", function(e){
								  
								  //alert(this.id)
								  
								  //SPLIT
								  var str=this.id;
								  
								  var a1 = new Array();
								  
								  a1=str.split("piu");
								  
								  agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]),"c")
								  
								  });
				   
				   
				   }
				   
				   
				   }
				   
				   
				   
				   function passo7(eccola){
				   
				   var pageNumber = 1;
				   eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
				  //alert(link1);
				   
				   var ref = window.open(link1, '_blank', 'location=no');
				   
				   }
				   
				   
				   }
				   
				   
				   // Instagram
				   if(result.IG === null || typeof(result.IG) == 'undefined' || result.IG=="null" || result.IG==""){
				   
				   }
				   else{
				   
				   for (var i=0, l=30; i<l; i++) {
				   
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
				   
				   
				   instagram = "IG_desc_"+i
				   
				   
				   if(result[instagram] === null || typeof(result[instagram]) == 'undefined' || result[instagram]=="null" || result[instagram]==""){
				   
				   }
				   else{
				   
				   var tabella = "<table width='90%' align='center' class='tabella_contenuti'>";
				   
				   paperino = "IG_cont_"+i
				   descig = "IG_desc_"+i
				   
				   prezzoIG = "IG_pric_"+i
				   nomeIG = "IG_nome_"+i
				   identIG = "IG_iden_"+i
				   
				   pswIG = "IG_lock_"+i
				   
				if(lock_progetto!="cart.png"){
				   if(lock_microverba=="cart.png"){
				   
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_instagram.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descig])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   }
				   else{
				   
				   if(result[prezzoIG] === null || typeof(result[prezzoIG]) == 'undefined' || result[prezzoIG]=="null" || result[prezzoIG]==""){
				   
				   if((result[pswIG]=="")||(result[pswIG]==$.base64.encode(pswIGG))){
				   
				   lock="unlock.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='"+paperino+"'><img src='img/ico_instagram.png' class='icona_contenuti'></a></td><td colspan='2'><span class='testo_contenuti'>"+$.base64.decode(result[descig])+"</span></td></tr>"
				   
				   }
				   else{
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_instagram.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'><input id='fff_"+pswIG+"' name='password' class='testo_contenuti_pw' placeholder='password' readonly></span></td><td align='right' width='40'></td></tr>"
				   
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_instagram.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'> "+$.base64.decode(result[descig])+"</span></td><td align='center' width='40'><a id='piu"+ identIG +"piu"+ prezzoIG +"piu"+ nomeIG +"'> <div class='ico_cart'></div></a><br><span class='testo_contenuti'>"+result[prezzoIG]+"€</span></td></tr>"
				   }
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_instagram.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descig])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   
				   }
				   
				   $("#testvideo").append(tabella);
				   
				   
				   $(document).on("touchstart", "#"+paperino+"", function(e){
								  
								  passo8(this.id) // passare la variabile in una nuova funzione
								  
								  });
								  
								  
					$(document).on("touchstart", "#fff_"+pswIG+"", function(e){
								  
					  var nomefun = this.id
					  nomefun = nomefun.replace("fff_","")
					  
					  $("#prolock").hide()
					  $("#miclock").hide()
					  $("#contlock").show()
					  
					  $("#pswVAA").attr("type","hidden")
					  $("#pswYTT").attr("type","hidden")
					  $("#pswFAA").attr("type","hidden")
					  $("#pswPWW").attr("type","hidden")
					  $("#pswFBB").attr("type","hidden")
					  $("#pswTFF").attr("type","hidden")
					  $("#pswTWW").attr("type","hidden")
					  $("#pswUSS").attr("type","hidden")
					  $("#pswSVV").attr("type","hidden")
					  $("#pswSAA").attr("type","hidden")
					  $("#pswTMM").attr("type","hidden")
					  $("#pswEMM").attr("type","hidden")
					  $("#pswUII").attr("type","hidden")
					  $("#pswUDD").attr("type","hidden")
					  $("#pswUAA").attr("type","hidden")
					   $("#pswUVV").attr("type","hidden")
					  
					  $("#pswIGG").attr("type","text")
					  
					  localStorage.setItem("pagina",pagina);
					  localStorage.setItem("pagina1",pagina1);
					  
					  
					  //$("#pswIGG").focus()
								  
 
					});
								  
				   
				   $(document).on("touchstart", "#piu"+ identIG +"piu"+ prezzoIG +"piu"+ nomeIG +"", function(e){
								  
					  //alert(this.id)
					  
					  //SPLIT
					  var str=this.id;
					  
					  var a1 = new Array();
					  
					  a1=str.split("piu");
					  
					  agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]),"c")
					  
					  });

				   }
				   
				   
				   }
				   
				   
				   
				   function passo8(eccola){
				   
				   var pageNumber = 1;
				   eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
				  //alert(link1);
				   
				   var ref = window.open(link1, '_blank', 'location=no');
				   
				   }
				   
				   
				   }
				   
				   // Altro Social
				   if(result.US === null || typeof(result.US) == 'undefined' || result.US=="null" || result.US==""){
				   
				   }
				   else{
				   
				   for (var i=0, l=30; i<l; i++) {
				   
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
				   
				   
				   instagram = "US_desc_"+i
				   
				   
				   if(result[instagram] === null || typeof(result[instagram]) == 'undefined' || result[instagram]=="null" || result[instagram]==""){
				   
				   }
				   else{
				   
				   var tabella = "<table width='90%' align='center' class='tabella_contenuti'>";
				   
				   paperino = "US_cont_"+i
				   descus = "US_desc_"+i
				   
				   prezzoUS = "US_pric_"+i
				   nomeUS = "US_nome_"+i
				   identUS = "US_iden_"+i
				   
				   
				   pswUS = "US_lock_"+i
				   
				   
				  if(lock_progetto!="cart.png"){
				   if(lock_microverba=="cart.png"){
				   
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_social.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descig])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   }
				   else{
				   
				   if(result[prezzoUS] === null || typeof(result[prezzoUS]) == 'undefined' || result[prezzoUS]=="null" || result[prezzoUS]==""){
				   
				   if((result[pswUS]=="")||(result[pswUS]==$.base64.encode(pswUSS))){
				   
				   lock="unlock.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='"+paperino+"'><img src='img/ico_social.png' class='icona_contenuti'></a></td><td colspan='2'><span class='testo_contenuti'>"+$.base64.decode(result[descig])+"</span></td></tr>"
				   
				   }
				   else{
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_social.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'><input id='fff_"+pswUS+"' name='password' class='testo_contenuti_pw' placeholder='password' readonly></span></td><td align='right' width='40'></td></tr>"
				   
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_social.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'> "+$.base64.decode(result[descus])+"</span></td><td align='center' width='40'><a id='piu"+ identUS +"piu"+ prezzoUS +"piu"+ nomeUS +"'> <div class='ico_cart'></div></a><br><span class='testo_contenuti'>"+result[prezzoUS]+"€</span></td></tr>"
				   }
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_social.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descig])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   
				   }
				   
				   $("#testvideo").append(tabella);
				   
				   
				   
				   $(document).on("touchstart", "#"+paperino+"", function(e){
								  
						passo9(this.id) // passare la variabile in una nuova funzione
								  
					});
								  
								  
								  
					$(document).on("touchstart", "#fff_"+pswUS+"", function(e){
								  
						  var nomefun = this.id
						  nomefun = nomefun.replace("fff_","")
						  
						  $("#prolock").hide()
						  $("#miclock").hide()
						  $("#contlock").show()
						  
						  $("#pswVAA").attr("type","hidden")
						  $("#pswYTT").attr("type","hidden")
						  $("#pswFAA").attr("type","hidden")
						  $("#pswPWW").attr("type","hidden")
						  $("#pswFBB").attr("type","hidden")
						  $("#pswTFF").attr("type","hidden")
						  $("#pswTWW").attr("type","hidden")
						  $("#pswIGG").attr("type","hidden")
						  $("#pswSVV").attr("type","hidden")
						  $("#pswSAA").attr("type","hidden")
						  $("#pswTMM").attr("type","hidden")
						  $("#pswEMM").attr("type","hidden")
						  $("#pswUII").attr("type","hidden")
						  $("#pswUDD").attr("type","hidden")
						  $("#pswUAA").attr("type","hidden")
						   $("#pswUVV").attr("type","hidden")
						   
						  $("#pswUSS").attr("type","text")
						  
						  
						  
						  localStorage.setItem("pagina",pagina);
						  localStorage.setItem("pagina1",pagina1);
						  
						  
						  //$("#pswUSS").focus()
								  
 
					});
								  
				   
				   
				   $(document).on("touchstart", "#piu"+ identUS +"piu"+ prezzoUS +"piu"+ nomeUS +"", function(e){
								  
						  //alert(this.id)
						  
						  //SPLIT
						  var str=this.id;
						  
						  var a1 = new Array();
						  
						  a1=str.split("piu");
						  
						  agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]),"c")
						  
						  });
				   
				   }
				   
				   
				   }
				   
				   
				   
				   function passo9(eccola){
				   
				   var pageNumber = 1;
				   eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
				  //alert(link1);
				   
				   var ref = window.open(link1, '_blank', 'location=no');
				   
				   }
				   
				   
				   }
				   
				   // Steaming Video
				   if(result.SV === null || typeof(result.SV) == 'undefined' || result.SV=="null" || result.SV==""){
				   
				   }
				   else{
				   
				   for (var i=0, l=30; i<l; i++) {
				   
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
				   
				   
				   stramingv = "SV_desc_"+i
				   
				   
				   if(result[stramingv] === null || typeof(result[stramingv]) == 'undefined' || result[stramingv]=="null" || result[stramingv]==""){
				   
				   }
				   else{
				   
				   var tabella = "<table width='90%' align='center' class='tabella_contenuti'>";
				   
				   paperino = "SV_cont_"+i
				   descsv = "SV_desc_"+i
				   
				   prezzoSV = "SV_pric_"+i
				   nomeSV = "SV_nome_"+i
				   identSV = "SV_iden_"+i
				   
				   pswSV = "SV_lock_"+i
				   
				   
				if(lock_progetto!="cart.png"){
				   if(lock_microverba=="cart.png"){
				   
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_video_live.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descsv])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   }
				   else{
				   
				   if(result[prezzoSV] === null || typeof(result[prezzoSV]) == 'undefined' || result[prezzoSV]=="null" || result[prezzoSV]==""){
				   
				   if((result[pswSV]=="")||(result[pswSV]==$.base64.encode(pswSVV))){
				   
				   lock="unlock.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='"+paperino+"'><img src='img/ico_video_live.png' class='icona_contenuti'></a></td><td colspan='2'><span class='testo_contenuti'>"+$.base64.decode(result[descsv])+"</span></td></tr>"
				   
				   }
				   else{
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_video_live.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'><input id='fff_"+pswSV+"' name='password' class='testo_contenuti_pw' placeholder='password' readonly></span></td><td align='right' width='40'></td></tr>"
				   
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_video_live.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'> "+$.base64.decode(result[descsv])+"</span></td><td align='center' width='40'><a id='piu"+ identSV +"piu"+ prezzoSV +"piu"+ nomeSV +"'> <div class='ico_cart'></div></a><br><span class='testo_contenuti'>"+result[prezzoSV]+"€</span></td></tr>"
				   }
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_video_live.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descsv])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   
				   }
				   
				   $("#testvideo").append(tabella);
				   
				   
				   $(document).on("touchstart", "#"+paperino+"", function(e){
								  
						 passo10(this.id) // passare la variabile in una nuova funzione
								  
					});
								  
								  
					$(document).on("touchstart", "#fff_"+pswSV+"", function(e){
								  
						  var nomefun = this.id
						  nomefun = nomefun.replace("fff_","")
						  
						  $("#prolock").hide()
						  $("#miclock").hide()
						  $("#contlock").show()
						  
						  $("#pswVAA").attr("type","hidden")
						  $("#pswYTT").attr("type","hidden")
						  $("#pswFAA").attr("type","hidden")
						  $("#pswPWW").attr("type","hidden")
						  $("#pswFBB").attr("type","hidden")
						  $("#pswTFF").attr("type","hidden")
						  $("#pswTWW").attr("type","hidden")
						  $("#pswIGG").attr("type","hidden")
						  $("#pswUSS").attr("type","hidden")
						  $("#pswSAA").attr("type","hidden")
						  $("#pswTMM").attr("type","hidden")
						  $("#pswEMM").attr("type","hidden")
						  $("#pswUII").attr("type","hidden")
						  $("#pswUDD").attr("type","hidden")
						  $("#pswUAA").attr("type","hidden")
						   $("#pswUVV").attr("type","hidden")
						  
						  $("#pswSVV").attr("type","text")
						  
						  
						  localStorage.setItem("pagina",pagina);
						  localStorage.setItem("pagina1",pagina1);
						  
						  
						  //$("#pswSVV").focus()
								  
								  
					 });
								  
				   
				   
				   $(document).on("touchstart", "#piu"+ identSV +"piu"+ prezzoSV +"piu"+ nomeSV +"", function(e){
								  
						  //alert(this.id)
						  
						  //SPLIT
						  var str=this.id;
						  
						  var a1 = new Array();
						  
						  a1=str.split("piu");
						  
						  agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]),"c")
						  
						  });
				   
				   
				   }
				   
				   
				   }
				   
				   
				   
				   function passo10(eccola){
				   
				   var pageNumber = 1;
				   eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
				  //alert(link1);
				   
				   var ref = window.open(link1, '_blank', 'location=no');
				   
				   }
				   
				   
				   }
				   
				   
				   // Steaming Audio
				   if(result.SA === null || typeof(result.SA) == 'undefined' || result.SA=="null" || result.SA==""){
				   
				   }
				   else{
				   
				   for (var i=0, l=30; i<l; i++) {
				   
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
				   
				   
				   straminga = "SA_desc_"+i
				   
				   
				   if(result[straminga] === null || typeof(result[straminga]) == 'undefined' || result[straminga]=="null" || result[straminga]==""){
				   
				   }
				   else{
				   
				   var tabella = "<table width='90%' align='center' class='tabella_contenuti'>";
				   
				   paperino = "SA_cont_"+i
				   descsa = "SA_desc_"+i
				   
				   
				   prezzoSA = "SA_pric_"+i
				   nomeSA = "SA_nome_"+i
				   identSA = "SA_iden_"+i
				   
				   pswSA = "FB_lock_"+i
				   
					 if(lock_progetto!="cart.png"){
				   if(lock_microverba=="cart.png"){
				   
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_audio_live.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descsa])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   }
				   else{
				   
				   if(result[prezzoSA] === null || typeof(result[prezzoSA]) == 'undefined' || result[prezzoSA]=="null" || result[prezzoSA]==""){
				   
				   if((result[pswSA]=="")||(result[pswSA]==$.base64.encode(pswSAA))){
				   
				   lock="unlock.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='"+paperino+"'><img src='img/ico_audio_live.png' class='icona_contenuti'></a></td><td colspan='2'><span class='testo_contenuti'>"+$.base64.decode(result[descsa])+"</span></td></tr>"
				   
				   }
				   else{
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_audio_live.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'><input id='fff_"+pswSA+"' name='password' class='testo_contenuti_pw' placeholder='password' readonly></span></td><td align='right' width='40'></td></tr>"
				   
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_audio_live.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'> "+$.base64.decode(result[descsa])+"</span></td><td align='center' width='40'><a id='piu"+ identSA +"piu"+ prezzoSA +"piu"+ nomeSA +"'> <div class='ico_cart'></div></a><br><span class='testo_contenuti'>"+result[prezzoSA]+"€</span></td></tr>"
				   }
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_audio_live.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descsa])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   
				   }
				   
				   $("#testvideo").append(tabella);
				   
				   
				   $(document).on("touchstart", "#"+paperino+"", function(e){
								  
								  passo11(this.id) // passare la variabile in una nuova funzione
								  
								  });
								  
								  
					$(document).on("touchstart", "#fff_"+pswSA+"", function(e){
								  
						  var nomefun = this.id
						  nomefun = nomefun.replace("fff_","")
						  
						  $("#prolock").hide()
						  $("#miclock").hide()
						  $("#contlock").show()
						  
						  $("#pswVAA").attr("type","hidden")
						  $("#pswYTT").attr("type","hidden")
						  $("#pswFAA").attr("type","hidden")
						  $("#pswPWW").attr("type","hidden")
						  $("#pswFBB").attr("type","hidden")
						  $("#pswTFF").attr("type","hidden")
						  $("#pswTWW").attr("type","hidden")
						  $("#pswIGG").attr("type","hidden")
						  $("#pswUSS").attr("type","hidden")
						  $("#pswSVV").attr("type","hidden")
						  $("#pswTMM").attr("type","hidden")
						  $("#pswEMM").attr("type","hidden")
						  $("#pswUII").attr("type","hidden")
						  $("#pswUDD").attr("type","hidden")
						  $("#pswUAA").attr("type","hidden")
						   $("#pswUVV").attr("type","hidden")
						  
						  $("#pswSAA").attr("type","text")
						  
						  
						  localStorage.setItem("pagina",pagina);
						  localStorage.setItem("pagina1",pagina1);
						  
						  
						  //$("#pswSAA").focus()
								  
								  
					 });
								  
				   
				   $(document).on("touchstart", "#piu"+ identSA +"piu"+ prezzoSA +"piu"+ nomeSA +"", function(e){
								  
								  //alert(this.id)
								  
								  //SPLIT
								  var str=this.id;
								  
								  var a1 = new Array();
								  
								  a1=str.split("piu");
								  
								  agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]),"c")
								  
								  });
				   
				   
				   }
				   
				   
				   }
				   
				   
				   
				   function passo11(eccola){
				   
				   var pageNumber = 1;
				   eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
				  //alert(link1);
				   
				   var ref = window.open(link1, '_blank', 'location=no');
				   
				   }
				   
				   
				   }
				   
				   // Telefono mobile
				   if(result.TM === null || typeof(result.TM) == 'undefined' || result.TM=="null" || result.TM==""){
				   
				   }
				   else{
				   
				   for (var i=0, l=30; i<l; i++) {
				   
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
				   
				   
				   telefonomb = "TM_desc_"+i
				   
				   /*
					
					urltwitter = "TW_cont_"+i
					
					urlinstagram = "IG_cont_"+i*/
				   
				   if(result[telefonomb] === null || typeof(result[telefonomb]) == 'undefined' || result[telefonomb]=="null" || result[telefonomb]==""){
				   
				   }
				   else{
				   
				   var tabella = "<table width='90%' align='center' class='tabella_contenuti'>";
				   
				   paperino = "TM_cont_"+i
				   desctm = "TM_desc_"+i
				   
				   prezzoTM = "TM_pric_"+i
				   nomeTM = "TM_nome_"+i
				   identTM = "TM_iden_"+i
				   
				   pswTM = "TM_lock_"+i
				   
				   
				  if(lock_progetto!="cart.png"){
				   if(lock_microverba=="cart.png"){
				   
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_smartphone.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[desctm])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   }
				   else{
				   
				   if(result[prezzoTM] === null || typeof(result[prezzoTM]) == 'undefined' || result[prezzoTM]=="null" || result[prezzoTM]==""){
				   
				   if((result[pswTM]=="")||(result[pswTM]==$.base64.encode(pswTMM))){
				   
				   lock="unlock.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='"+paperino+"'><img src='img/ico_smartphone.png' class='icona_contenuti'></a></td><td colspan='2'><span class='testo_contenuti'>"+$.base64.decode(result[desctm])+"</span></td></tr>"
				   
				   }
				   else{
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_smartphone.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'><input id='fff_"+pswTM+"' name='password' class='testo_contenuti_pw' placeholder='password' readonly></span></td><td align='right' width='40'></td></tr>"
				   
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_smartphone.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'> "+$.base64.decode(result[desctm])+"</span></td><td align='center' width='40'><a id='piu"+ identTM +"piu"+ prezzoTM +"piu"+ nomeTM +"'> <div class='ico_cart'></div></a><br><span class='testo_contenuti'>"+result[prezzoTM]+"€</span></td></tr>"
				   }
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_smartphone.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[desctm])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   
				   }
				   
				   $("#testvideo").append(tabella);
				   
				   
				   $(document).on("touchstart", "#"+paperino+"", function(e){
								  
					  passo12(this.id) // passare la variabile in una nuova funzione
					  
					  });
								  
					$(document).on("touchstart", "#fff_"+pswTM+"", function(e){
								  
					  var nomefun = this.id
					  nomefun = nomefun.replace("fff_","")
					  
					  $("#prolock").hide()
					  $("#miclock").hide()
					  $("#contlock").show()
					  
					  $("#pswVAA").attr("type","hidden")
					  $("#pswYTT").attr("type","hidden")
					  $("#pswFAA").attr("type","hidden")
					  $("#pswPWW").attr("type","hidden")
					  $("#pswFBB").attr("type","hidden")
					  $("#pswTFF").attr("type","hidden")
					  $("#pswTWW").attr("type","hidden")
					  $("#pswIGG").attr("type","hidden")
					  $("#pswUSS").attr("type","hidden")
					  $("#pswSVV").attr("type","hidden")
					  $("#pswSAA").attr("type","hidden")
					  $("#pswEMM").attr("type","hidden")
					  $("#pswUII").attr("type","hidden")
					  $("#pswUDD").attr("type","hidden")
					  $("#pswUAA").attr("type","hidden")
					  $("#pswUVV").attr("type","hidden")

					  
					  $("#pswTMM").attr("type","text")
					  
					  
					  localStorage.setItem("pagina",pagina);
					  localStorage.setItem("pagina1",pagina1);
								  
								  
					  //$("#pswTMM").focus()
								  
								  
					});
								  
				   
				   $(document).on("touchstart", "#piu"+ identTM +"piu"+ prezzoTM +"piu"+ nomeTM +"", function(e){
								  
					  //alert(this.id)
					  
					  //SPLIT
					  var str=this.id;
					  
					  var a1 = new Array();
					  
					  a1=str.split("piu");
					  
					  agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]),"c")
					  
					});
				   
				   
				   }
				   
				   
				   }
				   
				   
				   
				   function passo12(eccola){
				   
				   var pageNumber = 1;
				   eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
				   //alert(link1);
				   
				   window.location.href = "tel:"+link1+"";
				   
				   }
				   
				   
				   }
				   
				   
				   // Email
				   if(result.EM === null || typeof(result.EM) == 'undefined' || result.EM=="null" || result.EM==""){
				   
				   }
				   else{
				   
				   for (var i=0, l=30; i<l; i++) {
				   
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
				   
				   
				   email2 = "EM_desc_"+i
				   
				   /*
					
					urltwitter = "TW_cont_"+i
					
					urlinstagram = "IG_cont_"+i*/
				   
				   if(result[email2] === null || typeof(result[email2]) == 'undefined' || result[email2]=="null" || result[email2]==""){
				   
				   }
				   else{
				   
				   var tabella = "<table width='90%' align='center' class='tabella_contenuti'>";
				   
				   paperino = "EM_cont_"+i
				   descem = "EM_desc_"+i
				   
				   prezzoEM = "EM_pric_"+i
				   nomeEM = "EM_nome_"+i
				   identEM = "EM_iden_"+i
				   
				   pswEM = "EM_lock_"+i
				   
					if(lock_progetto!="cart.png"){
				   if(lock_microverba=="cart.png"){
				   
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_smartphone.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descem])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   }
				   else{
				   
				   if(result[prezzoEM] === null || typeof(result[prezzoEM]) == 'undefined' || result[prezzoEM]=="null" || result[prezzoEM]==""){
				   
				   if((result[pswEM]=="")||(result[pswEM]==$.base64.encode(pswEMM))){
				   
				   lock="unlock.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='"+paperino+"'><img src='img/ico_smartphone.png' class='icona_contenuti'></a></td><td colspan='2'><span class='testo_contenuti'>"+$.base64.decode(result[descem])+"</span></td></tr>"
				   
				   }
				   else{
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_smartphone.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'><input id='fff_"+pswEM+"' name='password' class='testo_contenuti_pw' placeholder='password' readonly></span></td><td align='right' width='40'></td></tr>"
				   
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_smartphone.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'> "+$.base64.decode(result[descem])+"</span></td><td align='center' width='40'><a id='piu"+ identEM +"piu"+ prezzoEM +"piu"+ nomeEM +"'> <div class='ico_cart'></div></a><br><span class='testo_contenuti'>"+result[prezzoEM]+"€</span></td></tr>"
				   }
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_smartphone.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descem])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   
				   }
				   
				   $("#testvideo").append(tabella);
				   
				   
				   $(document).on("touchstart", "#"+paperino+"", function(e){
								  
						passo13(this.id) // passare la variabile in una nuova funzione
								  
					});
								  
								  
					$(document).on("touchstart", "#fff_"+pswEM+"", function(e){
								  
						  var nomefun = this.id
						  nomefun = nomefun.replace("fff_","")
						  
						  $("#prolock").hide()
						  $("#miclock").hide()
						  $("#contlock").show()
						  
						  $("#pswVAA").attr("type","hidden")
						  $("#pswYTT").attr("type","hidden")
						  $("#pswFAA").attr("type","hidden")
						  $("#pswPWW").attr("type","hidden")
						  $("#pswFBB").attr("type","hidden")
						  $("#pswTFF").attr("type","hidden")
						  $("#pswTWW").attr("type","hidden")
						  $("#pswIGG").attr("type","hidden")
						  $("#pswUSS").attr("type","hidden")
						  $("#pswSVV").attr("type","hidden")
						  $("#pswSAA").attr("type","hidden")
						  $("#pswTMM").attr("type","hidden")
						  $("#pswUVV").attr("type","hidden")
						  $("#pswUAA").attr("type","hidden")
						  $("#pswUDD").attr("type","hidden")
						  $("#pswUII").attr("type","hidden")
						  
						  $("#pswEMM").attr("type","text")
						  
						  
						  localStorage.setItem("pagina",pagina);
						  localStorage.setItem("pagina1",pagina1);
						  
						  
						  //$("#pswEMM").focus()
								  
					});
								  
				   
				   $(document).on("touchstart", "#piu"+ identEM +"piu"+ prezzoEM +"piu"+ nomeEM +"", function(e){
								  
						  ////alert(this.id)
						  
						  //SPLIT
						  var str=this.id;
						  
						  var a1 = new Array();
						  
						  a1=str.split("piu");
						  
						  agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]),"c")
						  
					 });
				   
				   
				   }
				   
				   
				   }
				   
				   
				   
				   function passo13(eccola){
				   
				   var pageNumber = 1;
				   eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
				   //alert(link1);
				   
				   window.plugin.email.open({
											to:      link1,
											subject: "Email",
											body:    "Ciao,",
											isHtml:  true
											});
				   
				   }
				   
				   
				   }
				   
				   
				   // Pictire
				   if(result.UI === null || typeof(result.UI) == 'undefined' || result.UI=="null" || result.UI==""){
				   
				   }
				   else{
				   
				   for (var i=0, l=30; i<l; i++) {
				   
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
				   
				   
				   picture = "UI_desc_"+i
				   
				   
				   if(result[picture] === null || typeof(result[picture]) == 'undefined' || result[picture]=="null" || result[picture]==""){
				   
				   }
				   else{
				   
				   var tabella = "<table width='90%' align='center' class='tabella_contenuti'>";
				   
				   paperino = "UI_cont_"+i
				   descui = "UI_desc_"+i
				   
				   prezzoUI = "UI_pric_"+i
				   nomeUI = "UI_nome_"+i
				   identUI = "UI_iden_"+i
				   
				   pswUI = "UI_lock_"+i
				   
					if(lock_progetto!="cart.png"){
				   if(lock_microverba=="cart.png"){
				   
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_photo.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descui])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   }
				   else{
				   
				   if(result[prezzoUI] === null || typeof(result[prezzoUI]) == 'undefined' || result[prezzoUI]=="null" || result[prezzoUI]==""){
				   
				   if((result[pswUI]=="")||(result[pswUI]==$.base64.encode(pswUII))){
				   
				   lock="unlock.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='"+paperino+"'><img src='img/ico_photo.png' class='icona_contenuti'></a></td><td colspan='2'><span class='testo_contenuti'>"+$.base64.decode(result[descui])+"</span></td></tr>"
				   
				   }
				   else{
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_photo.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'><input id='fff_"+pswUI+"' name='password' class='testo_contenuti_pw' placeholder='password' readonly></span></td><td align='right' width='40'></td></tr>"
				   
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_photo.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'> "+$.base64.decode(result[descui])+"</span></td><td align='center' width='40'><a id='piu"+ identUI +"piu"+ prezzoUI +"piu"+ nomeUI +"'> <div class='ico_cart'></div></a><br><span class='testo_contenuti'>"+result[prezzoUI]+"€</span></td></tr>"
				   }
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_photo.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descui])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   
				   }
				   
				   $("#testvideo").append(tabella);
				   
				   
				   $(document).on("touchstart", "#"+paperino+"", function(e){
								  
								  passo14(this.id) // passare la variabile in una nuova funzione
								  
								  });
								  
								  
					$(document).on("touchstart", "#fff_"+pswUI+"", function(e){
								  
						  var nomefun = this.id
						  nomefun = nomefun.replace("fff_","")
						  
						  $("#prolock").hide()
						  $("#miclock").hide()
						  $("#contlock").show()
						  
						  $("#pswVAA").attr("type","hidden")
						  $("#pswYTT").attr("type","hidden")
						  $("#pswFAA").attr("type","hidden")
						  $("#pswPWW").attr("type","hidden")
						  $("#pswFBB").attr("type","hidden")
						  $("#pswTFF").attr("type","hidden")
						  $("#pswTWW").attr("type","hidden")
						  $("#pswIGG").attr("type","hidden")
						  $("#pswUSS").attr("type","hidden")
						  $("#pswSVV").attr("type","hidden")
						  $("#pswSAA").attr("type","hidden")
						  $("#pswTMM").attr("type","hidden")
						  $("#pswEMM").attr("type","hidden")
						  $("#pswUVV").attr("type","hidden")
						  $("#pswUAA").attr("type","hidden")
						  $("#pswUDD").attr("type","hidden")
						  
						  $("#pswUII").attr("type","text")
						  
						  
						  localStorage.setItem("pagina",pagina);
						  localStorage.setItem("pagina1",pagina1);
						  
						  
						  //$("#pswUII").focus()
								  
					});
								  
				   
				   $(document).on("touchstart", "#piu"+ identUI +"piu"+ prezzoUI +"piu"+ nomeUI +"", function(e){
								  
						  
						  //SPLIT
						  var str=this.id;
						  
						  var a1 = new Array();
						  
						  a1=str.split("piu");
						  
						  agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]),"c")
						  
						  });
				   
				   
				   }
				   
				   
				   }
				   

				   function passo14(eccola){
				   
				   var pageNumber = 1;
				   eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
				   //alert(link1);
				   
				    var ref = window.open(link1, '_blank', 'location=no');
				   
				   }
				   
				   
				   }
				   
				   
				   
				   // File
				   if(result.UD === null || typeof(result.UD) == 'undefined' || result.UD=="null" || result.UD==""){
				   
				   }
				   else{
				   
				   for (var i=0, l=30; i<l; i++) {
				   
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
				   
				   
				   fileload = "UD_desc_"+i
				   
				   
				   if(result[fileload] === null || typeof(result[fileload]) == 'undefined' || result[fileload]=="null" || result[fileload]==""){
				   
				   }
				   else{
				   
				   var tabella = "<table width='90%' align='center' class='tabella_contenuti'>";
				   
				   paperino = "UD_cont_"+i
				   descud = "UD_desc_"+i
				   
				   prezzoUD = "UD_pric_"+i
				   nomeUD = "UD_nome_"+i
				   identUD = "UD_iden_"+i
				   
				   pswUD = "UD_lock_"+i
				   
					if(lock_progetto!="cart.png"){
				   if(lock_microverba=="cart.png"){
				   
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_document.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descud])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   }
				   else{
				   
				   if(result[prezzoUD] === null || typeof(result[prezzoUD]) == 'undefined' || result[prezzoUD]=="null" || result[prezzoUD]==""){
				   
				   if((result[pswUD]=="")||(result[pswUD]==$.base64.encode(pswUDD))){
				   
				   lock="unlock.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='"+paperino+"'><img src='img/ico_document.png' class='icona_contenuti'></a></td><td colspan='2'><span class='testo_contenuti'>"+$.base64.decode(result[descud])+"</span></td></tr>"
				   
				   }
				   else{
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_document.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'><input id='fff_"+pswUD+"' name='password' class='testo_contenuti_pw' placeholder='password' readonly></span></td><td align='right' width='40'></td></tr>"
				   
				   }
				   }
				   else{
				   lock="cart.png";
				   
				    tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_document.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'> "+$.base64.decode(result[descud])+"</span></td><td align='center' width='40'><a id='piu"+ identUD +"piu"+ prezzoUD +"piu"+ nomeUD +"'> <div class='ico_cart'></div></a><br><span class='testo_contenuti'>"+result[prezzoUD]+"€</span></td></tr>"
				   }
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_document.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descud])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   
				   }
				   
				   $("#testvideo").append(tabella);
				   
				   
				   $(document).on("touchstart", "#"+paperino+"", function(e){
								  
						passo15(this.id) // passare la variabile in una nuova funzione
								  
					 });
								  
								  
					$(document).on("touchstart", "#fff_"+pswUD+"", function(e){
								  
					  var nomefun = this.id
					  nomefun = nomefun.replace("fff_","")
					  
					  $("#prolock").hide()
					  $("#miclock").hide()
					  $("#contlock").show()
					  
					  $("#pswVAA").attr("type","hidden")
					  $("#pswYTT").attr("type","hidden")
					  $("#pswFAA").attr("type","hidden")
					  $("#pswPWW").attr("type","hidden")
					  $("#pswFBB").attr("type","hidden")
					  $("#pswTFF").attr("type","hidden")
					  $("#pswTWW").attr("type","hidden")
					  $("#pswIGG").attr("type","hidden")
					  $("#pswUSS").attr("type","hidden")
					  $("#pswSVV").attr("type","hidden")
					  $("#pswSAA").attr("type","hidden")
					  $("#pswTMM").attr("type","hidden")
					  $("#pswEMM").attr("type","hidden")	  
					  $("#pswUII").attr("type","hidden")
					  $("#pswUVV").attr("type","hidden")
					  $("#pswUAA").attr("type","hidden")
					  
					  $("#pswUDD").attr("type","text")
					  
					  
					  localStorage.setItem("pagina",pagina);
					  localStorage.setItem("pagina1",pagina1);
					  
					  
					  //$("#pswUDD").focus()
								  
					});
								  
				   
				   $(document).on("touchstart", "#piu"+ identUD +"piu"+ prezzoUD +"piu"+ nomeUD +"", function(e){
								  
						  
					  //SPLIT
					  var str=this.id;
					  
					  var a1 = new Array();
					  
					  a1=str.split("piu");
					  
					  agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]),"c")
					  
					  });
				   
				   
				   }
				   
				   
				   }
				   

				   function passo15(eccola){
				   
				   var pageNumber = 1;
				   eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
				   //alert(link1);
				   
				    var ref = window.open(link1, '_system', 'location=no');
				   
				   }
				   
				   
				   }
				   
				   
				   
				   // MP3
				   if(result.UA === null || typeof(result.UA) == 'undefined' || result.UA=="null" || result.UA==""){
				   
				   }
				   else{
				   
				   for (var i=0, l=30; i<l; i++) {
				   
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
				   
				   
				   filemp3 = "UA_desc_"+i
				   
				   
				   if(result[filemp3] === null || typeof(result[filemp3]) == 'undefined' || result[filemp3]=="null" || result[filemp3]==""){
				   
				   }
				   else{
				   
				   var tabella = "<table width='90%' align='center' class='tabella_contenuti'>";
				   
				   paperino = "UA_cont_"+i
				   descua = "UA_desc_"+i
				   
				   prezzoUA = "UA_pric_"+i
				   nomeUA = "UA_nome_"+i
				   identUA = "UA_iden_"+i
				   
				   pswUA = "UA_lock_"+i
				   
					if(lock_progetto!="cart.png"){
				   if(lock_microverba=="cart.png"){
				   
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_audio.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descua])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   }
				   else{
				   
				   if(result[prezzoUA] === null || typeof(result[prezzoUA]) == 'undefined' || result[prezzoUA]=="null" || result[prezzoUA]==""){
				   
				   if((result[pswUA]=="")||(result[pswUA]==$.base64.encode(pswUAA))){
				   
				   lock="unlock.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='"+paperino+"'><img src='img/ico_audio.png' class='icona_contenuti'></a></td><td colspan='2'><span class='testo_contenuti'>"+$.base64.decode(result[descua])+"</span></td></tr>"
				   
				   }
				   else{
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_audio.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'><input id='fff_"+pswUA+"' name='password' class='testo_contenuti_pw' placeholder='password' readonly></span></td><td align='right' width='40'></td></tr>"
				   
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_audio.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'> "+$.base64.decode(result[descua])+"</span></td><td align='center' width='40'><a id='piu"+ identUA +"piu"+ prezzoUA +"piu"+ nomeUA +"'> <div class='ico_cart'></div></a><br><span class='testo_contenuti'>"+result[prezzoUA]+"€</span></td></tr>"
				   }
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_audio.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descua])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   
				   }
				   
				   $("#testvideo").append(tabella);
				   
				   
				   $(document).on("touchstart", "#"+paperino+"", function(e){
								  
								  passo16(this.id) // passare la variabile in una nuova funzione
								  
								  });
								  
								  
					$(document).on("touchstart", "#fff_"+pswUA+"", function(e){
								  
						  var nomefun = this.id
						  nomefun = nomefun.replace("fff_","")
						  
						  $("#prolock").hide()
						  $("#miclock").hide()
						  $("#contlock").show()
						  
						  $("#pswVAA").attr("type","hidden")
						  $("#pswYTT").attr("type","hidden")
						  $("#pswFAA").attr("type","hidden")
						  $("#pswPWW").attr("type","hidden")
						  $("#pswFBB").attr("type","hidden")
						  $("#pswTFF").attr("type","hidden")
						  $("#pswTWW").attr("type","hidden")
						  $("#pswIGG").attr("type","hidden")
						  $("#pswUSS").attr("type","hidden")
						  $("#pswSVV").attr("type","hidden")
						  $("#pswSAA").attr("type","hidden")
						  $("#pswTMM").attr("type","hidden")
						  $("#pswEMM").attr("type","hidden")
						  $("#pswUII").attr("type","hidden")
						  $("#pswUDD").attr("type","hidden")
						  $("#pswUVV").attr("type","hidden")
						  
						  $("#pswUAA").attr("type","text")
						  
						  
						  localStorage.setItem("pagina",pagina);
						  localStorage.setItem("pagina1",pagina1);
						  
						  
						  //$("#pswUAA").focus()
								  
					});
								  
				   
				   $(document).on("touchstart", "#piu"+ identUA +"piu"+ prezzoUA +"piu"+ nomeUA +"", function(e){
								  
						  
						  //SPLIT
						  var str=this.id;
						  
						  var a1 = new Array();
						  
						  a1=str.split("piu");
						  
						  agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]),"c")
						  
						  });
				   
				   
				   }
				   
				   
				   }
				   

				   function passo16(eccola){
				   
				   var pageNumber = 1;
				   eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
				   //alert(link1);
				   
				    var ref = window.open(link1, '_blank', 'location=no');
				   
				   }
				   
				   
				   }
				   
				   
				   // MP4
				   if(result.UV === null || typeof(result.UV) == 'undefined' || result.UV=="null" || result.UV==""){
				   
				   }
				   else{
				   
				   for (var i=0, l=30; i<l; i++) {
				   
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
				   
				   
				   filevideo = "UV_desc_"+i
				   
				   
				   if(result[filevideo] === null || typeof(result[filevideo]) == 'undefined' || result[filevideo]=="null" || result[filevideo]==""){
				   
				   }
				   else{
				   
				   var tabella = "<table width='90%' align='center' class='tabella_contenuti'>";
				   
				   paperino = "UV_cont_"+i
				   descuv = "UV_desc_"+i
				   
				   prezzoUV = "UV_pric_"+i
				   nomeUV = "UV_nome_"+i
				   identUV = "UV_iden_"+i
				   
				   pswUV = "UV_lock_"+i
				   
					if(lock_progetto!="cart.png"){
				   if(lock_microverba=="cart.png"){
				   
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_video_live.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descuv])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   }
				   else{
				   
				   if(result[prezzoUV] === null || typeof(result[prezzoUV]) == 'undefined' || result[prezzoUV]=="null" || result[prezzoUV]==""){
				   
				   if((result[pswUV]=="")||(result[pswUV]==$.base64.encode(pswUVV))){
				   
				   lock="unlock.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='"+paperino+"'><img src='img/ico_video_live.png' class='icona_contenuti'></a></td><td colspan='2'><span class='testo_contenuti'>"+$.base64.decode(result[descuv])+"</span></td></tr>"
				   
				   }
				   else{
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_video_live.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'><input id='fff_"+pswUV+"' name='password' class='testo_contenuti_pw' placeholder='password' readonly></span></td><td align='right' width='40'></td></tr>"
				   
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_video_live.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'> "+$.base64.decode(result[descuv])+"</span></td><td align='center' width='40'><a id='piu"+ identUV +"piu"+ prezzoUV +"piu"+ nomeUV +"'> <div class='ico_cart'></div></a><br><span class='testo_contenuti'>"+result[prezzoUV]+"€</span></td></tr>"
				   }
				   }
				   }
				   else{
				   lock="cart.png";
				   
				   tabella = tabella + "<tr><td align='left' width='60'><a id='#'><img src='img/ico_video_live.png' class='icona_contenuti'></a></td><td><span class='testo_contenuti'>"+$.base64.decode(result[descuv])+"</span></td><td align='right' width='40'><a id='#'> <div class='ico_cart'></div></a></td></tr>"
				   
				   }
				   
				   $("#testvideo").append(tabella);
				   
				   
				   $(document).on("touchstart", "#"+paperino+"", function(e){
								  
								  passo17(this.id) // passare la variabile in una nuova funzione
								  
								  });
								  
								  
					$(document).on("touchstart", "#fff_"+pswUV+"", function(e){
								  
						  var nomefun = this.id
						  nomefun = nomefun.replace("fff_","")
						  
						  $("#prolock").hide()
						  $("#miclock").hide()
						  $("#contlock").show()
						  
						  $("#pswVAA").attr("type","hidden")
						  $("#pswYTT").attr("type","hidden")
						  $("#pswFAA").attr("type","hidden")
						  $("#pswPWW").attr("type","hidden")
						  $("#pswFBB").attr("type","hidden")
						  $("#pswTFF").attr("type","hidden")
						  $("#pswTWW").attr("type","hidden")
						  $("#pswIGG").attr("type","hidden")
						  $("#pswUSS").attr("type","hidden")
						  $("#pswSVV").attr("type","hidden")
						  $("#pswSAA").attr("type","hidden")
						  $("#pswTMM").attr("type","hidden")
						  $("#pswEMM").attr("type","hidden")
						  $("#pswUII").attr("type","hidden")
						  $("#pswUDD").attr("type","hidden")
						  $("#pswUAA").attr("type","hidden")
						  
						  $("#pswUVV").attr("type","text")
						  
						  
						  localStorage.setItem("pagina",pagina);
						  localStorage.setItem("pagina1",pagina1);
						  
						  
						  //$("#pswUVV").focus()
								  
					});
								  
				   
				   $(document).on("touchstart", "#piu"+ identUV +"piu"+ prezzoUV +"piu"+ nomeUV +"", function(e){
								  
						  
						  //SPLIT
						  var str=this.id;
						  
						  var a1 = new Array();
						  
						  a1=str.split("piu");
						  
						  agg2(result[a1[1]],result[a1[2]],$.base64.decode(result[a1[3]]),"c")
						  
						  });
				   
				   
				   }
				   
				   
				   }
				   

				   function passo17(eccola){
				   
				   var pageNumber = 1;
				   eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
				   //alert(link1);
				   
				    var ref = window.open(link1, '_blank', 'location=no');
				   
				   }
				   
				   
				   }
				   
				   
				   // FINE IF TOKEN
				   
				   }
				   else {
				   
				   /*var tabella = "<table width='' align='center'>";
					
					tabella = tabella + "<tr><td align='left' width='80'>X </td><td align='left' width='100%'>"+$.base64.decode(result.messaggio)+"</td></tr><tr><td align='left' width='80'>X </td><td align='left' width='100%'>"+$.base64.decode(result.radice)+"</td></tr><tr><td align='left' width='80'>X </td><td align='left' width='100%'>"+$.base64.decode(result.foglia)+"</td></tr>"
					
					tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
					
					$("#tutto").append(tabella);*/
				   
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
							   
							   return
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
			
		}
  
		
		
		function compraCarta() {
			
		    /*alert(localStorage.getItem("email"))
			alert(self.document.formia9.totordine.value);
			alert(self.document.formia9.idordine.value);
			alert(self.document.formia9.nomeordine.value);
			alert(self.document.formia9.products.value);
			alert(self.document.formia9.qta.value);*/
			
			var num1 = Math.floor((Math.random() * 20) + 1);
			var num2 = Math.floor((Math.random() * 20) + 1);
			var num3 = Math.floor((Math.random() * 20) + 1);
			var num4 = Math.floor((Math.random() * 20) + 1);
			var num5 = Math.floor((Math.random() * 20) + 1);
			var num6 = Math.floor((Math.random() * 20) + 1);
			var num7 = Math.floor((Math.random() * 20) + 1);
			var num8 = Math.floor((Math.random() * 20) + 1);
			
			var transazionemia = num1+""+num2+""+num3+""+num4+""+num5+""+num6+""+num7+""+num8;
			
			var item_number= "ABC1122";
			
			//alert(transazionemia)

			var amount = self.document.formia9.totordine.value;
			

			if (amount == 0) {
				navigator.notification.alert(
											 'Non hai prodotti nel carrello',
											 alertDismissed,
											 'Ordine',
											 'OK'
											 );
				return;
			}
			
	
			//alert("email:"+localStorage.getItem("email")+",transazionemia:"+transazionemia+",id_prodotto:"+self.document.formia9.products.value+",tot:"+self.document.formia9.totordine.value+",NomeProdotto:'Microverba Product',qta:"+self.document.formia9.qta.value+",Ordine:'Ordine Microverba',Note:'',did:"+localStorage.getItem("deviceid")+"")
			//"+localStorage.getItem("deviceid")+"

			$.ajax({
				   type: "GET",
				   url: "http://www.microverba.com/Check_Transaction.php?email="+localStorage.getItem("email")+"&transazionemia="+transazionemia+"&id_prodotto="+self.document.formia9.products.value+"&tot="+self.document.formia9.totordine.value+"&NomeProdotto=Microverba&qta="+self.document.formia9.qta.value+"&Ordine=Ordine&Note=Nessuna&did="+localStorage.getItem("deviceid")+"",
				   cache: false,
				   crossDomain: true,
				   contentType: "application/x-www-form-urlencoded",
				   success: function (result) {
					   
  
					var ref = window.open('http://microverba.com/wbspaypal.php?Transprodotto='+ transazionemia +'&did='+ localStorage.getItem("deviceid") +'', '_blank', 'location=no');
					 
					ref.addEventListener('loadstop', function(event) { 
					 if (event.url.match("mobile/close")) { 
						ref.close(); 
						
					  } 
					});
				   
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
			
			localStorage.setItem("modofoto","")
			
			window.plugins.nativepagetransitions.fade({
				"duration"       :  700, // in milliseconds (ms), default 400
				"iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
				"androiddelay"   :  500,
				"href" : "indexFoto.html"
			});
			
			//window.location.href = "indexFoto.html";
				   
		});
		
		$(document).on("touchend", "#scattalafoto", function(e){
					   
		   localStorage.setItem("modofoto","scatta")
		   
		   window.plugins.nativepagetransitions.fade({
				"duration"       :  700, // in milliseconds (ms), default 400
				"iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
				"androiddelay"   :  500,
				"href" : "indexFoto.html"
			});
					   
	   
	   });
		
		$(document).on("touchend", "#prendilafoto", function(e){
					   
		  localStorage.setItem("modofoto","prendi")
					   
	       window.plugins.nativepagetransitions.fade({
				"duration"       :  700, // in milliseconds (ms), default 400
				"iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
				"androiddelay"   :  500,
				"href" : "indexFoto.html"
			});
	   
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

		}
		
		
		function gpsonError(){
			
			var watchID = navigator.geolocation.watchPosition(onSuccess55, onError56, {timeout: 10000, enableHighAccuracy: false, maximumAge: 0 });
			
						
		}
		
		
		function onSuccess55(position){
			
			var ciao = position.coords.latitude;
			var ciao1 = position.coords.longitude;
			var gradi = position.coords.heading;
			
			localStorage.setItem("lat", ciao)
			localStorage.setItem("lng", ciao1)
			localStorage.setItem("gradi", gradi)
			
			localStorage.setItem("geostory", "SI")
			
			
			$("#lati").html(ciao +", "+ ciao1);
			
			
			
		}
		
		function onError56(){
			

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