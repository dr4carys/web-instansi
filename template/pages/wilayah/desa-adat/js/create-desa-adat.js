$("#form-tambah-desa-adat").submit(async (e) => {
  e.preventDefault();
  await addDesaAdat();
});

const addDesaAdat = async () => {
  const name = $("#tambah-desa-adat").val();
  const idKecamatan = $("#tambah-kecamatan").val();
  const latitude = $("#tambah-latitude").val();
  const longitude = $("#tambah-longitude").val();

  const fd = new FormData();
  fd.append("id_kecamatan", idKecamatan);
  fd.append("name", name);
  fd.append("latitude", latitude);
  fd.append("longitude", longitude);
  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  const req = await fetch("https://api.sipandu-beradat.id/desa-adat/create/", {
    method: "POST",
    body: fd,
  });
  const { status_code, message, data } = await req.json();
  if (status_code === 200) {
    alert(message);
    readDesaAdat();
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(addDesaAdat);
  }
};
