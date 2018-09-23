const Koa = require('koa');
const json = require('koa-json');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();

//Replace with const {
const things = ['My Family', 'Programming', 'Music'];

//Json prettier middleware
app.use(json());
app.use(bodyParser());

//Simple middleware
// app.use(async ctx => (ctx.body = { msg: 'Hello World' }));

app.context.user = 'Watit';

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});

const index = async ctx => {
  await ctx.render('index', { title: 'Things I Love:', things });
};

const showAdd = async ctx => {
  await ctx.render('add');
};

const add = async ctx => {
  things.push(ctx.request.body.thing);
  ctx.redirect('/');
};

router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

router.get('/test', ctx => (ctx.body = { msg: `Hello ${ctx.user}` }));
router.get(
  '/test/:name',
  ctx => (ctx.body = { msg: `Hello ${ctx.params.name}` })
);

//Router middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server started...'));
