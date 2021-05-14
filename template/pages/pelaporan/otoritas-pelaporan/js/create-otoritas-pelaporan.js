$("#form-tambah-otoritas-pelaporan").submit(async (e) => {
  e.preventDefault();
  await addOtoritasPelaporan();
});

const addOtoritasPelaporan = async () => {
  const namaInstansi = $("#tambah-instansi").val();
  const jenisPelaporan = $("#tambah-jenis-pelaporan").val();

  const fd = new FormData();
  fd.append("id_instansi", namaInstansi);
  fd.append("id_jenis_pelaporan", jenisPelaporan);
  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  const req = await fetch(
    "https://api.sipandu-beradat.id/otoritas-pelaporan-instansi/create/",
    {
      method: "POST",
      body: fd,
    }
  );
  const { status_code, message, data } = await req.json();
  if (status_code === 200) {
    alert(message);
    readOtoritasPelaporan();
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(addOtoritasPelaporan);
  }
};
