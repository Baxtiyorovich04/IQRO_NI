# IQRO NI

Демо-приложение сети вендинговых аппаратов, выдающих книги в аренду.
Данные — локальный `src/data/db.json`, без бэкенда (готов к замене на реальный API позже).

## Запуск локально
```
npm install
npm run dev
```

## Деплой на Vercel
1. Залей папку как репозиторий в GitHub (или используй `vercel` CLI напрямую из папки).
2. На vercel.com → New Project → импортируй репозиторий.
3. Framework Preset: Vite (определится автоматически).
4. Build Command: `npm run build`, Output Directory: `dist` — Vercel подставит сам.
5. Deploy.

Либо через CLI, находясь в папке проекта:
```
npm i -g vercel
vercel
```

## Структура
- `src/data/db.json` — все данные (пользователь, аппарат, история аренды, FAQ, контакты).
  Когда появится бэкенд — замени импорт `db.json` в `src/screens/Main.jsx` на `fetch()` к API,
  остальной код трогать не нужно.
- `src/screens/` — Splash, Auth (вход по телефону с демо-кодом), Main.
- `src/components/` — StatsBar, MapCard, ScanCard (сканер QR с камерой, демо-режим),
  RentalHistoryModal, Faq, Contacts.

## Про авторизацию
Реального SMS-провайдера нет — код генерируется в браузере и показывается на экране
с пометкой «демо-режим». Когда подключится бэкенд/SMS-шлюз, замени `sendCode()` и
`verifyCode()` в `src/screens/Auth.jsx` на реальные запросы к API.
