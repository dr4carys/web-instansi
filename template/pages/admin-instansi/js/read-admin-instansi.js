$("#form-instansi").submit(async (e) => {
  e.preventDefault();
  $(".preloader").fadeIn(300);
  await readAdmin();
});
const super_admin_status_badges = [
  "<label class='badge badge-primary'>Admin Instansi</label>",
  "<label class='badge badge-primary-red'>Superadmin</label>",
];
const active_status_badges = [
  "<label class='badge badge-primary-red'>Nonaktif</label>",
  "<label class='badge badge-success'>Aktif</label>",
];

$(document).ready(() => {
  readAdmin();
  readPetugas();
  readInstansi();
});

const readPetugas = async () => {
  const id_instansi = localStorage.getItem("id_instansi");
  const req = await fetch(
    `https://api.sipandu-beradat.id/petugas/?id_instansi=${id_instansi}&active_status=true`
  );
  const { status_code, data } = await req.json();


  if (status_code === 200) {
    data.map((obj) => {
      console.log("HHHHHHHHHHH",obj)
      const option = `<option value="${obj.id}">${obj.name}</option>`;
      $("#tambah-admin-instansi").append(option);
     
    });
  } else {
    readPetugas();
  }
};

const readInstansi = async () => {
  const id_instansi = localStorage.getItem("id_instansi");
  const req = await fetch(
    `https://api.sipandu-beradat.id/petugas/?id_instansi=${id_instansi}&active_status=true`
  );
  const { status_code, data } = await req.json();

  data1 = data.filter((obj, pos, arr) => {
    return arr.map(mapObj =>
          mapObj.instansi_petugas.jenis_instansi.name).indexOf(obj.instansi_petugas.jenis_instansi.name) == pos;
    });
  if (status_code === 200) {
    data1.map((obj) => {
      const option1 = `<option value="${obj.instansi_petugas.jenis_instansi.id}">${obj.instansi_petugas.jenis_instansi.name}</option>`;
      $("#tambah-instansi").append(option1);
    });
  } else {
    readPetugas();
  }
};
const readAdmin = async () => {
  $(".preloader").fadeIn(300);
  const tambahInstansi = $("#tambah-instansi").val()
  const tambahStatusAkun = $("#tambah-status-akun").val()
  const statusAktif = $("#status_aktif").val()
  var arraysemen =[]
  const id_instansi = localStorage.getItem("id_instansi");
  var dataArray =[tambahInstansi,tambahStatusAkun,statusAktif]
  link= `https://api.sipandu-beradat.id/admin-instansi/?id_instansi=${id_instansi}`
 console.log(link)
  const req = await fetch(link);
  const { status_code, data, message } = await req.json();
  if(tambahInstansi== "c" && tambahStatusAkun == "c" && statusAktif == "c"){
      data1 = data
      console.log("hh")
  }else{
    console.log("hh1")
    for(var c =0; c<dataArray.length;c++){
      if(dataArray[c] !== "c" && dataArray[c]!=="Pilih kategori pelapor" &&dataArray[c] !=="Pilih kategori desa adat" ){
        console.log("yy",dataArray[c] !== "c")
        arraysemen.push(c)
      }

}
console.log("panjgan kl",arraysemen)
for (var b =0 ; b<arraysemen.length;b++){
if(b===0){
  data1 = data.filter(function filterss(data){
    console.log("KLEE122")
    var arrayreturn = [data.petugas.instansi_petugas.jenis_instansi.id == tambahInstansi,data.super_admin_status == tambahStatusAkun,
    data.active_status == statusAktif]
    console.log("sss",dataArray)
    return arrayreturn[arraysemen[b]]
   
  });
  console.log("data1",data1)
}else{
  console.log("data12",data1)
  data1 = data1.filter(function filterss(data){
    var arrayreturn = [data.petugas.instansi_petugas.jenis_instansi.id == tambahInstansi,data.super_admin_status == tambahStatusAkun,
      data.active_status == statusAktif]
    console.log("sss",dataArray)
    return arrayreturn[arraysemen[b]]
   
  });
  
}
}


}
 console.log(data)
  if (status_code === 200) {
    $(".table-datatable").DataTable({
      destroy : true,
      fixedHeader: {
        header: true,
        footer: true,
      },
      columnDefs: [{ orderable: false, targets: [6] }],
      data: data1.map((obj, i) => [
        i + 1,
        obj.petugas.name,
        obj.petugas.gender === "l" ? "Laki-Laki" : "Perempuan",
        obj.petugas.instansi_petugas.name,
        super_admin_status_badges[Number(obj.super_admin_status)],
        active_status_badges[Number(obj.active_status)],
        `<div class="container-crud">
        <a href="#" class="btn btn-inverse-primary btn-rounded btn-icon btn-action mr-2 btn-edit" title="Edit" data-toggle="modal"
data-target="#modal-edit-admin-instansi" data-id="${obj.id}" data-id-petugas="${obj.petugas.id}" data-status="${obj.active_status}">
<i class="mdi mdi-pencil"></i>
        </a>
        <a href="#" class="btn btn-inverse-primary-red btn-rounded btn-icon btn-action mr-2 btn-delete" title="Delete" data-toggle="modal"
        data-target="#modal-hapus-admin-instansi" data-id="${obj.id}">
        <i class="mdi mdi-delete"></i>
        </a>
    </div>`,
      ]),
    });

    $("tbody").on("click", ".btn-edit", (e) => {
      const id = $(e.currentTarget).attr("data-id");
      const id_petugas = $(e.currentTarget).attr("data-id-petugas");
      const active_status = $(e.currentTarget).attr("data-status");

      $("#edit-id").val(id);
      $("#edit-id-petugas").val(id_petugas);
      $("#edit-active-status").val(active_status);
    });
    $(".preloader").fadeOut(300);
    $(".preloader1").fadeOut(300);
    $("tbody").on("click", ".btn-delete", (e) => {
      const id = $(e.currentTarget).attr("data-id");
      $("#hapus-id").val(id);
    });
  }
};
