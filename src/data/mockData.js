export const COMPANY_INFO = {
  name: "İZELTAŞ İZMİR EL ALETLERİ SAN. VE TİC. A.Ş.",
  address: "Işıkkent, Bornova / İZMİR",
  phone: "0232 479 20 20",
  email: "info@izeltas.com.tr",
  id: "9001"
};

export const LOCATIONS = [
  {
    id: 1,
    city: "İzmir",
    name: "İzeltaş Torbalı Fabrikası",
    address: "7 Eylül Mah. Celal Umur Cad. No:6 Torbalı / İzmir",
    description: "Ana üretim tesisi ve dövmehane."
  },
  {
    id: 2,
    city: "İzmir",
    name: "İzeltaş Işıkkent Fabrikası",
    address: "Ayakkabıcılar Sitesi, Işıkkent / İzmir",
    description: "Depolama ve sevkiyat merkezi."
  },
  {
    id: 3,
    city: "İzmir",
    name: "İzeltaş Pınarbaşı Tesisi",
    address: "Pınarbaşı Sanayi Bölgesi / İzmir",
    description: "Isıl işlem ve kaplama tesisi."
  },
  {
    id: 4,
    city: "Ankara",
    name: "İzeltaş Ankara Lojistik Merkezi",
    address: "Sincan Organize Sanayi Bölgesi / Ankara",
    description: "İç Anadolu bölge dağıtım ve lojistik üssü."
  },
  {
    id: 5,
    city: "Ankara",
    name: "İzeltaş OSTİM Satış ve Servis",
    address: "100. Yıl Bulvarı No:45 OSTİM / Ankara",
    description: "Bölge satış ofisi ve kalibrasyon laboratuvarı."
  },
  {
    id: 6,
    city: "İstanbul",
    name: "İzeltaş Dudullu Ana Depo",
    address: "Dudullu Organize Sanayi Bölgesi / İstanbul",
    description: "Marmara Bölgesi ana sevkiyat merkezi."
  },
  {
    id: 7,
    city: "İstanbul",
    name: "İzeltaş İkitelli Teknik Tesis",
    address: "İkitelli OSB Metal-İş Sanayi Sitesi / İstanbul",
    description: "Teknik servis ve ürün geliştirme atölyesi."
  }
];

export const CATEGORIES = [
  { id: 'vinc', label: "Vinçler" },
  { id: 'transpalet', label: "Transpaletler" },
  { id: 'tezgah', label: "Tezgahlar" },
  { id: 'kapi', label: "Endüstriyel Kapılar" },
  { id: 'platform', label: "Yükseltilebilir Seyyar İş Platformları" },
  { id: 'forklift', label: "Forkliftler" },
  { id: 'kazici', label: "Kazıcı Yükleyiciler" },
  { id: 'buhar', label: "Buhar Kazanı" },
  { id: 'genlesme', label: "Genleşme Tankı" },
  { id: 'sicaksu', label: "Sıcak Su Kazanı" },
  { id: 'kompresor', label: "Kompresör Hava Tankı" },
  { id: 'boyler', label: "Boyler" },
  { id: 'diger', label: "Diğer", isFolder: true }
];

export const SUB_CATEGORIES = [
  { id: 'yangin', parentId: 'diger', label: "Yangın Söndürme Sistemleri Periyodik Kontrolleri" },
  { id: 'havalandirma', parentId: 'diger', label: "Havalandırma Tesisatı Periyodik Kontrolleri" },
  { id: 'raf', parentId: 'diger', label: "Raf Periyodik Kontrolleri" },
  { id: 'ndt', parentId: 'diger', label: "NDT" }
];

const brands = ["Linde", "Cat", "Toyota", "Jungheinrich", "Komatsu", "Konecranes", "BVS", "Atlas", "Manitou", "Ayvaz", "Erensan", "Alarko"];
const places = ["Depo A", "Depo B", "Sevkiyat", "Üretim Hattı 1", "Üretim Hattı 2", "Bakım Atölyesi", "Dış Saha", "Kazan Dairesi"];
const possibleDeficiencies = [
  "Fren lambası yanmıyor",
  "Yağ sızıntısı mevcut",
  "Korna çalışmıyor",
  "Lastiklerde aşınma var",
  "Acil stop butonu etiketi yok",
  "Yük diyagramı okunmuyor",
  "Kapı kildi arızalı",
  "Zincirde deformasyon",
  "Periyodik bakım etiketi eksik",
  "Akü kapağı kırık",
  "Basınç göstergesi arızalı",
  "Emniyet ventili testi başarısız",
  "Su seviye göstergesi okunmuyor"
];

