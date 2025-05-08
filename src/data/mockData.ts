
// User data
export const mockUsers = [
  { id: 1, username: "jan_kowalski", email: "jan@example.com", role: "user", status: "active", joined: "2023-01-15" },
  { id: 2, username: "anna_nowak", email: "anna@example.com", role: "editor", status: "active", joined: "2023-02-20" },
  { id: 3, username: "marek_wisniewski", email: "marek@example.com", role: "user", status: "suspended", joined: "2023-03-10" },
  { id: 4, username: "katarzyna_zielinska", email: "katarzyna@example.com", role: "admin", status: "active", joined: "2023-01-05" },
  { id: 5, username: "piotr_adamski", email: "piotr@example.com", role: "user", status: "inactive", joined: "2023-04-18" },
];

// Content data
export const mockContent = [
  {
    id: 1,
    title: "Nowy park w centrum Witnicy już otwarty!",
    status: "published",
    visibility: "public",
    date: "2023-05-01",
    category: "Wydarzenia",
    views: 246,
    author: "Anna Nowak"
  },
  {
    id: 2,
    title: "Wyniki lokalnych zawodów sportowych",
    status: "published",
    visibility: "public",
    date: "2023-05-02",
    category: "Sport",
    views: 128,
    author: "Marek Wiśniewski"
  },
  {
    id: 3,
    title: "Nowa inwestycja w strefie przemysłowej",
    status: "published",
    visibility: "premium",
    date: "2023-05-03",
    category: "Biznes",
    views: 422,
    author: "Katarzyna Zielińska"
  },
  {
    id: 4,
    title: "Festiwal Kultury już w przyszły weekend",
    status: "draft",
    visibility: "public",
    date: "2023-05-04",
    category: "Kultura",
    views: 0,
    author: "Jan Kowalski"
  },
  {
    id: 5,
    title: "Aktualizacja planu rozwoju miasta",
    status: "published",
    visibility: "premium",
    date: "2023-05-05",
    category: "Newsy",
    views: 187,
    author: "Piotr Adamski"
  },
  {
    id: 6,
    title: "Wywiad z burmistrzem Witnicy",
    status: "draft",
    visibility: "private",
    date: "2023-05-06",
    category: "Polityka",
    views: 0,
    author: "Anna Nowak"
  },
  {
    id: 7,
    title: "Historia miasta w pigułce",
    status: "published",
    visibility: "public",
    date: "2023-05-07",
    category: "Historia",
    views: 95,
    author: "Marek Wiśniewski"
  }
];

// Notifications data
export const mockNotifications = [
  { id: 1, message: "Nowy użytkownik zarejestrowany", time: "2 godziny temu", type: "info" },
  { id: 2, message: "Zgłoszono nieodpowiedni komentarz", time: "5 godzin temu", type: "warning" },
  { id: 3, message: "Awaria systemu płatności", time: "1 dzień temu", type: "error" },
  { id: 4, message: "Sukces - backup systemu wykonany", time: "2 dni temu", type: "success" },
];

