const errorHandler = (err,req,res,next) => {
    const statusCode = err.statusCode ? err.statusCode : 500

    res.status(statusCode).json({
        status: statusCode,
        error: process.env.MODE === 'production' ? null : err.stack
    })

    next()
}

module.exports = errorHandler