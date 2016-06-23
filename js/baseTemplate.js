$.ajax({
	type: "post",
	url: "../template/header.html",
	dataType: "text",
	success: function(data) {
		$(".maxBox").before(data)
	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
		alert(errorThrown);
	}
});
$.ajax({
	type: "post",
	url: "../template/footer.html",
	dataType: "text",
	success: function(data) {
		$(".maxBox").after(data)
	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
		alert(errorThrown);
	}
});