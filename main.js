const http = require('http');
let courses =
[
    {
        "id" : 0,
        "course" : "OOP"
    },
    {
        "id" :1,
        "course" : "Data Analysis"
    }
]

//create a server object:
const server = http.createServer((req, res) => {

    try{
        if(req.url == '/')
        {
            if(req.method == "GET")
            {
                res.statusCode = 200; 
                res.write("Hello World");            
                res.end();
            }
        }
        else if(req.url == '/courses')
        {
            if(req.method == "GET")
            {
                res.statusCode = 200;
                res.write(JSON.stringify(courses));
                res.end();
            }
            else if(req.method == "POST")
            {
                let data = '';
                req.on('data', chunk => {
                  data += chunk;
                })
                req.on('end', () => {
                  let id = JSON.parse(data).id;
                  let course = JSON.parse(data).course; 
                  let new_entry = {}
                  new_entry["id"] = id;
                  new_entry["course"] = course;
                  courses.push(new_entry);
                  console.log(courses)
                })
                res.statusCode = 201;
                res.write("success");
                res.end();
            }
            else if(req.method == "PATCH")
            {
                let data = '';
                req.on('data', chunk => {
                  data += chunk;
                })
                req.on('end', () => {
                  let id = JSON.parse(data).id;
                  let course = JSON.parse(data).course; 
                  courses.forEach(element => {
                    if(element["id"] == id)
                    {
                        element["course"] = course;
                    }
                  });
                })
                res.statusCode = 200;
                res.write("success");
                res.end();
                console.log(courses)
            }
            else if(req.method == "DELETE")
            {
                let random = generateRandom(0,courses.length-1);
                console.log(random);
                courses.splice(random,1);
                console.log(courses);
                res.statusCode = 200;
                res.write("success");
                res.end();
            }
        }
        else
        {
            res.statusCode = 404;
            res.write("Route not found");
            res.end();
        }
    }
    catch
    {
        res.statusCode = 503;
        res.write("Server Error");
        res.end();
    }

});

server.listen(5000, "localhost",() => {
    console.log("You are listening on 5000 port");
});

function generateRandom(min,max) {

    let difference = max - min;

    let rand = Math.random();

    rand = Math.floor( rand * difference);

    rand = rand + min;

    return rand;
}