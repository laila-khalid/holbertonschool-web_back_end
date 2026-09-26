export default function updateStudentGradeByCity(listStudents, city, newGrades) {
  if (!Array.isArray(listStudents)) {
    return [];
  }

  return listStudents
    .filter((student) => student.location === city)
    .map((student) => {
      const match = newGrades.find((grade) => grade.studentId === student.id);
      return {
        ...student,
        grade: match ? match.grade : 'N/A',
      };
    });
}