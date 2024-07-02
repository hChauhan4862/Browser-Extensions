var toDay = new Date();
if (toDay > new Date("2024-02-10")) {
	throw "Software is Expired. Please contact the developer."
}

function hc_createForm(name, Father, yob, gender) {
	name = (name || $("#name").val() || "").trim();
	Father = (Father || $("#fathername").val() || "").trim();
	yob = (yob || $("#dob").val() || "").trim();
	gender = (gender || $("#genderid").val() || "").trim();
	verificationStatus = document.getElementById("verification_status").value
	if (verificationStatus == "A" || verificationStatus == "G") {
		command.submit();
		return;
	}
	// Create Bootstrap Modal Form
	var html = `
<div class="modal fade" id="mdlVerify" tabindex="-1" aria-labelledby="mdlVerifyLabel" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
	<div class="modal-dialog">
	   <div class="modal-content" style="align-content: center;">
		  <form onsubmit="return hc_step1_verified();return false;">
			 <div class="modal-header">
				<h5 class="modal-title" id="mdlVerifyLabel">Please Verify Details As Aadhaar Card To Continue</h5>
			 </div>
			 <div class="modal-body">
				<div class="mb-3 row">
				   <label for="hc_name" class="col-sm-4 col-form-label">Card Holder Name</label>
				   <div class="col-sm-8"><input type="text" autofocus class="form-control" id="hc_name" value="${name}"></div>
				</div>
				<div class="mb-3 row">
				   <label for="hc_father" class="col-sm-4 col-form-label">Father's Name</label>
				   <div class="col-sm-8"><input type="text" class="form-control" id="hc_father" value="${Father}"></div>
				</div>
				<div class="mb-3 row">
				   <label for="hc_yob" class="col-sm-4 col-form-label">Year Of Birth</label>
				   <div class="col-sm-8"><input type="text" class="form-control" id="hc_yob" value="${yob}"></div>
				</div>
				<div class="mb-3 row">
				   <label for="hc_uid" class="col-sm-4 col-form-label">AADHAAR NO</label>
				   <div class="col-sm-8"><input type="text" class="form-control" id="hc_uid" value=""></div>
				</div>
				<div class="mb-3 row">
					<label for="hc_gender" class="col-sm-4 col-form-label">Gender</label>
					<div class="col-sm-8"><input type="text" class="form-control" readonly id="hc_gender" value="${gender}"></div>					
			 </div>
			 <div class="modal-footer">
			 	<button type="submit" class="btn btn-primary">Edit & Continue</button>
				<button onclick="closeForm()" type="reset" class="btn btn-danger">Cancel/Close</button>
			</div>
		  </form>
	   </div>
	</div>
 </div>`;
	// Append Modal Form
	$('body').prepend(html);
	// Show Modal Form
	$('#mdlVerify').modal('show');
	// Focus on name
	$('#hc_name').focus();
}

$().ready(function () {
	command.target = "_blank";
	var editDetail2 = editDetail;
});
var closeForm = function () {
	$('#mdlVerify').modal('hide');
	setTimeout(function () { $('#mdlVerify').remove(); }, 500);
}


function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function replaceAll(str, match, replacement) {
	return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement);
}

eval(replaceAll(editDetail.toString(), "document.forms[0].submit();", "setTimeout(function () {hc_createForm()}, 1000);"));

// Path: hc_step1.js
var hc_step1_verified = function () {
	var name = $("#hc_name").val();
	var father = $("#hc_father").val();
	var yob = $("#hc_yob").val();
	var uid = $("#hc_uid").val();
	var gender = $("#hc_gender").val();

	if (uid.length == 12 && uid.match(/^[0-9]+$/) != null && uid.match(/^[0-9]+$/)[0] == uid) {
		on();
		$.ajax({
			type: "POST",
			url: "/setu/checkAadhaarHash",
			data: {
				"aadhar": uid
			},
			success: function (data) {
				off();
				console.log(data);
				var obj = jQuery.parseJSON(data);
				if (obj['status'] == "Y") {
					alert("Aadhaar Number Already Exist");
					return false;
				}
				$("#uid_token").val(uid);
				$("#verification_status").val("ID");

				$("#name").val(name);
				$("#fathername").val(father);
				$("#dob").val(yob);
				$("#genderid").val(gender)
				command.submit();
			},
			error: function (e) {
				off();
				if ('Bis_Login' == 'Bis_Login') {
					alert('API Gateway is not responding. Please try again.');
				} else {
					alert('Your session has been expired. Please relogin again.');
					window.location.href = 'sessionExpire';
				}
			}
		});
	}
	else {
		$("#name").val(name);
		$("#fathername").val(father);
		$("#dob").val(yob);
		$("#genderid").val(gender)
		command.submit();
	}
	closeForm();
	return false;
}