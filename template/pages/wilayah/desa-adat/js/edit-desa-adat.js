$("#form-edit-desa-adat").submit(async (e) => {
  e.preventDefault();
  await updateDesaAdat();
});

const updateDesaAdat = async () => {
  const idDesaAdat = $("#edit-id").val();
  const namaKecamatanEdit = $("#edit-kecamatan").val();
  const namaDesaAdatEdit = $("#edit-desa-adat").val();
  const latitudeDesaAdatEdit = $("#edit-latitude").val();
  const longitudeDesaAdatEdit = $("#edit-longitude").val();
  const statusDesaAdat = $("#edit-active-status").val();

  const fd = new FormData();
  fd.append("id", idDesaAdat);
  fd.append("id_kecamatan", namaKecamatanEdit);
  fd.append("name", namaDesaAdatEdit);
  fd.append("latitude", latitudeDesaAdatEdit);
  fd.append("longitude", longitudeDesaAdatEdit);
  fd.append("active_status", JSON.parse(statusDesaAdat));
  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  const req = await fetch("https://api.sipandu-beradat.id/desa-adat/update/", {
    method: "POST",
    body: fd,
  });
  const { status_code, data, message } = await req.json();

  if (status_code === 200) {
    alert(message);
    readDesaAdat();
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(updateDesaAdat);
  }
};
