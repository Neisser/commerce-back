const FIVE_MINUTES_IN_SECONDS = 300

function cacheResponse(res,seconds){
    res.set('Cache-Control', `public, max-cache=${seconds}`)
}

module.exports={
    cacheResponse,
    FIVE_MINUTES_IN_SECONDS
}