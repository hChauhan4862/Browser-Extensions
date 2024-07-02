var toDay = new Date();
if (toDay > new Date("2024-02-10")) {
	throw "Software is Expired. Please contact the developer."
}

$().ready(function () {
	command.target = "_blank";
	var submitRationSearchUP2 = submitRationSearchUP;
	setTimeout(function () {
		if (confirm("Please Make Sure, you have re logged in with different User ID")){
			$("#pmjayid").append('&nbsp; &nbsp; &nbsp;<button type="button" class="btn btn-sm btn-dark" id="custom_btn" onclick="submitRationSearchUP()">Search By Aadhaar No.</button>');
		}
		$("#custom_btn").click(function () {
			$("#datahide").show();
			$("#rationsearchdiv").show();
		});
	}, 5000);
});


function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function replaceAll(str, match, replacement) {
	return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement);
}

eval(replaceAll(submitRationSearchUP.toString(), 'url: "/"+requestUri+"/searchByRationCardNumber",', 'url: "http://127.0.0.1/RDSERVICE.php",'));

// alert("Ration Card Number: " + rationCard.value)
// alert(submitRationSearchUP.toString())
