const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    
    // Split lines and filter out empty lines or header
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    const students = lines.slice(1); // Remove the header row
    console.log(`Number of students: ${students.length}`);

    const fields = {};

    for (const student of students) {
      const studentData = student.split(',');
      // Ensure the row has the required fields (firstname, lastname, age, field)
      if (studentData.length >= 4) {
        const firstName = studentData[0].trim();
        const field = studentData[3].trim();

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      }
    }

    for (const [field, list] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;