$("#form-edit-kecamatan").submit(async (e) => {
  e.preventDefault();
  await updateKecamatan();
});

const updateKecamatan = async () => {
  const idKecamatan = $("#edit-id").val();
  const idKabupaten = $("#edit-kabupaten").val();
  const namaKecamatan = $("#edit-kecamatan").val();
  const statusKecamatan = $("#edit-active-status").val();

  const fd = new FormData();
  fd.append("id", idKecamatan);
  fd.append("id_kabupaten", idKabupaten);
  fd.append("name", namaKecamatan);
  fd.append("active_status", JSON.parse(statusKecamatan));
  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  const req = await fetch("https://api.sipandu-beradat.id/kecamatan/update/", {
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
    refreshToken(updateKecamatan);
  }
};
