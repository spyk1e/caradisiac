var caradisiac = require('./caradisiac');


module.exports = async () => {
        try {
            return await caradisiac.PutCarsOnElastic();
        } catch (e) {
            return (e);
        }
