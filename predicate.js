var predicate, callback;

function middleware(request, response, next) {
    if (predicate(request)) {
        if (callback && callback(request)) {
            next();
        }
    }
    else {
        next();
    }
}

function regexToPredicate(regex) {
    return request => request.path.search(regex) >= 0;
}

module.exports = (predicateFunc, callbackFunc) => {
    if (predicateFunc instanceof RegExp) {
        predicateFunc = regexToPredicate(predicateFunc);
    }
    predicate = predicateFunc;
    callback = callbackFunc;
    return middleware;
};
