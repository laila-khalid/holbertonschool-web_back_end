export default function cleanSet(set, startString) {
  if (!set || !startString || typeof startString !== 'string' || !(set instanceof Set)) {
    return '';
  }

  const parts = [];
  set.forEach((val) => {
    if (typeof val === 'string' && val.startsWith(startString)) {
      parts.push(val.slice(startString.length));
    }
  });

  return parts.join('-');
}