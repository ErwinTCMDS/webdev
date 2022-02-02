import Joi from "joi";
export default {
    registerValidation (data)  {
        const schema = Joi.object({
            name: Joi.string().min(2),
            age: Joi.number().min(18).max(80)
        }).unknown();
        return schema.validate(data)
    }
}