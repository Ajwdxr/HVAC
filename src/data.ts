import { StudentProfile, ModuleItem, Announcement, AchievementBadge } from './types';

export const initialStudent: StudentProfile = {
  id: 'TVET-9921',
  name: 'Ahmad Bin Zulkifli',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWurBxNfeiTuxyzobsH57ooy4wQg5Bm3TRg0xoJEj74FVZ3sTbAu9xt7at8VhU-8KeHHHKK63byXwzXyDByea9jb1uLe3z6WbUlUpr8py84WtZjfqQjRm3Hkx5Wqf45y2ddgIbpnucvpNdHlnNU_8YIAeaYJXXDIdghR_YAu2nRuUqA1E8r7A3dgc2CNewoMypTmB8316wyq6NvgKFizjOd8kjpWPRuIjRIMmf7jPbkLv0ahVxdDh_KNt26vK7Y4fyRiAn_dcpEGo',
  role: 'Pelajar Tahun 2 - Penyejukan',
  overallProgress: 57,
  completedModules: 4,
  totalModules: 7,
  badgesCount: 3,
  learningHours: 15,
};

export const modulesData: ModuleItem[] = [
  {
    id: 'mod-1',
    moduleNumber: 'MODUL 01',
    title: 'Asas Teknologi Penyejukan',
    description: 'Memahami prinsip termodinamik, pemindahan haba, dan komponen asas sistem penyejukan industri.',
    level: 'ASAS',
    duration: '45 min',
    topicsCount: 5,
    progress: 100,
    status: 'completed',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKT6qmYVburzWbdZL1JTPqjUDj3RAFv8fCK2CnPxlStjenaDif_5pdYYAb8HCw3gr7e_KktUNm44KUuUDsCT58-Ued77yO6HyxAjfim3_4c-KiSKbkCvAvw58CdrZ5GqwlA_n7KUFh-gvqsOHi6QVQ2hUSqcQhWyiQp1fGr7EdmQfJtJjQoakP-KcO7MV_KBRikzs_1LGzajcxlBy72wkfnOajminRIPzRfoOP12Ns3A66UQDRjWm-N65bJFYvo_GpOwKCAqNurXk',
    icon: 'ac_unit',
    targetScreen: 'simulation'
  },
  {
    id: 'mod-2',
    moduleNumber: 'MODUL 02',
    title: 'Pengenalan Komponen HVAC',
    description: 'Identifikasi compressor, evaporator, condenser, dan peranti pengembangan (expansion valves).',
    level: 'PERTENGAHAN',
    duration: '60 min',
    topicsCount: 8,
    progress: 100,
    status: 'completed',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9Jg4rY8CfylcrSzgNYDtnaDSg3oDtb7AQjmTwu312FSCgsmMrIR_JZHZ_SK_uIp8siV8Ryp6PY-tuS_19714SbayvZLpgV8HxOIBm87kk7rpV94OwnY5BjXWEr0x3F651gKKUPmjqMOZf1GlPICDD0HfXFvcoSNkAxFzkPdnqY-bt7lYfRzv109OYqWOFTkbH3t8hlGXP6v7Kfd9A9nzbXhy-1n_7-5dRIZChyVw_vBr6b8ieDh8lFcqhPraTRlk6_MG-1a2az_0',
    icon: 'precision_manufacturing',
    targetScreen: 'simulation'
  },
  {
    id: 'mod-3',
    moduleNumber: 'MODUL 03',
    title: 'Kitaran Refrigerant',
    description: 'Analisis tekanan dan suhu dalam kitaran mampatan wap melalui simulasi interaktif.',
    level: 'PERTENGAHAN',
    duration: '50 min',
    topicsCount: 6,
    progress: 35,
    status: 'active',
    icon: 'sync',
    targetScreen: 'simulation'
  },
  {
    id: 'mod-4',
    moduleNumber: 'MODUL 04',
    title: 'Litar Elektrik Asas',
    description: 'Pendawaian kawalan dan litar kuasa bagi sistem penyaman udara fasa tunggal.',
    level: 'PERTENGAHAN',
    duration: '75 min',
    topicsCount: 7,
    progress: 100,
    status: 'completed',
    prerequisite: 'SELESAIKAN MODUL 03',
    icon: 'bolt',
    targetScreen: 'wiring'
  },
  {
    id: 'mod-dol',
    moduleNumber: 'MODUL 05',
    title: 'Litar Kawalan Penghidup Talian Terus (DOL)',
    description: 'Simulasi interaktif litar skematik & pendawaian Penghidup Talian Terus (Direct-On-Line Starter) mengandungi PB1 (Henti), PB2 (Hidup), GBL (Overload), Contact M, LP1 (Jalan), dan LP2 (Trip).',
    level: 'PERTENGAHAN',
    duration: '80 min',
    topicsCount: 8,
    progress: 100,
    status: 'completed',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg46kN5d2Bvd9-Gi3NrmPcO6Ec7LqraREx624-ZtoxTqZ7dCK95RlXvKiwsD1_lr5rk7Z2lXToh50KHyAgBJypF8dKNCkExEWKClfDIo9qHrfUg30N8H9VCeOhJStL5caXkoTG1OMt6TOn0sEf2BIPrM3JI8P0ahF-PIZIyU2a1mey2oI3tT6BXIN5atOuOWeeMvCesASKJIB0socqMibxt1F1D4XASs13D_d1ezsnoeEq3i6qGKPouZfwme2uMc69LU4RY--YXdE',
    icon: 'power_settings_new',
    targetScreen: 'dol-starter'
  },
  {
    id: 'mod-stardelta',
    moduleNumber: 'MODUL 05B',
    title: 'Litar Penghidup Motor Bintang-Delta (Star-Delta Starter)',
    description: 'Simulasi interaktif litar kuasa & kawalan Penghidup Bintang-Delta 3-fasa mengandungi MCB 3P, KM1 (Utama), KM2 (Bintang), KM3 (Delta), Timer 5s, OLR, dan Motor 3-fasa 6-punang.',
    level: 'LANJUTAN',
    duration: '90 min',
    topicsCount: 10,
    progress: 100,
    status: 'completed',
    icon: 'electric_bolt',
    targetScreen: 'star-delta'
  },
  {
    id: 'mod-5',
    moduleNumber: 'MODUL 06',
    title: 'Split Unit Air Conditioner',
    description: 'Prosedur pemasangan unit dalam (indoor) dan unit luar (outdoor) serta pengurusan bahan pendingin.',
    level: 'LANJUTAN',
    duration: '90 min',
    topicsCount: 9,
    progress: 0,
    status: 'completed',
    prerequisite: 'SELESAIKAN MODUL 05',
    icon: 'settings_input_component',
    targetScreen: 'troubleshooting'
  },
  {
    id: 'mod-6',
    moduleNumber: 'MODUL 07',
    title: 'Troubleshooting & Multimeter',
    description: 'Teknik mengesan kerosakan mekanikal dan elektrikal serta langkah pembaikan yang selamat.',
    level: 'LANJUTAN',
    duration: '120 min',
    topicsCount: 10,
    progress: 0,
    status: 'completed',
    prerequisite: 'LATIHAN AKHIR',
    icon: 'build',
    targetScreen: 'troubleshooting'
  }
];

