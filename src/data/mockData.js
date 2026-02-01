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
    name: "İzeltaş Torbalı Fabrikası",
    address: "7 Eylül Mah. Celal Umur Cad. No:6 Torbalı / İzmir",
    description: "Ana üretim tesisi ve dövmehane."
  },
  {
    id: 2,
    name: "İzeltaş Işıkkent Fabrikası",
    address: "Ayakkabıcılar Sitesi, Işıkkent / İzmir",
    description: "Depolama ve sevkiyat merkezi."
  },
  {
    id: 3,
    name: "İzeltaş Pınarbaşı Tesisi",
    address: "Pınarbaşı Sanayi Bölgesi / İzmir",
    description: "Isıl işlem ve kaplama tesisi."
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
  { id: 'boyler', label: "Boyler" }
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

// Helper to generate mock inventory
const generateInventory = () => {
  const items = [];
  let idCounter = 1000;

  LOCATIONS.forEach(loc => {
    CATEGORIES.forEach(cat => {
      // Generate 5-8 items per category per location
      const count = Math.floor(Math.random() * 4) + 5;

      for (let i = 0; i < count; i++) {
        const isDefective = Math.random() > 0.7; // 30% chance of defect
        const hasMinorFault = Math.random() > 0.8;

        let status = "Uygun";
        let deficiencies = [];

        if (isDefective) {
          status = "Kusurlu";
          const defCount = Math.floor(Math.random() * 3) + 1;
          for (let j = 0; j < defCount; j++) {
            deficiencies.push(possibleDeficiencies[Math.floor(Math.random() * possibleDeficiencies.length)]);
          }
        } else if (hasMinorFault) {
          status = "Hafif Kusurlu";
          deficiencies.push(possibleDeficiencies[Math.floor(Math.random() * possibleDeficiencies.length)]);
        }

        const today = new Date();
        const controlDate = new Date(today);
        const nextControlDate = new Date(today);

        // Scenario generation for Dates
        const scenario = Math.random();

        let daysAgo;
        if (scenario < 0.1) {
          // Overdue: Last control was more than 1 year ago (e.g., 380 days ago)
          daysAgo = 365 + Math.floor(Math.random() * 30) + 1;
        } else if (scenario < 0.2) {
          // Upcoming (<10 days left): Last control was almost 1 year ago (e.g., 360 days ago)
          daysAgo = 365 - Math.floor(Math.random() * 9);
        } else {
          // Normal: Last control was sometime within the last year (e.g., 10 to 300 days ago)
          daysAgo = Math.floor(Math.random() * 300) + 30;
        }

        // Set Control Date to Past
        controlDate.setDate(today.getDate() - daysAgo);

        // Set Next Control Date to exactly 1 year after Control Date
        nextControlDate.setTime(controlDate.getTime());
        nextControlDate.setFullYear(nextControlDate.getFullYear() + 1);

        const formatDate = (date) => {
          return new Intl.DateTimeFormat('tr-TR').format(date);
        };

        items.push({
          id: idCounter++,
          locationId: loc.id,
          categoryId: cat.id,
          name: `${cat.label} ${i + 1}`,
          brand: brands[Math.floor(Math.random() * brands.length)],
          serialNo: `SN-${Math.floor(Math.random() * 10000)}`,
          place: places[Math.floor(Math.random() * places.length)],
          deficiencies: deficiencies,
          reportStatus: status,
          controlDate: formatDate(controlDate),
          nextControlDate: formatDate(nextControlDate)
        });
      }
    });
  });

  return items;
};

export const INVENTORY = generateInventory();
