document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    //document.addEventListener("resume", onResume, false);
	
	last_click_time = new Date().getTime();
	
	document.addEventListener('click', function (e) {
							  
							  click_time = e['timeStamp'];
							  
							  if (click_time && (click_time - last_click_time) < 1000) { e.stopImmediatePropagation();
							  
							  e.preventDefault();
							  
							  return false;
							  
							  }
							  
							  last_click_time = click_time;
							  
							  }, true);
	
	
	$(document).on("tap", "#indietro", function(e){
		window.location.href = "index.html";
				   
	});

	
    
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
	
	
    $(".spinner").show();
    var connectionStatus = false;
    connectionStatus = navigator.onLine ? 'online' : 'offline';
	
    
	document.addEventListener("showkeyboard", function(){ $("[data-role=footer]").hide();}, false);
	document.addEventListener("hidekeyboard", function(){ $("[data-role=footer]").show();}, false);
	
	
	// Workaround for buggy header/footer fixed position when virtual keyboard is on/off
	$('input, select')
	.on('focus', function (e) {
		$('header, footer').css('position', 'absolute');
		})
	.on('blur', function (e) {
		$('header, footer').css('position', 'fixed');

		});
	
	
	var email = localStorage.getItem("email");

	//$("#radio").attr("href", "maps:saddr="+ localStorage.getItem("ciao") +","+ localStorage.getItem("ciao1") +"&daddr=Via di Acilia,17,Roma");
	
	var email = localStorage.getItem("email");
	

    if(connectionStatus=='online'){
		//$('#rati1').raty({ score: 3 });
		$(".spinner").hide();

		seleziona();
		
    }
    
    else{
		
		
		$("#noconn").html(tabella);
		
        
    }

}

function seleziona() {
	
	//alert(localStorage.getItem("email"))
	
	var landmark2="";
	$(".spinner").show();
	
	$.ajax({
		   type:"GET",
		   url:"http://msop.it/rides/check_MieNotifiche.asp",
		   contentType: "application/json",
		   data: {email:localStorage.getItem("email")},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
			if(item.ID==0) {
				landmark2 = landmark2 + "Nessuna notifica presente.";
			}
			else{
				//alert("ok")
				
				//var anno = item.Data.slice(0,4)
				//var mese = item.Data.slice(4,6)
				//var giorno = item.Data.slice(6,8)
				
				var comp =  item.Giorno + "/" +  item.Mese + "/" +  item.Anno + "&nbsp;-&nbsp;" + item.Ora + ":" + item.minuti
				  
				landmark2 = landmark2 + "<table height='30px' border='0' width='320px'><tr><td align='left' colspan='2'><font size='4' color='#454545'><img src='img/push.png' width='18'>&nbsp;"+ comp +"</font></td></tr><tr><td align='left' colspan='2'><font size='2' color='#454545'>"+ item.Push  +"</font></td></tr></table><hr><br>";
				}

			});
		   
		   //landmark2 = landmark2 + "<br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br><br><br><br><br>dssdsaddada<br><br><br>";

		   
		   $(".spinner").hide();
		   
		    $("#recensione1").html(landmark2);
		   
		   $("#noconn").hide();
		   
		   myScroll.refresh();
		   
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




function onResume() {
    onDeviceReady();
}

function alertDismissed() {
	$(".spinner").hide();
}





