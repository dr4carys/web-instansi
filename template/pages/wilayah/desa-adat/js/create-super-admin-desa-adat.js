$("#form-tambah-super-admin").submit(async (e) => {
  e.preventDefault();
  await addMasyarakat();
});

const addMasyarakat = async () => {
  const name = $("#admin-name").val();
  const nik = $("#admin-nik").val();
  const noTelp = $("#admin-telp").val();
  const tglLahir = $("#admin-tgl-lahir").val();
  const jenisKelamin = $("#admin-jenis-kelamin").val();
  const banjar = $("#admin-banjar").val();
  const username = $("#admin-username").val();
  const password = $("#admin-password").val();
  const kategori = $("#admin-kategori").val();
  const avatar = $("#admin-profil-pic").prop("files");

  const fd = new FormData();
  fd.append("id_banjar", banjar);
  fd.append("name", name);
  fd.append("username", username);
  fd.append("password", password);
  fd.append("phone", noTelp);
  fd.append("date_of_birth", tglLahir);
  fd.append("nik", nik);
  fd.append("gender", jenisKelamin);
  fd.append("category", kategori);

  if (avatar.length > 0) {
    fd.append("avatar", avatar[0]);
  }

  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  const req = await fetch("https://api.sipandu-beradat.id/masyarakat/create/", {
    method: "POST",
    body: fd,
  });
  const { status_code, message, data } = await req.json();
  if (status_code === 200) {
    addSuperAdminDesaAdat(data.id);
  } else if (status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(addMasyarakat);
  }
};

const addSuperAdminDesaAdat = async (id) => {
  const fd = new FormData();
  fd.append("id_masyarakat", id);
  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  const req2 = await fetch(
    "https://api.sipandu-beradat.id/admin-desa-adat/create/",
    {
      method: "POST",
      body: fd,
    }
  );
  const { status_code, message } = await req2.json();

  if (status_code === 200 || status_code === 400) {
    alert(message);
  } else if (status_code === 401) {
    refreshToken(() => addSuperAdminDesaAdat(id));
  }
};
