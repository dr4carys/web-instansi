$("#form-tambah-instansi").submit(async (e) => {
  e.preventDefault();
  await addInstansi();
});

const addInstansi = async () => {
  const name = $("#tambah-instansi").val();
  const idKecamatan = $("#tambah-kecamatan").val();
  const idJenisInstansi = $("#tambah-jenis-instansi").val();
  const otoritasPelaporan = $("#tambah-status-pelaporan").val();

  const fd = new FormData();
  fd.append("id_kecamatan", idKecamatan);
  fd.append("name", name);
  fd.append("id_jenis_instansi", idJenisInstansi);
  fd.append("report_status", otoritasPelaporan);
  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  const req = await fetch(
    "https://api.sipandu-beradat.id/instansi-petugas/create/",
    {
      method: "POST",
      body: fd,
    }
  );
  const { status_code, message, data } = await req.json();
  if (status_code === 200) {
    alert(message);
    readInstansi();
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(addInstansi);
  }
};
