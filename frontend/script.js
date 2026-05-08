// Alamat backend API kamu
const apiBase = "http://localhost:3000/notes";

// Saat web pertama kali dibuka, langsung ambil data catatan
document.addEventListener("DOMContentLoaded", () => {
  getNotes();
});

// Menangkap form saat tombol simpan diklik
const formulir = document.querySelector("#note-form");

formulir.addEventListener("submit", async (e) => {
  e.preventDefault(); // Mencegah web reload

  const elemenJudul = document.querySelector("#judul");
  const elemenIsi = document.querySelector("#isi");

  const judul = elemenJudul.value.trim();
  const isi = elemenIsi.value.trim();
  const id = elemenJudul.dataset.id || ""; // Cek apakah ini edit atau tambah baru

  if (!judul || !isi) return;

  try {
    if (id === "") {
      // POST: Tambah catatan baru
      await axios.post(apiBase, { judul, isi });
    } else {
      // PUT: Update catatan yang diedit
      await axios.put(`${apiBase}/${id}`, { judul, isi });
    }

    // Bersihkan form setelah berhasil
    elemenJudul.dataset.id = "";
    elemenJudul.value = "";
    elemenIsi.value = "";
    document.querySelector("#btn-simpan").innerText = "Simpan Catatan";

    // Panggil ulang daftar catatan biar langsung update
    getNotes();
  } catch (error) {
    console.log("Error:", error);
    alert("Terjadi kesalahan! Pastikan backend sudah menyala.");
  }
});

// Fungsi untuk Mengambil Data dari Backend (GET)
async function getNotes() {
  try {
    const response = await axios.get(apiBase);
    
    // Sesuaikan dengan bentuk respon backend kamu
    // Kadang backend mengirim array langsung, kadang di dalam objek data
    const notes = Array.isArray(response.data) ? response.data : response.data.data;

    const table = document.querySelector("#table-notes");
    let tampilan = "";
    let no = 1;

    // Looping data dari database untuk dimasukkan ke tabel
    for (const note of notes) {
      tampilan += tampilkanNote(no, note);
      no++;
    }

    table.innerHTML = tampilan;
    
    // Aktifkan kembali fungsi tombol hapus & edit setelah tabel dirender ulang
    hapusNote();
    editNote();
  } catch (error) {
    console.log("Error mengambil data:", error);
  }
}

// Fungsi untuk menggambar baris tabel
function tampilkanNote(no, note) {
  return `
    <tr>
      <td>${no}</td>
      <td class="judul-note">${note.judul}</td>
      <td class="isi-note">${note.isi}</td>
      <td>
        <button data-id="${note.id}" class="btn-edit" type="button">Edit</button>
        <button data-id="${note.id}" class="btn-hapus" type="button">Hapus</button>
      </td>
    </tr>
  `;
}

function hapusNote() {
  const tombolHapus = document.querySelectorAll(".btn-hapus");

  tombolHapus.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      
      if(confirm("Yakin ingin menghapus catatan ini?")) {
        try {
          await axios.delete(`${apiBase}/${id}`);
          getNotes(); 
        } catch (error) {
          console.log("Error hapus data:", error);
        }
      }
    });
  });
}

function editNote() {
  const tombolEdit = document.querySelectorAll(".btn-edit");

  tombolEdit.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const row = btn.closest("tr");
      
      // Ambil teks dari baris tabel
      const judul = row.querySelector(".judul-note").innerText;
      const isi = row.querySelector(".isi-note").innerText;

      const elemenJudul = document.querySelector("#judul");
      const elemenIsi = document.querySelector("#isi");

      elemenJudul.dataset.id = id;
      elemenJudul.value = judul;
      elemenIsi.value = isi;
      
      document.querySelector("#btn-simpan").innerText = "Update Catatan";
    });
  });
}
