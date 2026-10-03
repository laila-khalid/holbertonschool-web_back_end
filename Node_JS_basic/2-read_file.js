const fs = require('fs');

function countStudents(path) {
  let data;
  try {
    data = fs.readFileSync(path, 'utf8');
  } catch (e) {
    throw new Error('Cannot load the database');
  }

  const lines = data.split('\n').filter((line) => line.trim() !== '');
  const students = lines.slice(1);

  console.log(`Number of students: ${students.length}`);

  const fields = {};
  students.forEach((line) => {
    const parts = line.split(',');
    const firstName = parts[0];
    const field = parts[3];
    if (!fields[field]) fields[field] = [];
    fields[field].push(firstName);
  });

  Object.keys(fields).forEach((field) => {
    console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
  });
}

module.exports = countStudents;