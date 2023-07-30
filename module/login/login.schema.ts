import * as yup from "yup";
import i18n from "i18next";

const userSchema = yup.object().shape({
    login: yup.string().required(i18n.t('ERRORS.COD_ERROR')),
    password: yup.string().required(i18n.t('ERRORS.NAME_ERROR')),
    keepConnected: yup.boolean(),
})

export default userSchema
