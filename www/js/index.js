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
		
        var watchID = navigator.geolocation.getCurrentPosition(gpsonSuccess, gpsonError, {timeout: 30000, enableHighAccuracy: true, maximumAge: 90000 });
		
		var crop_max_width = 400;
		var crop_max_height = 400;
		var jcrop_api;
		var canvas;
		var context;
		var image;
		
		
		
		var myScroll;
		   
		   myScroll = new iScroll('wrapper', {
										//zoom: true,
										click: true
										/*hScrollbar: false,
										vScrollbar: false,
										zoomMin:1,
										zoomMax:2,
										zoomStart:1*/
								  });
		   
		   
		   setTimeout (function(){
					   
				myScroll.refresh();
					   
			}, 2000);
		
		
		
		// SWIPE //
		/*document.addEventListener("orientationchange", function(event){
                switch(window.orientation)
                {
                    case -90: case 90:
                                  
                    //alert("landscape")
					
				    $("#orizzontale").show();
								  
					$("#verticale").hide();
                                  
                    break;
                    default:
                                  
                    //alert("potrait")
								  
					$("#orizzontale").hide();
								  
					$("#verticale").show();
					
                                  
                    }
              });*/
        
        
		
        /*$(document).on("swipeleft", "#pippo", function(e){
                       
            alert("sinistra")
                       
        });*/
        
        
        /*$(function() {
		  
          $("#pippo").swipe( {
							
                           swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                           //alert("You swiped " + direction );
                           },
							
                           threshold:0
                           });
          });*/
		
		
		/*navigator.camera.getPicture(uploadPhoto, onFail, { quality: 50,
									allowEdit: true,
									destinationType: Camera.DestinationType.FILE_URI,
									sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
									targetWidth: 400,
									targetHeight: 400
									});*/
		
	
		/*navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 30,
									allowEdit: true,
									destinationType: Camera.DestinationType.DATA_URL,
									encodingType: Camera.EncodingType.PNG,
									targetWidth: 400,
									targetHeight: 400
									});*/
		

		
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
								   
								   
								   
								   //POST
								   
								   
		   });

		}
		
		
		function onPhotoDataSuccess(imageData) {
	  
			localStorage.setItem("biliard", "data:image/png;base64," + imageData);
	  
			canvas = null;
			
			image = new Image();
			image.onload = validateImage;
			image.src = localStorage.getItem("biliard");
	  
			
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
					
					alert(localStorage.getItem("path"))
					
					uploadFile(mediaFiles[i]);
				}
			};
			
			
			
			// capture error callback
			var captureError = function(error) {
				navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
			};
			
			
			
			function uploadFile(mediaFile) {
				var ft = new FileTransfer(),
				path = mediaFile.fullPath,
				name = mediaFile.name;
				
				ft.upload(path,
						  "http://microverba.com/filesu.php",
						  function(result) {
						  console.log('Upload success: ' + result.responseCode);
						  console.log(result.bytesSent + ' bytes sent');
						  },
						  function(error) {
						  console.log('Error uploading file ' + path + ': ' + error.code);
						  },
						  { fileName: name });
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
					   
					   alert(localStorage.getItem("path"))
					   
					   uploadFile(mediaFiles[i]);
					   }
					   };
					   
					   
					   
					   // capture error callback
					   var captureError = function(error) {
					   navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
					   };
					   
					   
					   
					   function uploadFile(mediaFile) {
					   var ft = new FileTransfer(),
					   path = mediaFile.fullPath,
					   name = mediaFile.name;
					   
					   ft.upload(path,
								 "http://microverba.com/filesu.php",
								 function(result) {
								 console.log('Upload success: ' + result.responseCode);
								 console.log(result.bytesSent + ' bytes sent');
								 },
								 function(error) {
								 console.log('Error uploading file ' + path + ': ' + error.code);
								 },
								 { fileName: name });
					   }
					   
					   
					   // start audio capture
					   
					   navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:2});
					   
					   
		 });
		
		
		$(document).on("touchstart", "#ciccio1", function(e){
					   
			ciccio();
					   
		});
		
		
		function ciccio() {

			var blob = dataURLtoBlob(canvas.toDataURL('image/png'));

		}
		
		
		
		function alertDismissed() {
			
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
			
			//alert(dataURL);
			
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
				   
					navigator.notification.alert(
										 'File caricato correttamente.',  // message
										 alertDismissed,         // callback
										 'File Upload',           // title
										 'Done'                  // buttonName
										 );
				   
				   
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
		
		alert("fine caricamento pagina")
		
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