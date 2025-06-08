
import React, { useState, useEffect } from 'react';
import { 
  Save, Plus, Search, Trash2, Download, Upload, 
  Eye, Edit3, BookOpen, Tag, Calendar, Star,
  Bold, Italic, Underline, List, Link, Code
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isMarkdown: boolean;
  isFavorite: boolean;
}

const WitNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Witaj w WitNotes',
      content: '# Witaj w WitNotes!\n\nTo jest Twój pierwszy notatnik z obsługą **Markdown**.\n\n## Funkcje:\n- Markdown support\n- Kategoryzacja\n- Tagi\n- Wyszukiwarka\n- Eksport do różnych formatów\n\n*Miłego używania!*',
      category: 'Ogólne',
      tags: ['wprowadzenie', 'markdown'],
      createdAt: new Date(),
      updatedAt: new Date(),
      isMarkdown: true,
      isFavorite: false
    }
  ]);
  
  const [selectedNoteId, setSelectedNoteId] = useState<string>('1');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Wszystkie');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');

  const categories = ['Wszystkie', 'Ogólne', 'Praca', 'Osobiste', 'Projekty', 'Nauka'];

  const selectedNote = notes.find(note => note.id === selectedNoteId);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Wszystkie' || note.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const createNote = () => {
    const title = newNoteTitle.trim() || `Nowa notatka ${notes.length + 1}`;
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content: '',
      category: 'Ogólne',
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isMarkdown: true,
      isFavorite: false
    };
    
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
    setNewNoteTitle('');
  };

  const updateNote = (noteId: string, updates: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === noteId 
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    ));
  };

  const deleteNote = (noteId: string) => {
    if (notes.length > 1) {
      setNotes(notes.filter(note => note.id !== noteId));
      if (selectedNoteId === noteId) {
        setSelectedNoteId(notes.find(note => note.id !== noteId)?.id || '');
      }
    }
  };

  const toggleFavorite = (noteId: string) => {
    updateNote(noteId, { isFavorite: !notes.find(note => note.id === noteId)?.isFavorite });
  };

  const renderMarkdown = (markdown: string) => {
    // Simple markdown renderer
    return markdown
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2">$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      .replace(/^- (.*$)/gim, '<li class="ml-4">• $1</li>')
      .replace(/\n/gim, '<br>');
  };

  const exportNote = (format: 'txt' | 'md' | 'html') => {
    if (!selectedNote) return;
    
    let content = selectedNote.content;
    let mimeType = 'text/plain';
    let extension = 'txt';
    
    switch (format) {
      case 'md':
        mimeType = 'text/markdown';
        extension = 'md';
        break;
      case 'html':
        content = `<html><head><title>${selectedNote.title}</title></head><body>${renderMarkdown(selectedNote.content)}</body></html>`;
        mimeType = 'text/html';
        extension = 'html';
        break;
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedNote.title}.${extension}`;
    a.click();
  };

  return (
    <div className="h-full flex bg-white">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-300 flex flex-col">
        {/* Search and New Note */}
        <div className="p-4 border-b border-gray-300">
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              placeholder="Tytuł nowej notatki..."
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  createNote();
                }
              }}
            />
            <button
              onClick={createNote}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj notatek..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="p-4 border-b border-gray-300">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Kategorie</h3>
          <div className="space-y-1">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-2 py-1 rounded text-sm ${
                  selectedCategory === category 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                selectedNoteId === note.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
              onClick={() => setSelectedNoteId(note.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 truncate">{note.title}</h4>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(note.id);
                  }}
                  className={`p-1 rounded ${
                    note.isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                  }`}
                >
                  <Star className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {note.content.substring(0, 100)}...
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{note.category}</span>
                <span>{note.updatedAt.toLocaleDateString()}</span>
              </div>
              {note.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {note.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {selectedNote && (
          <>
            {/* Toolbar */}
            <div className="h-16 border-b border-gray-300 flex items-center justify-between px-4">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={selectedNote.title}
                  onChange={(e) => updateNote(selectedNote.id, { title: e.target.value })}
                  className="text-lg font-medium bg-transparent border-none outline-none"
                />
                
                <select
                  value={selectedNote.category}
                  onChange={(e) => updateNote(selectedNote.id, { category: e.target.value })}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className={`p-2 rounded ${isPreviewMode ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                  title={isPreviewMode ? 'Tryb edycji' : 'Podgląd'}
                >
                  {isPreviewMode ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={() => exportNote('md')}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Eksportuj jako Markdown"
                >
                  <Download className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => deleteNote(selectedNote.id)}
                  className="p-2 text-red-500 hover:bg-red-100 rounded"
                  title="Usuń notatkę"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Editor/Preview */}
            <div className="flex-1 overflow-hidden">
              {isPreviewMode ? (
                <div 
                  className="h-full overflow-y-auto p-6 prose max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: renderMarkdown(selectedNote.content) 
                  }}
                />
              ) : (
                <div className="h-full flex flex-col">
                  {/* Formatting Toolbar */}
                  <div className="h-10 border-b border-gray-200 flex items-center px-4 space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded" title="Pogrubienie">
                      <Bold className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded" title="Kursywa">
                      <Italic className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded" title="Podkreślenie">
                      <Underline className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-gray-300" />
                    <button className="p-1 hover:bg-gray-100 rounded" title="Lista">
                      <List className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded" title="Link">
                      <Link className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded" title="Kod">
                      <Code className="w-4 h-4" />
                    </button>
                  </div>

                  <textarea
                    value={selectedNote.content}
                    onChange={(e) => updateNote(selectedNote.id, { content: e.target.value })}
                    className="flex-1 p-6 resize-none focus:outline-none font-mono text-sm leading-relaxed"
                    placeholder="Zacznij pisać swoją notatkę... (obsługuje Markdown)"
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="h-8 border-t border-gray-300 flex items-center justify-between px-4 text-xs text-gray-500">
              <span>
                Utworzono: {selectedNote.createdAt.toLocaleDateString()} | 
                Zmodyfikowano: {selectedNote.updatedAt.toLocaleDateString()}
              </span>
              <span>
                Słowa: {selectedNote.content.split(' ').length} | 
                Znaki: {selectedNote.content.length}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WitNotes;
