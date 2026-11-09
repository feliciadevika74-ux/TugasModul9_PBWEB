/* ==========================================
   PROFIL DIRI - FELICIA ANGGUN DEVIKA
   MODUL 7 (JavaScript, Event Handling, Client-side State)
   MODUL 8 (Fetch API dan async/await)
   Modul 9 (Konsumsi REST API: POST, PATCH, DELETE)
   ========================================== */

/* ==========================================
   1. VARIABEL DAN SELEKSI ELEMEN
   ========================================== */
const tombolTema = document.querySelector("#btn-tema");
const tombolTambah = document.querySelector("#btn-tambah");
const containerPengalaman = document.querySelector("#pengalaman .daftar-pengalaman");
const formPengalaman = document.querySelector("#form-pengalaman");
const tombolSimpan = document.querySelector("#btn-simpan");
const tombolBatal = document.querySelector("#btn-batal");

const isiKontak = document.querySelector("#isi-kontak");
const tombolToggleKontak = document.querySelector("#btn-toggle-kontak");

const linkNavigasi = document.querySelectorAll("nav a");
const semuaBagian = document.querySelectorAll("main > section, main > aside");

const formKomentar = document.querySelector("#form-komentar");
const daftarKomentar = document.querySelector("#daftar-komentar");
const pesanError = document.querySelector("#pesan-error");
const tombolHapusSemua = document.querySelector("#btn-hapus-semua");

const modalKonfirmasi = document.querySelector("#modal-konfirmasi");
const btnYa = document.querySelector("#btn-ya");
const btnTidak = document.querySelector("#btn-tidak");

const modalReset = document.querySelector("#modal-reset");
const btnResetYa = document.querySelector("#btn-reset-ya");
const btnResetTidak = document.querySelector("#btn-reset-tidak");

const tombolReset = document.querySelector("#btn-reset");
const btnTop = document.querySelector("#btn-top");

const inputNamaKomentar = document.querySelector("#input-nama-komentar");
const inputPesanKomentar = document.querySelector("#input-pesan");

/* ==========================================
   FUNGSI PEMBANTU: JUMLAH PENGALAMAN
   Mengubah angka (dua digit) di elemen ber-id tertentu
   ========================================== */
function ubahJumlah(idElemen, jumlah) {
    const elemen = document.querySelector("#" + idElemen);
    if (!elemen) return;

    elemen.textContent = String(jumlah).padStart(2, "0");
}

/* ==========================================
   2. DATA PENGALAMAN
   localStorage: daftarPengalaman
   ========================================== */
const pengalamanAwal = [
    {
        id: 1,
        nama: "Anggota Divisi Minat dan Bakat (Himpunan Mahasiswa Informatika)",
        periode: "2026 - Sekarang",
        deskripsi: "Aktif dalam merancang dan mengeksekusi program kerja pengembangan potensi mahasiswa di bidang akademik maupun non-akademik."
    },
    {
        id: 2,
        nama: "Anggota Kader Posyandu Desa",
        periode: "2019 - 2026",
        deskripsi: "Berpartisipasi dalam kegiatan pelayanan masyarakat desa dan membantu pencatatan data kegiatan rutin."
    },
    {
        id: 3,
        nama: "Sekretaris 2 Panitia IT DAYS",
        periode: "2026 - Sekarang",
        deskripsi: "Bertanggung jawab dalam pengelolaan administrasi, penyusunan dokumen kegiatan, notulen, dan koordinasi persuratan."
    },
    {
        id: 4,
        nama: "Bendahara Organisasi Pemuda-Pemudi Desa",
        periode: "2026 - Sekarang",
        deskripsi: "Mengelola pencatatan pemasukan dan pengeluaran serta membantu penyusunan anggaran kegiatan."
    }
];

let daftarPengalaman = [];

function dataPengalamanValid(data) {
    return (
        Array.isArray(data) &&
        data.every(function(pengalaman) {
            return (
                pengalaman !== null &&
                typeof pengalaman === "object" &&
                Number.isFinite(pengalaman.id) &&
                typeof pengalaman.nama === "string" &&
                typeof pengalaman.periode === "string" &&
                typeof pengalaman.deskripsi === "string"
            );
        })
    );
}

