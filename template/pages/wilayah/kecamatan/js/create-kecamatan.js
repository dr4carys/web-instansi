$("#form-tambah-kecamatan").submit(async (e) => {
  e.preventDefault();
  await addKecamatan();
});

const addKecamatan = async () => {
  const XAT = `Bearer ${localStorage.getItem("access_token")}`;
  const id_kabupaten_create = $("#tambah-kabupaten").val();
  const name = $("#tambah-kecamatan").val();

  const fd = new FormData();
  fd.append("id_kabupaten", id_kabupaten_create);
  fd.append("name", name);
  fd.append("XAT", XAT);

  const req = await fetch("https://api.sipandu-beradat.id/kecamatan/create/", {
    method: "POST",
    body: fd,
  });
  const { status_code, data, message } = await req.json();

  if (status_code === 200) {
    alert(message);
    readKecamatan();
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(addKecamatan);
  }
};
