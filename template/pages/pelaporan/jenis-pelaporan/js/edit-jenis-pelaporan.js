$("#form-edit-jenis-pelaporan").submit(async (e) => {
  e.preventDefault();
  await updateJenisPelaporan();
});

const updateJenisPelaporan = async () => {
  const idJenisPelaporan = $("#edit-id").val();
  const jenisPelaporanEdit = $("#edit-jenis-pelaporan").val();
  const iconJenisPelaporanEdit = $("#edit-icon").prop("files");
  const statusDaruratEdit = $("#edit-status-pelaporan").val();
  const statusJenisPelaporan = $("#edit-active-status").val();

  const fd = new FormData();
  fd.append("id", idJenisPelaporan);
  fd.append("name", jenisPelaporanEdit);
  fd.append("emergency_status", statusDaruratEdit);
  fd.append("active_status", JSON.parse(statusJenisPelaporan));
  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  if (iconJenisPelaporanEdit.length > 0) {
    fd.append("icon", iconJenisPelaporanEdit[0]);
  }

  const req = await fetch(
    "https://api.sipandu-beradat.id/jenis-pelaporan/update/",
    {
      method: "POST",
      body: fd,
    }
  );
  const { status_code, data, message } = await req.json();

  if (status_code === 200) {
    alert(message);
    readJenisPelaporan();
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(updateJenisPelaporan);
  }
};
