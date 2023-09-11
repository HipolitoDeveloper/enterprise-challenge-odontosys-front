const path = require('path');
const { initReactI18next } = require('react-i18next');

module.exports = {
    i18n: {
        defaultLocale: 'pt-BR',
        locales: ['pt-BR'],
        defaultNS: 'form',
        localePath: path.resolve('./public/locales')
    },
    react: {
        useSuspense: false,
    },
    debug: false,
    // use: [ initReactI18next ]
};
