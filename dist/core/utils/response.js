export const ExpressResponse = (res, status, code, data) => {
    const response = {
        success: status,
        data: data
    };
    res.status(code).json(response);
};
//# sourceMappingURL=response.js.map