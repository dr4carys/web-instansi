$("#form-edit-negara").submit(async (e) => {
  e.preventDefault();
  await updateNegara();
});

const updateNegara = async () => {
  const idNegara = $("#edit-id").val();
  const namaNegara = $("#edit-name").val();
  const statusNegara = $("#edit-active-status").val();
  const icon = $("#edit-icon").prop("files");

  const fd = new FormData();
  fd.append("id", idNegara);
  fd.append("name", namaNegara);
  fd.append("active_status", JSON.parse(statusNegara));
  if (icon.length > 0) {
    fd.append("flag", icon[0]);
  }
  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  const req = await fetch("https://api.sipandu-beradat.id/negara/update/", {
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
    refreshToken(updateNegara);
  }
};
