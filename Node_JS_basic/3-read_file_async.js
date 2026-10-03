const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      // Split lines and filter out any completely empty rows
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      if (lines.length <= 1) {
        console.log('Number of students: 0');
        resolve();
        return;
      }

      const students = lines.slice(1); // Omit header row
      console.log(`Number of students: ${students.length}`);

      const fields = {};

      // Parse records explicitly avoiding restricted loops for ESLint
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

      // Format and print structural fields summary
      Object.keys(fields).forEach((field) => {
        const list = fields[field];
        console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      });

      resolve();
    });
  });
}

module.exports = countStudents;