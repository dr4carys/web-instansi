$("#form-tambah-banjar").submit(async (e) => {
  e.preventDefault();
  await addBanjar();
});

const addBanjar = async () => {
  const name = $("#tambah-banjar").val();
  const idDesa = $("#tambah-desa-adat").val();

  const fd = new FormData();
  fd.append("id_desa", idDesa);
  fd.append("name", name);
  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  const req = await fetch("https://api.sipandu-beradat.id/banjar/create/", {
    method: "POST",
    body: fd,
  });
  const { status_code, message, data } = await req.json();
  if (status_code === 200) {
    alert(message);
    readBanjar();
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(addBanjar);
  }
};
