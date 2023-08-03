import { ExpressResponse } from '../../core/utils/response.js';
import Joi from 'joi';
const ExpressSchemas = async (req) => {
    switch (req.originalUrl) {
        case '/api/yt/convert': {
            return await Joi.object({
                id: Joi.string().required(),
                token: Joi.string().required()
            }).validateAsync(req.body);
        }
        default: {
            return true;
        }
    }
};
export const ExpressRequest = async (req, res, next) => {
    try {
        await ExpressSchemas(req);
        next();
    }
    catch (error) {
        if (Joi.isError(error)) {
            return ExpressResponse(res, false, 400, {
                missing: error.details[0].message.replace(/"/g, ''),
                message: 'INVALID_PAYLOAD'
            });
        }
        return ExpressResponse(res, false, 500, 'ERROR');
    }
};
//# sourceMappingURL=express-validate.js.map