function muatDaftarPengalaman() {
    try {
        const dataTersimpan = localStorage.getItem("daftarPengalaman");

        if (dataTersimpan !== null) {
            const dataJSON = JSON.parse(dataTersimpan);

            if (dataPengalamanValid(dataJSON)) {
                daftarPengalaman = dataJSON;
                return;
            }
        }
    } catch (error) {
        console.error("Gagal memuat data pengalaman:", error);
    }

    daftarPengalaman = pengalamanAwal.map(function(pengalaman) {
        return { ...pengalaman };
    });
}

function simpanDaftarPengalaman() {
    try {
        localStorage.setItem(
            "daftarPengalaman",
            JSON.stringify(daftarPengalaman)
        );
    } catch (error) {
        console.error("Gagal menyimpan pengalaman:", error);
        alert("Data pengalaman gagal disimpan.");
    }
}

muatDaftarPengalaman();

/* ==========================================
   3. PREFERENSI TEMA
   localStorage: tema
   ========================================== */
function perbaruiTombolTema() {
    if (!tombolTema) return;

    if (document.body.classList.contains("dark-mode")) {
        tombolTema.textContent = "☀️ Mode Terang";
    } else {
        tombolTema.textContent = "🌙 Mode Gelap";
    }
}
function muatPreferensiTema() {
    const tema = localStorage.getItem("tema");
    document.body.classList.toggle("dark-mode", tema === "dark");
    perbaruiTombolTema();
}
function toggleTema() {
    document.body.classList.toggle("dark-mode");
    const temaSekarang =
        document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("tema", temaSekarang);
    perbaruiTombolTema();
}
muatPreferensiTema();
if (tombolTema) {
    tombolTema.addEventListener("click", toggleTema);
}

/* ==========================================
   4. KEYBOARD SHORTCUT
   Tekan D untuk mengganti tema
   ========================================== */
document.addEventListener("keydown", function(event) {
    const elemenAktif = document.activeElement;
    const tagAktif = elemenAktif ? elemenAktif.tagName : "";
    const sedangMengetik =
        tagAktif === "INPUT" ||
        tagAktif === "TEXTAREA" ||
        tagAktif === "SELECT" ||
        (elemenAktif && elemenAktif.isContentEditable);
    if (
        event.key.toLowerCase() === "d" &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey &&
        !event.repeat &&
        !sedangMengetik
    ) {
        toggleTema();
    }
});

/* ==========================================
   5. PENYIMPANAN LIKE
   localStorage: semuaLike
   ========================================== */
function ambilSemuaLike() {
    try {
        const dataTersimpan = localStorage.getItem("semuaLike");
        if (dataTersimpan === null) {
            return {};
        }
        const dataJSON = JSON.parse(dataTersimpan);
        if (
            dataJSON === null ||
            typeof dataJSON !== "object" ||
            Array.isArray(dataJSON)
        ) {
            return {};
        }
        return dataJSON;
    } catch (error) {
        console.error("Gagal memuat data like:", error);
        return {};
    }
}
function simpanLike(judul, jumlah) {
    const semuaLike = ambilSemuaLike();
    semuaLike[judul] = jumlah;
    localStorage.setItem(
        "semuaLike",
        JSON.stringify(semuaLike)
    );
}

/* ==========================================
   6. RENDER PENGALAMAN
   ========================================== */
function tampilkanPengalaman() {
    if (!containerPengalaman) return;
    containerPengalaman.innerHTML = "";
    const semuaLike = ambilSemuaLike();
    daftarPengalaman.forEach(function(pengalaman) {
        const article = document.createElement("article");

        const judul = document.createElement("h3");
        judul.textContent = pengalaman.nama;

        const periode = document.createElement("p");
        const labelPeriode = document.createElement("strong");

        labelPeriode.textContent = "Periode: ";
        periode.appendChild(labelPeriode);
        periode.appendChild(
            document.createTextNode(pengalaman.periode)
        );

        const deskripsi = document.createElement("p");
        deskripsi.textContent = pengalaman.deskripsi;

        const tombolContainer = document.createElement("div");
        tombolContainer.className = "tombol-pengalaman";

        const tombolLike = document.createElement("button");
        tombolLike.className = "tombol-like";
        tombolLike.type = "button";

        const jumlahTersimpan = Number(semuaLike[pengalaman.nama]);

        const jumlahLike =
            Number.isSafeInteger(jumlahTersimpan) && jumlahTersimpan >= 0
                ? jumlahTersimpan
                : 0;

        tombolLike.textContent = "Like (" + jumlahLike + ")";
        tombolLike.dataset.like = jumlahLike;

        const tombolHapus = document.createElement("button");
        tombolHapus.className = "tombol-hapus";
        tombolHapus.type = "button";
        tombolHapus.textContent = "Hapus";
        tombolHapus.dataset.id = pengalaman.id;

        tombolContainer.appendChild(tombolLike);
        tombolContainer.appendChild(tombolHapus);

        article.appendChild(judul);
        article.appendChild(periode);
        article.appendChild(deskripsi);
        article.appendChild(tombolContainer);

        containerPengalaman.appendChild(article);
    });
    ubahJumlah("jumlah-pengalaman", daftarPengalaman.length);
}
tampilkanPengalaman();

