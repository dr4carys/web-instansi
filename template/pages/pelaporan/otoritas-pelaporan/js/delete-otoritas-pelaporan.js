$("#btn-hapus-otoritas-pelaporan").click(async () => {
  await removeOtoritasPelaporan();
});

const removeOtoritasPelaporan = async () => {
  const XAT = `Bearer ${localStorage.getItem("access_token")}`;
  const fd = new FormData();
  const idOtoritasPelaporan = $("#hapus-id").val();
  fd.append("XAT", XAT);
  fd.append("id", idOtoritasPelaporan);

  const req = await fetch(
    "https://api.sipandu-beradat.id/otoritas-pelaporan-instansi/delete/",
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
    refreshToken(removeOtoritasPelaporan);
  }
};
