import React, { useState } from 'react';
import { Upload, Download, Search, Table, FileSpreadsheet } from 'lucide-react';
import { downloadText } from '../../utils/formatting';

export const CsvViewer: React.FC = () => {
  const [csvText, setCsvText] = useState<string>(
    'ID,Name,Category,Price,Stock\n1,Wireless Mouse,Electronics,29.99,140\n2,Mechanical Keyboard,Electronics,89.50,75\n3,Coffee Mug,Kitchen,12.00,210\n4,Ergonomic Chair,Furniture,249.99,25\n5,USB-C Cable,Accessories,9.99,350'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  const parseCsv = () => {
    const lines = csvText.trim().split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) return { headers: [], rows: [] };

    const headers = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''));
    const rows = lines.slice(1).map((line) => {
      return line.split(',').map((cell) => cell.trim().replace(/^["']|["']$/g, ''));
    });

    return { headers, rows };
  };

  const { headers, rows } = parseCsv();

  const filteredRows = rows.filter((row) =>
    row.some((cell) => cell.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setCsvText(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const exportToJson = () => {
    const list = rows.map((r) => {
      const obj: Record<string, string> = {};
      headers.forEach((h, idx) => {
        obj[h] = r[idx] || '';
      });
      return obj;
    });
    downloadText(JSON.stringify(list, null, 2), 'export.json', 'application/json');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="flex items-center gap-3">
          <label className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer shadow-2xs">
            <Upload className="w-3.5 h-3.5 text-blue-600" />
            Upload .CSV File
            <input type="file" accept=".csv,text/csv" className="hidden" onChange={handleFileUpload} />
          </label>
          <span className="text-xs text-slate-500">
            {rows.length} rows • {headers.length} columns
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportToJson}
            disabled={rows.length === 0}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            Export to JSON
          </button>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter rows by keyword..."
          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
        />
      </div>

      {/* Data Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100/80 sticky top-0 border-b border-slate-200">
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="p-3 font-bold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.length > 0 ? (
                filteredRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 text-slate-700 whitespace-nowrap">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={headers.length || 1} className="p-8 text-center text-slate-400">
                    No matching rows found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
