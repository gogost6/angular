

// function isOwner() {
//     return (req, res, next) => {
//         if (req.data.trip && req.user && (req.data.trip.owner.email == res.locals.user.email)) {
//             next();
//         } else {
//             res.status(400);
//         }
//     };
// }

module.exports = {
    isAuth() {
        return (req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.status(400);
            }
        };
    },
    isGuest() {
        return (req, res, next) => {
            if (!req.user) {
                next();
            } else {
                res.status(400);
            }
        };
    }
};