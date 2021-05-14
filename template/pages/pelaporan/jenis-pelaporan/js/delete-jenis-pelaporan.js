$("#btn-hapus-jenis-pelaporan").click(async () => {
  await removeJenisPelaporan();
});

const removeJenisPelaporan = async () => {
  const XAT = `Bearer ${localStorage.getItem("access_token")}`;
  const fd = new FormData();
  const idJenisPelaporan = $("#hapus-id").val();
  fd.append("XAT", XAT);
  fd.append("id", idJenisPelaporan);

  const req = await fetch(
    "https://api.sipandu-beradat.id/jenis-pelaporan/delete/",
    {
      method: "POST",
      body: fd,
    }
  );

  const { status_code, data, message } = await req.json();

  if (status_code === 200) {
    alert(message);
    readJenisPelaporan();
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(removeJenisPelaporan);
  }
};
