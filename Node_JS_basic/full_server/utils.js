import fs from 'fs';

const readDatabase = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      reject(Error('Cannot load the database'));
      return;
    }
    const lines = data.trim().split('\n').filter((line) => line.length > 0);
    const fields = {};
    
    // Skip header and process students
    for (let i = 1; i < lines.length; i += 1) {
      const student = lines[i].split(',');
      const field = student[3];
      const firstName = student[0];
      if (!fields[field]) fields[field] = [];
      fields[field].push(firstName);
    }
    resolve(fields);
  });
});

export default readDatabase;
