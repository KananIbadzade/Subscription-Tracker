const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };

        error.message = err.message;

        console.error(err);

        //Mongoose bad ObjectId
        if ( err.name === 'CastError' ) {
            const message = `Resource not found`;

            error = new Error(message);
            error.statusCode = 404;
        }

        //Mongo dublicate key
        if ( err.code === 11000 ) {
            const message = `Dublicate field value entered`;

            error = new Error(message);
            error.statusCode = 400;
        }

        //Mongoose validation error
        if ( err.code ==='ValidationError' ) {
            const message = Object.values(err.errors).map(value => value.message);

            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server Error',
        });

    } catch (err) {
        next(err);
    }
};

export default errorMiddleware;