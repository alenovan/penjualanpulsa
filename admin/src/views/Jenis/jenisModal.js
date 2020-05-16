var modalTambah = {
  title: 'Tambah Jenis',
  focusConfirm: false,
  html: `
    <input class="swal2-input" id="nama_jenis" type="text" placeholder="Masukkan nama jenis " />
    <input class="form-control" id="harga" type="number" placeholder="Masukkan harga"  style="width:100%!important"/>
    <input class="swal2-input" id="kode" type="text" placeholder="Masukkan kode" />
    `,
  type: 'info',
  showCancelButton: true,
  cancelButtonColor: 'grey',
  confirmButtonText: 'Tambah!',
  allowOutsideClick: false,
  preConfirm: () => ({
    nama: document.getElementById('nama_jenis').value,
    harga: document.getElementById('harga').value,
    kode: document.getElementById('kode').value,
  })
};

let modalhapus = {
  title: 'Hapus jenis',
  focusConfirm: false,
  html: `<p>Apakah anda ingin menghapus jenis ini</p>`,
  type: 'danger',
  showCancelButton: true,
  cancelButtonColor: 'grey',
  confirmButtonText: 'hapus!',
  allowOutsideClick: true
};

let cancel = {
  title: '',
  focusConfirm: false,
  html: `<p>Apakah anda akan membatalkan aksi ini</p>`,
  type: 'danger',
  showCancelButton: true,
  cancelButtonColor: 'grey',
  confirmButtonText: 'Isi data!',
  allowOutsideClick: true
};

let validasi = {
  title: '',
  focusConfirm: false,
  html: `<p>Silahkan lengkapi data</p>`,
  type: 'danger',
  showCancelButton: true,
  cancelButtonColor: 'grey',
  confirmButtonText: 'Isi data!',
  allowOutsideClick: true
};


export {
  modalTambah,
  validasi,
  cancel,
  modalhapus
}
