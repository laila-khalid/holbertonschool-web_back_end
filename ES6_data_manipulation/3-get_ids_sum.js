export default function getStudentIdsSum(listStudents) {
  if (!Array.isArray(listStudents)) {
    return 0;
  }
  return listStudents.reduce((acc, student) => acc + student.id, 0);
}