/* ==========================================
   7. NAVIGASI SECTION
   ========================================== */
function tampilkanBagian(idBagian) {
    semuaBagian.forEach(function(bagian) {
        bagian.classList.remove("active");
    });
    const bagianAktif = document.querySelector(idBagian);
    if (bagianAktif) {
        bagianAktif.classList.add("active");
    }
}
linkNavigasi.forEach(function(link) {
    link.addEventListener("click", function(event) {
        const tujuan = link.getAttribute("href");
        if (!tujuan || !tujuan.startsWith("#")) return;
        const bagianTujuan = document.querySelector(tujuan);

        if (!bagianTujuan) return;
        event.preventDefault();
        tampilkanBagian(tujuan);
    });
});
tampilkanBagian("#tentang");

/* ==========================================
   8. TAMBAH PENGALAMAN
   ========================================== */
if (tombolTambah && formPengalaman) {
    tombolTambah.addEventListener("click", function() {
        const sedangTampil =
            formPengalaman.style.display === "block";

        formPengalaman.style.display =
            sedangTampil ? "none" : "block";
    });
}
if (tombolSimpan && formPengalaman) {
    tombolSimpan.addEventListener("click", function() {
        const inputNama = document.querySelector("#input-nama");
        const inputPeriode = document.querySelector("#input-periode");
        const inputDeskripsi = document.querySelector("#input-deskripsi");

        if (!inputNama || !inputPeriode || !inputDeskripsi) return;

        const nama = inputNama.value.trim();
        const periode = inputPeriode.value.trim();
        const deskripsi = inputDeskripsi.value.trim();

        if (!nama || !periode || !deskripsi) {
            alert("Semua data pengalaman harus diisi.");
            return;
        }

        const namaDuplikat = daftarPengalaman.some(function(pengalaman) {
            return pengalaman.nama.toLowerCase() === nama.toLowerCase();
        });

        if (namaDuplikat) {
            alert("Nama pengalaman tersebut sudah ada.");
            return;
        }

        daftarPengalaman.push({
            id: Date.now(),
            nama: nama,
            periode: periode,
            deskripsi: deskripsi
        });

        simpanDaftarPengalaman();
        tampilkanPengalaman();

        inputNama.value = "";
        inputPeriode.value = "";
        inputDeskripsi.value = "";

        formPengalaman.style.display = "none";
    });
}

if (tombolBatal && formPengalaman) {
    tombolBatal.addEventListener("click", function() {
        formPengalaman.style.display = "none";
    });
}

/* ==========================================
   9. HOVER PADA ARTIKEL
   ========================================== */
if (containerPengalaman) {
    containerPengalaman.addEventListener("mouseover", function(event) {
        const article = event.target.closest("article");

        if (article && containerPengalaman.contains(article)) {
            article.classList.add("artikel-hover");
        }
    });

    containerPengalaman.addEventListener("mouseout", function(event) {
        const article = event.target.closest("article");

        if (
            article &&
            containerPengalaman.contains(article) &&
            !article.contains(event.relatedTarget)
        ) {
            article.classList.remove("artikel-hover");
        }
    });
}

/* ==========================================
   10. EVENT DELEGATION LIKE DAN HAPUS
   ========================================== */
