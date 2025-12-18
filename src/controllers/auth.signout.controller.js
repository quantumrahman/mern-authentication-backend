// import modules ---------------------------------------->
import 'dotenv/config';

// controller -------------------------------------------->
const signOutController = async (req, res, next) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_DEV === 'production',
            sameSite: process.env.NODE_DEV === 'production' ? 'none' : 'strict',
        });

        return res.status(200).json({
            success: true,
            message: 'Logout successfully!',
        });
    } catch (error) {
        next(error);
    }
};

// export modules ---------------------------------------->
export default signOutController;
