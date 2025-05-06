
// Mock Users
export const mockUsers = [
  {
    id: 1,
    name: 'Jan Kowalski',
    email: 'jan@witnicy.info',
    avatar: '/placeholder.svg',
    role: 'admin',
    shards: 238,
    isPremium: true,
    premiumUntil: '2023-12-31',
    badges: ['Lokalny Reporter', 'Miejski Obserwator'],
    registeredAt: '2022-01-15'
  },
  {
    id: 2,
    name: 'Anna Nowak',
    email: 'anna@witnicy.info',
    avatar: '/placeholder.svg',
    role: 'editor',
    shards: 142,
    isPremium: true,
    premiumUntil: '2023-11-15',
    badges: ['Ekspert Witnicy'],
    registeredAt: '2022-02-20'
  },
  {
    id: 3,
    name: 'Piotr Wiśniewski',
    email: 'piotr@witnicy.info',
    avatar: '/placeholder.svg',
    role: 'user',
    shards: 67,
    isPremium: false,
    premiumUntil: null,
    badges: [],
    registeredAt: '2022-03-10'
  }
];

// Mock Articles
export const mockArticles = [
  {
    id: 1,
    title: "Nowy park w centrum Witnicy już otwarty!",
    content: "Mieszkańcy Witnicy od dziś mogą korzystać z nowo otwartego parku w centrum miasta. Inwestycja, która trwała ponad rok, wreszcie dobiegła końca.\n\nPark wyposażony jest w nowoczesne place zabaw, ścieżki rowerowe oraz fontannę. Burmistrz miasta podkreśla, że jest to jedna z najważniejszych inwestycji ostatnich lat mająca na celu poprawę jakości życia mieszkańców.",
    excerpt: "Mieszkańcy mogą już korzystać z odnowionego parku miejskiego w centrum Witnicy.",
    image: "/placeholder.svg",
    category: "Wydarzenia",
    tags: ["park", "inwestycje", "rekreacja"],
    author: {
      id: 1,
      name: "Jan Kowalski"
    },
    publishedAt: "2023-05-01T12:00:00Z",
    isPremium: false,
    views: 246,
    likes: 42,
    comments: 15
  },
  {
    id: 2,
    title: "Wyniki lokalnych zawodów sportowych",
    content: "Reprezentacja Witnicy zdobyła pierwsze miejsce w wojewódzkich zawodach lekkoatletycznych. Nasi sportowcy pokazali wyjątkową formę, zdobywając łącznie 12 medali.\n\nSzczególne wyróżnienie należy się drużynie młodzieżowej, która zdominowała konkurencje biegowe. Trener podkreśla, że to efekt ciężkiej pracy na treningach przez ostatnie miesiące.",
    excerpt: "Reprezentacja Witnicy zdobyła pierwsze miejsce w wojewódzkich zawodach.",
    image: "/placeholder.svg",
    category: "Sport",
    tags: ["sport", "zawody", "lekkoatletyka"],
    author: {
      id: 2,
      name: "Anna Nowak"
    },
    publishedAt: "2023-05-02T14:30:00Z",
    isPremium: false,
    views: 128,
    likes: 18,
    comments: 5
  },
  {
    id: 3,
    title: "Nowa inwestycja w strefie przemysłowej",
    content: "Niemiecka firma produkcyjna zdecydowała o otwarciu nowego zakładu w strefie przemysłowej Witnicy. Inwestycja warta ponad 20 milionów euro pozwoli na stworzenie około 200 nowych miejsc pracy dla mieszkańców regionu.\n\nBurmistrz miasta nie kryje zadowolenia z tej decyzji, podkreślając, że to ogromny sukces dla lokalnej gospodarki. Rekrutacja pracowników ma rozpocząć się już w przyszłym miesiącu.",
    excerpt: "Niemiecka firma otworzy fabrykę w Witnicy. Powstanie 200 miejsc pracy.",
    image: "/placeholder.svg",
    category: "Biznes",
    tags: ["biznes", "inwestycje", "praca", "gospodarka"],
    author: {
      id: 1,
      name: "Jan Kowalski"
    },
    publishedAt: "2023-05-03T09:15:00Z",
    isPremium: true,
    views: 422,
    likes: 56,
    comments: 23
  }
];

