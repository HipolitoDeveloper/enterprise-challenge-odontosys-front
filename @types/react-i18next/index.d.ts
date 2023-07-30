/* eslint-disable no-unused-vars */
import 'react-i18next';

import translate_ptbr from '../../public/locales/pt-BR/common.json';

declare module 'next-i18next' {
	interface CustomTypeOptions {
		resources: {  form: typeof translate_ptbr,common: typeof translate_ptbr,};
	}
}
