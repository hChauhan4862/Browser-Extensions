function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function replaceAll(str, match, replacement) {
	return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement);
}


$().ready(function () {
	var i = document.createElement('iframe'); i.style.display = 'none'; document.body.appendChild(i); window.console = i.contentWindow.console;    // Enable Console
	var test = $("#mobileVerify1").html()
	test = replaceAll(test, '<!--', '');
	test = replaceAll(test, '-->', '');
	$("#mobileVerify1").html(test);
	console.log(test);
	$(document).on('click','#generateOTP', function(){
		var handle = $(this);
		setTimeout(function () {
			var chooseScheme = $('select[name=chooseScheme] option:selected').val();
			var searchPara = $('select[name=searchPara] option:selected').val();
			var searchText = $('select[name=searchPara] option:selected').text();
			var stateCode = $('select[name=statecode] option:selected').val();
			var length = $("#parameter").val().length;
			var	parameter = $("#parameter").val();
			var pmid = handle.parent().parent().find('.hideValue').val();
			var token = $("meta[name='_csrf']").attr("content");

			var verificationSource = handle.parent().parent().find('.selectedverificationSource').val();//added by Praveen
			       if (verificationSource=='O') {
				     alert('This beneficiary is deceased.');
				      handle.attr("disabled","disabled");
				      return false;
			                                         }

		//	alert(pmrssmid + stateCode);

			var pmrssmid = pmid;
			
			 $('#downloadHealthCard').submit(
							function(eventObj) {
								$('#downloadHealthCard').empty();
								$(this).append('<input type="hidden" name="stateCode" value="'+stateCode+'" /> ');
								$(this).append('<input type="hidden" name="ahlTin" value="" /> ');
								$(this).append('<input type="hidden" name="nhaid" value="'+pmrssmid+'" /> ');
								$(this).append('<input type="hidden" name="_csrf" value="'+token+'"/>');
								return true;
							});
			$('#downloadHealthCard').submit();
		}, 3000);
	});
});