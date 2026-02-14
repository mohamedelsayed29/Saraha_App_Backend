export function corsOptions() {
    const whitelist = process.env.WHITELIST.split(",").map(origin => origin.trim());
    const corsOptions = {
        origin: function (origin, callback) {
            if(!origin){
                return callback(null, true);
            }
            if (whitelist.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        }
    };
    return corsOptions;
}