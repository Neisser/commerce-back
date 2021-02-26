function success(req, res, message, status){
    res.status(status).send({
        "Error":"",
        "Body":message,
        "Status":status
    })
}

module.exports = {
    success
}