// Only this allowlist may be copied from an authenticated user into the audit log.
export function activityActor(actor = 'Sistem') {
  if (typeof actor === 'string') return { actor };
  return { actor: actor.name, actorId: actor.id, actorEmail: actor.email, actorRole: actor.role };
}

export function studentActivity(students) {
  if (students.length === 1) return `Akun mahasiswa ${students[0].name} (NIM ${students[0].nim}) ditambahkan.`;
  return `${students.length} akun mahasiswa ditambahkan melalui impor massal. NIM: ${students.map(student => student.nim).join(', ')}.`;
}

const settingLabels = { siteName: 'Nama platform', academicYear: 'Tahun ajaran', moderationRequired: 'Wajib moderasi', allowGuestUploads: 'Upload tamu', maintenanceMode: 'Mode pemeliharaan' };
export function settingsActivity(before, after) {
  const display = value => typeof value === 'boolean' ? (value ? 'aktif' : 'nonaktif') : String(value ?? '—');
  const changes = Object.entries(settingLabels).filter(([key]) => before[key] !== after[key]);
  return changes.length ? `Pengaturan diubah: ${changes.map(([key, label]) => `${label}: ${display(before[key])} → ${display(after[key])}`).join('; ')}.` : null;
}
