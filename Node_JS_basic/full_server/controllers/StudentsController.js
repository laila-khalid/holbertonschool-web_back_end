import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    const dbPath = process.argv.length > 2 ? process.argv[2] : '';
    readDatabase(dbPath).then((fields) => {
      const parts = ['This is the list of our students'];
      const keys = Object.keys(fields).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
      
      keys.forEach((key) => {
        parts.push(`Number of students in ${key}: ${fields[key].length}. List: ${fields[key].join(', ')}`);
      });
      
      response.status(200).send(parts.join('\n'));
    }).catch(() => {
      response.status(500).send('Cannot load the database');
    });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    
    const dbPath = process.argv.length > 2 ? process.argv[2] : '';
    readDatabase(dbPath).then((fields) => {
      const list = fields[major] || [];
      response.status(200).send(`List: ${list.join(', ')}`);
    }).catch(() => {
      response.status(500).send('Cannot load the database');
    });
  }
}

export default StudentsController;