// Market products data
export const mockProducts = [
  {
    id: 1,
    title: "Rower górski Trek",
    description: "Sprzedam rower górski marki Trek, model XYZ, używany przez 2 lata. Stan bardzo dobry, wszystko działa jak należy.",
    price: "800 zł",
    category: "sport",
    type: "sprzedam",
    location: "Witnica, ul. Sportowa",
    author: "Jan Kowalski",
    authorId: 1,
    authorInitials: "JK",
    date: "2023-05-02",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=300&auto=format&fit=crop",
    views: 123,
    likes: 8,
    messages: 3
  },
  {
    id: 2,
    title: "Oddam za darmo meble ogrodowe",
    description: "Oddam za darmo zestaw mebli ogrodowych (stół + 4 krzesła). Do odbioru osobistego w Witnicy.",
    category: "dom",
    type: "oddam",
    location: "Witnica, os. Słoneczne",
    author: "Anna Nowak",
    authorId: 2,
    authorInitials: "AN",
    date: "2023-05-03",
    image: "https://images.unsplash.com/photo-1533127321739-d5dc53c221c8?q=80&w=300&auto=format&fit=crop",
    views: 210,
    likes: 15,
    messages: 7
  },
  {
    id: 3,
    title: "Zamienię konsolę Xbox na PlayStation",
    description: "Mam konsolę Xbox One, stan idealny. Chętnie zamienię na PlayStation 4 lub 5 z ewentualną dopłatą.",
    category: "elektronika",
    type: "zamienie",
    location: "Witnica, ul. Gorzowska",
    author: "Piotr Wiśniewski",
    authorId: 3,
    authorInitials: "PW",
    date: "2023-05-04",
    views: 87,
    likes: 2,
    messages: 4
  },
  {
    id: 4,
    title: "Kurtka zimowa, rozmiar L",
    description: "Sprzedam kurtkę zimową, kolor czarny, rozmiar L, firmy XYZ. Noszona przez jeden sezon.",
    price: "150 zł",
    category: "moda",
    type: "sprzedam",
    location: "Witnica, ul. Kwiatowa",
    author: "Katarzyna Zielińska",
    authorId: 4,
    authorInitials: "KZ",
    date: "2023-05-05",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=300&auto=format&fit=crop",
    views: 65,
    likes: 3,
    messages: 1
  },
  {
    id: 5,
    title: "Kupię tanio kosiarkę elektryczną",
    description: "Kupię używaną kosiarkę elektryczną w dobrym stanie, najlepiej z koszem na trawę.",
    category: "dom",
    type: "kupie",
    location: "Witnica",
    author: "Marek Adamski",
    authorId: 5,
    authorInitials: "MA",
    date: "2023-05-06",
    views: 42,
    likes: 0,
    messages: 2
  },
  {
    id: 6,
    title: "Oddam kocięta do dobrego domu",
    description: "Oddam trzy małe kocięta (2 miesięczne) do dobrego domu. Kocięta są odrobaczone i zdrowe.",
    category: "zwierzeta",
    type: "oddam",
    location: "Witnica, ul. Polna",
    author: "Magdalena K.",
    authorId: 6,
    authorInitials: "MK",
    date: "2023-05-07",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=300&auto=format&fit=crop",
    views: 312,
    likes: 28,
    messages: 15
  }
];

// Local groups data
export const mockGroups = [
  {
    id: 1,
    name: "Klub rowerowy Witnica",
    description: "Grupa dla miłośników rowerów. Wspólne wyprawy, porady i dyskusje.",
    members: 45,
    category: "Sport",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=300&auto=format&fit=crop",
    isJoined: true,
    createdAt: "2023-01-10",
    lastActivity: "2023-05-07"
  },
  {
    id: 2,
    name: "Rodzice Szkoły Podstawowej",
    description: "Grupa dla rodziców dzieci uczęszczających do SP w Witnicy.",
    members: 87,
    category: "Edukacja",
    createdAt: "2022-09-01",
    lastActivity: "2023-05-08"
  },
  {
    id: 3,
    name: "Miłośnicy ogrodnictwa",
    description: "Wspólne porady, wymiana sadzonek i dyskusje o ogrodnictwie.",
    members: 32,
    category: "Hobby",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=300&auto=format&fit=crop",
    createdAt: "2022-11-15",
    lastActivity: "2023-05-05"
  },
  {
    id: 4,
    name: "Sąsiedzka pomoc",
    description: "Grupa wsparcia i pomocy sąsiedzkiej dla mieszkańców Witnicy.",
    members: 56,
    category: "Społeczność",
    isJoined: true,
    createdAt: "2022-12-20",
    lastActivity: "2023-05-08"
  },
  {
    id: 5,
    name: "Zwierzaki Witnicy",
    description: "Grupa dla właścicieli zwierząt, porady, zdjęcia i wsparcie.",
    members: 38,
    category: "Zwierzęta",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=300&auto=format&fit=crop",
    createdAt: "2023-02-05",
    lastActivity: "2023-05-06"
  }
];

