import * as yup from "yup";

export const delDto = yup.object().shape({
    id: yup.number().required().min(1)
});