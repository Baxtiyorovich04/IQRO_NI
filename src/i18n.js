const translations = {
    ru: {
        auth: {
            titlePhone: 'Вход по номеру телефона',
            subtitlePhone: 'Пришлём код подтверждения',
            phoneLabel: 'Номер телефона',
            getCode: 'Получить код',
            verify: 'Подтвердить',
            titleCode: 'Введите код',
            subtitleCode: 'Отправлен на {phone}',
            demoMode: 'Демо-режим (нет SMS-провайдера): ваш код — {code}',
            codeLabel: 'Код из 4 цифр',
            changeNumber: 'Изменить номер',
            invalidNumber: 'Введите номер полностью',
            wrongCode: 'Неверный код, попробуйте ещё раз',
            placeholderPhone: '+998 90 123 45 67',
            codeHint: '0000',
        },
        profile: {
            title: 'Как к вам обращаться?',
            subtitle: 'Это понадобится для выдачи книг в аппаратах',
            firstName: 'Имя',
            lastName: 'Фамилия',
            firstNamePlaceholder: 'Марк',
            lastNamePlaceholder: 'Азаматов',
            continue: 'Продолжить',
        },
        main: {
            logout: 'Выйти',
            balance: 'баланс, {currency}',
            books: 'книг в аренде ›',
            contacts: 'Контакты',
            openMap: 'Открыть карту ↗',
            scanQR: 'Сканировать QR',
            myBooks: 'Мои книги',
            active: 'в аренде',
            returned: 'возвращена',
            qrHint: 'Наведите камеру на QR-код на корпусе аппарата',
            camera: 'Включаем камеру…',
            denied: 'Нет доступа к камере. Разрешите доступ в настройках браузера.',
            success: 'Ячейка открыта, приятного чтения!',
            simulate: 'Демо: имитировать сканирование',
            address: 'Адрес',
            phone: 'Телефон',
            email: 'Email',
            telegram: 'Telegram',
            instagram: 'Instagram',
            contactsFooter: '© 2026 · книги в аренду · Tashkent',
            tagline: 'книги в аренду · рядом с тобой',
            takenAt: 'Взята:',
            returnBy: 'Вернуть до:',
            returnedAt: 'Возвращена:',
            toastRentSuccess: 'Книга «Дюна» выдана из ячейки A1',
            availableBooks: 'Книги в автомате',
            machineCount: 'автоматов на карте',
            suggestBook: 'Предложить книгу',
            suggestionHint: 'Выберите автомат и предложите книгу, которой здесь не хватает',
            selectMachine: 'Автомат',
            bookTitle: 'Название книги',
            bookTitlePlaceholder: 'Например: Дюна',
            author: 'Автор',
            authorPlaceholder: 'Например: Фрэнк Герберт',
            submitSuggestion: 'Отправить предложение',
            suggestionSuccess: 'Спасибо! Мы получили ваше предложение.',
        },
        faq: {
            heading: 'FAQ',
            items: [
                {
                    q: 'Как взять книгу из аппарата?',
                    a: 'Подойдите к аппарату, нажмите «Сканировать QR» в приложении, наведите камеру на код на корпусе автомата — ячейка с книгой откроется автоматически.',
                },
                {
                    q: 'Сколько стоит аренда?',
                    a: 'Стоимость списывается с баланса приложения за каждый день аренды. Точный тариф зависит от книги и указан на её карточке в аппарате.',
                },
                {
                    q: 'Что будет, если не вернуть книгу вовремя?',
                    a: 'После истечения срока аренды начисляется дневной штраф, который автоматически списывается с баланса.',
                },
                {
                    q: 'Где пополнить баланс?',
                    a: 'Пополнение баланса будет доступно прямо в приложении после подключения платёжного провайдера. Сейчас баланс демонстрационный.',
                },
            ],
        },
        splash: {
            tagline: 'книги в аренду · рядом с тобой',
        },
        sidebar: {
            menu: 'Меню',
            dashboard: 'Дашборд',
            balance: 'Пополнить баланс',
            settings: 'Настройки',
            machines: 'Машины',
            suggestion: 'Предложить книгу',
            logout: 'Выйти',
        },
        balance: {
            title: 'Пополнение баланса',
            subtitle: 'Здесь вы можете пополнить свой баланс для аренды книг.',
            currentBalance: 'Текущий баланс',
            amountPlaceholder: 'Введите сумму',
            submit: 'Пополнить',
            successMessage: 'Баланс успешно пополнен на {amount} {currency}',
        },
        settings: {
            title: 'Настройки',
            subtitle: 'Управляйте темной темой и языком приложения.',
            theme: 'Тема',
            themeDescription: 'Переключитесь между светлым и темным режимом.',
            darkMode: 'Темный режим',
            lightMode: 'Светлый режим',
            language: 'Язык',
            languageDescription: 'Нажмите, чтобы переключить язык одним нажатием.',
        },
    },
    uz: {
        auth: {
            titlePhone: 'Telefon raqami orqali kirish',
            subtitlePhone: 'Tasdiqlash kodini yuboramiz',
            phoneLabel: 'Telefon raqami',
            getCode: 'Kod olish',
            verify: 'Tasdiqlash',
            titleCode: 'Kod kiriting',
            subtitleCode: '{phone} ga yuborildi',
            demoMode: 'Demo rejim (SMS provayderi yo‘q): kodingiz — {code}',
            codeLabel: '4 xonali kod',
            changeNumber: 'Raqamni o‘zgartirish',
            invalidNumber: 'To‘liq raqam kiriting',
            wrongCode: 'Noto‘g‘ri kod, qayta urinib ko‘ring',
            placeholderPhone: '+998 90 123 45 67',
            codeHint: '0000',
        },
        profile: {
            title: 'Sizni qanday chaqirsak bo‘ladi?',
            subtitle: 'Bu kitoblarni mashinadan berishda kerak bo‘ladi',
            firstName: 'Ism',
            lastName: 'Familiya',
            firstNamePlaceholder: 'Mark',
            lastNamePlaceholder: 'Azamatov',
            continue: 'Davom etish',
        },
        main: {
            logout: 'Chiqish',
            balance: 'balans, {currency}',
            books: 'ijaraga olingan kitoblar ›',
            contacts: 'Kontaktlar',
            openMap: 'Xaritani ochish ↗',
            scanQR: 'QR kodni skanerlash',
            myBooks: 'Mening kitoblarim',
            active: 'ijarada',
            returned: 'qaytarilgan',
            qrHint: 'Kamerani mashina ustidagi QR kodga yo‘naltiring',
            camera: 'Kamera yoqilmoqda…',
            denied: 'Kamera uchun ruxsat yo‘q. Brauzer sozlamalarida ruxsat bering.',
            success: 'Uycha ochildi, maroqli o‘qish!',
            simulate: 'Demo: skanerlashni simulyatsiya qilish',
            address: 'Manzil',
            phone: 'Telefon',
            email: 'Email',
            telegram: 'Telegram',
            instagram: 'Instagram',
            contactsFooter: '© 2026 · ijaraga kitoblar · Toshkent',
            tagline: 'ijaraga kitoblar · yoningizda',
            takenAt: 'Olingan:',
            returnBy: 'Qaytarish muddati:',
            returnedAt: 'Qaytarilgan:',
            toastRentSuccess: '«Dune» kitobi A1 uychasidan berildi',
            availableBooks: 'Mashinadagi kitoblar',
            machineCount: 'xaritadagi mashinalar',
            suggestBook: 'Kitob taklif qilish',
            suggestionHint: 'Mashinani tanlang va bu yerda yetishmayotgan kitobni taklif qiling',
            selectMachine: 'Mashina',
            bookTitle: 'Kitob nomi',
            bookTitlePlaceholder: 'Masalan: Dune',
            author: 'Muallif',
            authorPlaceholder: 'Masalan: Frank Gerbert',
            submitSuggestion: 'Taklifni yuborish',
            suggestionSuccess: 'Rahmat! Taklifingiz qabul qilindi.',
        },
        faq: {
            heading: 'Savol-Javob',
            items: [
                {
                    q: 'Mashinadan kitobni qanday olish mumkin?',
                    a: 'Mashina yoniga boring, ilovada “QR kodni skanerlash” ga bosing, kamerani mashina ustidagi kodga yo‘naltiring — kitob joyi avtomatik ochiladi.',
                },
                {
                    q: 'Ijara qancha turadi?',
                    a: 'Narx har kuni ijara uchun balansdan yechib olinadi. Aniq tarif kitobga ko‘ra belgilanadi va mashinadagi kartada ko‘rsatiladi.',
                },
                {
                    q: 'Agar kitobni o‘z vaqtida qaytarmasam nima bo‘ladi?',
                    a: 'Muddat tugagach, kunlik jarima qo‘llaniladi va u balansdan avtomatik yechib olinadi.',
                },
                {
                    q: 'Balansni qayerdan to‘ldirish mumkin?',
                    a: 'To‘lov provayderi integratsiya qilingandan so‘ng balansni ilovadan to‘ldirish mumkin bo‘ladi. Hozircha balans demo.',
                },
            ],
        },
        splash: {
            tagline: 'ijaraga kitoblar · yoningizda',
        },
        sidebar: {
            menu: 'Menyu',
            dashboard: 'Dashboard',
            balance: 'Balansni toʻldirish',
            settings: 'Sozlamalar',
            machines: 'Mashinalar',
            suggestion: 'Kitob taklif qilish',
            logout: 'Chiqish',
        },
        balance: {
            title: 'Balansni toʻldirish',
            subtitle: 'Ijara uchun balansni shu yerda toʻldirishingiz mumkin.',
            currentBalance: 'Joriy balans',
            amountPlaceholder: 'Summani kiriting',
            submit: 'Toʻldirish',
            successMessage: 'Balans muvaffaqiyatli {amount} {currency} ga toʻldirildi',
        },
        settings: {
            title: 'Sozlamalar',
            subtitle: 'Ilovaning mavzusi va tilini boshqaring.',
            theme: 'Mavzu',
            themeDescription: 'Yorugʻ va quyuq rejimlar orasida almashing.',
            darkMode: 'Qorongʻi rejim',
            lightMode: 'Yorugʻ rejim',
            language: 'Til',
            languageDescription: 'Tilni bir marta bosish bilan o‘zgartiring.',
        },
    },
    en: {
        auth: {
            titlePhone: 'Phone number login',
            subtitlePhone: 'We’ll send a confirmation code',
            phoneLabel: 'Phone number',
            getCode: 'Get code',
            verify: 'Confirm',
            titleCode: 'Enter code',
            subtitleCode: 'Sent to {phone}',
            demoMode: 'Demo mode (no SMS provider): your code is {code}',
            codeLabel: '4-digit code',
            changeNumber: 'Change number',
            invalidNumber: 'Enter full number',
            wrongCode: 'Wrong code, please try again',
            placeholderPhone: '+998 90 123 45 67',
            codeHint: '0000',
        },
        profile: {
            title: 'How should we call you?',
            subtitle: 'This helps when renting books from machines',
            firstName: 'First name',
            lastName: 'Last name',
            firstNamePlaceholder: 'Mark',
            lastNamePlaceholder: 'Azamatov',
            continue: 'Continue',
        },
        main: {
            logout: 'Logout',
            balance: 'balance, {currency}',
            books: 'books rented ›',
            contacts: 'Contacts',
            openMap: 'Open map ↗',
            scanQR: 'Scan QR',
            myBooks: 'My books',
            active: 'active',
            returned: 'returned',
            qrHint: 'Point the camera at the QR code on the machine',
            camera: 'Starting camera…',
            denied: 'No camera access. Allow permission in your browser settings.',
            success: 'Locker opened, enjoy your reading!',
            simulate: 'Demo: simulate scan',
            address: 'Address',
            phone: 'Phone',
            email: 'Email',
            telegram: 'Telegram',
            instagram: 'Instagram',
            contactsFooter: '© 2026 · books for rent · Tashkent',
            tagline: 'books for rent · near you',
            takenAt: 'Taken:',
            returnBy: 'Return by:',
            returnedAt: 'Returned:',
            toastRentSuccess: 'The book “Dune” has been released from locker A1',
            availableBooks: 'Books in the machine',
            machineCount: 'machines on the map',
            suggestBook: 'Suggest a book',
            suggestionHint: 'Choose a machine and suggest a book that is missing here',
            selectMachine: 'Machine',
            bookTitle: 'Book title',
            bookTitlePlaceholder: 'For example: Dune',
            author: 'Author',
            authorPlaceholder: 'For example: Frank Herbert',
            submitSuggestion: 'Send suggestion',
            suggestionSuccess: 'Thanks! Your suggestion has been received.',
        },
        faq: {
            heading: 'FAQ',
            items: [
                {
                    q: 'How do I take a book from the machine?',
                    a: 'Go to the machine, tap “Scan QR” in the app, point the camera at the code on the machine case — the book compartment opens automatically.',
                },
                {
                    q: 'How much does rental cost?',
                    a: 'The cost is deducted from your app balance per day of rental. Exact tariff depends on the book and is shown on its card in the machine.',
                },
                {
                    q: 'What happens if I do not return the book on time?',
                    a: 'After the rental period expires, a daily fine is charged and is automatically deducted from the balance.',
                },
                {
                    q: 'Where can I top up the balance?',
                    a: 'Balance top-up will be available directly in the app after payment provider integration. Currently the balance is demo.',
                },
            ],
        },
        splash: {
            tagline: 'books for rent · near you',
        },
        sidebar: {
            menu: 'Menu',
            dashboard: 'Dashboard',
            balance: 'Top up balance',
            settings: 'Settings',
            machines: 'Machines',
            suggestion: 'Suggest a book',
            logout: 'Logout',
        },
        balance: {
            title: 'Top up balance',
            subtitle: 'Top up your balance here to keep renting books.',
            currentBalance: 'Current balance',
            amountPlaceholder: 'Enter amount',
            submit: 'Top up',
            successMessage: 'Balance successfully topped up by {amount} {currency}',
        },
        settings: {
            title: 'Settings',
            subtitle: 'Manage app theme and language.',
            theme: 'Theme',
            themeDescription: 'Switch between light and dark mode.',
            darkMode: 'Dark mode',
            lightMode: 'Light mode',
            language: 'Language',
            languageDescription: 'Toggle language with a single tap.',
        },
    },
};

