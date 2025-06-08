
import React, { useState } from 'react';
import { Mail, Send, Inbox, Star, Trash2, Search, Paperclip, Reply, Forward } from 'lucide-react';

interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
  starred: boolean;
  folder: 'inbox' | 'sent' | 'trash' | 'starred';
}

const WitMail: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<'inbox' | 'sent' | 'trash' | 'starred'>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      from: 'burmistrz@witnica.pl',
      to: 'ja@witnica.pl',
      subject: 'Witamy w systemie poczty elektronicznej Witnicy',
      content: 'Dzień dobry! Witamy w nowym systemie poczty elektronicznej miasta Witnica. Dzięki tej aplikacji możesz łatwo komunikować się z urzędem miasta i innymi mieszkańcami.',
      date: '2024-01-08 10:30',
      read: false,
      starred: false,
      folder: 'inbox'
    },
    {
      id: '2',
      from: 'rada@witnica.pl',
      to: 'ja@witnica.pl',
      subject: 'Zaproszenie na sesję Rady Miasta',
      content: 'Szanowni Państwo, zapraszamy na najbliższą sesję Rady Miasta Witnica, która odbędzie się 15 stycznia 2024 roku o godzinie 17:00 w sali konferencyjnej Urzędu Miasta.',
      date: '2024-01-07 14:15',
      read: true,
      starred: true,
      folder: 'inbox'
    },
    {
      id: '3',
      from: 'kultura@witnica.pl',
      to: 'ja@witnica.pl',
      subject: 'Wydarzenia kulturalne - styczeń 2024',
      content: 'Drodzy mieszkańcy! Przedstawiamy program wydarzeń kulturalnych na styczeń 2024. Zapraszamy na koncerty, wystawy i spotkania autorskie.',
      date: '2024-01-06 09:45',
      read: true,
      starred: false,
      folder: 'inbox'
    }
  ]);

  const [newEmail, setNewEmail] = useState({
    to: '',
    subject: '',
    content: ''
  });

  const folders = [
    { id: 'inbox', name: 'Odebrane', icon: Inbox, count: emails.filter(e => e.folder === 'inbox' && !e.read).length },
    { id: 'starred', name: 'Oznaczone gwiazdką', icon: Star, count: emails.filter(e => e.starred).length },
    { id: 'sent', name: 'Wysłane', icon: Send, count: emails.filter(e => e.folder === 'sent').length },
    { id: 'trash', name: 'Kosz', icon: Trash2, count: emails.filter(e => e.folder === 'trash').length }
  ];

  const filteredEmails = emails.filter(email => {
    const matchesFolder = selectedFolder === 'starred' ? email.starred : email.folder === selectedFolder;
    const matchesSearch = email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const sendEmail = () => {
    const email: Email = {
      id: Date.now().toString(),
      from: 'ja@witnica.pl',
      to: newEmail.to,
      subject: newEmail.subject,
      content: newEmail.content,
      date: new Date().toLocaleString('pl-PL'),
      read: true,
      starred: false,
      folder: 'sent'
    };
    
    setEmails([...emails, email]);
    setNewEmail({ to: '', subject: '', content: '' });
    setShowCompose(false);
  };

  const toggleStar = (emailId: string) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, starred: !email.starred } : email
    ));
  };

  const markAsRead = (emailId: string) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, read: true } : email
    ));
  };

  const deleteEmail = (emailId: string) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, folder: 'trash' } : email
    ));
    setSelectedEmail(null);
  };

  return (
    <div className="h-full flex bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-300 flex flex-col">
        <div className="p-4">
          <button
            onClick={() => setShowCompose(true)}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Mail className="w-4 h-4" />
            <span>Napisz</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {folders.map(folder => {
            const FolderIcon = folder.icon;
            return (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id as any)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-100 ${
                  selectedFolder === folder.id ? 'bg-blue-100 text-blue-600 border-r-2 border-blue-600' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FolderIcon className="w-5 h-5" />
                  <span className="text-sm">{folder.name}</span>
                </div>
                {folder.count > 0 && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {folder.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-300">
          <div className="text-xs text-gray-500">
            <div>Użyte: 2.1 GB z 15 GB</div>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
              <div className="bg-blue-600 h-1 rounded-full" style={{ width: '14%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-300">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj w emailach..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Email List */}
          <div className="w-1/3 border-r border-gray-300 overflow-y-auto">
            {filteredEmails.map(email => (
              <div
                key={email.id}
                onClick={() => {
                  setSelectedEmail(email);
                  markAsRead(email.id);
                }}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  selectedEmail?.id === email.id ? 'bg-blue-50' : ''
                } ${!email.read ? 'bg-blue-25' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm truncate ${!email.read ? 'font-semibold' : ''}`}>
                    {selectedFolder === 'sent' ? email.to : email.from}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(email.id);
                      }}
                      className={`${email.starred ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500`}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-gray-500">{email.date.split(' ')[1]}</span>
                  </div>
                </div>
                <div className={`text-sm mb-1 ${!email.read ? 'font-semibold' : ''}`}>
                  {email.subject}
                </div>
                <div className="text-xs text-gray-600 truncate">
                  {email.content.substring(0, 60)}...
                </div>
                {!email.read && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                )}
              </div>
            ))}
          </div>

          {/* Email Content */}
          <div className="flex-1 flex flex-col">
            {selectedEmail ? (
              <>
                <div className="p-4 border-b border-gray-300">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold">{selectedEmail.subject}</h2>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded" title="Odpowiedz">
                        <Reply className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded" title="Przekaż">
                        <Forward className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteEmail(selectedEmail.id)}
                        className="p-2 hover:bg-gray-100 rounded" 
                        title="Usuń"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>Od: {selectedEmail.from}</div>
                    <div>Do: {selectedEmail.to}</div>
                    <div>Data: {selectedEmail.date}</div>
                  </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="whitespace-pre-wrap">{selectedEmail.content}</div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Mail className="w-16 h-16 mx-auto mb-4" />
                  <p>Wybierz email do wyświetlenia</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compose Email Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-300 flex items-center justify-between">
              <h3 className="font-semibold">Nowa wiadomość</h3>
              <button
                onClick={() => setShowCompose(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-4 space-y-4">
              <input
                type="email"
                placeholder="Do:"
                value={newEmail.to}
                onChange={(e) => setNewEmail({ ...newEmail, to: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Temat:"
                value={newEmail.subject}
                onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Treść wiadomości..."
                value={newEmail.content}
                onChange={(e) => setNewEmail({ ...newEmail, content: e.target.value })}
                rows={6}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div className="p-4 border-t border-gray-300 flex items-center justify-between">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                <Paperclip className="w-4 h-4" />
                <span className="text-sm">Załącznik</span>
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowCompose(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Anuluj
                </button>
                <button
                  onClick={sendEmail}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                  <span>Wyślij</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WitMail;
