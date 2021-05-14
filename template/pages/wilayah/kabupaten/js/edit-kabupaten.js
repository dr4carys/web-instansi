$("#form-edit-kabupaten").submit(async (e) => {
  e.preventDefault();
  await updateKabupaten();
});

const updateKabupaten = async () => {
  const idKabupaten = $("#edit-id").val();
  const namaProvinsiEdit = $("#edit-provinsi").val();
  const namaKabupatenEdit = $("#edit-kabupaten").val();
  const statusKabupatenEdit = $("#edit-active-status").val();

  const fd = new FormData();
  fd.append("id", idKabupaten);
  fd.append("id_provinsi", namaProvinsiEdit);
  fd.append("name", namaKabupatenEdit);
  fd.append("active_status", JSON.parse(statusKabupatenEdit));
  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  const req = await fetch("https://api.sipandu-beradat.id/kabupaten/update/", {
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
    refreshToken(updateKabupaten);
  }
};
