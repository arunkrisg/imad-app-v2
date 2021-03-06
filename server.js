var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'arunkrisg',
    database: 'arunkrisg',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    /*password: process.env.DB_PASSWORD*/
    password: 'db-arunkrisg-54133'
};

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one' : {
      title: 'Article One | Arun Krishnan',
      heading: 'Article One',
      date: 'Feb 10, 2017',
      content:    `
                    <p>
                        This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
                    </p>
                    <p>
                        This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
                    </p>
                    <p>
                        This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
                    </p>`
    },
    'article-two' : {
      title: 'Article Two | Arun Krishnan',
      heading: 'Article Two',
      date: 'Feb 11, 2017',
      content:    `
                    <p>
                        This is the content for my second article.This is the content for my second article.
                    </p>
                    <p>
                        This is the content for my second article.This is the content for my second article.
                    </p>
                    <p>
                        This is the content for my second article.This is the content for my second article.
                    </p>`
    },
    'article-three' : {
        title: 'Article Three | Arun Krishnan',
      heading: 'Article Three',
      date: 'Feb 12, 2017',
      content:    `
                    <p>
                        This is the content for my third article.This is the content for my third article.
                    </p>
                    <p>
                        This is the content for my third article.This is the content for my third article.
                    </p>
                    <p>
                        This is the content for my third article.This is the content for my third article.
                    </p>`
    }
};
function createTemplate (data) {
    title = data.title;
    date = data.date;
    heading = data.heading;
    content = data.content;

    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${title};
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
            
        </head>
        <body>
            <div class="container">
                <div>
                        <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date.toDateString()}
                </div>
                <div>
                    ${content}
                    
                </div>
            </div>
        </body>
    </html> `;
    
    return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);

app.get('/test-db', function(req, res) {
  // make a select request
  //return a response with the result
  pool.query('SELECT * FROM test', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
  });
});

var counter = 0;
app.get('/counter', function (req, res) {
   counter = counter + 1;
   res.send(counter.toString());
});

/*
var names = [];
app.get('/submit-name/:name', function(req, res) {
    // Get the name from the request
        var name = req.params.name;
        names.push(name);
        // JSON - Java Script Object Notation
        res.send(JSON.stringify(names));
});
*/

var names = [];
app.get('/submit-name', function(req, res) { //submit-name?name=xxxx
    // Get the name from the request
        var name = req.query.name;
        names.push(name);
        // JSON - Java Script Object Notation
        res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function(req, res) {
  //articleName == article-one
  //articles[articleName] == {} content object for article one
  //SELECT * FROM article WHERE title = 'article-one'
  //SELECT * FROM article WHERE title = ''; DELETE WHERE a = 'asdf' --- A hacker can hack the system by using this way and delete the records from the database (SQL Injection)
  // To overcome the above situation use parametrs ($1) is used in PostgreSQL in the query to protect the data as shown below
  //SELECT * FROM article WHERE title = '\'; DELETE WHERE a = \'asdf'
  
  pool.query("SELECT * FROM article WHERE title = $1" , [req.params.articleName], function (err, result) {
    if (err)   {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Articel not found');
        } else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    } 
  }); 
});

/*
app.get('/article-one', function(req, res) {
  //res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
  res.send(createTemplate(articleOne));
});

app.get('/article-two', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});
*/

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