if (containerPengalaman) {
    containerPengalaman.addEventListener("click", function(event) {
        const target = event.target;

        if (!(target instanceof Element)) return;

        if (target.classList.contains("tombol-like")) {
            const jumlahSekarang = Number(target.dataset.like) || 0;
            const jumlahBaru = jumlahSekarang + 1;

            const artikel = target.closest("article");
            const judul = artikel
                ? artikel.querySelector("h3")
                : null;

            if (!judul) return;

            target.dataset.like = jumlahBaru;
            target.textContent = "Like (" + jumlahBaru + ")";

            simpanLike(judul.textContent, jumlahBaru);
        }

        if (target.classList.contains("tombol-hapus")) {
            const idYangDihapus = Number(target.dataset.id);

            const index = daftarPengalaman.findIndex(
                function(pengalaman) {
                    return pengalaman.id === idYangDihapus;
                }
            );

            if (index === -1) return;
            const judul = daftarPengalaman[index].nama;
            daftarPengalaman.splice(index, 1);
            simpanDaftarPengalaman();
            const semuaLike = ambilSemuaLike();
            delete semuaLike[judul];

            localStorage.setItem(
                "semuaLike",
                JSON.stringify(semuaLike)
            );

            tampilkanPengalaman();
        }
    });
}

/* ==========================================
   11. STATUS TAMPIL/SEMBUNYI KONTAK
   localStorage: statusKontak
   ========================================== */
function muatStatusKontak() {
    if (!isiKontak || !tombolToggleKontak) return;

    const status = localStorage.getItem("statusKontak");
    const kontakTersembunyi = status === "sembunyi";

    isiKontak.style.display = kontakTersembunyi ? "none" : "grid";

    tombolToggleKontak.textContent = kontakTersembunyi
        ? "Tampilkan Kontak"
        : "Sembunyikan Kontak";
}
muatStatusKontak();

if (tombolToggleKontak && isiKontak) {
    tombolToggleKontak.addEventListener("click", function() {
        const sedangTampil = isiKontak.style.display !== "none";

        if (sedangTampil) {
            isiKontak.style.display = "none";
            tombolToggleKontak.textContent = "Tampilkan Kontak";

            localStorage.setItem("statusKontak", "sembunyi");
        } else {
            isiKontak.style.display = "grid";
            tombolToggleKontak.textContent = "Sembunyikan Kontak";

            localStorage.setItem("statusKontak", "tampil");
        }
    });
}

/* ==========================================
   12. PENYIMPANAN KOMENTAR
   localStorage: komentar
   ========================================== */
function ambilKomentar() {
    try {
        const dataTersimpan = localStorage.getItem("komentar");

        if (dataTersimpan === null) {
            return [];
        }

        const dataJSON = JSON.parse(dataTersimpan);

        if (!Array.isArray(dataJSON)) {
            return [];
        }

        return dataJSON
            .filter(function(k) {
                return (
                    k !== null &&
                    typeof k === "object" &&
                    typeof k.nama === "string" &&
                    typeof k.pesan === "string"
                );
            })
            .map(function(k, index) {
                return {
                    // uid = penanda unik lokal (id server bisa kembar)
                    uid: typeof k.uid === "string" ? k.uid : "lama-" + index,
                    // id = id dari server (null jika komentar lama)
                    id: Number.isFinite(k.id) ? k.id : null,
                    nama: k.nama,
                    pesan: k.pesan
                };
            });
    } catch (error) {
        console.error("Gagal memuat komentar:", error);
        return [];
    }
}

function simpanSemuaKomentar(daftar) {
    localStorage.setItem(
        "komentar",
        JSON.stringify(daftar)
    );
}

function simpanKomentar(nama, pesan, idServer) {
    const komentar = ambilKomentar();

    komentar.push({
        uid: "k" + Date.now() + "-" + Math.floor(Math.random() * 1000),
        id: Number.isFinite(idServer) ? idServer : null,
        nama: nama,
        pesan: pesan
    });

    simpanSemuaKomentar(komentar);
}

