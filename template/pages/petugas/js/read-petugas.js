$("#form-instansi").submit(async (e) => {
  e.preventDefault();
  $(".preloader").fadeIn(300);
  await read_petugas();
});
const active_status_badges = [
  "<label class='badge badge-primary-red'>Nonaktif</label>",
  "<label class='badge badge-success'>Aktif</label>",
];

$(document).ready(() => {
  read_petugas();

  $("#tambah-profil-pic").change((e) => {
    if (e.currentTarget.files.length > 0) {
      $("#label-tambah-profil-pic").text(e.currentTarget.files[0].name);
    } else {
      $("#label-tambah-profil-pic").text("Select file");
    }
  });
  $("#edit-profil-pic").change((e) => {
    if (e.currentTarget.files.length > 0) {
      $("#label-edit-profil-pic").text(e.currentTarget.files[0].name);
    } else {
      $("#label-edit-profil-pic").text("Select file");
    }
  });
});

const read_petugas = async () => {
  $(".preloader").fadeIn(300);
  const statusAktif = $("#status_aktif").val()
  const idInstansi = localStorage.getItem("id_instansi");
  const req = await fetch(
    `https://api.sipandu-beradat.id/petugas/?id_instansi=${idInstansi}`
  );
  const { status_code, data } = await req.json();
  console.log("HHHHH",statusAktif)
  if(statusAktif == "c"){
    console.log("hh")
    data1 = data
  }else{
    console.log("hh11111111")
    data1 = data.filter(function filterss(data){
      return data.active_status ==Boolean(Number(statusAktif)) 

    });
  }


  if (status_code === 200) {
    
    $(".table-datatable").DataTable({
      destroy:true,
      fixedHeader: {
        header: true,
        footer: true,
      },
      columnDefs: [ 
        {
          orderable: false,
          targets: [7],
        },
      ],
      data: data1.map((obj, i) => [
        i + 1,
        obj.name,
        obj.date_of_birth,
        obj.gender === "l" ? "Laki-Laki" : "Perempuan",
        obj.phone,
        obj.nik,
        active_status_badges[Number(obj.active_status)],
        `<div class="d-flex justify-content-center" style="gap:14px;">
        <a href="detail-petugas.html?view-name=${obj.name}&view-avatar=${
          obj.avatar
        }&view-active-status=${obj.active_status}&nik=${obj.nik}&gender=${
          obj.gender === "l" ? "Laki-Laki" : "Perempuan"
        }&phone=${obj.phone}&birth=${obj.date_of_birth}&kecamatan=${
          obj.instansi_petugas.kecamatan.name
        }&kabupaten=${obj.instansi_petugas.kecamatan.kabupaten.name}&provinsi=${
          obj.instansi_petugas.kecamatan.kabupaten.provinsi.name
        }&negara=${
          obj.instansi_petugas.kecamatan.kabupaten.provinsi.negara.name
        }" class="btn btn-inverse-success btn-rounded btn-icon btn-action mr-2 btn-detail" title="Detail Petugas" >
        <i class="mdi mdi-account-details"></i>
        </a>
        <a href="#" class="btn btn-inverse-primary btn-rounded btn-icon btn-action mr-2 btn-edit" title="Edit" data-toggle="modal"
        data-target="#modal-edit-petugas"
          data-id="${obj.id}"
          data-id-instansi="${obj.instansi_petugas.id}"
          data-name="${obj.name}"
          data-phone="${obj.phone}"
          data-birthday="${obj.date_of_birth}"
          data-nik="${obj.nik}"
          data-gender="${obj.gender}"
          data-active-status="${obj.active_status}"
          data-avatar="${obj.avatar}">
          <i class="mdi mdi-pencil"></i>
        </a>
        <a href="#" class="btn btn-inverse-primary-red btn-rounded btn-icon btn-action mr-2 btn-delete" title="Delete" data-toggle="modal"
            data-target="#modal-hapus-petugas"
          data-id="${obj.id}">
          <i class="mdi mdi-delete"></i>
        </a>
      </div>`,
      ]),
    });

    $("tbody").on("click", ".btn-edit", (e) => {
      const id = $(e.currentTarget).attr("data-id");
      const id_instansi = $(e.currentTarget).attr("data-id-instansi");
      const name = $(e.currentTarget).attr("data-name");
      const phone = $(e.currentTarget).attr("data-phone");
      const birth = $(e.currentTarget).attr("data-birthday");
      const nik = $(e.currentTarget).attr("data-nik");
      const gender = $(e.currentTarget).attr("data-gender");
      const active_status = $(e.currentTarget).attr("data-active-status");
      const avatar = $(e.currentTarget).attr("data-avatar");

      $("#edit-id").val(id);
      $("#edit-id-instansi").val(id_instansi);
      $("#edit-nama").val(name);
      $("#edit-telp").val(phone);
      $("#edit-tgl-lahir").val(birth);
      $("#edit-nik").val(nik);
      $("#edit-jenis-kelamin").val(gender);
      $("#edit-profil-pic").attr("src", avatar);
      $("#edit-active-status").val(active_status);
    });
    $(".preloader1").fadeOut(300);
    $(".preloader").fadeOut(300);
    $("tbody").on("click", ".btn-delete", (e) => {
      const id = $(e.currentTarget).attr("data-id");
      $("#hapus-id").val(id);
    });
  }
};