// Weekly news/gazette articles
export const mockGazetteArticles = [
  {
    id: 1,
    title: "Nowa inicjatywa miejska: Więcej zieleni w centrum",
    content: "Burmistrz Witnicy ogłosił nową inicjatywę zazieleniania centrum miasta. W ramach projektu posadzonych zostanie ponad 100 nowych drzew i utworzonych kilka mikroparków.",
    excerpt: "Więcej drzew i mikroparki w centrum Witnicy już wkrótce.",
    imageUrl: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?q=80&w=500&auto=format&fit=crop",
    author: "Jan Kowalski",
    date: "2023-05-07",
    category: "Środowisko",
    featured: true
  },
  {
    id: 2,
    title: "Wyniki konkursu 'Witnica w obiektywie'",
    content: "Rozstrzygnięto doroczny konkurs fotograficzny 'Witnica w obiektywie'. Główną nagrodę zdobyło zdjęcie wschodu słońca nad jeziorem miejskim autorstwa Anny Nowak.",
    excerpt: "Anna Nowak zdobyła główną nagrodę w konkursie fotograficznym.",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop",
    author: "Piotr Adamski",
    date: "2023-05-06",
    category: "Kultura"
  },
  {
    id: 3,
    title: "Harmonogram wydarzeń letnich - co nas czeka?",
    content: "Przedstawiamy szczegółowy harmonogram wydarzeń na nadchodzące lato w Witnicy. Wśród atrakcji koncerty, festyny, zawody sportowe i wiele innych.",
    excerpt: "Sprawdź co będzie się działo w Witnicy tego lata.",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop",
    author: "Katarzyna Zielińska",
    date: "2023-05-05",
    category: "Wydarzenia"
  },
  {
    id: 4,
    title: "Lokalny rzemieślnik tworzy unikatowe meble z recyklingu",
    content: "Marek Wiśniewski z Witnicy zyskał ogólnokrajowe uznanie za swoje unikatowe meble tworzone z materiałów z recyklingu. Jego prace można oglądać w galerii miejskiej.",
    excerpt: "Meble z recyklingu lokalnego rzemieślnika docenione w całym kraju.",
    imageUrl: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=500&auto=format&fit=crop",
    author: "Anna Nowak",
    date: "2023-05-04",
    category: "Ludzie",
    handmade: true
  },
  {
    id: 5,
    title: "Sukces uczniów Szkoły Podstawowej w olimpiadzie matematycznej",
    content: "Uczniowie Szkoły Podstawowej w Witnicy zajęli trzecie miejsce w wojewódzkiej olimpiadzie matematycznej. To najlepszy wynik w historii szkoły.",
    excerpt: "Młodzi matematycy z Witnicy na podium wojewódzkim.",
    imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=500&auto=format&fit=crop",
    author: "Piotr Adamski",
    date: "2023-05-03",
    category: "Edukacja"
  }
];

// Handmade items for showcase
export const mockHandmadeItems = [
  {
    id: 1,
    title: "Ręcznie robione świece sojowe",
    creator: "Anna Kowalska",
    description: "Ekologiczne świece z wosku sojowego z naturalnymi zapachami ziół i kwiatów.",
    imageUrl: "https://images.unsplash.com/photo-1603006905393-ee3b98704703?q=80&w=500&auto=format&fit=crop",
    category: "Dom",
    contactInfo: "anna@example.com"
  },
  {
    id: 2,
    title: "Ceramiczna zastawa stołowa",
    creator: "Marek Nowak",
    description: "Ręcznie toczone i malowane talerze, miseczki i kubki z lokalnej gliny.",
    imageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=500&auto=format&fit=crop",
    category: "Kuchnia",
    contactInfo: "marek@example.com"
  },
  {
    id: 3,
    title: "Biżuteria z leśnych żywic",
    creator: "Katarzyna Adamska",
    description: "Unikatowa biżuteria tworzona z żywic zbieranych w okolicznych lasach, z zatopionymi elementami natury.",
    imageUrl: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?q=80&w=500&auto=format&fit=crop",
    category: "Biżuteria",
    contactInfo: "katarzyna@example.com"
  },
  {
    id: 4,
    title: "Drewniane zabawki edukacyjne",
    creator: "Piotr Wiśniewski",
    description: "Ekologiczne zabawki dla dzieci wykonane z drewna z lokalnych lasów, malowane bezpiecznymi farbami.",
    imageUrl: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=500&auto=format&fit=crop",
    category: "Dzieci",
    contactInfo: "piotr@example.com"
  }
];
