# 🎮 HaTetris - Tetris Klonu

Tarayıcı üzerinde çalışan, herhangi bir dış kütüphaneye ihtiyaç duymayan, tamamen **Vanilla JS** ve **HTML5 Canvas** kullanılarak geliştirilmiş modern ve keyifli bir Tetris klonudur.

![Tetris Blokları](rotations.png) 

##  Özellikler

- **Klasik Deneyim:** Bildiğimiz klasik Tetris oyun mekanikleri (düşme, döndürme, satır temizleme).
- **Sıradaki Parça Paneli:** Orijinal kurala sadık kalınarak eklenen, gelecek şekli görebildiğiniz yan panel.
- **Skor Tablosu:** Parça yerleştikçe ve satır eritildikçe artan dinamik puanlama.
- **Anında Çalışır:** Node.js, Webpack veya ekstra bir paket gerektirmez. İndir ve oyna!

## Nasıl Oynanır? (Kurulum)

Projeyi çalıştırmak oldukça basittir. 

**Seçenek 1: Tarayıcıda Doğrudan Açma:**
Sadece proje klasöründeki `index.html` dosyasını tarayıcınıza (Chrome, Edge, Firefox, Safari vb.) sürükleyip bırakmanız veya çift tıklamanız yeterlidir.

**Seçenek 2: Yerel Sunucu (Tavsiye Edilen):**
Geliştirme yaparken veya tarayıcının yerel dosya güvenlik kısıtlamalarına takılmamak için basit bir lokal sunucu kullanabilirsiniz. Terminali açın ve şu komutu girin:

```bash
# Python 3 yüklüyse
python3 -m http.server 5173
```
Ardından tarayıcınızdan [http://localhost:5173](http://localhost:5173) adresine gidin.

## Kontroller

Oyun içindeki blokları klavye ok tuşları ile kontrol edebilirsiniz:

| Tuş | Eylem |
| :---: | :--- |
| `←` (Sol Ok) | Parçayı sola hareket ettirir |
| `→` (Sağ Ok) | Parçayı sağa hareket ettirir |
| `↓` (Alt Ok) | Hızlı düşüş (parçayı hızlıca aşağı indirir) |
| `↑` (Üst Ok) | Parçayı saat yönünde döndürür |

Ayrıca yan paneldeki **Yeniden Başlat (Reset)** butonu oyunu sıfırlayıp baştan başlatmanızı sağlar.

## Skor ve Puanlama

Oyun içerisindeki hamleleriniz puan olarak döner:
- **Aşağı İndirme (↓):** Her düşüş adımı için **+1 Puan**
- **Parçanın Yerleşmesi:** Parça tabana oturduğunda **+100 Puan**
- **Satır Temizleme:** Tamamen dolup yok olan her satır için **+1000 Puan**

## Proje Yapısı

- `index.html`: Web sayfasının iskeleti; oyunun görsel bileşenlerinin, CSS stil kodlarının ve Canvas etiketlerinin bulunduğu ana katman.
- `tetris.js`: Oyunun tüm mekaniklerini, matematiksel mantığını (çarpışma, döndürme) ve Canvas üzerine render evrelerini yöneten çekirdek dosya.

## 🛠️ Modifiye & İyileştirme

Oyunu kendinize göre özelleştirmek, hızını değiştirmek veya farklı zorluklar katmak isterseniz `tetris.js` dosyasının ortalarındaki şu değişkenleri kurcalayabilirsiniz:

```javascript
const size = 40;              // Her bir oyun karesinin/hücresinin piksel boyutu
const framePerSecond = 24;    // Çizim işlemlerinin FPS (saniyelik kare) hızı
const gameSpeed = 6;          // Parça düşme hızı (Değer arttıkça düşüş hızı artar)
const imageSquareSize = 24;   // Sprite dosyasından çekilen çerçevenin kaynak boyutu
```

---
*İyi eğlenceler! *