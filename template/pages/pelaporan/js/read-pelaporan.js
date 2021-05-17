$("#form-pelaporan").submit(async (e) => {
  e.preventDefault();
  await readAllPelaporan();
});


const masyarakat_badges = [
	"<label class='badge badge-dark'>Krama</label>",
	"<label class='badge badge-info'>Tamu</label>",
];
const emergency_status_badges = [
	"<label class='badge badge-info'>Keluhan</label>",
	"<label class='badge badge-primary-red'>Darurat</label>",
];
const status_texts = [
	"Tidak Valid",
	"Menunggu Validasi",
	"Sedang Diproses",
	"Selesai",
];
const status_badges = [
	"<label class='badge badge-primary-red'>Tidak Valid</label>",
	"<label class='badge badge-primary-orange'>Menunggu Validasi</label>",
	"<label class='badge badge-info'>Sedang Diproses</label>",
	"<label class='badge badge-success'>Selesai</label>",
];

$(document).ready(async () => {
	const data1 = await readAllPelaporan();
  
  
});

const readPelaporanDarurat = async () => {
	startLoading()
	const idDesa = localStorage.getItem("id_desa");
	const req = await fetch(`https://api.sipandu-beradat.id/pelaporan-darurat/?id_desa=${idDesa}`);
	const {
		status_code,
		data
	} = await req.json();

	if (status_code === 200) {
		return data;
	} else {
		readPelaporanDarurat();
	}
};

const readPelaporan = async () => {
	startLoading()
	const idDesa = localStorage.getItem("id_desa");
	const req = await fetch(`https://api.sipandu-beradat.id/pelaporan/?id_desa=${idDesa}`);
	const {
		status_code,
		data
	} = await req.json();

	if (status_code === 200) {
		return data;
	} else {
		readPelaporan();
	}
};

const readPelaporanTamu = async () => {
	startLoading()
	const idDesa = localStorage.getItem("id_desa");
	const req = await fetch(`https://api.sipandu-beradat.id/pelaporan-tamu/?id_desa=${idDesa}`);
	const {
		status_code,
		data
	} = await req.json();

	if (status_code === 200) {
		return data;
	} else {
		readPelaporanTamu();
	}
};

const readPelaporanDaruratTamu = async () => {
	startLoading()
	const idDesa = localStorage.getItem("id_desa");
	const req = await fetch(
		`https://api.sipandu-beradat.id/pelaporan-darurat-tamu/?id_desa=${idDesa}`
	);
	const {
		status_code,
		data
	} = await req.json();

	if (status_code === 200) {
		return data;
	} else {
		readPelaporanDaruratTamu();
	}
};

const readAllPelaporan = async () => {
	const darurats = await readPelaporanDarurat();
	const keluhans = await readPelaporan();
	const keluhanTamus = await readPelaporanTamu();
	const daruratTamus = await readPelaporanDaruratTamu();
  const kategori_pelapor = $("#kategori-pelapor option:selected").text();
  const kategori_pelaporan = $("#kategori-pelaporan").val();
  const kategori_desa_adat =  $("#kategori-desa-adat option:selected").text();
  const statusAktif = $("#status_aktif ").val()
  console.log(kategori_pelapor)
  console.log(kategori_pelaporan)
  console.log(kategori_desa_adat)
  var arraysemen =[]
  var dataArray =[kategori_desa_adat,kategori_pelaporan,statusAktif]
  console.log(Boolean(Number(kategori_pelaporan)))
	const data = [...darurats, ...keluhans, ...keluhanTamus, ...daruratTamus];
  data1 = data.filter((obj, pos, arr) => {
    return arr.map(mapObj =>
          mapObj.desa_adat.name).indexOf(obj.desa_adat.name) == pos;
    });
  // console.log(data);

  data1.map((obj)=>{
    const option = `<option value="${obj.desa_adat.id}">${obj.desa_adat.name}</option>`;
    $("#kategori-desa-adat").append(option);
  })

  if(kategori_pelapor == "Pilih kategori pelapor" && kategori_pelaporan == "c"
      && kategori_pelaporan == "c" && statusAktif == "c"){
    data2 = data
  }else{
        for(var c =0; c<dataArray.length;c++){
          if(dataArray[c] !== "c" && dataArray[c]!=="Pilih kategori pelapor" && dataArray[c] !=="Pilih Kategori Desa Adat" ){
            console.log("log ke",dataArray[c])
            arraysemen.push(c)
            console.log("log ke1234",arraysemen)
          }
        
      }
      console.log("panjgan kl",arraysemen)
      for (var b =0 ; b<arraysemen.length;b++){
        // console.log("KLEE")
        if(b===0){
          console.log("KLEE")
          data2 = data.filter(function filterss(data){
            console.log("KLEE122")
            var arrayreturn = [data.desa_adat.name == kategori_desa_adat  ,data.jenis_pelaporan.emergency_status == Boolean(Number(kategori_pelaporan)),
              data.status == statusAktif]
            console.log("sss",dataArray)
            return arrayreturn[arraysemen[b]]
           
          });
          console.log("data1",data1)
        }else{
          console.log("data12",data1)
          data2 = data2.filter(function filterss(data){
        
            var arrayreturn = [data.desa_adat.name == kategori_desa_adat  ,data.jenis_pelaporan.emergency_status == Boolean(Number(kategori_pelaporan)),
              data.status == statusAktif]
            console.log("sss",dataArray)
            return arrayreturn[arraysemen[b]]
           
          });
          
        }
      }

  }

	$(".table-datatable").DataTable({
		destroy: true,
		fixedHeader: {
			header: true,
			footer: true,
		},
		columnDefs: [{
			orderable: false,
			targets: [8]
		}],
		data: data2.map((obj, i) => [
			i + 1,
			obj.masyarakat ? obj.masyarakat.name : obj.tamu.name,
			masyarakat_badges[obj.masyarakat ? 0 : 1],
			obj.jenis_pelaporan.name,
			emergency_status_badges[Number(obj.jenis_pelaporan.emergency_status)],
			obj.desa_adat.name,
			status_badges[obj.status + 1],
			obj.time,
			`<div class="container-crud">
		 		<a href="detail-pelaporan.html?id_pelaporan=${obj.id}&jenis-krama=${obj.masyarakat ? 0 : 1}&emergency-status=${Number(obj.jenis_pelaporan.emergency_status)}" 
					class="btn btn-inverse-primary btn-rounded btn-icon btn-action mr-2 btn-detail" title="Detail">
 						<i class="mdi mdi-file-document-box"></i>
		 		</a>
			</div>`,
		]),
	});
	stopLoading();
};