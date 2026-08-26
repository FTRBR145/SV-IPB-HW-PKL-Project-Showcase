import {
  Activity,
  BarChart3,
  BookOpen,
  Cpu,
  FileText,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Tag,
  Users
} from 'lucide-react';

export const ADMIN_MENU = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: FolderKanban, label: 'Projek', id: 'projects' },
  { icon: Users, label: 'Moderator', id: 'moderators' },
  { icon: GraduationCap, label: 'Mahasiswa', id: 'students' },
  { icon: BookOpen, label: 'Mata Kuliah', id: 'courses' },
  { icon: Tag, label: 'Kategori', id: 'categories' },
  { icon: Cpu, label: 'Tech Stack', id: 'techstack' },
  { icon: BarChart3, label: 'Analitik', id: 'analytics' },
  { icon: FileText, label: 'Laporan', id: 'reports' },
  { icon: Settings, label: 'Pengaturan', id: 'settings' },
  { icon: Activity, label: 'Log Aktivitas', id: 'logs' }
];
