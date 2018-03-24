var caradisiac = require('./caradisiac');


module.exports = async () => {
        try {
            return await caradisiac.GetCarsFromElastic();
        } catch (e) {
            return (e);
        }
