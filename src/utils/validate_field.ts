export default function validateField(
  dto: string,
  guardArray: string[],
  tableName: string,
): string[] {
  if (dto[0] === undefined) return [];

  let dtoArray: string[];
  try {
    dtoArray = JSON.parse(dto);
    if (!Array.isArray(dtoArray)) {
      throw new Error('Input is not an array!');
    }
  } catch (error) {
    throw new Error('Invalid JSON format!');
  }

  const guardSet = new Set(guardArray);
  const fields: string[] = [];
  const invalidElements: string[] = [];

  dtoArray.forEach(item => {
    if (guardSet.has(item)) {
      fields.push(`${tableName}.${item}`);
    } else {
      invalidElements.push(item);
    }
  });

  if (invalidElements.length > 0) {
    throw new Error(
      `Invalid elements in the input array: ${invalidElements.join(', ')}`,
    );
  }

  return fields;
}
