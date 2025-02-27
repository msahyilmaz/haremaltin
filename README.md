 
# HaremAltin - Altın ve Döviz Verisi Görüntüleme Eklentisi

Bu JavaScript eklentisi, **haremaltin.com** sitesinden alınan altın ve döviz verilerini bir tablo şeklinde görüntüler. Eğitim amaçlı yazılmış bir örnek olup, verilerin izinsiz kullanılması yasal olmayabilir. Lütfen kullanım şartlarını ve yasal gereksinimleri kontrol edin.

## Özellikler

- **Altın ve Döviz Verisi**: EUR/TRY, USD/TRY, Gram Altın, Çeyrek Altın gibi döviz ve altın verilerini alır.
- **Tablo Görünümü**: Veriler, kullanıcı tarafından belirlenen bir hedef öğeye tablo olarak yerleştirilir.
- **Veri Yenileme**: Veriler belirli aralıklarla otomatik olarak yenilenebilir.
- **Konfigürasyon Özelleştirme**: Konfigürasyonları dışarıdan kolayca güncelleyebilirsiniz.

## Kurulum

### 1. Dosyayı İndirme

Bu eklentiyi kullanmak için aşağıdaki dosyayı projenize eklemeniz yeterlidir:

- **haremaltin.js**: Bu dosya eklentinin ana JavaScript dosyasıdır.

### 2. HTML Sayfasına Entegre Etme

HTML sayfanıza aşağıdaki gibi eklentiyi dahil edebilirsiniz:

```html
<script src="path/to/haremAltin.Plugin.js"></script>
```

### 3. Hedef Element Seçimi

Verilerin görüntülenmesini istediğiniz bir hedef öğe seçin. Bu öğe, altın ve döviz verilerini içerecek olan tabloyu barındıracak öğedir. Örneğin:

```html
<div class="deneme"></div> <!-- Veriler burada gösterilecek -->
```

### 4. Eklentiyi Kullanma

Eklentiyi kullanmak için aşağıdaki gibi `setConfigs` fonksiyonu ile gerekli konfigürasyonları ayarlayabilir ve ardından `setDovuz` fonksiyonunu çağırabilirsiniz.

#### Konfigürasyon Örnek Kullanımı

```javascript
// Konfigürasyon ayarlarını yapma
HaremAltin.setConfigs({
    selector: '.deneme', // Tabloyu yerleştireceğimiz hedef öğe
    refreshTime: 5,  // Güncellemeyi 5 saniyeye ayarla 
    tableClass: 'table table-striped'  // Tablo stilini değiştirebilirsiniz
});

// Verileri manuel olarak çekme
HaremAltin.setDovuz(); // Verileri hemen çekmek için
```

#### Otomatik Yenileme

Verilerin belirli bir süre aralıklarıyla otomatik olarak yenilenmesini isterseniz, `isRefreshed` parametresini `true` olarak ayarlayabilirsiniz.

```javascript
HaremAltin.setConfigs({
    isRefreshed: true,  // Otomatik yenilemeyi etkinleştir. default true.
    refreshTime: 10  // Yenileme süresi (saniye)
});
```

### 5. Manuel Yenileme

Verilerin yenilenmesini bir buton ya da başka bir etkileşimle manuel olarak tetiklemek için şu şekilde kullanabilirsiniz:

```javascript
HaremAltin.setConfigs({
    isRefreshed: false,  // Otomatik yenilemeyi etkinleştir 
});
document.querySelector('#myButton').addEventListener('click', function () {
    HaremAltin.setDovuz(); // Butona tıklanınca verileri manuel olarak güncelle
});
```

## Konfigürasyon Parametreleri

Aşağıda eklentinin desteklediği konfigürasyon parametreleri yer almaktadır:

| Parametre         | Açıklama                                                           | Varsayılan Değer                       |
|-------------------|--------------------------------------------------------------------|---------------------------------------|
| `selector`        | Tabloyu yerleştireceğiniz hedef öğe (CSS seçici).                  | `body`                                |
| `refreshTime`     | Verilerin yenilenme süresi (saniye cinsinden).                     | `1` (saniye)                          |
| `isRefreshed`     | Verilerin otomatik olarak yenilenmesini sağlamak için `true` yapın.| `true`                                | 
| `tableClass`      | Tabloya uygulanacak CSS sınıfı.                                    | `table table-striped table-bordered`  |

## Yasal Uyarı

Bu eklenti, eğitim amaçlı yazılmış bir örnektir. Verilerin **haremaltin.com** adresinden izin alınmadan kullanılması yasal olmayabilir. Bu eklentiyi ticari amaçla kullanmadan önce ilgili siteye ait kullanım şartlarını kontrol ediniz.

## İletişim

- **Yazar**: Mehmet Şah YILMAZ
- **E-posta**: msahyilmaz@hotmail.com

---

Bu README dosyası, HaremAltin eklentisini kullanmak isteyen geliştiriciler için gerekli tüm bilgileri sunar. Geliştiriciler, eklentinin nasıl kurulduğu, nasıl kullanıldığı ve hangi parametrelerle özelleştirilebileceği konusunda bilgi sahibi olabilirler.
