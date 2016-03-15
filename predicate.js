function middleware(predicate, callback) {
    if (predicate instanceof RegExp) {
        predicate = regexToPredicate(predicate);
    }
    return (request, response, next) => {
        if (predicate(request)) {
            if (callback && callback(request)) {
                next();
            }
        }
        else {
            next();
        }
    };
}

function regexToPredicate(regex) {
    return request => request.path.search(regex) >= 0;
}

module.exports = middleware;
