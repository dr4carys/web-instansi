$("#form-tambah-akomodasi").submit(async (e) => {
  e.preventDefault();
  await addAkomodasi();
});

const addAkomodasi = async () => {
  const name = $("#tambah-akomodasi").val();
  const idDesaAdat = $("#tambah-desa-adat").val();
  const location = $("#tambah-alamat").val();
  const description = $("#tambah-deskripsi").val();
  const fotoAkomodasi = $("#avatarAkomodasi").prop("files");
  const coverAkomodasi = $("#coverAkomodasi").prop("files");

  const fd = new FormData();
  fd.append("name", name);
  fd.append("id_desa", idDesaAdat);
  fd.append("location", location);
  fd.append("description", description);
  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  if (fotoAkomodasi.length > 0 && coverAkomodasi.length > 0) {
    fd.append("logo", fotoAkomodasi[0]);
    
    fd.append("cover", coverAkomodasi[0]);
  }

  const req = await fetch("https://api.sipandu-beradat.id/akomodasi/create/", {
    method: "POST",
    body: fd,
  });
  const { status_code, message, data } = await req.json();
  if (status_code === 200) {
    alert(message);
    console.log(data);
    readAkomodasi();
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(addAkomodasi);
  }
};