function getNested(obj, path) {
    return path.split('.').reduce((target, key) => (target ? target[key] : undefined), obj);
}

export function t(locale, path, vars = {}) {
    const text = getNested(translations[locale] || translations.ru, path) || getNested(translations.ru, path) || path;
    if (typeof text !== 'string') return text;
    return Object.entries(vars).reduce((result, [key, value]) => result.replace(new RegExp(`\{${key}\}`, 'g'), value), text);
}

function formatUzPhone(value) {
    const digits = value.replace(/\D/g, '');
    const clean = digits.startsWith('998') ? digits.slice(3) : digits;
    const groups = [];
    if (clean.length > 0) groups.push(clean.slice(0, 2));
    if (clean.length > 2) groups.push(clean.slice(2, 5));
    if (clean.length > 5) groups.push(clean.slice(5, 7));
    if (clean.length > 7) groups.push(clean.slice(7, 9));
    return '+998' + (groups.length ? ' ' + groups.join(' ') : ' ');
}

export function formatPhone(number) {
    const digits = number.replace(/\D/g, '');
    if (!digits || digits.length < 4) return number;
    const clean = digits.startsWith('998') ? digits.slice(3) : digits;
    const groups = [];
    if (clean.length > 0) groups.push(clean.slice(0, 2));
    if (clean.length > 2) groups.push(clean.slice(2, 5));
    if (clean.length > 5) groups.push(clean.slice(5, 7));
    if (clean.length > 7) groups.push(clean.slice(7, 9));
    return '+998' + (groups.length ? ' ' + groups.join(' ') : ' ');
}

export function maskPhone(number) {
    return formatPhone(number);
}

export const defaultLocale = 'ru';
export const localeLabels = { ru: 'RU', uz: 'UZ', en: 'EN' };
export const colorModes = { light: 'light', dark: 'dark' };
export default translations;
