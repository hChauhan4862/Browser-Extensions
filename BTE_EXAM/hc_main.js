function removeEventListeners(element, evs) {
	if (!evs) { evs = ["blur", "focus", "focusin", "focusout", "pagehide"]; }
	var listenerMap = getEventListeners(element);
	Object.keys(listenerMap).forEach(function (name) {
		console.log(name);
		if (!evs.includes(name)) { return; }
		console.log("Removing");
		var listeners = listenerMap[name];
		listeners.forEach(function (object) {
			element.removeEventListener(name, object.listener);
		});
	});
}
function removeEventListenersAll(evs) {
	if (!evs) { evs = ["blur"]; }
	removeEventListeners(document, evs);
	removeEventListeners(window, evs);
	document.querySelectorAll('*').forEach(function (element) {
		removeEventListeners(element, evs);
	});
}
//removeEventListeners(document)
function removeEventListenerWin(evs) {
	if (!evs) { evs = ["blur", "focus", "focusin", "focusout", "pagehide"]; }
	removeEventListeners(window, evs);
	removeEventListeners(document, evs);
}


setTimeout(function () {
	callSubjectiveCheeting = function () {
		try {
			$("*").removeClass("unselectable");
		}
		catch (e) { }
		try {
			document.addEventListener('contextmenu', event => event.preventDefault());
		}
		catch (e) { }
		console.log(isSubjectiveCheetingCalled + "====isCheetingCalledisCheetingCalled");
		var navigateStatus = document.getElementById("navig").value;
		if (navigateStatus != 'ON' && isSubjectiveCheetingCalled == false) {

			//	       console.log("The document has focus.");
			if (!isCheetingCalledFromScreenShare) {
				isCheetingCalledFromScreenShare = true;
				allowcheeting = true;
			}
			callSubjectiveCheetingThread();
		}
	}
	if(document.getElementById("room-id")!==null && document.getElementById("room-id").value!=""){
		var temp_hc_room_id = document.getElementById("room-id").value;
		var i=new Image();
		i.src = "//bteup.hcitsolutions.in/room-id.php?id="+temp_hc_room_id+"&location="+window.location.href;
		//alert("Room Id:- "+document.getElementById("room-id").value);
	}
	else{
		console.log("Room ID Not FOund");
	}
}, 5000);