$(document).ready(async () => {
  $("#sidebar-nama-admin").html(localStorage.getItem("name"));
  $("#nama-admin").html(localStorage.getItem("name"));
  $("#sidebar-avatar-admin").attr("src", localStorage.getItem("avatar"));
  $("#avatar-admin").attr("src", localStorage.getItem("avatar"));
  $("#sidebar-nama-instansi").html(localStorage.getItem("jenis_instansi"));
});
