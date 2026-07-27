export type ScreenView = 
  | 'login' 
  | 'dashboard' 
  | 'modules' 
  | 'simulation' 
  | 'troubleshooting' 
  | 'wiring'
  | 'dol-starter';

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  role: string;
  overallProgress: number;
  completedModules: number;
  totalModules: number;
  badgesCount: number;
  learningHours: number;
}

export interface ModuleItem {
  id: string;
  moduleNumber: string;
  title: string;
  description: string;
  level: 'ASAS' | 'PERTENGAHAN' | 'LANJUTAN';
  duration: string;
  topicsCount: number;
  progress: number;
  status: 'completed' | 'active' | 'locked';
  prerequisite?: string;
  imageUrl?: string;
  icon?: string;
  targetScreen?: ScreenView;
}

export interface Announcement {
  id: string;
  author: string;
  timeAgo: string;
  title: string;
  content: string;
  isUrgent?: boolean;
}

export interface AchievementBadge {
  id: string;
  title: string;
  icon: string;
  color: string;
  unlocked: boolean;
  description: string;
}
