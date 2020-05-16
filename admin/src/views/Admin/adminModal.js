var modalTambah = {
  title: 'Tambah Admin',
  focusConfirm: false,
  html: `
    <input class="swal2-input" id="nama" type="text" placeholder="Masukkan Email admin " />
    <input class="swal2-input" id="password" type="password" placeholder="Masukkan password" />
    `,
  type: 'info',
  showCancelButton: true,
  cancelButtonColor: 'grey',
  confirmButtonText: 'Tambah!',
  allowOutsideClick: false,
  preConfirm: () => ({
    nama: document.getElementById('nama').value,
    password: document.getElementById('password').value,
  })
};


let modalhapus = {
  title: 'Hapus Admin',
  focusConfirm: false,
  html: `<p>Apakah anda ingin menghapus admin ini</p>`,
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
