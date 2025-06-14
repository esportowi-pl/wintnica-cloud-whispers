
import React from 'react';
import WitWord from '../apps/WitWord';
import WitSheets from '../apps/WitSheets';
import WitPaint from '../apps/WitPaint';
import WitCode from '../apps/WitCode';
import WitGames from '../apps/WitGames';
import WitMail from '../apps/WitMail';
import WitPhotoShop from '../apps/WitPhotoShop';
import WitSlides from '../apps/WitSlides';
import WitNotes from '../apps/WitNotes';
import WitCAD from '../apps/WitCAD';
import WitVideo from '../apps/WitVideo';
import WitAudio from '../apps/WitAudio';
import WitCommandCenter from '../apps/WitCommandCenter';

export const createAppComponent = (appId: string): { component: React.ReactNode; size: { width: number; height: number } } => {
  switch (appId) {
    case 'witword':
      return { component: <WitWord />, size: { width: 1000, height: 700 } };
    case 'witsheets':
      return { component: <WitSheets />, size: { width: 1200, height: 800 } };
    case 'witslides':
      return { component: <WitSlides />, size: { width: 1200, height: 800 } };
    case 'witpaint':
      return { component: <WitPaint />, size: { width: 1000, height: 700 } };
    case 'witphotoshop':
      return { component: <WitPhotoShop />, size: { width: 1400, height: 900 } };
    case 'witcode':
      return { component: <WitCode />, size: { width: 1200, height: 800 } };
    case 'witnotes':
      return { component: <WitNotes />, size: { width: 1100, height: 750 } };
    case 'witgames':
      return { component: <WitGames />, size: { width: 800, height: 600 } };
    case 'witmail':
      return { component: <WitMail />, size: { width: 1000, height: 700 } };
    case 'witcad':
      return { component: <WitCAD />, size: { width: 1300, height: 800 } };
    case 'witvideo':
      return { component: <WitVideo />, size: { width: 1400, height: 900 } };
    case 'witaudio':
      return { component: <WitAudio />, size: { width: 1300, height: 800 } };
    case 'witcommand':
      return { component: <WitCommandCenter />, size: { width: 1400, height: 900 } };
    case 'witdb':
      return { 
        component: <div className="p-8 text-center"><h2 className="text-2xl font-bold mb-4">WitDB</h2><p>Menedżer baz danych - W przygotowaniu</p></div>, 
        size: { width: 1200, height: 800 } 
      };
    case 'witftp':
      return { 
        component: <div className="p-8 text-center"><h2 className="text-2xl font-bold mb-4">WitFTP</h2><p>Klient FTP - W przygotowaniu</p></div>, 
        size: { width: 1000, height: 700 } 
      };
    case 'witstream':
      return { 
        component: <div className="p-8 text-center"><h2 className="text-2xl font-bold mb-4">WitStream</h2><p>Odtwarzacz multimedialny - W przygotowaniu</p></div>, 
        size: { width: 1000, height: 700 } 
      };
    case 'explorer':
      return { 
        component: <div className="p-4">Eksplorator plików - W budowie</div>, 
        size: { width: 800, height: 600 } 
      };
    case 'recycle':
      return { 
        component: <div className="p-4">Kosz jest pusty</div>, 
        size: { width: 400, height: 300 } 
      };
    default:
      return { 
        component: <div className="p-4">Nieznana aplikacja</div>, 
        size: { width: 400, height: 300 } 
      };
  }
};
