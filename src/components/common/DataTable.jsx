import React, { useMemo, useState } from 'react';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  X,
  FileSpreadsheet,
  Download
} from 'lucide-react';

/**
 * Reusable, highly-responsive DataTable Component for Admin & Management views
 *
 * @param {Array} data - Raw array of objects
 * @param {Array} columns - Column definition:
 *   [{
 *     key: 'title',
 *     label: 'Judul Projek',
 *     sortable: true,
 *     render: (row, index) => ReactNode,
 *     searchable: true,
 *     headerClassName: 'text-left',
 *     className: 'text-left'
 *   }]
 * @param {string} searchPlaceholder - Placeholder text for search input
 * @param {number} defaultPageSize - Default rows per page (default: 10)
 * @param {Array<number>} pageSizeOptions - Options for entries per page dropdown (default: [5, 10, 25, 50])
 * @param {ReactNode} extraHeaderActions - Additional buttons or filters next to search bar
 * @param {string} defaultSortKey - Initial sort column key
 * @param {string} defaultSortDirection - 'asc' | 'desc'
 * @param {boolean} showExportCsv - Whether to show Export CSV button
 * @param {string} exportFileName - File name when exported to CSV
 * @param {string} emptyMessage - Message to display when no records match
 */
export default function DataTable({
  data = [],
  columns = [],
  searchPlaceholder = 'Cari data...',
  defaultPageSize = 10,
  pageSizeOptions = [5, 10, 25, 50, 100],
  extraHeaderActions = null,
  defaultSortKey = '',
  defaultSortDirection = 'asc',
  showExportCsv = false,
  exportFileName = 'data-export.csv',
  emptyMessage = 'Tidak ada data yang ditemukan.'
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: defaultSortKey,
    direction: defaultSortDirection
  });

  // 1. FILTERING
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase().trim();

    return data.filter((item) => {
      return columns.some((col) => {
        if (col.searchable === false) return false;
        const val = item[col.key];
        if (val == null) return false;
        if (Array.isArray(val)) return val.some((v) => String(v).toLowerCase().includes(q));
        return String(val).toLowerCase().includes(q);
      });
    });
  }, [data, columns, searchQuery]);

  // 2. SORTING
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return sortConfig.direction === 'asc' ? 1 : -1;
      if (bVal == null) return sortConfig.direction === 'asc' ? -1 : 1;

      // Numeric comparison
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      // Date comparison if string looks like date
      const dateA = Date.parse(aVal);
      const dateB = Date.parse(bVal);
      if (!isNaN(dateA) && !isNaN(dateB) && typeof aVal === 'string' && aVal.length > 5 && isNaN(Number(aVal))) {
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      // String comparison
      const strA = String(aVal).toLowerCase();
      const strB = String(bVal).toLowerCase();
      return sortConfig.direction === 'asc'
        ? strA.localeCompare(strB, 'id')
        : strB.localeCompare(strA, 'id');
    });
  }, [filteredData, sortConfig]);

  // 3. PAGINATION
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  // Ensure current page is within range
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const paginatedData = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, safeCurrentPage, pageSize]);

  // Handle Sort Change
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' };
        return { key: '', direction: 'asc' }; // Reset sort on 3rd click
      }
      return { key, direction: 'asc' };
    });
  };

  // CSV Export Handler
  const handleExportCsv = () => {
    if (data.length === 0) return;
    const exportCols = columns.filter((c) => c.key && c.exportable !== false);
    const headers = exportCols.map((c) => `"${(c.label || c.key).replace(/"/g, '""')}"`).join(',');
    
    const rows = sortedData.map((item) => {
      return exportCols
        .map((c) => {
          const val = item[c.key];
          const str = val == null ? '' : Array.isArray(val) ? val.join('; ') : String(val);
          return `"${str.replace(/"/g, '""')}"`;
        })
        .join(',');
    });

    const csvContent = '\uFEFF' + [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = exportFileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Generate Smart Page Numbers
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, safeCurrentPage - 2);
      let end = Math.min(totalPages, start + maxButtons - 1);

      if (end - start < maxButtons - 1) {
        start = Math.max(1, end - maxButtons + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  }, [safeCurrentPage, totalPages]);

  const startIndex = totalItems === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endIndex = Math.min(safeCurrentPage * pageSize, totalItems);

  return (
    <div className="w-full space-y-4">
      {/* =================================================================== */}
      {/* 1. TOP CONTROLS: ENTRIES PER PAGE + SEARCH + EXTRA FILTERS */}
      {/* =================================================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        {/* Left: Page Size Selector */}
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <span>Tampilkan</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 shadow-2xs"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span>data per halaman</span>
        </div>

        {/* Right: Search Input + Extra Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {extraHeaderActions}

          {/* Search Box */}
          <div className="relative flex-1 sm:w-64 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-8 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                title="Hapus pencarian"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Export CSV Button */}
          {showExportCsv && (
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-bold shadow-2xs transition-all"
              title="Unduh data dalam format CSV"
            >
              <Download size={13} className="text-sky-600" />
              <span>Export CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. TABLE CONTAINER */}
      {/* =================================================================== */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
        <table className="w-full text-left text-xs">
          {/* Header */}
          <thead className="bg-slate-50/90 text-slate-600 uppercase text-[10px] font-extrabold border-b border-slate-200/80 select-none">
            <tr>
              {columns.map((col, idx) => {
                const isSorted = sortConfig.key === col.key;
                const canSort = col.sortable !== false && col.key;

                return (
                  <th
                    key={col.key || idx}
                    onClick={() => canSort && handleSort(col.key)}
                    className={`p-3.5 ${canSort ? 'cursor-pointer hover:bg-slate-100/80 transition-colors' : ''} ${
                      col.headerClassName || ''
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.label}</span>
                      {canSort && (
                        <span className="text-slate-400">
                          {isSorted ? (
                            sortConfig.direction === 'asc' ? (
                              <ArrowUp size={12} className="text-sky-600" />
                            ) : (
                              <ArrowDown size={12} className="text-sky-600" />
                            )
                          ) : (
                            <ArrowUpDown size={12} className="opacity-40 hover:opacity-100" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-100">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-10 text-center text-slate-400">
                  <div className="space-y-2">
                    <p className="font-medium text-slate-500">{emptyMessage}</p>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                      >
                        Reset Filter Pencarian
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIdx) => {
                const absoluteIdx = (safeCurrentPage - 1) * pageSize + rowIdx;
                return (
                  <tr key={row.id || rowIdx} className="hover:bg-slate-50/80 transition-colors">
                    {columns.map((col, colIdx) => (
                      <td key={col.key || colIdx} className={`p-3.5 ${col.className || ''}`}>
                        {col.render ? col.render(row, absoluteIdx) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* =================================================================== */}
      {/* 3. BOTTOM PAGINATION BAR & RECORD STATS */}
      {/* =================================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 pt-1">
        {/* Record count info */}
        <div>
          {totalItems > 0 ? (
            <p>
              Menampilkan <span className="font-bold text-slate-800">{startIndex}</span> sampai{' '}
              <span className="font-bold text-slate-800">{endIndex}</span> dari{' '}
              <span className="font-bold text-slate-800">{totalItems}</span> entri
              {searchQuery && (
                <span className="text-sky-600 font-semibold ml-1">
                  (difilter dari {data.length} total entri)
                </span>
              )}
            </p>
          ) : (
            <p>Tidak ada entri</p>
          )}
        </div>

        {/* Pagination Navigation Controls */}
        {totalPages > 1 && (
          <div className="flex items-center gap-1 self-center sm:self-auto select-none">
            {/* First Page */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={safeCurrentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              title="Halaman Pertama"
            >
              <ChevronsLeft size={14} />
            </button>

            {/* Previous Page */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              title="Halaman Sebelumnya"
            >
              <ChevronLeft size={14} />
            </button>

            {/* Page Number Buttons */}
            {pageNumbers.map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`min-w-[28px] h-7 px-2 rounded-lg font-bold text-xs transition-all ${
                  safeCurrentPage === num
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {num}
              </button>
            ))}

            {/* Next Page */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              title="Halaman Berikutnya"
            >
              <ChevronRight size={14} />
            </button>

            {/* Last Page */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={safeCurrentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              title="Halaman Terakhir"
            >
              <ChevronsRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
