
import { User } from './types/user';
import { Content } from './types/content';
import { Notification } from './types/notification';
import { CustomField } from './types/customField';
import { Analytics } from './types/analytics';

export const mockUsers: User[] = [
  { id: 1, username: "jan_kowalski", email: "jan@example.com", role: "user", status: "active", joined: "2023-01-15", lastActive: "2023-06-10", verified: true, posts: 42, premium: false },
  { id: 2, username: "anna_nowak", email: "anna@example.com", role: "editor", status: "active", joined: "2023-02-20", lastActive: "2023-06-12", verified: true, posts: 28, premium: true },
  { id: 3, username: "marek_wisniewski", email: "marek@example.com", role: "user", status: "suspended", joined: "2023-03-10", lastActive: "2023-05-30", verified: false, posts: 13, premium: false },
  { id: 4, username: "katarzyna_zielinska", email: "katarzyna@example.com", role: "admin", status: "active", joined: "2023-01-05", lastActive: "2023-06-12", verified: true, posts: 64, premium: true },
  { id: 5, username: "piotr_adamski", email: "piotr@example.com", role: "user", status: "inactive", joined: "2023-04-18", lastActive: "2023-05-25", verified: true, posts: 7, premium: false },
  { id: 6, username: "maria_kowalczyk", email: "maria@example.com", role: "user", status: "active", joined: "2023-03-22", lastActive: "2023-06-11", verified: true, posts: 35, premium: false },
  { id: 7, username: "tomasz_lewandowski", email: "tomasz@example.com", role: "editor", status: "active", joined: "2023-01-30", lastActive: "2023-06-12", verified: true, posts: 51, premium: true },
  { id: 8, username: "agnieszka_wojcik", email: "agnieszka@example.com", role: "user", status: "active", joined: "2023-04-05", lastActive: "2023-06-09", verified: false, posts: 18, premium: false }
];

export const mockContent: Content[] = [
  { id: 1, title: "Nowy plac zabaw w centrum miasta", author: "Anna Nowak", status: "published", date: "2023-05-01", views: 342, likes: 28, comments: 12 },
  { id: 2, title: "Zmiana godzin otwarcia urzędu", author: "Marek Wiśniewski", status: "draft", date: "2023-05-03", views: 0, likes: 0, comments: 0 },
  { id: 3, title: "Festyn miejski - zaproszenie", author: "Katarzyna Zielińska", status: "published", date: "2023-05-02", views: 521, likes: 47, comments: 23 },
  { id: 4, title: "Konkurs fotograficzny", author: "Jan Kowalski", status: "review", date: "2023-05-04", views: 0, likes: 0, comments: 0 },
  { id: 5, title: "Remonty dróg w centrum", author: "Tomasz Lewandowski", status: "published", date: "2023-05-05", views: 198, likes: 15, comments: 8 },
  { id: 6, title: "Nowe obiekty sportowe", author: "Maria Kowalczyk", status: "draft", date: "2023-05-06", views: 0, likes: 0, comments: 0 }
];

export const mockNotifications: Notification[] = [
  { id: 1, message: "Nowy użytkownik zarejestrowany: jan_kowalski", time: "2 godziny temu", type: "info", read: false },
  { id: 2, message: "Zgłoszono nieodpowiedni komentarz w artykule 'Festyn miejski'", time: "5 godzin temu", type: "warning", read: false },
  { id: 3, message: "Błąd systemu płatności - sprawdź konfigurację", time: "1 dzień temu", type: "error", read: true },
  { id: 4, message: "Backup systemu wykonany pomyślnie", time: "2 dni temu", type: "success", read: true },
  { id: 5, message: "Nowa subskrypcja Premium: anna_nowak", time: "3 dni temu", type: "info", read: true }
];

export const initialCustomFields: CustomField[] = [
  { id: 1, name: "Telefon kontaktowy", type: "text", required: false, enabled: true, visibleToUsers: true, defaultValue: "", description: "Numer telefonu użytkownika", order: 1 },
  { id: 2, name: "Data urodzenia", type: "date", required: false, enabled: true, visibleToUsers: false, defaultValue: "", description: "Data urodzenia do weryfikacji wieku", order: 2 },
  { id: 3, name: "Zawód", type: "select", required: false, enabled: true, visibleToUsers: true, defaultValue: "Inne", description: "Zawód wykonywaczy przez użytkownika", order: 3 },
  { id: 4, name: "Zainteresowania", type: "textarea", required: false, enabled: false, visibleToUsers: true, defaultValue: "", description: "Hobby i zainteresowania", order: 4 }
];

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
