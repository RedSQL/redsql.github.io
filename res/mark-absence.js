// Alright, for disclosure - I am a bad coder. Feel free to improve this mess.
const Http = new XMLHttpRequest();
var invalidData;
document.getElementById('nocookie').onclick = function() {
	if (!Cookies.get('leavedata') && !Cookies.get('leavedate')) {
		alert('You did not have the cookie to begin with. (Or you already got rid of it)');
	} else {
		Cookies.remove('leavedate');
		Cookies.remove('leavedata');
		alert('Your singular cookie has been deleted.');
	}
}
let markLeaveData = {};
if (Cookies.get('leavedata')) {
	markLeaveData = JSON.parse(Cookies.get('leavedata'));
	markLeaveData.since = +new Date(markLeaveData.since);
} else {
	Http.open("GET", "https://pavluk.org/markabsence.json", true);
	Http.onreadystatechange = (e) => {
		if (Http.readyState != 4 || Http.status != 200) return;
		markLeaveData = JSON.parse(Http.responseText);
		markLeaveData.since = +new Date(markLeaveData.since);
		Cookies.set('leavedata', Http.responseText, {expires: 3});
	};
	Http.send();
}
if (!markLeaveData) {
	console.log("Cannot retrieve ts on first try, using hardcoded value...");
	Cookies.set('leavedata', '{}', {expires: 3});
	markLeaveData = {present:true,since:null};
	invalidData = true;
}
if (markLeaveData.present) {
	document.getElementById("thething").style.color="#58fb55";
	document.getElementById("watcher2").remove();
	if (markLeaveData.since == null) {
		document.getElementById("watcher").remove();
		if (invalidData === true) { 
			document.getElementById("thething").innerHTML = "Mark is currently present on the server<b style='color:#FF0000'>*</b>";
			document.getElementById("invalidDataCanary").innerHTML = "<b style='color:#FF0000'>*</b> The data you see originated from a hardcoded value. It's likely that it isn't accurate.";
		} else {
			document.getElementById("thething").innerHTML = "Mark is currently present on the server.";
		}
	} else {
		document.getElementById("watcher").innerHTML = "Mark has been <b>present</b> on the server for:";
	}
	document.getElementById("canary").innerHTML = "Oh, there you are!";
} else if (markLeaveData.since == null) {
	document.getElementById("thething").innerHTML = "an unknown amount of time";
}
if (markLeaveData.since != null) {
	var update = setInterval(function(){
		var date = new Date();
		var msdiff = Math.abs(date - markLeaveData.since);
		
		var secdiffTotal = msdiff / 1000;
		var mindiffTotal = secdiffTotal / 60;
		var hrdiffTotal = mindiffTotal / 60;
		var daydiffTotal = hrdiffTotal / 24;
		
		var secdiff = Math.floor(secdiffTotal % 60);
		var mindiff = Math.floor(mindiffTotal % 60);
		var hrdiff = Math.floor(hrdiffTotal % 24);
		var daydiff = Math.floor(daydiffTotal);
		
		document.getElementById("thething").innerHTML = daydiff + " Days, " + hrdiff + " Hours, " + mindiff + " Minutes, and " + secdiff + " Seconds. "
	}, 1000)
}