// Mock Comments
export const mockComments = [
  {
    id: 1,
    articleId: 1,
    userId: 2,
    author: "Anna Nowak",
    avatar: "/placeholder.svg",
    content: "Świetna wiadomość dla mieszkańców! Już nie mogę się doczekać, żeby odwiedzić nowy park z rodziną.",
    createdAt: "2023-05-01T14:25:00Z",
    likes: 8
  },
  {
    id: 2,
    articleId: 1,
    userId: 3,
    author: "Piotr Wiśniewski",
    avatar: "/placeholder.svg",
    content: "Byłem tam dziś rano, faktycznie robi wrażenie. Szczególnie fontanna jest piękna.",
    createdAt: "2023-05-01T16:30:00Z",
    likes: 4
  },
  {
    id: 3,
    articleId: 3,
    userId: 2,
    author: "Anna Nowak",
    avatar: "/placeholder.svg",
    content: "Świetna wiadomość dla naszego miasta! Mam nadzieję, że będą dobre warunki zatrudnienia.",
    createdAt: "2023-05-03T11:45:00Z",
    likes: 12
  }
];

// Mock Events
export const mockEvents = [
  {
    id: 1,
    title: "Festiwal Kultury Lokalnej",
    description: "Trzydniowy festiwal prezentujący lokalnych artystów, rzemieślników i twórców. W programie koncerty, warsztaty, wystawy i degustacje regionalnych potraw.",
    image: "/placeholder.svg",
    location: "Rynek Miejski, Witnica",
    startDate: "2023-06-15T10:00:00Z",
    endDate: "2023-06-17T22:00:00Z",
    organizer: "Witnickie Centrum Kultury",
    category: "Kultura",
    isFree: true
  },
  {
    id: 2,
    title: "Zawody Wędkarskie o Puchar Burmistrza",
    description: "Coroczne zawody wędkarskie na jeziorze miejskim. Liczne nagrody dla zwycięzców w różnych kategoriach.",
    image: "/placeholder.svg",
    location: "Jezioro Miejskie, Witnica",
    startDate: "2023-06-10T06:00:00Z",
    endDate: "2023-06-10T18:00:00Z",
    organizer: "Koło Wędkarskie 'Szczupak'",
    category: "Sport",
    isFree: false,
    price: "25 zł"
  },
  {
    id: 3,
    title: "Spotkanie z Burmistrzem",
    description: "Otwarte spotkanie z burmistrzem miasta. Okazja do zadawania pytań, zgłaszania problemów i dyskusji o przyszłości Witnicy.",
    image: "/placeholder.svg",
    location: "Urząd Miasta, Witnica",
    startDate: "2023-05-25T17:00:00Z",
    endDate: "2023-05-25T19:00:00Z",
    organizer: "Urząd Miasta Witnica",
    category: "Społeczność",
    isFree: true
  }
];

// Mock Classifieds (Ogłoszenia)
export const mockClassifieds = [
  {
    id: 1,
    title: "Sprzedam mieszkanie 3 pokoje, 65m²",
    description: "Przestronne mieszkanie w centrum Witnicy. 3 pokoje, kuchnia, łazienka. Po generalnym remoncie. Niskie opłaty eksploatacyjne.",
    price: 320000,
    images: ["/placeholder.svg", "/placeholder.svg"],
    category: "Nieruchomości",
    location: "Witnica, ul. Kwiatowa",
    contactPhone: "+48 123 456 789",
    author: {
      id: 3,
      name: "Piotr Wiśniewski"
    },
    createdAt: "2023-04-28T10:15:00Z",
    expiresAt: "2023-05-28T10:15:00Z",
    isPremium: true
  },
  {
    id: 2,
    title: "Dam pracę - Kelner/Kelnerka",
    description: "Restauracja 'Pod Dębem' zatrudni kelnera lub kelnerkę. Oferujemy atrakcyjne wynagrodzenie, elastyczne godziny pracy, przyjazną atmosferę.",
    price: null,
    images: ["/placeholder.svg"],
    category: "Praca",
    location: "Witnica, ul. Główna 12",
    contactEmail: "restauracja@poddebem.pl",
    author: {
      id: 2,
      name: "Anna Nowak"
    },
    createdAt: "2023-05-01T08:30:00Z",
    expiresAt: "2023-06-01T08:30:00Z",
    isPremium: false
  },
  {
    id: 3,
    title: "Korepetycje z matematyki",
    description: "Udzielam korepetycji z matematyki dla uczniów szkoły podstawowej i średniej. Przygotowanie do egzaminów. Doświadczony nauczyciel.",
    price: 60,
    priceUnit: "za godzinę",
    images: [],
    category: "Usługi",
    location: "Witnica i okolice",
    contactPhone: "+48 555 123 456",
    author: {
      id: 1,
      name: "Jan Kowalski"
    },
    createdAt: "2023-04-15T16:45:00Z",
    expiresAt: "2023-06-15T16:45:00Z",
    isPremium: false
  }
];

