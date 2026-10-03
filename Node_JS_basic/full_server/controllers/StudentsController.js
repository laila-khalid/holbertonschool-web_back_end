import { readDatabase } from '../utils';

export class StudentsController {
  static getAllStudents(request, response) {
    const dbFile = process.argv[2];

    readDatabase(dbFile)
      .then((fields) => {
        const outputLines = ['This is the list of our students'];
        
        // Sort keys case-insensitively alphabetically
        const sortedFields = Object.keys(fields).sort((a, b) => (
          a.toLowerCase().localeCompare(b.toLowerCase())
        ));

        sortedFields.forEach((field) => {
          const list = fields[field];
          outputLines.push(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
        });

        return response.status(200).send(outputLines.join('\n'));
      })
      .catch(() => response.status(500).send('Cannot load the database'));
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    const dbFile = process.argv[2];

    if (major !== 'CS' && major !== 'SWE') {
      return response.status(500).send('Major parameter must be CS or SWE');
    }

    return readDatabase(dbFile)
      .then((fields) => {
        const list = fields[major] || [];
        return response.status(200).send(`List: ${list.join(', ')}`);
      })
      .catch(() => response.status(500).send('Cannot load the database'));
  }
}

export default StudentsController;