$("#btn-hapus-banjar").click(async () => {
  await removeBanjar();
});

const removeBanjar = async () => {
  const XAT = `Bearer ${localStorage.getItem("access_token")}`;
  const fd = new FormData();
  const idBanjar = $("#hapus-id").val();
  fd.append("XAT", XAT);
  fd.append("id", idBanjar);

  const req = await fetch("https://api.sipandu-beradat.id/banjar/delete/", {
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
    refreshToken(removeBanjar);
  }
};
