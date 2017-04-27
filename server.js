const express = require('express');
const queryString = require('query-string');

const app = express();


app.use(express.static('public'));

const USERS = [
  {id: 1,
   firstName: 'Joe',
   lastName: 'Schmoe',
   userName: 'joeschmoe@business.com',
   position: 'Sr. Engineer',
   isAdmin: true,
   // NEVER EVER EVER store passwords in plain text in real life. NEVER!!!!!!!!!!!
   password: 'password'
  },
  {id: 2,
   firstName: 'Sally',
   lastName: 'Student',
   userName: 'sallystudent@business.com',
   position: 'Jr. Engineer',
   isAdmin: true,
   // NEVER EVER EVER store passwords in plain text in real life. NEVER!!!!!!!!!!!
   password: 'password'
  },
  {id: 3,
   firstName: 'Lila',
   lastName: 'LeMonde',
   userName: 'lila@business.com',
   position: 'Growth Hacker',
   isAdmin: false,
   // NEVER EVER EVER store passwords in plain text in real life. NEVER!!!!!!!!!!!
   password: 'password'
  },
  {id: 4,
   firstName: 'Freddy',
   lastName: 'Fun',
   userName: 'freddy@business.com',
   position: 'Community Manager',
   isAdmin: false,
   // NEVER EVER EVER store passwords in plain text in real life. NEVER!!!!!!!!!!!
   password: 'password'
  } 
];


function hasValidLoginCredentials(userName, password, users) {
  return users.filter(
    (user, index) => user.userName === userName && user.password === password)
    .length === 1;
}

function isAdminUser(userName, users) {
  return users.filter((user, index) => user.userName === userName && user.isAdmin).length === 1;
}

function adminOnly(req, res, next) {
  console.log(req.get('x-username-and-password'));
  const {user, pass} = Object.assign(
    {user: null, pass: null}, queryString.parse(req.get('x-username-and-password')));
  if (!hasValidLoginCredentials(user, pass, USERS)) {
    return res.status(401).json({message: 'Must provide valid credentials'});
  }
  if (!isAdminUser(user, USERS)) {
    return res.status(403).json({message: 'Unauthorized'});
  }
  next();
}
  

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.use('/admin', adminOnly);

app.get("/admin/", (req, res) => {
  res.sendFile(`${__dirname}/views/admin-dashboard.html`);
});

app.get("/admin/api/users", (req, res) => res.json(USERS.map((user, index) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    id: user.id,
    userName: user.userName,
    position: user.position
  };
})));

app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${process.env.PORT}`);
});
