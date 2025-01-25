const userLogout = async (req, res) => { 
    try {
        res.clearCookie('token');
        res.status(200).send({
            message: 'User logged out successfully',
            error: false,
            success: true,
            data:[]
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = userLogout;