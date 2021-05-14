$("#form-tambah-fasilitas").submit(async (e) => {
  e.preventDefault();
  await addFasilitas();
});

const addFasilitas = async () => {
  const name = $("#tambah-fasilitas").val();
  const icon = $("#tambah-icon").prop("files");

  const fd = new FormData();
  fd.append("name", name);

  if (icon.length > 0) {
    fd.append("icon", icon[0]);
  }

  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  const req = await fetch("https://api.sipandu-beradat.id/fasilitas/create/", {
    method: "POST",
    body: fd,
  });
  const { status_code, message, data } = await req.json();
  if (status_code === 200) {
    alert(message);
    readFasilitas();
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(addFasilitas);
  }
};
