const router = require('express').Router();

const { 
    signUpWithEmail, 
    signUpWithGoogle,
    signUpWithFacebook,
    signInWithEmail,
    signInWithGoogle,
    signInWithFacebook,
    forgetsendmail,
    resetPassword,
    getYearlyUsers,
    getMonthlyUsers,
    getDailyUsers,
    getTotalUserCount,
    getTopUsers,
    getAllUsers,
    getAllCustomers,
    deleteUsers,
    getNewUsers,
    getActiveUsers,
    getSuspendedUsers,
    suspendById,
    unSuspendById,
    getAllUsersByUserName,
    getNewUsersByUserName,
    getActiveUsersByUserName,
    getSuspendedUsersByUserName
} = require('../controller/users');
const { route } = require('./admin');
router.post('/suspend', suspendById);
router.post('/unsuspend', unSuspendById);

router.post('/signup', signUpWithEmail);
router.post('/signup/google', signUpWithGoogle);
router.post('/signup/facebook', signUpWithFacebook);

router.post('/signin', signInWithEmail);
router.post('/signin/google', signInWithGoogle);
router.post('/signin/facebook', signInWithFacebook);

router.post('/forgot/confirm', forgetsendmail);
router.post('/reset/password', resetPassword);

router.get('/total', getTotalUserCount);
router.get('/yearly', getYearlyUsers);
router.get('/monthly', getMonthlyUsers);
router.get('/daily', getDailyUsers);

router.get('/top', getTopUsers);
router.get('/all', getAllUsers);
router.get('/manager/all', getAllCustomers);
router.get('/new', getNewUsers);
router.get('/active', getActiveUsers);
router.get('/suspended', getSuspendedUsers);

router.get('/byuser/all', getAllUsersByUserName);
router.get('/byuser/new', getNewUsersByUserName);
router.get('/byuser/active', getActiveUsersByUserName);
router.get('/byuser/suspended', getSuspendedUsersByUserName);

router.delete('/', deleteUsers);

module.exports = router;
