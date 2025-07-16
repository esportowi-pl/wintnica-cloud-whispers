
import { DesktopApp } from "./components/desktop/types";
import WitWord from "./pages/WitWord";
import WitSheets from "./pages/WitSheets";
import WitPaint from "./pages/WitPaint";
import WitCode from "./pages/WitCode";
import WitPhotoShop from "./pages/WitPhotoShop";
import WitSlides from "./pages/WitSlides";
import WitNotes from "./pages/WitNotes";
import WitMail from "./pages/WitMail";
import WitGames from "./pages/WitGames";
import WitCAD from "./pages/WitCAD";
import WitVideo from "./pages/WitVideo";
import WitAudio from "./pages/WitAudio";
import WitCommand from "./pages/WitCommand";
import WitDB from "./pages/WitDB";
import WitFTP from "./pages/WitFTP";
import WitStream from "./pages/WitStream";
import Explorer from "./components/desktop/apps/Explorer";
import RecycleBin from "./components/desktop/apps/RecycleBin";
import WidgetManager from "./components/desktop/WidgetManager";
import CywilizacjaWitnicaPage from "./pages/CywilizacjaWitnicaPage";

export const navItems = [
  {
    title: "WitWord",
    to: "/witword",
    icon: "file-text",
    page: <WitWord />,
  },
  {
    title: "WitSheets",
    to: "/witsheets",
    icon: "table",
    page: <WitSheets />,
  },
  {
    title: "WitPaint",
    to: "/witpaint",
    icon: "image",
    page: <WitPaint />,
  },
  {
    title: "WitCode",
    to: "/witcode",
    icon: "code",
    page: <WitCode />,
  },
  {
    title: "WitPhotoShop",
    to: "/witphotoshop",
    icon: "camera",
    page: <WitPhotoShop />,
  },
  {
    title: "WitSlides",
    to: "/witslides",
    icon: "presentation",
    page: <WitSlides />,
  },
  {
    title: "WitNotes",
    to: "/witnotes",
    icon: "book",
    page: <WitNotes />,
  },
  {
    title: "WitMail",
    to: "/witmail",
    icon: "mail",
    page: <WitMail />,
  },
  {
    title: "WitGames",
    to: "/witgames",
    icon: "gamepad",
    page: <WitGames />,
  },
  {
    title: "WitCAD",
    to: "/witcad",
    icon: "cube",
    page: <WitCAD />,
  },
  {
    title: "WitVideo",
    to: "/witvideo",
    icon: "video",
    page: <WitVideo />,
  },
  {
    title: "WitAudio",
    to: "/witaudio",
    icon: "music",
    page: <WitAudio />,
  },
  {
    title: "WITNICA Command Center",
    to: "/witcommand",
    icon: "terminal",
    page: <WitCommand />,
  },
  {
    title: "WitDB",
    to: "/witdb",
    icon: "database",
    page: <WitDB />,
  },
  {
    title: "WitFTP",
    to: "/witftp",
    icon: "upload-cloud",
    page: <WitFTP />,
  },
  {
    title: "WitStream",
    to: "/witstream",
    icon: "cast",
    page: <WitStream />,
  },
  {
    title: "Eksplorator plików",
    to: "/explorer",
    icon: "folder",
    page: <Explorer />,
  },
  {
    title: "Kosz",
    to: "/recycle",
    icon: "trash",
    page: <RecycleBin />,
  },
  {
    title: "Menedżer Widgetów",
    to: "/widget-manager",
    icon: "grid",
    page: <WidgetManager />,
  },
  {
    title: "Cywilizacja Witnica",
    to: "/cywilizacja-witnica",
    icon: "crown",
    page: <CywilizacjaWitnicaPage />,
  },
];
