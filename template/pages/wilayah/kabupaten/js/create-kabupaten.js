$("#form-tambah-kabupaten").submit(async (e) => {
  e.preventDefault();
  await addKabupaten();
});

const addKabupaten = async () => {
  const XAT = `Bearer ${localStorage.getItem("access_token")}`;
  const id_provinsi = $("#tambah-provinsi").val();
  const name = $("#tambah-kabupaten").val();

  const fd = new FormData();
  fd.append("id_provinsi", id_provinsi);
  fd.append("name", name);
  fd.append("XAT", XAT);

  const req = await fetch("https://api.sipandu-beradat.id/kabupaten/create/", {
    method: "POST",
    body: fd,
  });
  const { status_code, data, message } = await req.json();

  if (status_code === 200) {
    alert(message);
    readKabupaten();
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(addKabupaten);
  }
};
