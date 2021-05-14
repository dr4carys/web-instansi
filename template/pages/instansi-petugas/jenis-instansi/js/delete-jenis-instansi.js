$("#btn-hapus-jenis-instansi").click(async () => {
  await removeJenisInstansi();
});

const removeJenisInstansi = async () => {
  const XAT = `Bearer ${localStorage.getItem("access_token")}`;
  const fd = new FormData();
  const idJenisInstansiHapus = $("#hapus-id").val();
  fd.append("XAT", XAT);
  fd.append("id", idJenisInstansiHapus);

  const req = await fetch(
    "https://api.sipandu-beradat.id/jenis-instansi-petugas/delete/",
    {
      method: "POST",
      body: fd,
    }
  );

  const { status_code, data, message } = await req.json();

  if (status_code === 200) {
    alert(message);
    readJenisInstansi();
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(removeJenisInstansi);
  }
};
