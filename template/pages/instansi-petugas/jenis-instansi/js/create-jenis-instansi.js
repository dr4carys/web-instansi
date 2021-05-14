$("#form-tambah-jenis-instansi").submit(async (e) => {
  e.preventDefault();
  await addJenisInstansi();
});

const addJenisInstansi = async () => {
  const name = $("#tambah-jenis-instansi").val();

  const fd = new FormData();
  fd.append("name", name);
  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  const req = await fetch(
    "https://api.sipandu-beradat.id/jenis-instansi-petugas/create/",
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
    refreshToken(addJenisInstansi);
  }
};
