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
];

const brands = ["Linde", "Cat", "Toyota", "Jungheinrich", "Komatsu", "Konecranes", "BVS", "Atlas", "Manitou"];
const places = ["Depo A", "Depo B", "Sevkiyat", "Üretim Hattı 1", "Üretim Hattı 2", "Bakım Atölyesi", "Dış Saha"];
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
  "Akü kapağı kırık"
];

// Helper to generate mock inventory
const generateInventory = () => {
  const items = [];
  let idCounter = 1000;

  LOCATIONS.forEach(loc => {
    CATEGORIES.forEach(cat => {
      // Generate 8-12 items per category per location
      const count = Math.floor(Math.random() * 5) + 8;

      for (let i = 0; i < count; i++) {
        const isDefective = Math.random() > 0.6; // 40% chance of suitable
        const hasMinorFault = Math.random() > 0.7;

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

        // Generate random control dates to simulate different countdown scenarios
        const today = new Date();
        // Randomly determine scenario: 0=normal, 1=upcoming(<10 days), 2=overdue
        const scenario = Math.random();

        let controlDate = new Date(today);
        let nextControlDate = new Date(today);

        if (scenario < 0.1) {
          // Overdue (negative)
          // Next control date was 1-30 days ago
          nextControlDate.setDate(today.getDate() - Math.floor(Math.random() * 30) - 1);
        } else if (scenario < 0.2) {
          // Upcoming (<10 days)
          const daysToAdd = Math.floor(Math.random() * 10);
          nextControlDate.setDate(today.getDate() + daysToAdd);
        } else {
          // Normal (10+ days)
          // Next control date is randomly 10 to 300 days in future
          const daysToAdd = Math.floor(Math.random() * 290) + 11;
          nextControlDate.setDate(today.getDate() + daysToAdd);
        }

        // Set controlDate to be exactly 3 months (90 days) before nextControlDate
        controlDate.setFullYear(nextControlDate.getFullYear());
        controlDate.setMonth(nextControlDate.getMonth() - 3);
        controlDate.setDate(nextControlDate.getDate());

        const formatDate = (date) => {
          return new Intl.DateTimeFormat('tr-TR').format(date);
        };

        items.push({
          id: idCounter++,
          locationId: loc.id,
          categoryId: cat.id,
          name: `${cat.label.slice(0, -1)} ${i + 1}`, // remove plural suffix roughly
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
