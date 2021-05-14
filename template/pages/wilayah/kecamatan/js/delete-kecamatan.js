$("#btn-hapus-kecamatan").click(async () => {
  await removeKecamatan();
});

const removeKecamatan = async () => {
  const XAT = `Bearer ${localStorage.getItem("access_token")}`;
  const fd = new FormData();
  const idKecamatanHapus = $("#hapus-id").val();
  fd.append("XAT", XAT);
  fd.append("id", idKecamatanHapus);

  const req = await fetch("https://api.sipandu-beradat.id/kecamatan/delete/", {
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
    refreshToken(removeKecamatan);
  }
};