// Specialized Items for new categories
const OTHER_ITEMS = {
  yangin: [
    { name: "Yangın Pompa İstasyonu Performans Test Raporu", brand: "Grundfos", place: "Pompa Odası" },
    { name: "Gazlı Yangın Söndürme Sistemi Kontrol Raporu (FM200)", brand: "Fike", place: "Server Odası" },
    { name: "Sulu Yangın Söndürme Tesisatı Kontrolü", brand: "Duyar", place: "Fabrika Geneli" },
    { name: "Yangın Dolapları ve Hidrant Hattı Muayenesi", brand: "Zeybek", place: "Dış Saha" }
  ],
  havalandirma: [
    { name: "Dövmehane Havalandırma Sistemi Periyodik Kontrolü", brand: "Systemair", place: "Dövmehane Bölümü" },
    { name: "Kalıphane Toz Toplama Sistemi Muayenesi", brand: "Bomaksan", place: "Kalıphane" },
    { name: "Ofis Bloğu Klima Santrali (AHU) Kontrol Raporu", brand: "Aldağ", place: "Ofis Çatı Katı" },
    { name: "Boya Hattı Lokal Egzoz Sistemi Kontrolü", brand: "Nederman", place: "Boya Hattı" }
  ],
  raf: [
    { name: "A-01 Sırt Sırta Raf Sistemi (5 Kompartman)", brand: "Temizel", place: "Lojistik Depo" },
    { name: "B-04 Drive-in Raf Sistemi Muayenesi", brand: "ÜÇGE", place: "Hammadde Ambarı" },
    { name: "C-12 Konsol Kollu Raf Tipi Kontrolü", brand: "Mecalux", place: "Dış Saha Sevkiyat" }
  ],
  ndt: [
    { name: "T05 Tezgah Gövdesi Kaynak NDT (MT/PT) Raporu", brand: "Magnaflux", place: "Üretim Hattı" },
    { name: "V801 Vinç Köprüsü Ana Kiriş NDT Kontrolü", brand: "Olympus", place: "Dövmehane" },
    { name: "Isıl İşlem Fırını Basınçlı Kap Kaynak NDT", brand: "General Electric", place: "Isıl İşlem" }
  ]
};

// Helper to generate mock inventory
const generateInventory = () => {
  const items = [];
  let idCounter = 1000;

  LOCATIONS.forEach(loc => {
    // 1. Regular Categories
    CATEGORIES.filter(c => !c.isFolder).forEach(cat => {
      const count = Math.floor(Math.random() * 4) + 5;
      for (let i = 0; i < count; i++) {
        const isDefective = Math.random() > 0.8;
        let deficiencies = isDefective ? [possibleDeficiencies[Math.floor(Math.random() * possibleDeficiencies.length)]] : [];

        const today = new Date();
        const controlDate = new Date(today);
        controlDate.setDate(today.getDate() - (Math.floor(Math.random() * 300) + 30));
        const nextControlDate = new Date(controlDate);
        nextControlDate.setFullYear(nextControlDate.getFullYear() + 1);

        const capacities = cat.id === 'vinc' ? ['2 Ton', '5 Ton', '10 Ton'] :
          ['buhar', 'kompresor', 'boyler', 'genlesme'].includes(cat.id) ? ['500 L', '1000 L', '2000 L'] :
            cat.id === 'forklift' ? ['1.5 Ton', '2.5 Ton', '3 Ton'] : ['-'];

        items.push({
          id: idCounter++,
          locationId: loc.id,
          categoryId: cat.id,
          reportNo: `${Math.floor(Math.random() * 90000) + 10000}/${Math.floor(Math.random() * 9000) + 1000}/${Math.floor(Math.random() * 90000) + 10000}`,
          name: `${cat.label} ${i + 1}`,
          brand: brands[Math.floor(Math.random() * brands.length)],
          serialNo: `SN-${Math.floor(Math.random() * 10000)}`,
          capacity: capacities[Math.floor(Math.random() * capacities.length)],
          place: places[Math.floor(Math.random() * places.length)],
          deficiencies: deficiencies,
          reportStatus: isDefective ? "Kusurlu" : "Uygun",
          controlDate: new Intl.DateTimeFormat('tr-TR').format(controlDate),
          nextControlDate: new Intl.DateTimeFormat('tr-TR').format(nextControlDate)
        });
      }
    });

    // 2. Sub Categories (Other)
    SUB_CATEGORIES.forEach(sub => {
      const specialItems = OTHER_ITEMS[sub.id];
      specialItems.forEach((spec, idx) => {
        const isDefective = Math.random() > 0.9;

        const today = new Date();
        const controlDate = new Date(today);
        controlDate.setDate(today.getDate() - (Math.floor(Math.random() * 200) + 50));
        const nextControlDate = new Date(controlDate);
        nextControlDate.setFullYear(nextControlDate.getFullYear() + 1);

        items.push({
          id: idCounter++,
          locationId: loc.id,
          categoryId: sub.id, // We use sub.id as categoryId for actual items
          reportNo: `${Math.floor(Math.random() * 90000) + 10000}/${Math.floor(Math.random() * 9000) + 1000}/${Math.floor(Math.random() * 90000) + 10000}`,
          name: spec.name,
          brand: spec.brand,
          serialNo: `SPEC-${sub.id.toUpperCase()}-${idx + 100}`,
          capacity: '-',
          place: spec.place,
          deficiencies: isDefective ? ["Periyodik muayene sırasında teknik uygunsuzluk tespit edildi."] : [],
          reportStatus: isDefective ? "Kusurlu" : "Uygun",
          controlDate: new Intl.DateTimeFormat('tr-TR').format(controlDate),
          nextControlDate: new Intl.DateTimeFormat('tr-TR').format(nextControlDate)
        });
      });
    });
  });

  return items;
};

