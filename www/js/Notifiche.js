document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    //document.addEventListener("resume", onResume, false);
	
	/*last_click_time = new Date().getTime();
	
	document.addEventListener('click', function (e) {
							  
							  click_time = e['timeStamp'];
							  
							  if (click_time && (click_time - last_click_time) < 1000) { e.stopImmediatePropagation();
							  
							  e.preventDefault();
							  
							  return false;
							  
							  }
							  
							  last_click_time = click_time;
							  
							  }, true);*/
	
	
	// INIZIO CARICAMENTO
		
		//StatusBar.hide();
		
        //var watchID = navigator.geolocation.getCurrentPosition(gpsonSuccess, gpsonError, {timeout: 30000, enableHighAccuracy: true, maximumAge: 90000 });
		
		$("#lati").html(localStorage.getItem("lat") +", "+ localStorage.getItem("lng"));
		
		var crop_max_width = 400;
		var crop_max_height = 400;
		var jcrop_api;
		var canvas;
		var context;
		var image;
		
		
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
		
		
		if(localStorage.getItem("modofoto")=="prendi"){
			
			$("#spinner").show();
			
			navigator.camera.getPicture(uploadPhoto, onFail, { quality: 50,
			
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			targetWidth: 320,
			targetHeight: 460
		 
			});
			
			
		}
	
	
		if(localStorage.getItem("modofoto")=="scatta"){
			
			$("#spinner").show();
			
			navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 30,
			
			destinationType: Camera.DestinationType.DATA_URL,
			encodingType: Camera.EncodingType.PNG,
			targetWidth: 400,
			targetHeight: 400
		 
		 });
		}
		
		
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
		
		
		//$(document).on("touchstart", "#richiedi", function(e){
		function richiedi(){
					   
				var posta = $.base64.encode("salvatore.bruni@gmail.com")
				var lati = $.base64.encode(localStorage.getItem("lat"));
				var longi = $.base64.encode(localStorage.getItem("lng"));
					
                var radice3 = "test";
                var foglia3 = "juventus";

                       
                /*if(self.document.form.radice2.value != ""){
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
                }*/
	      
					   
				var radice4 = radice3.toLowerCase();
				var foglia4 = foglia3.toLowerCase();
					   
				var radice = $.base64.encode(radice4);
				var foglia = $.base64.encode(foglia4);
				
				//var myScroll2;
                       
                    /*myScroll2 = new IScroll('#wrapper', {
                        click: true,
                    });*/
					   
				$(".spinner").show();
				 
				$.ajax({
						type: "POST",
						url: "http://www.microverba.com/leaf_root_request.php",
					    data: {email:posta,leaf:foglia,root:radice,latitudine:lati,longitudine:longi},
						cache: false,
						crossDomain: true,
						contentType: "application/x-www-form-urlencoded",
						success: function (result) {
							  
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
					   
					                  var tabella = "<table width='' align='center'>";
					   
									  paperino = "YT_cont_"+i
                                      descyt = "YT_desc_"+i

					   
					                  tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_youtube.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[descyt])+"</td></tr>"
					   
					                  tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
					   
					                  $("#testvideo").append(tabella);
					   
					   
									  $(document).on("touchstart", "#"+paperino+"", function(e){
									  
										 passo(this.id) // passare la variabile in una nuova funzione

									  });


					               }


                               }
								
                               
					   
					           function passo(eccola){
					   
					              var pageNumber = 1;
					              eval("var link" + pageNumber + "='"+$.base64.decode(result[eccola])+"';");
					              alert(link1);
					   
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
                       
                       var tabella = "<table width='' align='center'>";
                       
                       paperino = "VA_cont_"+i
                       descva = "VA_desc_"+i
                       
                       
                        tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_video.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[descva])+"</td></tr>"
                       
                        tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
                       
                        $("#testvideo").append(tabella);
                       
                       
                       $(document).on("touchstart", "#"+paperino+"", function(e){
                                      
                            passo2(this.id) // passare la variabile in una nuova funzione
                                      
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
                       
                       var tabella = "<table width='' align='center'>";
                       
                       paperino = "FA_cont_"+i
                       descfa = "FA_desc_"+i
                       
                       
                       tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_audio.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[descfa])+"</td></tr>"
                       
                       tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
                       
                       $("#testvideo").append(tabella);
                       
                       
                       $(document).on("touchstart", "#"+paperino+"", function(e){
                                      
                            passo3(this.id) // passare la variabile in una nuova funzione
                                      
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
					   
					   var tabella = "<table width='' align='center'>";
					   
					   paperino = "PW_cont_"+i
					   descpw = "PW_desc_"+i
					   
					   
					   tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/logo.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[descpw])+"</td></tr>"
					   
					   tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
					   
					   $("#testvideo").append(tabella);
					   
					   
					   $(document).on("touchstart", "#"+paperino+"", function(e){
									  
									  passo4(this.id) // passare la variabile in una nuova funzione
									  
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
					   
					   var tabella = "<table width='' align='center'>";
					   
					   paperino = "FB_cont_"+i
					   descfb = "FB_desc_"+i
					   
					   
					   tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_facebook.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[descfb])+"</td></tr>"
					   
					   tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
					   
					   $("#testvideo").append(tabella);
					   
					   
					   $(document).on("touchstart", "#"+paperino+"", function(e){
									  
							passo5(this.id) // passare la variabile in una nuova funzione
									  
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
					   
					   var tabella = "<table width='' align='center'>";
					   
					   paperino = "TF_cont_"+i
					   desctf = "TF_desc_"+i
					   
					   
					   tabella = tabella + "<tr><td align='left' width='80'><a id='"+paperino+"'><img src='img/ico_telephone.png' width='65'></a></td><td align='left' width='100%'>"+$.base64.decode(result[desctf])+"</td></tr>"
					   
					   tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
					   
					   $("#testvideo").append(tabella);
					   
					   
					   $(document).on("touchstart", "#"+paperino+"", function(e){
									  
						  passo6(this.id) // passare la variabile in una nuova funzione
									  
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
					   
					  
						   var myScroll3;
			   
						   myScroll3 = new iScroll('wrapper', {
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
									   
								myScroll3.refresh();
									   
							}, 1000);

                          // FINE IF TOKEN
					      }
                          else {
					   
                             var tabella = "<table width='' align='center'>";
					   
                              tabella = tabella + "<tr><td align='left' width='80'>X </td><td align='left' width='100%'>"+$.base64.decode(result.messaggio)+"</td></tr><tr><td align='left' width='80'>X </td><td align='left' width='100%'>"+$.base64.decode(result.radice)+"</td></tr><tr><td align='left' width='80'>X </td><td align='left' width='100%'>"+$.base64.decode(result.foglia)+"</td></tr>"
					   
                              tabella = tabella + "<tr><td align='left' width='80' colspan='2'><br><br></td></tr></table><br>";
					   
                              $("#testvideo").append(tabella);
					   
                           }

					   
                            setTimeout (function(){
                               myScroll2.refresh();
                             }, 700);
				 
				            $(".spinner").hide();
					   
					   
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
					   
        //});
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
			
			$("#spinner").hide();
			
			
			// Convert image
			getFileContentAsBase64(imageURI,function(base64Image){
								   
								   console.log(base64Image.replace("data:image/jpeg;base64,",""));
								   // Then you'll be able to handle the myimage.png file as base64
								   
								   localStorage.setItem("imgutente2", base64Image);
								   localStorage.setItem("imgutente3", base64Image.replace("data:image/jpeg;base64,",""));
								   
								   $("#cropbutton").show();
								   $("#rotatebutton").show();
								   
								   setTimeout (function(){
					   
										myScroll.refresh();
											   
									}, 500);
								   
								   
		   });

		}
		
		
		function onPhotoDataSuccess(imageData) {
			
			$("#spinner").hide();
	  
			localStorage.setItem("biliard", "data:image/png;base64," + imageData);
	  
			canvas = null;
			
			image = new Image();
			image.onload = validateImage;
			image.src = localStorage.getItem("biliard");
			
			$("#cropbutton").show();
			$("#rotatebutton").show();
			
			setTimeout (function(){
					   
				myScroll.refresh();
					   
			}, 500);
	  
			
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
			
			setTimeout (function(){
					   
				myScroll.refresh();
					   
			}, 500);
	  
	  
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
										 
					
				     richiedi()
				   
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
			
			/*$(function() {
              
					$("#pippo").swipe( {
                                
                            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {

                              alert("You swiped " + direction );
                                
                            },
                                
                              threshold:0
                           });
              });*/
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
	
	
	$(document).on("touchstart", "#indietro", function(e){
		
		window.plugins.nativepagetransitions.fade({
				"duration"       :  700, // in milliseconds (ms), default 400
				"iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
				"androiddelay"   :  500,
				"href" : "index.html"
			});
			
			
		//window.location.href = "index.html";
				   
	});
	
	
    
    /*$.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
	
	
    var connectionStatus = false;
    connectionStatus = navigator.onLine ? 'online' : 'offline';
	

    if(connectionStatus=='online'){

	
	
    }
    
    else{

		alert("No Connection")
		
    }*/

}


/*function onResume() {
    onDeviceReady();
}*/






