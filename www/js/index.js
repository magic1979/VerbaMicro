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
		
		StatusBar.hide();
		
        
        if (localStorage.getItem("email") === null || localStorage.getItem("email")=="null" || typeof(localStorage.getItem("email")) == 'undefined' || localStorage.getItem("email")==0 || localStorage.getItem("email")=="") {
            
            window.location.href = "Login.html";
            
        }
		
		
		var watchID = navigator.geolocation.getCurrentPosition(gpsonSuccess, gpsonError, {timeout: 30000, enableHighAccuracy: true, maximumAge: 90000 });
		
		

        var options = {
        date: new Date(),
        mode: 'date'
        };
		
        function onSuccess(date) {
            alert('Selected date: ' + date);
        }
        
        function onError(error) { // Android only
            alert('Error: ' + error);
        }
        
       // datePicker.show(options, onSuccess, onError);
		
		
		$(document).on("touchstart", "#imgutente2", function(e){
					   
					   navigator.camera.getPicture(uploadPhoto, onFail, { quality: 50,
												   allowEdit: true,
												   destinationType: Camera.DestinationType.FILE_URI,
												   sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
												   targetWidth: 200,
												   targetHeight: 200
												   });
					   });
		
		
		
		
		$(document).on("touchstart", "#biliard", function(e){
					   
					   navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 30,
												   allowEdit: true,
												   destinationType: Camera.DestinationType.DATA_URL,
												   encodingType: Camera.EncodingType.PNG,
												   targetWidth: 200,
												   targetHeight: 200
												   });
					   
					   
					   });


		
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
        
    }
};


function onPhotoDataSuccess(imageData) {
	
	localStorage.setItem("biliard", "data:image/png;base64," + imageData);
	
	var image00 = document.getElementById('biliard');
	image00.src = localStorage.getItem("biliard");
	
	
	$.ajax({
		   type: "POST",
		   url: "http://microverba.com/picture.php",
		   data: {imgdata:imageData},
		   cache: false,
		   crossDomain: true,
		   contentType: "application/x-www-form-urlencoded",
		   success: function (result) {
		   
		     alert(result.Token)
		   
		   
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


function onFail(message) {
	navigator.notification.alert(
								 message,  // message
								 alertDismissed,         // callback
								 'Foto',            // title
								 'OK'                  // buttonName
								 );
}



function uploadPhoto(imageURI) {
	
	/*var largeImage = document.getElementById('imgutente2');

	largeImage.style.display = 'block';

	largeImage.src = imageURI;*/
	
	
	var path = imageURI;
	
	
	// Convert image
	getFileContentAsBase64(path,function(base64Image){
						   
		console.log(base64Image.replace("data:image/jpeg;base64,",""));
		// Then you'll be able to handle the myimage.png file as base64
						   
		localStorage.setItem("imgutente2", base64Image);
		localStorage.setItem("imgutente3", base64Image.replace("data:image/jpeg;base64,",""));
						   
		var image000 = document.getElementById('imgutente2');
		image000.src = localStorage.getItem("imgutente2");
						   
						   
		//POST
						   $.ajax({
								  type: "POST",
								  url: "http://microverba.com/picture.php",
								  data: {imgdata:localStorage.getItem("imgutente3")},
								  cache: false,
								  crossDomain: true,
								  contentType: "application/x-www-form-urlencoded",
								  success: function (result) {
								  
								    alert(result.Token)
								  
								  
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

		
	});
	
	
	/*var options = new FileUploadOptions();
	options.fileKey="file";
	options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	options.mimeType="image/jpeg";
	
	var params = {};
	params.value1 = "add_"+localStorage.getItem("email").replace("@","").replace(".","").replace(".","")+"";
	params.value2 = "param";
	
	options.params = params;
	options.chunkedMode = false;
	
	
	var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://msop.it/uploadaddall.php"), win, fail, options);*/
	
}



function getFileContentAsBase64(path,callback){
	window.resolveLocalFileSystemURL(path, gotFile, fail);
	
	function fail(e) {
		alert('Cannot found requested file');
	}
	
	function gotFile(fileEntry) {
		fileEntry.file(function(file) {
					   var reader = new FileReader();
					   reader.onloadend = function(e) {
					   var content = this.result;
					   callback(content);
					   };
					   // The most important point, use the readAsDatURL Method from the file plugin
					   reader.readAsDataURL(file);
					   });
	}
}


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


function win(r) {
	console.log("Code = " + r.responseCode);
	console.log("Response = " + r.response);
	console.log("Sent = " + r.bytesSent);
	
	
	/*$.ajax({
		   type:"GET",
		   url:"http://msop.it/addall/caricafoto.php?nome=add_"+localStorage.getItem("email").replace("@","").replace(".","").replace(".","")+".jpg&email="+localStorage.getItem("email")+"",
		   contentType: "application/json",
		   //data: {Lat:3,Longi:4},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   localStorage.setItem("nomefoto", "add_"+localStorage.getItem("email").replace("@","").replace(".","").replace(".",""));
		   //$.each(result, function(i,item){
		   
		   //});
		   
		   //alert(r.response);
		   
		   
		   },
		   error: function(){
		   
		   navigator.notification.alert(
										'errore nel caricamento della foto, riprova in seguito',  // message
										alertDismissed,         // callback
										'Foto',            // title
										'OK'                  // buttonName
										);
		   
		   
		   },
		   dataType:"jsonp"});*/
	
	
	
}

function fail(error) {
	alert("An error has occurred: Code = " + error);
}


$(document).on("touchstart", "#esci", function(e){
			   
	localStorage.setItem("email", "");
	localStorage.setItem("emailpass", "");
			   
	window.location.href = "Login.html";
			   
});


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


$(document).on("touchstart", "#stop", function(e){
               
   media.stop();
               
});


$(document).on("touchstart", "#registra", function(e){
			   // Record audio
			   //
			   
			   var src = "beer.wav";
			   var mediaRec = new Media(src,
										// success callback
										function() {
										alert("recordAudio():Audio Success");
										},
										
										// error callback
										function(err) {
										alert("recordAudio():Audio Error: "+ err.code);
										});
			   
			   // Record audio
			   mediaRec.startRecord();
			  
			   
			   var recTime = 0;
			   var recInterval = setInterval(function() {
											 recTime = recTime + 1;
											 setAudioPosition(recTime + " sec");
											 if (recTime >= 10) {
											 clearInterval(recInterval);
											 mediaRec.stopRecord();
											 }
											 }, 1000);
					   
});


// onSuccess Callback
//
function onSuccess2() {
	alert("recordAudio():Audio Success");
	//alert(filePath);
}

// onError Callback
//
function onError2(error) {
	alert('code: '    + error.code    + '\n' +
		  'message: ' + error.message + '\n');
}

// Set audio position
//
function setAudioPosition(position) {
	document.getElementById('audio_position').innerHTML = position;
}


$(document).on("touchstart", "#page3", function(e){
			   
	window.location.href = "index3.html";
});


$(document).on("touchstart", "#pause", function(e){
               
    //window.plugins.streamingMedia.pauseAudio();
               
});


$(document).on("touchstart", "#play", function(e){
               
	playAudio2('successSound');
               
});


function playAudio2(id) {
	var audioElement = document.getElementById(id);
	var url = "beer.wav"//audioElement.getAttribute('src');
	
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

function alertDismissed() {
	
}