export const INVENTORY = generateInventory();

// Helper to generate ARCHIVE data (Strictly Historical)
const generateArchiveData = () => {
  const archiveItems = [];
  const years = [2021, 2022, 2023, 2024];
  let idCounter = 5000;

  LOCATIONS.forEach(loc => {
    years.forEach(year => {
      const inspectionCycles = [
        { date: `12.02.${year}`, label: 'Periyodik Kontrol - 01' },
        { date: `18.10.${year}`, label: 'Periyodik Kontrol - 02' }
      ];

      inspectionCycles.forEach(cycle => {
        const archivedCategories = CATEGORIES.slice(0, 10);

        archivedCategories.forEach(cat => {
          const count = 3;
          for (let i = 0; i < count; i++) {
            const isDefective = Math.random() > 0.7;
            const deficiencies = [];

            if (isDefective) {
              const defCount = Math.floor(Math.random() * 2) + 1;
              for (let j = 0; j < defCount; j++) {
                deficiencies.push(possibleDeficiencies[Math.floor(Math.random() * possibleDeficiencies.length)]);
              }
            }

            archiveItems.push({
              id: idCounter++,
              locationId: loc.id,
              categoryId: cat.id,
              year: year,
              reportNo: `${Math.floor(Math.random() * 90000) + 10000}/${Math.floor(Math.random() * 9000) + 1000}/${Math.floor(Math.random() * 90000) + 10000}`,
              controlDate: cycle.date,
              cycleLabel: cycle.label,
              name: `${cat.label} ${i + 1}`,
              brand: brands[Math.floor(Math.random() * brands.length)],
              serialNo: `SN-${year}-${Math.floor(Math.random() * 9999)}`,
              capacity: '2.5 Ton',
              place: places[Math.floor(Math.random() * places.length)],
              deficiencies: deficiencies,
              reportStatus: isDefective ? "Kusurlu" : "Uygun",
              nextControlDate: cycle.date
            });
          }
        });
      });
    });
  });
  return archiveItems;
};

export const ARCHIVE_INVENTORY = generateArchiveData();

export const NOTIFICATIONS = [
  {
    id: 3,
    date: "03.02.2026",
    message: "İzeltaş Işıkkent adresinde forklift, vinç ve boyler periyodik kontrol sürelerinin bitimine 10 gün kalmıştır.",
    isNew: true,
    type: 'warning'
  },
  {
    id: 4,
    date: "03.02.2026",
    message: "17.01.2026 tarihinde gerçekleştirilen hava tankı, genleşme tankı periyodik kontrollerine ilişkin görüş ve önerilerinizi lütfen <a href='https://forms.gle/mmo-izeltas-anket' target='_blank' style='color: inherit; text-decoration: underline; font-weight: 700;'>anketimizde</a> belirtiniz.",
    isNew: true,
    type: 'survey'
  },
  {
    id: 5,
    date: "03.02.2026",
    message: "Önümüzdeki ay sözleşmeniz sona ermektedir. Lütfen Teknik Hizmetler ile iletişime geçiniz.",
    isNew: true,
    type: 'contract'
  },
  {
    id: 1,
    date: "02.02.2026",
    inspector: "Güray Dinsel",
    location: "İzeltaş Torbalı Fabrikası",
    message: "02.02.2026 tarihli İzeltaş Torbalı Fabrikası adresinde Güray Dinsel tarafından yapılan kontrol raporlarınıza portalda ulaşabilirsiniz.",
    isNew: true
  },
  {
    id: 2,
    date: "28.01.2026",
    inspector: "Mehmet Ali Akgül",
    location: "İzeltaş Işıkkent Fabrikası",
    message: "28.01.2026 tarihli İzeltaş Işıkkent Fabrikası adresinde Mehmet Ali Akgül tarafından yapılan kontrol raporlarınıza portalda ulaşabilirsiniz.",
    isNew: true
  }
];

