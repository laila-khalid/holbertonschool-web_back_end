const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;
const DB_FILE = process.argv[2];

/**
 * Asynchronously parses student records from a CSV file.
 * Returns a Promise that resolves with the formatted string report.
 */
function countStudents(path) {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject(new Error('Cannot load the database'));
      return;
    }

    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      if (lines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }

      const students = lines.slice(1);
      const reportLines = [];
      reportLines.push(`Number of students: ${students.length}`);

      const fields = {};

      students.forEach((student) => {
        const studentData = student.split(',');
        if (studentData.length >= 4) {
          const firstName = studentData[0].trim();
          const field = studentData[3].trim();

          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(firstName);
        }
      });

      Object.keys(fields).forEach((field) => {
        const list = fields[field];
        reportLines.push(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      });

      resolve(reportLines.join('\n'));
    });
  });
}

// Root route handler
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Students route handler
app.get('/students', (req, res) => {
  countStudents(DB_FILE)
    .then((report) => {
      res.send(`This is the list of our students\n${report}`);
    })
    .catch((error) => {
      res.send(`This is the list of our students\n${error.message}`);
    });
});

app.listen(PORT);

module.exports = app;