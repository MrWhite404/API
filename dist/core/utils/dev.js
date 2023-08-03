import { ENV } from '../../config/config.js';
export const DevelopmentLog = (log) => {
    if (ENV.NODE_ENV === 'development') {
        console.log(log);
    }
};
//# sourceMappingURL=dev.js.map