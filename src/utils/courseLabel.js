const labels = {
  'RANGKAIAN LOGIKA DAN TEKNIK DIGITAL': 'Rangkaian Logika dan Teknik Digital',
  'TEKNOLOGI BENGKEL ELEKTROMEKANIK': 'Teknologi Bengkel Elektromekanik',
  'APLIKASI MOBILE': 'Aplikasi Mobile',
  'SISTEM TERTANAM (EMBEDDED SYSTEM)': 'Sistem Tertanam (Embedded System)',
  'PROYEK SISTEM IOT (INTERNET OF THINGS)': 'Proyek Sistem IoT (Internet of Things)',
};

// Display labels only: course identifiers and filtering keep the stored value.
export function courseLabel(value) {
  return labels[value] || value;
}
