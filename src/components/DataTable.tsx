import { useState, useMemo } from 'react';
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreHorizontal,
  Check,
  Columns3,
  Plus,
  Pencil,
  Trash2,
  Eye,
} from 'lucide-react';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  pagination?: boolean;
  pageSize?: number;
  selectable?: boolean;
  onSelectionChange?: (selected: T[]) => void;
  emptyMessage?: string;
  exportable?: boolean;
  onExport?: (format: 'csv' | 'json') => void;
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
}

function DataTable<T extends { id: string | number }>({
  data, columns, title, searchable = true, searchPlaceholder = 'Search...',
  pagination = true, pageSize: initialPageSize = 10, selectable = false,
  onSelectionChange, emptyMessage = 'No data found', exportable = true,
  onExport, onAdd, onEdit, onDelete, onView,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set(columns.map(c => c.key as string)));
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState<string | number | null>(null);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const query = search.toLowerCase();
    return data.filter(item => columns.some(col => String(item[col.key as keyof T]).toLowerCase().includes(query)));
  }, [data, search, columns]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey as keyof T];
      const bVal = b[sortKey as keyof T];
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDirection]);

  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDirection('asc'); }
  };

  const handleSelectAll = () => {
    if (selectedIds.size === paginatedData.length) {
      setSelectedIds(new Set());
      onSelectionChange?.([]);
    } else {
      const newSelected = new Set(paginatedData.map(item => item.id));
      setSelectedIds(newSelected);
      onSelectionChange?.(paginatedData);
    }
  };

  const handleSelectRow = (item: T) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(item.id)) newSelected.delete(item.id);
    else newSelected.add(item.id);
    setSelectedIds(newSelected);
    onSelectionChange?.(data.filter(d => newSelected.has(d.id)));
  };

  const toggleColumn = (key: string) => {
    const newVisible = new Set(visibleColumns);
    if (newVisible.has(key)) { if (newVisible.size > 1) newVisible.delete(key); }
    else newVisible.add(key);
    setVisibleColumns(newVisible);
  };

  const handleExport = (format: 'csv' | 'json') => {
    if (onExport) { onExport(format); }
    else {
      const exportData = sortedData.map(item => {
        const row: Record<string, unknown> = {};
        columns.forEach(col => { row[col.label] = item[col.key as keyof T]; });
        return row;
      });
      if (format === 'json') {
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `export-${Date.now()}.json`; a.click();
        URL.revokeObjectURL(url);
      } else {
        const headers = columns.map(c => c.label).join(',');
        const rows = exportData.map(row => columns.map(c => `"${String(row[c.label] ?? '').replace(/"/g, '""')}"`).join(','));
        const csv = [headers, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `export-${Date.now()}.csv`; a.click();
        URL.revokeObjectURL(url);
      }
    }
    setShowExportMenu(false);
  };

  const visibleColumnsList = columns.filter(c => visibleColumns.has(c.key as string));
  const hasActions = onEdit || onDelete || onView;

  return (
    <div className="liquid-glass-light rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-4">
          {title && <h3 className="text-base font-medium text-white">{title}</h3>}
          {searchable && (
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder={searchPlaceholder}
                className="w-full liquid-input rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-white/30"
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onAdd && (
            <button onClick={onAdd} className="flex items-center gap-2 px-3 py-2 liquid-button-primary rounded-lg text-sm font-medium text-white">
              <Plus size={16} />
              <span className="hidden sm:inline">Add New</span>
            </button>
          )}
          <div className="relative">
            <button onClick={() => setShowColumnMenu(!showColumnMenu)} className="p-2 rounded-lg hover:bg-white/[0.06] text-white/50 hover:text-white transition-all">
              <Columns3 size={16} />
            </button>
            {showColumnMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowColumnMenu(false)} />
                <div className="absolute right-0 top-full mt-2 w-44 liquid-glass-elevated rounded-xl z-50 py-1.5">
                  {columns.map(col => (
                    <button key={col.key as string} onClick={() => toggleColumn(col.key as string)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/[0.04] text-left">
                      <div className={`w-4 h-4 rounded border ${visibleColumns.has(col.key as string) ? 'bg-pink-500 border-pink-500' : 'border-white/20'} flex items-center justify-center`}>
                        {visibleColumns.has(col.key as string) && <Check size={10} className="text-white" />}
                      </div>
                      <span className="text-sm text-white/70">{col.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          {exportable && (
            <div className="relative">
              <button onClick={() => setShowExportMenu(!showExportMenu)} className="p-2 rounded-lg hover:bg-white/[0.06] text-white/50 hover:text-white transition-all">
                <Download size={16} />
              </button>
              {showExportMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)} />
                  <div className="absolute right-0 top-full mt-2 w-28 liquid-glass-elevated rounded-xl z-50 py-1.5">
                    <button onClick={() => handleExport('csv')} className="w-full px-3 py-2 text-left text-sm text-white/70 hover:bg-white/[0.04]">CSV</button>
                    <button onClick={() => handleExport('json')} className="w-full px-3 py-2 text-left text-sm text-white/70 hover:bg-white/[0.04]">JSON</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <button onClick={handleSelectAll} className={`w-4 h-4 rounded border ${selectedIds.size === paginatedData.length && paginatedData.length > 0 ? 'bg-pink-500 border-pink-500' : 'border-white/20'} flex items-center justify-center`}>
                    {selectedIds.size === paginatedData.length && paginatedData.length > 0 && <Check size={10} className="text-white" />}
                  </button>
                </th>
              )}
              {visibleColumnsList.map(col => (
                <th key={col.key as string} className="px-4 py-3 text-left" style={{ width: col.width }}>
                  {col.sortable !== false ? (
                    <button onClick={() => handleSort(col.key as string)} className="flex items-center gap-1.5 text-[11px] font-medium text-white/40 uppercase tracking-wider hover:text-white/60 transition-colors">
                      {col.label}
                      <span className="flex flex-col -space-y-1">
                        <ChevronUp size={10} className={sortKey === col.key && sortDirection === 'asc' ? 'text-pink-400' : 'text-white/20'} />
                        <ChevronDown size={10} className={sortKey === col.key && sortDirection === 'desc' ? 'text-pink-400' : 'text-white/20'} />
                      </span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">{col.label}</span>
                  )}
                </th>
              ))}
              {hasActions && <th className="w-16 px-4 py-3" />}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={visibleColumnsList.length + (selectable ? 1 : 0) + (hasActions ? 1 : 0)} className="px-4 py-12 text-center text-white/30 text-sm">{emptyMessage}</td>
              </tr>
            ) : (
              paginatedData.map(item => (
                <tr key={item.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  {selectable && (
                    <td className="px-4 py-3">
                      <button onClick={() => handleSelectRow(item)} className={`w-4 h-4 rounded border ${selectedIds.has(item.id) ? 'bg-pink-500 border-pink-500' : 'border-white/20'} flex items-center justify-center`}>
                        {selectedIds.has(item.id) && <Check size={10} className="text-white" />}
                      </button>
                    </td>
                  )}
                  {visibleColumnsList.map(col => (
                    <td key={col.key as string} className="px-4 py-3">
                      {col.render ? col.render(item) : <span className="text-sm text-white/70">{String(item[col.key as keyof T] ?? '')}</span>}
                    </td>
                  ))}
                  {hasActions && (
                    <td className="px-4 py-3">
                      <div className="relative">
                        <button onClick={() => setOpenActionMenu(openActionMenu === item.id ? null : item.id)} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white transition-all">
                          <MoreHorizontal size={16} />
                        </button>
                        {openActionMenu === item.id && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setOpenActionMenu(null)} />
                            <div className="absolute right-0 top-full mt-1 w-32 liquid-glass-elevated rounded-xl z-50 py-1.5">
                              {onView && <button onClick={() => { onView(item); setOpenActionMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-white/70 hover:bg-white/[0.04]"><Eye size={14} />View</button>}
                              {onEdit && <button onClick={() => { onEdit(item); setOpenActionMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-white/70 hover:bg-white/[0.04]"><Pencil size={14} />Edit</button>}
                              {onDelete && <button onClick={() => { onDelete(item); setOpenActionMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10"><Trash2 size={14} />Delete</button>}
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>Show</span>
            <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }} className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-2 py-1 text-white text-xs focus:outline-none">
              {[10, 25, 50, 100].map(size => <option key={size} value={size} className="bg-[#141414]">{size}</option>)}
            </select>
            <span>of {sortedData.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) pageNum = i + 1;
                else if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;
                return (
                  <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${currentPage === pageNum ? 'bg-pink-500 text-white' : 'text-white/50 hover:bg-white/[0.06] hover:text-white'}`}>
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
