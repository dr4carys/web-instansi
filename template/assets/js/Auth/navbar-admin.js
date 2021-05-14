$(document).ready(async () => {
	$("#nama-admin").html(localStorage.getItem("name"))
	$("#avatar-admin").attr("src", localStorage.getItem("avatar"))
});