function muatKomentar() {
    if (!daftarKomentar) return;

    daftarKomentar.innerHTML = "";

    const komentar = ambilKomentar();

    komentar.forEach(function(k) {
        const item = document.createElement("li");
        item.dataset.uid = k.uid;

        // id dari server disimpan untuk operasi PATCH dan DELETE
        if (k.id !== null) {
            item.dataset.id = k.id;
        }

        const teks = document.createElement("span");
        teks.className = "komentar-text";
        teks.textContent = k.nama + ": " + k.pesan;

        const aksi = document.createElement("div");
        aksi.className = "aksi-komentar";

        const tombolEdit = document.createElement("button");
        tombolEdit.className = "edit-komentar";
        tombolEdit.type = "button";
        tombolEdit.textContent = "Edit";

        const tombolHapusKomentar = document.createElement("button");
        tombolHapusKomentar.className = "hapus-komentar";
        tombolHapusKomentar.type = "button";
        tombolHapusKomentar.textContent = "Hapus";

        aksi.appendChild(tombolEdit);
        aksi.appendChild(tombolHapusKomentar);

        item.appendChild(teks);
        item.appendChild(aksi);

        daftarKomentar.appendChild(item);
    });

    if (tombolHapusSemua) {
        tombolHapusSemua.style.display =
            komentar.length > 0 ? "inline-block" : "none";
    }
}
muatKomentar();

/* ==========================================
   13. SESSION STORAGE DRAF KOMENTAR
   ========================================== */

if (inputPesanKomentar) {
    inputPesanKomentar.value =
        sessionStorage.getItem("drafKomentar") || "";

    inputPesanKomentar.addEventListener("input", function() {
        sessionStorage.setItem(
            "drafKomentar",
            inputPesanKomentar.value
        );
    });
}
if (inputNamaKomentar) {
    inputNamaKomentar.value =
        sessionStorage.getItem("drafNamaKomentar") || "";

    inputNamaKomentar.addEventListener("input", function() {
        sessionStorage.setItem(
            "drafNamaKomentar",
            inputNamaKomentar.value
        );
    });
}

/* ==========================================
   MODUL 9
   KONSUMSI REST API (POST, PATCH, DELETE)
   ========================================== */

const API_URL = "https://jsonplaceholder.typicode.com";

// Simpan dan gunakan ID yang dikembalikan oleh server apa adanya.
// JSONPlaceholder bersifat simulasi: perubahan POST, PATCH, dan DELETE
// tidak benar-benar disimpan secara permanen di server.

/* ---------- B.6 Menangani status code ---------- */

function pesanDariStatus(status) {
    if (status === 404) return "Data tidak ditemukan di server.";
    if (status === 400) return "Data yang dikirim tidak valid.";
    if (status >= 500) return "Server sedang bermasalah, coba lagi nanti.";
    return "Terjadi kesalahan tidak terduga.";
}

function pesanDariError(error) {
    if (error && typeof error.status === "number") {
        return pesanDariStatus(error.status);
    }

    if (error instanceof TypeError) {
        return "Tidak dapat terhubung ke server. Periksa koneksi internet.";
    }

    return "Terjadi kesalahan tidak terduga.";
}

function periksaResponse(response) {
    if (!response.ok) {
        const error = new Error("Status: " + response.status);
        error.status = response.status;
        throw error;
    }

    return response;
}

/* ---------- B.2 POST: kirim komentar baru ---------- */

async function kirimKomentarKeServer(nama, pesan) {
    const response = await fetch(API_URL + "/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nama, body: pesan, postId: 1 })
    });

    periksaResponse(response);

    return await response.json();
}

/* ---------- B.7 PATCH: perbarui (edit) komentar ---------- */

async function perbaruiKomentarKeServer(id, nama, pesan) {
    const response = await fetch(
        API_URL + "/comments/" + encodeURIComponent(id), {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: nama, body: pesan })
        }
    );

    periksaResponse(response);

    return await response.json();
}

/* ---------- B.5 DELETE: hapus komentar ---------- */

async function hapusKomentarDiServer(id) {
    const response = await fetch(
        API_URL + "/comments/" + encodeURIComponent(id), {
            method: "DELETE"
        }
    );

    periksaResponse(response);
}

/* ---------- B.4 PATCH: perbarui like ---------- */

async function perbaruiLikeKeServer(postId, jumlahLike) {
    try {
        const response = await fetch(API_URL + "/posts/" + postId, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ likes: jumlahLike })
        });

        periksaResponse(response);

        console.log("Like berhasil diperbarui di server");
    } catch (error) {
        console.error("Gagal memperbarui like:", error);

        if (pesanErrorArtikel) {
            pesanErrorArtikel.textContent =
                "Gagal memperbarui like. " + pesanDariError(error);
        }
    }
}

/* ---------- Indikator loading pada tombol ---------- */

