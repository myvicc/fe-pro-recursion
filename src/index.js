/**
 * Принимает два объекта, должна вернуть или true или false, если объекты идентичны внутри, возвращает
 * true, если есть различие, false. То есть проверяет каждое свойство, вне зависимости от вложенности,
 * делаем через рекурсию(а других вариантов и нет)
 */
export const deepEqual = (obj, anotherObject) => {
  let status;

  for (let key in obj) {
    if (!anotherObject.hasOwnProperty(key) || Object.keys(obj).length !== Object.keys(anotherObject).length) {
      status = false;
      break;
    } else if ((obj[key] instanceof Object) && (anotherObject[key] instanceof Object)) {
      status = deepEqual(obj[key], anotherObject[key]);
      if (status === false) break;
    } else if (obj[key] === anotherObject[key]) {
      status = true;
    } else {
      status = false;
      break;
    }
  }

  return status;
};

/**
 * Принимает объект, возвращает его глубокую копию, то есть ни одно свойство
 * не является ссылочным у другого объекта, точно возвращает новое.
 * Если это массив, возвращает новый массив(map) и если элемент массива не простого типа,
 * то тогда в рекурсию. С объектом также. Поскольку массив при typeof возвращает object, чтобы
 * их различить берем метод Array.isArray и он на массивах вернет тру
 */
export const deepCopy = (obj) => {
  if (Array.isArray(obj)) {
    let copy = [];
    obj.map((item) => {
      if (Array.isArray(item)) {
        copy.push(deepCopy(item));
      }
      else copy.push(item);
    });
    return copy;
  }
  else
    return Object.entries(obj).reduce((copy,[key, value]) => {
      if (value instanceof Object) {
        copy[key] = deepCopy(value);
        return copy;
      }
      copy[key] = value;
      return copy;
    }, {});
};

/**
 * Мы передаем объект, и должны вернуть массив уникальных названий свойств
 * То есть если у нас объект { name: { bohdan: { name: 'test' } } } вернет ['name', 'bohdan']
 */
export const getAllObjectKeys = (obj) => {

  let result = [];
  Object.entries(obj).forEach(([key, value]) => {
    if (result && !result.includes(key)) result.push(key);
    if (value instanceof Object) {
      return result = [...new Set([...result, ...getAllObjectKeys(value)])];
    } else return result;
  });
  return result;
};
