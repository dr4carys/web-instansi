$("#btn-hapus-negara").click(async () => {
  await removeNegara();
});

const removeNegara = async () => {
  const XAT = `Bearer ${localStorage.getItem("access_token")}`;
  const fd = new FormData();
  const idNegaraHapus = $("#hapus-id").val();
  fd.append("XAT", XAT);
  fd.append("id", idNegaraHapus);

  const req = await fetch("https://api.sipandu-beradat.id/negara/delete/", {
    method: "POST",
    body: fd,
  });

  const { status_code, data, message } = await req.json();

  if (status_code === 200) {
    alert(message);
    readNegara();
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(removeNegara);
  }
};
