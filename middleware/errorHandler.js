const {constants} = require('../constants');
const errorHandler = (err, req, res, next) => {
const statusCode = res.statusCode ? res.statusCode :500;
switch (statusCode) {
    case constants.VALIDATION_ERROR:
        res.json({title:"Validation Failed",messsage: err.message, stackTrace: err.stack})
        

    case constants.NOT_FOUND:
        res.json({title:"Not Found",messsage: err.message, stackTrace: err.stack})
        

    case constants.UNAUTHORIZED:
        res.json({title:"Unauthorized",messsage: err.message, stackTrace: err.stack})
        

    case constants.FORBIDDEN:
        res.json({title:"Forbidden",messsage: err.message, stackTrace: err.stack})

    case constants.SERVER_ERROR:
        res.json({title:"Server Error",messsage: err.message, stackTrace: err.stack})
        

    default:
        console.log("No error")
        break;
}



};

module.exports = errorHandler;