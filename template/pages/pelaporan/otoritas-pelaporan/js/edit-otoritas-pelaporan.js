$("#form-edit-otoritas-pelaporan").submit(async (e) => {
  e.preventDefault();
  await updateOtoritasPelaporan();
});

const updateOtoritasPelaporan = async () => {
  const idOtoritasPelaporan = $("#edit-id").val();
  const namaInstansiEdit = $("#edit-instansi").val();
  const jenisPelaporanEdit = $("#edit-jenis-pelaporan").val();

  const fd = new FormData();
  fd.append("id", idOtoritasPelaporan);
  fd.append("id_instansi", namaInstansiEdit);
  fd.append("id_jenis_pelaporan", jenisPelaporanEdit);
  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  const req = await fetch(
    "https://api.sipandu-beradat.id/otoritas-pelaporan-instansi/update/",
    {
      method: "POST",
      body: fd,
    }
  );
  const { status_code, data, message } = await req.json();

  if (status_code === 200) {
    alert(message);
    readOtoritasPelaporan();
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(updateOtoritasPelaporan);
  }
};
