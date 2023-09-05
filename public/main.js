// Global Variable
let selectedRow = null;

// Clear Data Setelah klik submit
function clearData() {
  namaLengkapElm.value = "";
  umurElm.value = "";
  jurusanElm.value = "Teknik Informatika";
}

// Tambah Data
let tambahData = document.getElementById("btn_submit");
const namaLengkapElm = document.getElementById("jsNama");
const umurElm = document.getElementById("jsUmur");
const jurusanElm = document.getElementById("jsJurusan");

tambahData.addEventListener("click", (e) => {
  // agar tidak refresh page
  e.preventDefault();

  // Collect Data Form
  const namaLengkap = namaLengkapElm.value;
  const umur = umurElm.value;
  const jurusan = jurusanElm.value;
  const dateE = new Date();

  // Debug Console Log
  // console.log(`${namaLengkap} ${umur} ${jurusan}`);
  // clearData();

  // Validasi
  if (namaLengkap == "" || umur == "") {
    Swal.fire({
      icon: "error",
      title: "Silahkan Isi Semua Data",
      showConfirmButton: false,
      timer: 1500,
    });
    clearData();
  } else {
    if (selectedRow == null) {
      const list = document.getElementById("student-list");
      const barisBaru = document.createElement("tr");

      // Waktu Format Indonesia
      const tgl = new Date();
      const hari = tgl.getDate();
      const bulan = tgl.getMonth();
      const tahun = tgl.getFullYear();
      const tglMasuk = `${hari}-${bulan}-${tahun} `;

      barisBaru.innerHTML = `
        <td class="border border-slate-300 text-center">${namaLengkap}</td>
        <td class="border border-slate-300 text-center">${umur}</td>
        <td class="border border-slate-300 text-center">${jurusan}</td>
        <td class="border border-slate-300 text-center">${tglMasuk}</td>
        <td>
        <button
          class="edit w-[5rem] bg-green-200 rounded-xl border border-slate-200 shadow-sm hover:bg-green-400"
        >
          Edit
        </button>
        <button
          class="delete w-[5rem] bg-red-400 rounded-xl border border-slate-200 shadow-sm hover:bg-red-700"
        >
          Delete
        </button>
        </td>
      `;

      list.appendChild(barisBaru);
      Swal.fire({
        icon: "success",
        title: "Yeay.....",
        text: "Data Berhasil Ditambahkan!",
      });
      selectedRow = null;
    } else {
      selectedRow.children[0].textContent = namaLengkap;
      selectedRow.children[1].textContent = umur;
      selectedRow.children[2].textContent = jurusan;
      selectedRow = null;
      Swal.fire({
        icon: "info",
        title: "Data Siswa diubah",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    clearData();
  }
});

// Edit Data
const ubahStudent = document.querySelector("#student-list");

ubahStudent.addEventListener("click", (e) => {
  e.preventDefault();

  target = e.target;

  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    namaLengkapElm.value = selectedRow.children[0].textContent;
    umurElm.value = selectedRow.children[1].textContent;
    jurusanElm.value = selectedRow.children[2].textContent;
  }
});

// Delete Data
const hapusStudent = document.querySelector("#student-list");

hapusStudent.addEventListener("click", (e) => {
  e.preventDefault();

  target = e.target;

  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();

    Swal.fire({
      icon: "error",
      title: "Data Terhapus",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
