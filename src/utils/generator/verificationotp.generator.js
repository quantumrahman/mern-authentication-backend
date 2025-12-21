// import modules ---------------------------------------->
import crypto from 'crypto';

// generator --------------------------------------------->
const generatorVerificationOtp = (min = 100000, max = 1000000) => {
    return crypto.randomInt(min, max).toString();
};

// export modules ---------------------------------------->
export default generatorVerificationOtp;
