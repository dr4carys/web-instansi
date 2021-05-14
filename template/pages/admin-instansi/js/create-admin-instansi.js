$("#form-tambah-admin-instansi").submit(async (e) => {
  e.preventDefault();
  startLoading();
  await tambahAdmin();
});

const tambahAdmin = async () => {
  $(".preloader1").fadeIn(300);
  const id_petugas = $("#tambah-admin-instansi").val();

  const fd = new FormData();
  fd.append("id_petugas", id_petugas);
  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  const req = await fetch(
    "https://api.sipandu-beradat.id/admin-instansi/create/",
    {
      method: "POST",
      body: fd,
    }
  );
  const { status_code, message } = await req.json();

  if (status_code === 200) {
    await readAdmin();
    stopLoading();
    Swal.fire({
      title: "Berhasil!",
      text: message,
      icon: "success",
      confirmButtonText: "Tutup",
    });
  } else if (status_code === 400) {
    stopLoading();
    Swal.fire({
      title: "Terjadi Kesalahan!",
      text: message,
      icon: "error",
      confirmButtonText: "Tutup",
    });
  } else if (status_code === 401) {
    refreshToken(tambahAdmin);
  }
  $(".preloader1").fadeOut(300);
};
