module.exports = {
    create: async (req, res) => {
        try {
            const body = req.body

            return res.status(201).send({
                status: 201,
                data: body,
                message: "content created",
                code: "OK"
            });
            
        } catch (error) {
            //return error
            res.status(500).json({
                status: 500,
                message: error.message,
                code: "Internal Server Error",
                exceptionName: "Internal Error",
                fields: error.fieldWithError,
                mongoCode: error.code,
            });
        }
    }
}