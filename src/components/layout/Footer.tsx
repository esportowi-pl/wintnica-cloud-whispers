
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">O Witnicy.info</h3>
            <p className="text-gray-600">
              Portal informacyjny dla mieszkańców miasta i gminy Witnica.
              Aktualności, ogłoszenia, wydarzenia, galeria i społeczność.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Informacje</h3>
            <ul className="space-y-2">
              <li><Link to="/aktualnosci" className="text-gray-600 hover:text-primary">Aktualności</Link></li>
              <li><Link to="/ogloszenia" className="text-gray-600 hover:text-primary">Ogłoszenia</Link></li>
              <li><Link to="/wydarzenia" className="text-gray-600 hover:text-primary">Wydarzenia</Link></li>
              <li><Link to="/galeria" className="text-gray-600 hover:text-primary">Galeria</Link></li>
              <li><Link to="/chat" className="text-gray-600 hover:text-primary">Chat</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Kontakt</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-primary" />
                <span className="text-gray-600">kontakt@witnica.info</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-primary" />
                <span className="text-gray-600">+48 123 456 789</span>
              </li>
              <li className="flex items-center">
                <MapPin size={16} className="mr-2 text-primary" />
                <span className="text-gray-600">ul. Przykładowa 1, Witnica</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Śledź nas</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-primary text-white p-2 rounded-full hover:bg-primary/80">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-primary text-white p-2 rounded-full hover:bg-primary/80">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-primary text-white p-2 rounded-full hover:bg-primary/80">
                <Instagram size={20} />
              </a>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Newsletter</h4>
              <p className="text-sm text-gray-500 mb-2">Zapisz się, aby otrzymywać najnowsze informacje</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Twój email" 
                  className="px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/80">
                  Zapisz
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 mb-4 md:mb-0">
            &copy; 2025 Witnica.info - Wszelkie prawa zastrzeżone
          </div>
          <div className="flex space-x-4">
            <Link to="/polityka-prywatnosci" className="text-gray-500 hover:text-primary">Polityka prywatności</Link>
            <Link to="/regulamin" className="text-gray-500 hover:text-primary">Regulamin</Link>
            <Link to="/cookies" className="text-gray-500 hover:text-primary">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