function aturTombolSibuk(tombol, sibuk, teksSibuk) {
    if (!tombol) return;

    if (sibuk) {
        tombol.dataset.teksAsli = tombol.textContent;
        tombol.textContent = teksSibuk;
        tombol.disabled = true;
    } else {
        tombol.disabled = false;

        if (tombol.dataset.teksAsli !== undefined) {
            tombol.textContent = tombol.dataset.teksAsli;
            delete tombol.dataset.teksAsli;
        }
    }
}

/* ---------- Mode edit komentar ---------- */

let komentarDiedit = null; // uid komentar yang sedang diedit

const tombolKirimKomentar = formKomentar
    ? formKomentar.querySelector('button[type="submit"]')
    : null;
const tombolBatalEdit = document.querySelector("#btn-batal-edit");

function perbaruiTeksTombolKirim() {
    if (!tombolKirimKomentar) return;

    tombolKirimKomentar.textContent =
        komentarDiedit === null ? "Kirim Komentar" : "Simpan Perubahan";
}

function mulaiEditKomentar(uid) {
    const komentar = ambilKomentar().find(function(k) {
        return k.uid === uid;
    });

    if (!komentar || !inputNamaKomentar || !inputPesanKomentar) return;

    komentarDiedit = uid;

    inputNamaKomentar.value = komentar.nama;
    inputPesanKomentar.value = komentar.pesan;

    if (pesanError) {
        pesanError.textContent = "";
    }

    if (tombolBatalEdit) {
        tombolBatalEdit.hidden = false;
    }

    perbaruiTeksTombolKirim();

    formKomentar.scrollIntoView({ behavior: "smooth", block: "center" });
    inputPesanKomentar.focus();
}

function akhiriModeEdit() {
    komentarDiedit = null;

    if (formKomentar) {
        formKomentar.reset();
    }

    sessionStorage.removeItem("drafKomentar");
    sessionStorage.removeItem("drafNamaKomentar");

    if (tombolBatalEdit) {
        tombolBatalEdit.hidden = true;
    }

    perbaruiTeksTombolKirim();
}

if (tombolBatalEdit) {
    tombolBatalEdit.addEventListener("click", function() {
        if (pesanError) {
            pesanError.textContent = "";
        }

        akhiriModeEdit();
    });
}

/* ==========================================
   14. FORM KOMENTAR (POST dan PATCH)
   ========================================== */
if (formKomentar) {
    formKomentar.addEventListener("submit", async function(event) {
        event.preventDefault();

        if (!inputNamaKomentar || !inputPesanKomentar) return;

        // Cegah klik ganda saat permintaan masih berjalan
        if (tombolKirimKomentar && tombolKirimKomentar.disabled) return;

        const nama = inputNamaKomentar.value.trim();
        const pesan = inputPesanKomentar.value.trim();

        if (pesanError) {
            pesanError.textContent = "";
        }
        if (nama === "" || pesan === "") {
            if (pesanError) {
                pesanError.textContent =
                    "Nama dan komentar wajib diisi!";
            }
            return;
        }
        if (pesan.length < 5) {
            if (pesanError) {
                pesanError.textContent =
                    "Komentar minimal 5 karakter.";
            }
            return;
        }

        const sedangEdit = komentarDiedit !== null;

        // Indikator loading: tombol dinonaktifkan selama pengiriman
        if (tombolKirimKomentar) {
            tombolKirimKomentar.disabled = true;
            tombolKirimKomentar.textContent =
                sedangEdit ? "Menyimpan..." : "Mengirim...";
        }

        try {
            if (!sedangEdit) {
                // POST: komentar baru
                const hasil = await kirimKomentarKeServer(nama, pesan);

                console.log("Komentar tersimpan di server, id:", hasil.id);

                simpanKomentar(hasil.name || nama, hasil.body || pesan, hasil.id);
            } else {
                // PATCH: perbarui komentar yang diedit
                const komentar = ambilKomentar();
                const index = komentar.findIndex(function(k) {
                    return k.uid === komentarDiedit;
                });

                if (index === -1) {
                    akhiriModeEdit();
                    return;
                }

                if (komentar[index].id !== null) {
                    await perbaruiKomentarKeServer(
                        komentar[index].id,
                        nama,
                        pesan
                    );
                }

                komentar[index].nama = nama;
                komentar[index].pesan = pesan;
                simpanSemuaKomentar(komentar);
            }

            muatKomentar();
            akhiriModeEdit();
        } catch (error) {
            console.error("Gagal memproses komentar:", error);

            if (pesanError) {
                pesanError.textContent =
                    (sedangEdit
                        ? "Gagal memperbarui komentar. "
                        : "Gagal mengirim komentar. ") +
                    pesanDariError(error);
            }
        } finally {
            if (tombolKirimKomentar) {
                tombolKirimKomentar.disabled = false;
                perbaruiTeksTombolKirim();
            }
        }
    });
}

