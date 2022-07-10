// Alright, for disclosure - I am a bad coder. Feel free to improve this mess.
const Http = new XMLHttpRequest();
var invalidData;
document.getElementById('lsPurge').onclick = function() {
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
	if (markLeaveData.invalid != true || !markLeaveData.invalid) {
		markLeaveData.since = +new Date(markLeaveData.since);
	}
} else {
	// todo: catch http error and warn user about it?
	Http.open("GET", "https://pavluk.org/markabsence.json", true);
	Http.onreadystatechange = (e) => {
		if (Http.readyState != 4 || Http.status != 200) return;
		markLeaveData = JSON.parse(Http.responseText);
		markLeaveData.since = +new Date(markLeaveData.since);
		Cookies.set('leavedata', Http.responseText, {expires: 3});
	};
	Http.send();
}
var noDataObtainedTimeout = setTimeout(function() {
	if (Object.keys(markLeaveData).length === 0) {
		console.log("markLeaveData is 0 length after a while. Http error? Resorting to hardcoded value...");
		markLeaveData = {present:true,since:null,invalid:true};
		Cookies.set('leavedata', '{"present":true,"since":null,"invalid":true}', {expires: 2});
		invalidData = true;
	}
}, 5000)
var updateTimerRep = setInterval(function() {
	if (markLeaveData.present) {
		clearTimeout(noDataObtainedTimeout);
		clearInterval(updateTimerRep);
		document.getElementById("thething").style.color="#58fb55";
		document.getElementById("watcher2").remove();
		if (markLeaveData.since == null) {
			document.getElementById("watcher").remove();
			if (invalidData === true || markLeaveData.invalid) { 
				document.getElementById("thething").innerHTML = "Mark is currently present on the server<b style='color:#FF0000'>*</b>";
				document.getElementById("invalidDataCanary").innerHTML = "<b style='color:#FF0000'>*</b> The data you see originated from a hardcoded value. It's likely that it isn't accurate.";
			} else {
				document.getElementById("thething").innerHTML = "Mark is currently present on the server.";
				document.getElementById("title-head").innerHTML = "Mark's Presence Timer";
				document.title = "Mark's Presence Timer";
			}
		} else {
			document.getElementById("watcher").innerHTML = "Mark has been <b>present</b> on the server for:";
			document.getElementById("title-head").innerHTML = "Mark's Presence Timer";
			document.title = "Mark's Presence Timer";
		}
		document.getElementById("canary").innerHTML = "Oh, there you are!";
	} else if (markLeaveData.since == null) {
		document.getElementById("thething").innerHTML = "an unknown amount of time";
	}
	if (markLeaveData.since != null && Object.keys(markLeaveData).length != 0) {
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
}, 500)
