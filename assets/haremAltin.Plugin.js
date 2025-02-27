
(function (window, document) {
    /*
    * Plugin: HaremAltin
    * Yazar: Mehmet Şah YILMAZ
    * E-posta: msahyilmaz@hotmail.com
    * Açıklama:
    * Bu eklenti, haremaltin.com adresinden alınan döviz ve altın verilerini görüntülemeye yarayan basit bir araçtır.
    * Verilerin haremaltin.com adresinden izin alınmadan kullanılması yasal olmayabilir. 
    * Bu eklenti eğitim amaçlı örnek olarak yazılmıştır.
    * Lütfen kullanım koşullarını ve yasal durumu göz önünde bulundurarak kullanın.
    */
    const HaremAltin = {
        configs: {
            selector: 'body',    // Hedef öğe (ilk başta body)
            refreshTime: 1,         // Döngü süresi (saniye)
            isRefreshed: true,         // yenilenmeli mi?
            haremJson: 'https://canlipiyasalar.haremaltin.com/tmp/altin.json?dil_kodu=tr',  // JSON URL
            tableClass: 'table table-striped table-bordered'  // Tablo sınıfı
        },

        isProcessing: false, // İşlem durumu (başlatıldı mı?)

        // Konfigürasyonları dışarıdan güncelleme fonksiyonu
        setConfigs: function(newConfigs) {
            this.configs = { ...this.configs, ...newConfigs };  // Mevcut config'i güncelle
            if (this.configs.isRefreshed) {
                this.startAutoRefresh(); // isRefreshed true ise otomatik başlat
            }
        },

        getDoviz: async function () {
            try {
                const response = await fetch(this.configs.haremJson);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();  // JSON verisini parse et
                return data;  // Veriyi döndür
            } catch (error) {
                console.error("Veri çekme hatası:", error);
            }
        },
        setDovuz: async function () {
            if (this.isProcessing) return; // Eğer işlem devam ediyorsa, yeni işlem başlatma

            this.isProcessing = true; // İşlem başladı

            await this.getDoviz().then(goldData => {
                const targetElement = document.querySelector(this.configs.selector);  // configs.selector ile hedef elemanı seç
                if (targetElement) {
                    targetElement.innerHTML = '';  // Önceki içeriği temizle
                    const dovizTable = document.createElement('table');
                    dovizTable.setAttribute("id", "dovizTable");
                    dovizTable.setAttribute("class", this.configs.tableClass);  // configs.tableClass'tan alınan sınıf
                    dovizTable.innerHTML = `<thead>
                                                <tr>
                                                    <td>Cins</td>
                                                    <td>Alış</td>
                                                    <td>Satış</td>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>`;
                    targetElement.appendChild(dovizTable);
                    // Tabloyu doldur
                    const tableBody = dovizTable.querySelector("tbody");
                    tableBody.innerHTML = '';  // Tabloyu temizle

                    if (goldData) {
                        const filteredCodes = [
                            { sira: 0, code: "EURTRY", label: "EUR / TRY", icon: `€` },
                            { sira: 1, code: "USDTRY", label: "USD / TRY", icon: `$` },
                            { sira: 2, code: "KULCEALTIN", label: "Gram Altın", icon: `G` },
                            { sira: 2, code: "CEYREK_ESKI", label: "Eski Çeyrek Altın", icon: `G` },
                            { sira: 3, code: "CEYREK_YENI", label: "Yeni Çeyrek Altın", icon: `G` },
                            { sira: 4, code: "YARIM_ESKI", label: "Eski Yarım Altın", icon: `G` },
                            { sira: 5, code: "YARIM_YENI", label: "Yeni Yarım Altın", icon: `G` },
                            { sira: 6, code: "TEK_YENI", label: "Yeni Tam Altın", icon: `G` },
                            { sira: 7, code: "TEK_ESKI", label: "Eski Tam Altın", icon: `G` },
                            { sira: 8, code: "AYAR22", label: "22 Ayar Altın", icon: `G` },
                            { sira: 9, code: "AYAR14", label: "14 Ayar Altın", icon: `G` },
                            { sira: 10, code: "ALTIN", label: "Altın", icon: `G` },
                            { sira: 11, code: "ONS", label: "Ons", icon: `G` }
                        ];

                        const filteredData = Object.values(goldData?.data)
                            .filter(item => filteredCodes.some(fc => fc.code === item.code))
                            .map(item => {
                                const foundItem = filteredCodes.find(fc => fc.code === item.code);
                                return { ...item, sira: foundItem.sira, label: foundItem.label, icon: foundItem.icon };
                            })
                            .sort((a, b) => a.sira - b.sira);

                        filteredData.forEach(item => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${item.icon} ${item.label}</td>
                                <td>${item.alis} ₺</td>
                                <td>${item.satis} ₺</td>
                            `;
                            tableBody.appendChild(row);
                        });
                    }
                }
            });

            this.isProcessing = false; // İşlem tamamlandı
        },

        startAutoRefresh: function () {
            // Eğer isRefreshed true ise otomatik yenileme başlat
            if (this.configs.isRefreshed) {
                setInterval(() => {
                    this.setDovuz(); // `this` bağlamını koruyarak işlemi başlat
                }, (parseInt(this.configs.refreshTime) && parseInt(this.configs.refreshTime) > 0 ? (this.configs.refreshTime * 1000) : 5000));
            }
        }
    };

    // Sayfa yüklendiğinde otomatik olarak çalıştır
    document.addEventListener('DOMContentLoaded', () => {
        if (HaremAltin.configs.isRefreshed) {
            HaremAltin.startAutoRefresh(); // isRefreshed true ise otomatik olarak yenilemeyi başlat
        }
    });

    // Kullanıcıya plugin fonksiyonunu sunma
    window.HaremAltin = HaremAltin;
})(window, document);