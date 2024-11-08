import { Router } from 'express';
const router = Router();

/* GET home page. */
const indexRouter = router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

export default indexRouter;
