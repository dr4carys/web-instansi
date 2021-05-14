$(document).ready(() => {
  const v_name = getParameterByName("view-name");
  const v_avatar = getParameterByName("view-avatar");

  const nik = getParameterByName("nik");
  const gender = getParameterByName("gender");
  const phone = getParameterByName("phone");
  const birth = getParameterByName("birth");
  const active_status = getParameterByName("view-active-status");

  const kecamatan = getParameterByName("kecamatan");
  const kabupaten = getParameterByName("kabupaten");
  const provinsi = getParameterByName("provinsi");
  const negara = getParameterByName("negara");

  $("#view-name").text(v_name);
  $("#view-avatar").attr("src", v_avatar);
  $("#view-active-status").html(
    active_status === "true"
      ? "<label class='badge badge-success'>Aktif</label>"
      : "<label class='badge badge-primary-red'>Nonaktif</label>"
  );

  $("#nik").val(nik);
  $("#gender").val(gender);
  $("#phone").val(phone);
  $("#birth").val(birth);
  $("#active-status").val(active_status === "true" ? "Aktif" : "Tidak Aktif");

  $("#kecamatan").val(kecamatan);
  $("#kabupaten").val(kabupaten);
  $("#provinsi").val(provinsi);
  $("#negara").val(negara);
});