export const announcementsData: Announcement[] = [
  {
    id: 'ann-1',
    author: 'ENC IK ZULKIFLI',
    timeAgo: '2 JAM LEPAS',
    title: 'Ujian Praktikal Minggu 12',
    content: 'Sila pastikan anda melengkapkan simulasi Litar Elektrik sebelum Jumaat.',
    isUrgent: true
  },
  {
    id: 'ann-2',
    author: 'ADMIN MAKMAL',
    timeAgo: 'SEMALAM',
    title: 'Penyelenggaraan Server',
    content: 'Makmal Maya akan ditutup sementara pada jam 11 PM.',
    isUrgent: false
  }
];

export const badgesData: AchievementBadge[] = [
  {
    id: 'badge-1',
    title: 'Pakar Pendawaian',
    icon: 'electric_bolt',
    color: '#003f87',
    unlocked: true,
    description: 'Menyelesaikan modul pendawaian tanpa sebarang ralat'
  },
  {
    id: 'badge-2',
    title: 'Diagnostik Tepat',
    icon: 'precision_manufacturing',
    color: '#006876',
    unlocked: true,
    description: 'Mengenal pasti kerosakan komponen dalam masa kurang 3 minit'
  },
  {
    id: 'badge-3',
    title: 'Terkunci: Pakar Termodinamik',
    icon: 'thermostat',
    color: '#727784',
    unlocked: false,
    description: 'Lengkapkan semua ujian kitaran bahan pendingin'
  }
];
