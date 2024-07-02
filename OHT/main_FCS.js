var url = window.location.href;

// Track Application
if (url.indexOf("TrackingRationCard/TrackApplication.aspx") > -1) {
	$('#txtRC').unbind('copy paste cut');
	$("#divBCaptcha").html(`<div class="d-grid gap-3">
	<input type="button" id="btnHcSearch" class="btn btn-lg btn-primary radius-30 button-2" value="Harendra Chauhan" onclick="searchHCdata()">
	</div>`)
	var searchHCdata = ()=>{
		$("#txtCaptcha").val($("#hdCaptcha").val())
		BindTrackingRationCard()
	}
}




// View Card
if (url.indexOf("TrackingRationCard/NFSARCSearch.aspx") > -1) {
	$('#txtRC').unbind('copy paste cut');
	$("#divBCaptcha").html(`<div class="d-grid gap-3">
	<input type="button" id="btnHcSearch" class="btn btn-lg btn-primary radius-30 button-2" value="Harendra Chauhan" onclick="searchHCdata()">
	</div>`)
	var searchHCdata = ()=>{
		$("#txtCaptcha").val($("#hdCaptcha").val())
		BindRationCard()
	}
}







// Code For List Data
if (url.indexOf("citizen/ReportRegidWise.aspx") > -1) {
	var sortByName = () => {
		function comparer(index) {
			return function (a, b) {
				var valA = getCellValue(a, index), valB = getCellValue(b, index);
				return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
			};
		}
		function getCellValue(row, index) { return $(row).children('td').eq(index).text() }
		var table = $('#tbldata tbody')
		var rows = table.find('tr').toArray().sort(comparer(2))
		this.asc = !this.asc;
		if (!this.asc) { rows = rows.reverse() }
		for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }

		$("#tbldata tbody tr").each(function () {
			$(this).find("td").first().html($(this).index() + 1);
		});
	};

	function removeColumn(name) {
		var hc_rc_headers = ["", "#", "RC_NO", "NAME", "FATHER", "MOTHER", "UNIT", "DATE"];
		var id = hc_rc_headers.indexOf(name);
		$("#tbldata thead tr:nth-child(2) td:nth-child(" + id + ")").toggle();
		$("#tbldata tbody tr td:nth-child(" + id + ")").each(function () {
			$(this).toggle();
		});
	}

	var hcTableReCreate = () => {
		$('#tbldata').DataTable().destroy();
		$("#tbldata thead tr:nth-child(2) td").each(function () {
			$(this).removeAttr("style");
			$(this).html($(this).html().replace("डिजिटाइज्ड राशन कार्ड संख्या", "राशन कार्ड संख्या"));
			$(this).html($(this).html().replace("धारक का नाम", "धारक का नाम"));
			$(this).html($(this).html().replace("पिता/पति का नाम", "पिता/पति का नाम"));
			$(this).html($(this).html().replace("माता का नाम", "माता का नाम"));
			$(this).html($(this).html().replace("कुल यूनिट", "यु<br>नि<br>ट"));
			$(this).html($(this).html().replace("राशन कार्ड जारी ( डिजिटल हस्ताक्षर ) करने की तिथि ", "जारी की तिथि"));
		});
		$("#tbldata thead tr:nth-child(1) td")
		sortByName();

		$("#tbldata thead tr:nth-child(1) td").html("<b>ग्रा. पंचायत</b>:" + $("#tbldata thead tr:nth-child(1) td").html().split("<b>ग्राम पंचायत</b>:")[1])
	}

	function addColumn(text) {
		const cell = document.createElement("td")
		cell.contentEditable = 'true';

		const cellH = document.createElement("td")
		cellH.innerText = (text ? text : '');
		cellH.contentEditable = 'true';

		$("#tbldata thead tr:nth-child(2)").append(cellH);
		$("#tbldata tbody tr").each(function () {
			$(this).append(cell.cloneNode(true));
		});
	}

	function hc_auto() {
		//if (confirm("Hide MOTHER NAME column?")) { removeColumn('MOTHER'); }
		if (confirm("Hide DATE column?")) { removeColumn('DATE'); }
		if (confirm("Add Genhu column?")) { addColumn('गें\nहुँ'); }
		if (confirm("Add Chaval column?")) { addColumn('चा\nव\nल'); }
		if (confirm("Add Chana column?")) { addColumn('च\nना'); }
		if (confirm("Add refined column?")) { addColumn('रि\nफा\nइ\nड'); }
		if (confirm("Add Namak column?")) { addColumn('न\nम\nक'); }
		if (confirm("Add Chini column?")) { addColumn('ची\nनी'); }
		if (confirm("Add Signature column?")) { addColumn('____हस्ताक्षर‌‌‌‌____'); }
	}

	// Code For Side Button
	var htmlTe = `<style>@media print{.no-print, .no-print *{display: none !important;}}</style>
		<div class="no-print" id="hc_button_div" style="border-width:3px;background-color:#cae8ca;border-style:solid;position:fixed;padding:7px;bottom:0;right:0;max-width:450px;z-index:999">
		<!-- <b style="cursor:pointer;color: blue" onclick="manageHeight('+')">+</b>&nbsp; &nbsp; &nbsp;<b style="cursor:pointer;color: blue" onclick="manageHeight('-')">-</b><br><br> -->
				<b style="cursor:pointer;color: blue" onclick="removeColumn('UNIT')">Hide Unit</b><br>
				<b style="cursor:pointer;color: blue" onclick="removeColumn('DATE')">Hide Date</b><br>
				<b style="cursor:pointer;color: blue" onclick="removeColumn('MOTHER')">Hide Mother</b><br>
				<b style="cursor:pointer;color: blue" onclick="addColumn()">Create Column</b><br>
				<b style="cursor:pointer;color: blue" onclick="hc_auto()">Automatic</b><br>
		</div>`;

	$(document).ready(function () {
		hcTableReCreate();
		document.getElementsByClassName('footer-bottom')[0].innerHTML += htmlTe;
	});
}