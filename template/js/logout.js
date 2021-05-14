$(".btn-logout").click(async () => {
  await logout();
});

const logout = async () => {
  const fd = new FormData();
  fd.append("XAT", `Bearer ${localStorage.getItem("access_token")}`);

  const req = await fetch("https://api.sipandu-beradat.id/logout/", {
    method: "POST",
    body: fd,
  });

  const { status_code, data } = await req.json();

  if (status_code === 200) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href =
      "file:///D:/Dwiki/SMT%208/Topik%20Khusus%20TC/Web/dashboard-master/template/pages/login/login.html";
  } else if (status_code === 401) {
    refreshToken(logout);
  } else {
    logout();
  }
};
