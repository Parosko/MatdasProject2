const perangkatList = [];
        const saranWattPerangkat = {
            "Lampu": "8, 13, 18, 20, 24, 45 watt",
            "Kulkas": "100-250 watt",
            "AC": "660-800 watt",
            "Dispenser": "150-500 watt",
            "Mesin Cuci": "90-230 watt",
            "Setrika": "300 watt",
            "Rice Cooker": "100-400 watt",
            "Charger": "10, 33, 67, 120 watt"
        };

        function tampilkanSaranWatt() {
            const perangkat = document.getElementById('perangkat').value;
            const saran = saranWattPerangkat[perangkat];
            const inputPerangkatLainnya = document.getElementById('inputPerangkatLainnya');
        
            if (perangkat === "Lainnya") {
                inputPerangkatLainnya.style.display = "block"; // Tampilkan input untuk perangkat lainnya
                document.getElementById('saranWatt').textContent = "Masukkan nama perangkat dan watt-nya.";
            } else {
                inputPerangkatLainnya.style.display = "none"; // Sembunyikan input lainnya
                document.getElementById('saranWatt').textContent = saran ? `Watt umum untuk perangkat ini: ${saran}` : "";
            }
        }
        

        function tambahPerangkat() {
            let jenis = document.getElementById('perangkat').value;
            if (jenis === "Lainnya") {
                jenis = document.getElementById('namaPerangkatLainnya').value || "Perangkat Tidak Diketahui";
            }
        
            const daya = parseFloat(document.getElementById('daya').value) || 0;
            const jumlah = parseInt(document.getElementById('jumlah').value) || 0;
            const durasi = parseFloat(document.getElementById('durasi').value) || 0;
        
            if (daya > 0 && jumlah > 0 && durasi > 0 && jenis.trim() !== "") {
                perangkatList.push({ jenis, daya, jumlah, durasi });
        
                const deviceListDiv = document.getElementById('deviceList');
                const deviceItem = document.createElement('div');
                deviceItem.className = 'device-item';
                deviceItem.innerHTML = `
                    <strong>${jenis}</strong><br>
                    Daya: ${daya} watt<br>
                    Jumlah: ${jumlah}<br>
                    Durasi: ${durasi} jam/hari
                `;
                deviceListDiv.appendChild(deviceItem);
        
                document.getElementById('daya').value = '';
                document.getElementById('jumlah').value = '';
                document.getElementById('durasi').value = '';
                document.getElementById('namaPerangkatLainnya').value = ''; // Reset input lainnya
                document.getElementById('inputPerangkatLainnya').style.display = 'none'; // Sembunyikan input lainnya
            } else {
                alert('Harap masukkan semua data dengan benar.');
            }
        }
        

        function hitungEnergi() {
            const tarifListrik = parseFloat(document.getElementById('dayaRumah').value);
            let totalEnergi = 0;

            perangkatList.forEach(perangkat => {
                const energiPerangkat = perangkat.daya * perangkat.jumlah * perangkat.durasi * 30 / 1000; // kWh
                totalEnergi += energiPerangkat;
            });

            const biayaEnergi = totalEnergi * tarifListrik;

            document.getElementById('result').innerHTML = `
                <p><strong>Total Konsumsi Energi:</strong> ${totalEnergi.toFixed(2)} kWh per bulan</p>
                <p><strong>Total Biaya Energi:</strong> Rp. ${biayaEnergi.toFixed(2)}</p>
            `;
        }