/* ==========================================
   15. EDIT DAN HAPUS KOMENTAR (event delegation)
   ========================================== */
if (daftarKomentar) {
    daftarKomentar.addEventListener("click", async function(event) {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const tombol = target.closest("button");

        if (!tombol || !daftarKomentar.contains(tombol)) return;

        const li = tombol.closest("li");

        if (!li) return;

        const uid = li.dataset.uid;

        // Edit: isi form dengan komentar yang dipilih
        if (tombol.classList.contains("edit-komentar")) {
            mulaiEditKomentar(uid);
            return;
        }

        // DELETE: hapus komentar di server, lalu di tampilan
        if (tombol.classList.contains("hapus-komentar")) {
            const idServer = li.dataset.id;

            aturTombolSibuk(tombol, true, "Menghapus...");

            try {
                if (idServer !== undefined) {
                    await hapusKomentarDiServer(idServer);
                }

                const sisa = ambilKomentar().filter(function(k) {
                    return k.uid !== uid;
                });

                simpanSemuaKomentar(sisa);

                if (komentarDiedit === uid) {
                    akhiriModeEdit();
                }

                muatKomentar();
            } catch (error) {
                console.error("Gagal menghapus komentar:", error);

                alert(
                    "Gagal menghapus komentar dari server. " +
                    pesanDariError(error)
                );

                aturTombolSibuk(tombol, false);
            }
        }
    });
}

/* ==========================================
   16. MODAL HAPUS SEMUA KOMENTAR
   ========================================== */
if (tombolHapusSemua && modalKonfirmasi) {
    tombolHapusSemua.addEventListener("click", function() {
        modalKonfirmasi.style.display = "block";
    });
}
if (btnYa && modalKonfirmasi) {
    btnYa.addEventListener("click", function() {
        localStorage.setItem("komentar", JSON.stringify([]));

        if (komentarDiedit !== null) {
            akhiriModeEdit();
        }

        muatKomentar();
        modalKonfirmasi.style.display = "none";
    });
}
if (btnTidak && modalKonfirmasi) {
    btnTidak.addEventListener("click", function() {
        modalKonfirmasi.style.display = "none";
    });
}
if (modalKonfirmasi) {
    modalKonfirmasi.addEventListener("click", function(event) {
        if (event.target === modalKonfirmasi) {
            modalKonfirmasi.style.display = "none";
        }
    });
}

/* ==========================================
   17. MODAL KONFIRMASI RESET
   ========================================== */
if (tombolReset && modalReset) {
    tombolReset.addEventListener("click", function() {
        modalReset.style.display = "block";
    });
}
if (btnResetYa && modalReset) {
    btnResetYa.addEventListener("click", function() {
        localStorage.removeItem("tema");
        localStorage.removeItem("semuaLike");
        localStorage.removeItem("komentar");
        localStorage.removeItem("daftarPengalaman");
        // statusKontak sengaja dipertahankan saat Reset Data.

        sessionStorage.removeItem("drafKomentar");
        sessionStorage.removeItem("drafNamaKomentar");

        location.reload();
    });
}
if (btnResetTidak && modalReset) {
    btnResetTidak.addEventListener("click", function() {
        modalReset.style.display = "none";
    });
}
if (modalReset) {
    modalReset.addEventListener("click", function(event) {
        if (event.target === modalReset) {
            modalReset.style.display = "none";
        }
    });
}

/* ==========================================
   18. SCROLL TO TOP
   ========================================== */
if (btnTop) {
    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            btnTop.classList.add("show");
        } else {
            btnTop.classList.remove("show");
        }
    });
    btnTop.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* ==========================================
   MODUL 8
   FETCH API DAN ASYNC/AWAIT
   ========================================== */
