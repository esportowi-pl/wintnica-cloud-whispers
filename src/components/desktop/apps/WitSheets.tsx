import React, { useState, useCallback } from 'react';
import { Save, Plus, Trash2, Calculator, BarChart3, Download } from 'lucide-react';

interface Cell {
  value: string;
  formula?: string;
  style?: {
    backgroundColor?: string;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
  };
}

const WitSheets: React.FC = () => {
  const [cells, setCells] = useState<Record<string, Cell>>({});
  const [selectedCell, setSelectedCell] = useState('A1');
  const [formulaBar, setFormulaBar] = useState('');

  const columns = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const rows = Array.from({ length: 50 }, (_, i) => i + 1);

  const getCellKey = (col: string, row: number) => `${col}${row}`;

  const evaluateFormula = useCallback((formula: string, cellKey: string): string => {
    if (!formula.startsWith('=')) return formula;
    
    try {
      // Simple formula evaluation - replace cell references with values
      let expression = formula.substring(1);
      
      // Replace cell references like A1, B2 with their values
      expression = expression.replace(/([A-Z]+)(\d+)/g, (match, col, row) => {
        const refKey = getCellKey(col, parseInt(row));
        const refCell = cells[refKey];
        const value = refCell?.value || '0';
        return isNaN(Number(value)) ? '0' : value;
      });

      // Basic functions
      expression = expression.replace(/SUM\(([^)]+)\)/g, (match, range) => {
        const values = range.split(',').map((v: string) => parseFloat(v.trim()) || 0);
        return values.reduce((sum: number, val: number) => sum + val, 0).toString();
      });

      expression = expression.replace(/AVERAGE\(([^)]+)\)/g, (match, range) => {
        const values = range.split(',').map((v: string) => parseFloat(v.trim()) || 0);
        const avg = values.reduce((sum: number, val: number) => sum + val, 0) / values.length;
        return avg.toString();
      });

      // Evaluate simple math expressions
      const result = Function(`"use strict"; return (${expression})`)();
      return isNaN(result) ? '#ERROR!' : result.toString();
    } catch {
      return '#ERROR!';
    }
  }, [cells]);

  const updateCell = useCallback((cellKey: string, value: string) => {
    setCells(prev => ({
      ...prev,
      [cellKey]: {
        ...prev[cellKey],
        value: value.startsWith('=') ? evaluateFormula(value, cellKey) : value,
        formula: value.startsWith('=') ? value : undefined
      }
    }));
  }, [evaluateFormula]);

  const handleCellClick = (col: string, row: number) => {
    const cellKey = getCellKey(col, row);
    setSelectedCell(cellKey);
    const cell = cells[cellKey];
    setFormulaBar(cell?.formula || cell?.value || '');
  };

  const handleCellChange = (value: string) => {
    updateCell(selectedCell, value);
    setFormulaBar(value);
  };

  const exportToCSV = () => {
    let csv = '';
    for (let row = 1; row <= 20; row++) {
      const rowData = columns.slice(0, 10).map(col => {
        const cellKey = getCellKey(col, row);
        return cells[cellKey]?.value || '';
      });
      csv += rowData.join(',') + '\n';
    }
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arkusz.csv';
    a.click();
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-300 p-2 flex items-center space-x-2 bg-gray-50">
        <button onClick={exportToCSV} className="p-2 hover:bg-gray-200 rounded" title="Zapisz">
          <Save className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" title="Nowy arkusz">
          <Plus className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" title="Usuń">
          <Trash2 className="w-4 h-4" />
        </button>
        
        <div className="w-px h-6 bg-gray-300" />
        
        <button className="p-2 hover:bg-gray-200 rounded" title="Kalkulator">
          <Calculator className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" title="Wykres">
          <BarChart3 className="w-4 h-4" />
        </button>
        <button onClick={exportToCSV} className="p-2 hover:bg-gray-200 rounded" title="Eksportuj">
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* Formula Bar */}
      <div className="border-b border-gray-300 p-2 flex items-center space-x-2 bg-white">
        <span className="font-mono text-sm w-12">{selectedCell}</span>
        <input
          type="text"
          value={formulaBar}
          onChange={(e) => setFormulaBar(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCellChange(formulaBar);
            }
          }}
          className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm font-mono"
          placeholder="Wprowadź wartość lub formułę (=A1+B1)"
        />
      </div>

      {/* Spreadsheet */}
      <div className="flex-1 overflow-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="w-12 h-8 bg-gray-100 border border-gray-300"></th>
              {columns.slice(0, 15).map(col => (
                <th key={col} className="w-24 h-8 bg-gray-100 border border-gray-300 text-center text-sm font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 30).map(row => (
              <tr key={row}>
                <td className="w-12 h-8 bg-gray-100 border border-gray-300 text-center text-sm font-medium">
                  {row}
                </td>
                {columns.slice(0, 15).map(col => {
                  const cellKey = getCellKey(col, row);
                  const cell = cells[cellKey];
                  const isSelected = selectedCell === cellKey;
                  
                  return (
                    <td
                      key={cellKey}
                      className={`w-24 h-8 border border-gray-300 cursor-cell ${
                        isSelected ? 'bg-blue-100 ring-2 ring-blue-500' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleCellClick(col, row)}
                    >
                      <input
                        type="text"
                        value={cell?.value || ''}
                        onChange={(e) => updateCell(cellKey, e.target.value)}
                        className="w-full h-full px-1 text-sm border-none outline-none bg-transparent"
                        style={cell?.style}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-gray-100 border-t flex items-center justify-between px-4 text-xs text-gray-600">
        <span>Arkusz1</span>
        <span>Komórka: {selectedCell}</span>
        <span>Gotowy</span>
      </div>
    </div>
  );
};

export default WitSheets;
