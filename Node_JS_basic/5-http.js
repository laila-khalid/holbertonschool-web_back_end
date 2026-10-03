const http = require('http');
const fs = require('fs');

const countStudents = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data
      .trim()
      .split('\n')
      .filter((line) => line.trim() !== '');

    const students = lines.slice(1);
    const fields = {};

    students.forEach((line) => {
      const student = line.split(',');
      const firstName = student[0];
      const field = student[3];

      if (!fields[field]) fields[field] = [];
      fields[field].push(firstName);
    });

    const output = [`Number of students: ${students.length}`];

    Object.keys(fields).forEach((field) => {
      output.push(
        `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`,
      );
    });

    resolve(output.join('\n'));
  });
});

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const database = process.argv[2];

    countStudents(database)
      .then((result) => {
        res.end(`This is the list of our students\n${result}`);
      })
      .catch((err) => {
        res.end(`This is the list of our students\n${err.message}`);
      });
  } else {
    res.end();
  }
});

app.listen(1245);

module.exports = app;