/*const server=require('node-http-server');
const config=new server.Config;
config.port=8080;

server.deploy(config);*/
var jsonServer = require('json-server');
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var jwtSecret = 'JWT_SECRET';

var user = {
  email: 'user@example.com',
  password: 'secret'
};

var admin = {
  email: "admin@example.com",
  password: "secret"
};

var app = jsonServer.create();
app.use(cors());
app.use(jsonServer.bodyParser);
// app.use(expressJwt({secret: jwtSecret}).unless({path: ['/login']}));

app.post('/login', authenticate, function (req, res) {
  var token = jwt.sign({email: req.body.email}, jwtSecret);  
  res.send({token: token, user: req.body});  
});
//app.use(jsonServer.router(''));
app.use(jsonServer.defaults({"static":"./dist"}));
app.listen(8080);

function authenticate(req, res, next) {
  var body = req.body;
  console.log(body)
  if (!body.email || !body.password) {
    res.status(400).end('Must provide email and password');
  }else if(body.email == user.email && body.password == user.password){
    next();
  }else if(body.email == admin.email && body.password == admin.password){
    next();
  } else {
    res.status(401).end('Email or password incorrect');
  }
}