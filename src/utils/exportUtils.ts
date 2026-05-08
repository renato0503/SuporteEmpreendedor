/**
 * Utility to export data to CSV and trigger download
 */
export function exportToCSV(filename: string, headers: string[], data: any[][]) {
  const csvContent = "data:text/csv;charset=utf-8," 
    + headers.join(",") + "\n" 
    + data.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
