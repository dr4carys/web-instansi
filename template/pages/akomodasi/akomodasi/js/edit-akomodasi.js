$("#form-edit-akomodasi").submit(async (e) => {
  e.preventDefault();
  await updateAkomodasi();
});

const updateAkomodasi = async () => {
  const id = $("#edit-id").val();
  const name = $("#edit-akomodasi").val();
  const idDesaAdat = $("#edit-desa-adat").val();
  const location = $("#edit-alamat").val();
  const description = $("#edit-deskripsi").val();
  const fotoAkomodasi = $("#edit-profil-pic").prop("files");
  const coverAkomodasi = $("#edit-cover-pic").prop("files");
  const statusAkomodasi = $("#edit-active-status").val();

  const fd = new FormData();
  fd.append("id", id);
  fd.append("name", name);
  fd.append("id_desa", idDesaAdat);
  fd.append("location", location);
  fd.append("description", description);
  fd.append("active_status", JSON.parse(statusAkomodasi));
  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  if (fotoAkomodasi.length > 0 && coverAkomodasi.length > 0) {
    fd.append("logo", fotoAkomodasi[0]);
    fd.append("cover", coverAkomodasi[0]);
  }

  const req = await fetch("https://api.sipandu-beradat.id/akomodasi/update/", {
    method: "POST",
    body: fd,
  });
  const { status_code, message, data } = await req.json();
  if (status_code === 200) {
    alert(message);
    readAkomodasi();
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(updateAkomodasi);
  }
};