export const AUTHORIZED_PERSONS = [
  { id: 1, name: "Ahmet Yılmaz", title: "Bakım Mühendisi", location: "İzeltaş Torbalı Fabrikası", department: "Bakım", gsm: "0532 123 45 67", email: "ahmet.yilmaz@izeltas.com.tr" },
  { id: 2, name: "Mustafa Demir", title: "Üretim Müdürü", location: "İzeltaş Torbalı Fabrikası", department: "Üretim", gsm: "0533 234 56 78", email: "mustafa.demir@izeltas.com.tr" },
  { id: 3, name: "Zeynep Kaya", title: "İSG Uzmanı", location: "İzeltaş Torbalı Fabrikası", department: "Teknik Emniyet / İSG", gsm: "0542 345 67 89", email: "zeynep.kaya@izeltas.com.tr" },
  { id: 4, name: "Caner Özkan", title: "Baş Mühendis", location: "İzeltaş Işıkkent Fabrikası", department: "Teknik Hizmetler", gsm: "0530 456 78 90", email: "caner.ozkan@izeltas.com.tr" },
  { id: 5, name: "Selin Yıldız", title: "İSG Teknisyeni", location: "İzeltaş Işıkkent Fabrikası", department: "Teknik Enyet / İSG", gsm: "0555 567 89 01", email: "selin.yildiz@izeltas.com.tr" },
  { id: 6, name: "Murat Şahin", title: "İdari İşler Sorumlusu", location: "İzeltaş Pınarbaşı Tesisi", department: "İdari İşler", gsm: "0544 678 90 12", email: "murat.sahin@izeltas.com.tr" },
  { id: 7, name: "Elif Aydın", title: "Satın Alma Uzmanı", location: "İzeltaş Pınarbaşı Tesisi", department: "Satın Alma", gsm: "0535 789 01 23", email: "elif.aydin@izeltas.com.tr" },
  { id: 8, name: "Hüseyin Ak", title: "Lojistik Sorumlusu", location: "İzeltaş Ankara Lojistik Merkezi", department: "Lojistik", gsm: "0532 987 65 43", email: "huseyin.ak@izeltas.com.tr" },
  { id: 9, name: "Banu Gök", title: "Teknik Servis Şefi", location: "İzeltaş OSTİM Satış ve Servis", department: "Teknik Servis", gsm: "0533 876 54 32", email: "banu.gok@izeltas.com.tr" },
  { id: 10, name: "Kemal Sun", title: "Depo Müdürü", location: "İzeltaş Dudullu Ana Depo", department: "Operasyon", gsm: "0542 765 43 21", email: "kemal.sun@izeltas.com.tr" },
  { id: 11, name: "Arzu Bulut", title: "Ar-Ge Mühendisi", location: "İzeltaş İkitelli Teknik Tesis", department: "Ür-Ge", gsm: "0530 654 32 10", email: "arzu.bulut@izeltas.com.tr" }
];

export const CONTRACTS = [
  { id: 101, contractNo: "8990123", startDate: "01.01.2026", endDate: "01.01.2027", locationId: 1, locationName: "İzeltaş Torbalı Fabrikası" },
  { id: 102, contractNo: "8990124", startDate: "15.03.2026", endDate: "15.03.2027", locationId: 2, locationName: "İzeltaş Işıkkent Fabrikası" },
  { id: 103, contractNo: "8990125", startDate: "10.06.2026", endDate: "10.06.2027", locationId: 3, locationName: "İzeltaş Pınarbaşı Tesisi" }
];

export const DEFICIENCY_STATS = [
  { label: "Bakım Eksikliği", value: 45 },
  { label: "Emniyet Kilidi Arızası", value: 25 },
  { label: "Sızıntı/Kaçak", value: 15 },
  { label: "Yük Etiketi Eksikliği", value: 10 },
  { label: "Diğer", value: 5 }
];
