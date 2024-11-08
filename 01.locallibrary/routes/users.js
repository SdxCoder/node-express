import { Router } from 'express';
var router = Router();

/* GET users listing. */
const usersRouter = router.get('/', function (req, res, next) {
  res.send('users resourse');
});

export default usersRouter;
