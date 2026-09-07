import React, { useMemo, useRef } from 'react';
import DataTablesReact from 'datatables.net-react';
import DataTablesCore from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import { Download } from 'lucide-react';

const registerDataTables = DataTablesReact.use;
registerDataTables(DataTablesCore);

function normalizeCellValue(value) {
  if (value == null) return '';
  if (Array.isArray(value)) return value.join(', ');
  return value;
}

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
  const tableRef = useRef(null);
  const columnsRef = useRef(columns);
  columnsRef.current = columns;

  const dataTableColumns = useMemo(() => columns.map((column, index) => ({
    data: column.key || null,
    name: column.key || `column-${index}`,
    orderable: column.sortable !== false && Boolean(column.key),
    searchable: column.searchable !== false && Boolean(column.key),
    className: column.className || '',
    defaultContent: ''
  })), [columns]);

  const slots = useMemo(() => {
    const renderSlots = {};

    columns.forEach((column, index) => {
      if (!column.render) return;

      renderSlots[index] = (cellData, type, row, meta) => {
        const currentColumn = columnsRef.current[index];
        const rawValue = currentColumn?.key ? row[currentColumn.key] : cellData;

        if (type !== 'display') return normalizeCellValue(rawValue);
        return currentColumn.render(row, meta.row);
      };
    });

    return renderSlots;
  }, [columns]);

  const defaultSortIndex = columns.findIndex((column) => column.key === defaultSortKey);
  const order = defaultSortIndex >= 0 ? [[defaultSortIndex, defaultSortDirection]] : [];

  const handleExportCsv = () => {
    const table = tableRef.current?.dt();
    const exportData = table
      ? table.rows({ search: 'applied', order: 'applied' }).data().toArray()
      : data;

    if (exportData.length === 0) return;

    const exportColumns = columns.filter((column) => column.key && column.exportable !== false);
    const headers = exportColumns
      .map((column) => `"${String(column.label || column.key).replaceAll('"', '""')}"`)
      .join(',');
    const rows = exportData.map((item) => exportColumns
      .map((column) => {
        const value = normalizeCellValue(item[column.key]);
        return `"${String(value).replaceAll('"', '""')}"`;
      })
      .join(','));

    const blob = new Blob([`\uFEFF${[headers, ...rows].join('\n')}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = exportFileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-3">
      {(extraHeaderActions || showExportCsv) && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>{extraHeaderActions}</div>
          {showExportCsv && (
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50"
              title="Unduh hasil tabel dalam format CSV"
            >
              <Download size={14} className="text-sky-600" />
              Unduh CSV
            </button>
          )}
        </div>
      )}

      <div className="admin-datatable workspace-panel max-w-full overflow-hidden rounded-2xl border p-3 shadow-2xs sm:p-4">
        <p className="mb-2 text-xs font-semibold text-slate-500 md:hidden">Geser tabel ke samping untuk melihat semua kolom.</p>
        <DataTablesReact
          ref={tableRef}
          data={data}
          columns={dataTableColumns}
          slots={slots}
          className="display w-full text-left text-xs"
          options={{
            autoWidth: false,
            scrollX: true,
            deferRender: true,
            pageLength: defaultPageSize,
            lengthMenu: pageSizeOptions,
            order,
            pagingType: 'simple_numbers',
            layout: {
              topStart: 'pageLength',
              topEnd: 'search',
              bottomStart: 'info',
              bottomEnd: 'paging'
            },
            language: {
              emptyTable: emptyMessage,
              zeroRecords: emptyMessage,
              search: 'Cari:',
              searchPlaceholder,
              lengthMenu: 'Tampilkan _MENU_ data',
              info: 'Menampilkan _START_–_END_ dari _TOTAL_ data',
              infoEmpty: 'Tidak ada data',
              infoFiltered: '(difilter dari _MAX_ data)',
              paginate: {
                first: 'Pertama',
                last: 'Terakhir',
                previous: 'Sebelumnya',
                next: 'Berikutnya',
                number: 'Halaman %d'
              },
              aria: {
                orderable: 'Urutkan kolom ini',
                orderableReverse: 'Balikkan urutan kolom ini',
                orderableRemove: 'Hapus urutan kolom ini',
                paginate: {
                  first: 'Halaman pertama',
                  last: 'Halaman terakhir',
                  previous: 'Halaman sebelumnya',
                  next: 'Halaman berikutnya',
                  number: 'Halaman %d'
                }
              }
            }
          }}
        >
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={column.key || index} className={column.headerClassName || ''}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
        </DataTablesReact>
      </div>
    </div>
  );
}