// Mock Shards Transactions
export const mockShardsTransactions = [
  {
    id: 1,
    userId: 1,
    type: 'earning',
    amount: 25,
    description: 'Zarobek za artykuł "Nowy park w centrum Witnicy"',
    source: 'article',
    sourceId: 1,
    createdAt: "2023-05-01T14:00:00Z"
  },
  {
    id: 2,
    userId: 1,
    type: 'purchase',
    amount: -50,
    description: 'Zakup odznaki "Ekspert lokalny"',
    source: 'badge',
    sourceId: 'b2',
    createdAt: "2023-04-28T11:30:00Z"
  },
  {
    id: 3,
    userId: 1,
    type: 'earning',
    amount: 10,
    description: 'Dzienna misja: Dodaj 3 komentarze',
    source: 'mission',
    sourceId: 'm1',
    createdAt: "2023-04-27T20:15:00Z"
  },
  {
    id: 4,
    userId: 1,
    type: 'earning',
    amount: 15,
    description: 'Like dla artykułu "Wyniki lokalnych zawodów"',
    source: 'like',
    sourceId: 2,
    createdAt: "2023-04-25T09:45:00Z"
  }
];

// Mock Missions
export const mockMissions = [
  {
    id: 'm1',
    title: 'Dodaj 3 komentarze',
    description: 'Skomentuj 3 różne artykuły',
    reward: 10,
    type: 'daily',
    requirements: {
      type: 'comments',
      count: 3
    },
    isComplete: true
  },
  {
    id: 'm2',
    title: 'Opublikuj artykuł',
    description: 'Napisz i opublikuj nowy artykuł',
    reward: 25,
    type: 'weekly',
    requirements: {
      type: 'content',
      count: 1
    },
    isComplete: false,
    progress: 0
  },
  {
    id: 'm3',
    title: 'Loguj się przez 7 dni',
    description: 'Loguj się codziennie przez 7 dni z rzędu',
    reward: 20,
    type: 'streak',
    requirements: {
      type: 'login',
      count: 7
    },
    isComplete: false,
    progress: 5
  }
];

// App settings and configuration
export const appConfig = {
  pointsSettings: {
    articleView: 0.1,
    articleLike: 1,
    articleComment: 2,
    commentLike: 0.5,
    publishArticle: 10,
    dailyLogin: 1,
    premiumArticle: 25
  },
  subscriptionTiers: {
    basic: {
      name: 'Podstawowy',
      price: 0,
      features: [
        'Czytanie treści publicznych',
        'Dodawanie komentarzy',
        'Udział w dyskusjach',
        'Podstawowe statystyki'
      ]
    },
    premium: {
      name: 'Premium',
      price: 19.99,
      features: [
        'Wszystko z planu Podstawowego',
        'Dostęp do treści Premium',
        'Tworzenie własnych artykułów',
        'Zarabianie shardów za treści',
        'Odznaki i osiągnięcia',
        'Szczegółowa analityka treści',
        'Priorytetowe wsparcie'
      ]
    },
    business: {
      name: 'Business',
      price: 49.99,
      features: [
        'Wszystko z planu Premium',
        'Własny profil biznesowy',
        'Publikacje bez limitu',
        'Reklama w serwisie',
        'Dostęp do API',
        'Wsparcie priorytetowe 24/7',
        'Niestandardowe odznaki'
      ]
    }
  }
};
