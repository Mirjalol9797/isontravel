/** Навигация и контакты — один источник для шапки, футера и мобильного меню */

export interface NavLink {
  to: string
  label: string
}

export const NAV_LINKS: NavLink[] = [
  { to: '/tours', label: 'Туры' },
  { to: '/schedule', label: 'Расписание' },
  { to: '/corporate', label: 'Корпоративным' },
  { to: '/gallery', label: 'Галерея' },
  { to: '/about', label: 'О нас' },
]

export const FOOTER_TOURS: NavLink[] = [
  { to: '/tours', label: 'Все туры' },
  { to: '/schedule', label: 'Расписание выездов' },
  { to: '/tours?duration=1', label: 'Однодневные' },
  { to: '/tours?duration=2', label: 'С ночёвкой' },
  { to: '/tours?difficulty=easy', label: 'Для новичков' },
]

export const CONTACTS = {
  phone: '+998 (90) 000-00-00',
  phoneHref: 'tel:+998900000000',
  telegram: 'https://t.me/ison_travel_ru',
  telegramName: '@ison_travel_ru',
  booking: 'https://t.me/Malvina_travel',
  instagram: 'https://instagram.com/',
  meetingPoint: 'м. Буюк Ипак Йули',
}
