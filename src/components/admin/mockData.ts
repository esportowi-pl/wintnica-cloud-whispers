
import { User } from './types/user';
import { Content } from './types/content';
import { Notification } from './types/notification';
import { CustomField } from './types/customField';
import { Analytics } from './types/analytics';

// Mock users data
export const mockUsers: User[] = [
  { id: 1, username: "jan_kowalski", email: "jan@example.com", role: "user", status: "active", joined: "2023-01-15", lastActive: "2023-06-10", verified: true, posts: 42, premium: false },
  { id: 2, username: "anna_nowak", email: "anna@example.com", role: "editor", status: "active", joined: "2023-02-20", lastActive: "2023-06-12", verified: true, posts: 28, premium: true },
  { id: 3, username: "marek_wisniewski", email: "marek@example.com", role: "user", status: "suspended", joined: "2023-03-10", lastActive: "2023-05-30", verified: false, posts: 13, premium: false },
  { id: 4, username: "katarzyna_zielinska", email: "katarzyna@example.com", role: "admin", status: "active", joined: "2023-01-05", lastActive: "2023-06-12", verified: true, posts: 64, premium: true },
  { id: 5, username: "piotr_adamski", email: "piotr@example.com", role: "user", status: "inactive", joined: "2023-04-18", lastActive: "2023-05-25", verified: true, posts: 7, premium: false },
  { id: 6, username: "aleksandra_kowal", email: "aleksandra@example.com", role: "user", status: "active", joined: "2023-05-01", lastActive: "2023-06-11", verified: true, posts: 19, premium: false },
  { id: 7, username: "tomasz_lis", email: "tomasz@example.com", role: "editor", status: "active", joined: "2023-03-22", lastActive: "2023-06-10", verified: true, posts: 31, premium: true },
  { id: 8, username: "monika_kaczmarek", email: "monika@example.com", role: "user", status: "active", joined: "2023-05-10", lastActive: "2023-06-05", verified: false, posts: 4, premium: false }
];

// Mock content data
export const mockContent: Content[] = [
  { id: 1, title: "Nowy plac zabaw", author: "Anna Nowak", status: "published", date: "2023-05-01", views: 342, likes: 28, comments: 12 },
  { id: 2, title: "Zmiana godzin otwarcia urzędu", author: "Marek Wiśniewski", status: "draft", date: "2023-05-03", views: 0, likes: 0, comments: 0 },
  { id: 3, title: "Festyn miejski - zaproszenie", author: "Katarzyna Zielińska", status: "published", date: "2023-05-02", views: 521, likes: 47, comments: 23 },
  { id: 4, title: "Konkurs fotograficzny", author: "Jan Kowalski", status: "review", date: "2023-05-04", views: 0, likes: 0, comments: 0 },
  { id: 5, title: "Historia Witnicy - część 1", author: "Piotr Adamski", status: "published", date: "2023-04-28", views: 256, likes: 31, comments: 14 },
  { id: 6, title: "Nowa ścieżka rowerowa", author: "Aleksandra Kowal", status: "published", date: "2023-05-06", views: 189, likes: 17, comments: 5 },
  { id: 7, title: "Wywiad z burmistrzem", author: "Tomasz Lis", status: "review", date: "2023-05-07", views: 0, likes: 0, comments: 0 },
  { id: 8, title: "Przepisy kulinarne z Witnicy", author: "Monika Kaczmarek", status: "draft", date: "2023-05-08", views: 0, likes: 0, comments: 0 }
];

// Mock notifications
export const mockNotifications: Notification[] = [
  { id: 1, message: "Nowy użytkownik zarejestrowany", time: "2 godziny temu", type: "info", read: false },
  { id: 2, message: "Zgłoszono nieodpowiedni komentarz", time: "5 godzin temu", type: "warning", read: false },
  { id: 3, message: "Awaria systemu płatności", time: "1 dzień temu", type: "error", read: true },
  { id: 4, message: "Sukces - backup systemu wykonany", time: "2 dni temu", type: "success", read: true },
  { id: 5, message: "Tomasz Lis przesłał nowy artykuł do recenzji", time: "3 godziny temu", type: "info", read: false },
  { id: 6, message: "Jan Kowalski zgłosił problem techniczny", time: "1 dzień temu", type: "warning", read: true },
  { id: 7, message: "10 nowych rejestracji w ciągu ostatnich 24 godzin", time: "1 dzień temu", type: "success", read: false },
  { id: 8, message: "Nowa recenzja platformy w serwisie zewnętrznym", time: "3 dni temu", type: "info", read: true }
];

// Initial custom fields
export const initialCustomFields: CustomField[] = [
  { id: 1, name: "Wiek", type: "number", required: true, enabled: true, visibleToUsers: true, defaultValue: "", description: "Wiek użytkownika", order: 1 },
  { id: 2, name: "Zawód", type: "text", required: false, enabled: true, visibleToUsers: true, defaultValue: "", description: "Profesja użytkownika", order: 2 },
  { id: 3, name: "Ulubiona restauracja", type: "text", required: false, enabled: true, visibleToUsers: true, defaultValue: "", description: "Ulubiona restauracja w Witnicy", order: 3 },
  { id: 4, name: "Ulubione miejsce w Witnicy", type: "text", required: false, enabled: true, visibleToUsers: true, defaultValue: "Park Miejski", description: "Miejsce, które użytkownik lubi najbardziej", order: 4 },
  { id: 5, name: "Hobby", type: "textarea", required: false, enabled: true, visibleToUsers: true, defaultValue: "", description: "Hobby i zainteresowania", order: 5 }
];

// Mock analytics data
export const mockAnalytics: Analytics = {
  usersTotal: 1248,
  usersTrend: "+12%",
  activeToday: 387,
  activeTodayTrend: "+5%",
  newLast7Days: 63,
  newLast7DaysTrend: "+28%",
  contentTotal: 842,
  contentTrend: "+8%",
  viewsToday: 1856,
  viewsTrend: "+15%",
  commentsToday: 126,
  commentsTrend: "-3%"
};
