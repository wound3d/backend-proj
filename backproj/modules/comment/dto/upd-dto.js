import * as yup from "yup";

export const updDto = yup.object().shape({
    text: yup.string().required()
});