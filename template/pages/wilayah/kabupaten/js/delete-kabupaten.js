$("#btn-hapus-kabupaten").click(async () => {
  await removeKabupaten();
});

const removeKabupaten = async () => {
  const XAT = `Bearer ${localStorage.getItem("access_token")}`;
  const fd = new FormData();
  const idKabupatenHapus = $("#hapus-id").val();
  fd.append("XAT", XAT);
  fd.append("id", idKabupatenHapus);

  const req = await fetch("https://api.sipandu-beradat.id/kabupaten/delete/", {
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
    refreshToken(removeKabupaten);
  }
};
