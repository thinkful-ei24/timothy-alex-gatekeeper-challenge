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

function getAuthedUser(req, res, next) {
  const {user, pass} = Object.assign(
    {user: null, pass: null}, queryString.parse(req.get('x-username-and-password')));
  req.user = USERS.find(
    (usr, index) => usr.userName === user && usr.password === pass);
  next();
}
  

app.use('/api/admin', adminOnly);

app.get("/api/admin/", (req, res) => {
  res.sendFile(`${__dirname}/views/admin-dashboard.html`);
});

app.get("/admin/api/users", (req, res) => res.json(USERS.map((user, index) => {
  console.log(`${req.user} accessing req.url`);
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