// B.2 - Uji fetch dasar ke console
async function ujiFetch() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts?_limit=3"
        );
        if (!response.ok) {
            throw new Error("Status: " + response.status);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Gagal uji fetch:", error);
    }
}
// Mengambil elemen HTML
const loadingArtikel = document.querySelector("#loading");
const daftarArtikelAPI = document.querySelector("#daftar-artikel");
const pesanErrorArtikel = document.querySelector("#pesan-error-artikel");

// Fungsi untuk mengambil data artikel dari API
async function ambilArtikel() {

    // Menampilkan indikator loading
    loadingArtikel.style.display = "block";

    // Menghapus pesan error sebelumnya
    pesanErrorArtikel.textContent = "";

    // Mengosongkan daftar artikel
    daftarArtikelAPI.innerHTML = "";

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );

        if (!response.ok) {
            throw new Error("Gagal mengambil data artikel.");
        }

        const dataArtikel = await response.json();

        const semuaLike = ambilSemuaLike();

        dataArtikel.forEach(function(artikel) {

            const article = document.createElement("article");

            const judul = document.createElement("h3");
            judul.textContent = artikel.title;

            const isi = document.createElement("p");
            isi.textContent = artikel.body;

            // Tombol Like (disimpan di localStorage)
            const kunci = "artikel:" + artikel.id;
            const jumlah = Number(semuaLike[kunci]) || 0;

            const tombolLike = document.createElement("button");
            tombolLike.type = "button";
            tombolLike.className = "tombol-like";
            tombolLike.textContent = "Like (" + jumlah + ")";
            tombolLike.dataset.like = jumlah;
            tombolLike.dataset.kunci = kunci;
            tombolLike.dataset.postId = artikel.id;

            const tombolHapus = document.createElement("button");
            
            tombolHapus.type = "button";
            tombolHapus.className = "tombol-hapus";
            tombolHapus.textContent = "Hapus";

            const wadahTombol = document.createElement("div");
            wadahTombol.className = "tombol-pengalaman";
            wadahTombol.appendChild(tombolLike);
            wadahTombol.appendChild(tombolHapus);

            article.appendChild(judul);
            article.appendChild(isi);
            article.appendChild(wadahTombol);

            daftarArtikelAPI.appendChild(article);

        });

    } catch (error) {
        console.error("Terjadi kesalahan:", error);

        pesanErrorArtikel.textContent =
            "Artikel gagal dimuat. Silakan coba lagi.";

    } finally {
        loadingArtikel.style.display = "none";

    }
}
daftarArtikelAPI.addEventListener("click", function(event) {
    const t = event.target;
    if (!(t instanceof Element)) return;

    if (t.classList.contains("tombol-like")) {
        const baru = (Number(t.dataset.like) || 0) + 1;
        t.dataset.like = baru;
        t.textContent = "Like (" + baru + ")";
        simpanLike(t.dataset.kunci, baru);
        perbaruiLikeKeServer(t.dataset.postId, baru);
    }

    if (t.classList.contains("tombol-hapus")) {
        const artikel = t.closest("article");
        if (artikel) artikel.remove();
    }
});

async function muatProfilPenulis() {
    const nama = document.querySelector("#nama-penulis");
    const email = document.querySelector("#email-penulis");
    if (!nama || !email) return;

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/1"
        );
        if (!response.ok) {
            throw new Error("Status: " + response.status);
        }
        const user = await response.json();
        nama.textContent = user.name;
        email.textContent = user.email;
    } catch (error) {
        nama.textContent = "Profil penulis gagal dimuat.";
        console.error("Gagal memuat profil penulis:", error);
    }
}
async function muatKomentarAPI() {
    const daftar = document.querySelector("#komentar-api");
    const loading = document.querySelector("#loading-komentar");
    if (!daftar || !loading) return;

    loading.style.display = "block";
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1/comments?_limit=3"
        );
        if (!response.ok) {
            throw new Error("Status: " + response.status);
        }
        const data = await response.json();

        data.forEach(function(c) {
            const li = document.createElement("li");
            li.textContent = c.name + " (" + c.email + "): " + c.body;
            daftar.appendChild(li);
        });
    } catch (error) {
        daftar.innerHTML = "<li>Komentar awal gagal dimuat.</li>";
        console.error("Gagal memuat komentar:", error);
    } finally {
        loading.style.display = "none";
    }
}

ujiFetch();
ambilArtikel();
muatProfilPenulis();
muatKomentarAPI();