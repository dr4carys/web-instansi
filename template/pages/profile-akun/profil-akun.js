$(document).ready(async () => {
	readProfil();
});

const readProfil = async () => {
	const fd = new FormData();
	fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);
	const req = await fetch("https://api.sipandu-beradat.id/admin-instansi/me/", {
		method: "POST",
		body: fd
	});
	const {
		status_code,
		message,
		data
	} = await req.json();
	console.log("ssss",data)
	if (status_code === 200) {
		$("#view-cover").attr('src', data.petugas.avatar);
		$("#view-avatar").attr('src',data.petugas.avatar);
		$("#view-name").html(data.petugas.name);
		$("#view-desa-adat").html(data.petugas.instansi_petugas.name);
		$("#view-active-status").html(Number(data.active_status.name) === 1 ? "Aktif" : "Tidak Aktif");
		$('#view-category').html(data.petugas.instansi_petugas.jenis_instansi.name);

		$("#nama-admin").val(data.petugas.name);
		$("#nik-admin").val(data.petugas.nik);
		$("#gender-admin").val(data.petugas.gender === 'l' ? 'Laki-laki' : 'Perempuan');
		$("#phone-admin").val(data.petugas.phone);
		$("#birth-admin").val(data.petugas.date_of_birth);



	} else if (status_code === 401) {
		refreshToken(readProfil)
	}
};