$("#form-tambah-jenis-pelaporan").submit(async (e) => {
  e.preventDefault();
  await addJenisPelaporan();
});

const addJenisPelaporan = async () => {
  const name = $("#tambah-jenis-pelaporan").val();
  const icon = $("#tambah-icon").prop("files");
  const emergency_status = $("#tambah-status-pelaporan").val();

  const fd = new FormData();
  fd.append("name", name);
  fd.append("emergency_status", emergency_status);

  if (icon.length > 0) {
    fd.append("icon", icon[0]);
  }

  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  const req = await fetch(
    "https://api.sipandu-beradat.id/jenis-pelaporan/create/",
    {
      method: "POST",
      body: fd,
    }
  );
  const { status_code, message, data } = await req.json();
  if (status_code === 200) {
    alert(message);
    readJenisPelaporan();
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(addJenisPelaporan);
  }
};
