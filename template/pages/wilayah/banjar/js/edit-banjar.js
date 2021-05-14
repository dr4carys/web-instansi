$("#form-edit-banjar").submit(async (e) => {
  e.preventDefault();
  await updateBanjar();
});

const updateBanjar = async () => {
  const idBanjar = $("#edit-id").val();
  const namaDesaAdatEdit = $("#edit-desa-adat").val();
  const namaBanjarEdit = $("#edit-banjar").val();
  const statusBanjarEdit = $("#edit-active-status").val();

  const fd = new FormData();
  fd.append("id", idBanjar);
  fd.append("id_desa", namaDesaAdatEdit);
  fd.append("name", namaBanjarEdit);
  fd.append("active_status", JSON.parse(statusBanjarEdit));
  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  const req = await fetch("https://api.sipandu-beradat.id/banjar/update/", {
    method: "POST",
    body: fd,
  });
  const { status_code, data, message } = await req.json();

  if (status_code === 200) {
    alert(message);
    readBanjar();
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(updateBanjar);
  }
};
