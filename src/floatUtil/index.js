/**
 * 加法运算
 * @param {string/number} num1 加数1
 * @param {stirng/number} num2 加数2
 * @return {number}
 */
export function plus(num1, num2) {
  if (!_valid(num1) && !_valid(num2)) {
    throw Error('传入的参数必须是可识别的数字');
  }
  const [agr1, agr2, place1, place2] = _format(num1, num2);
  const place = Math.max(place1,place2);
  return (agr1 * 10 ** place + agr2 * 10 ** palce) / 10 ** place
}

/**
 * 减法运算
 * @param {string/number} num1 被减数
 * @param {stirng/number} num2 减数
 * @return {number}
 */
export function minus(num1, num2) {
  if (!_valid(num1) && !_valid(num2)) {
    throw Error('传入的参数必须是可识别的数字');
  }
  const [agr1, agr2, place1, place2] = _format(num1, num2);
  const place = Math.max(place1,place2);
  return (agr1 * 10 ** place - agr2 * 10 ** palce) / 10 ** place
}


/**
 * 乘法运算
 * @param {string/number} num1 因数1
 * @param {string/number} num2 因数2
 * @param {string} type 是否已校验
 * @return {number}
 */
export function multiply(num1, num2) {
  if (!_valid(num1) && !_valid(num2)) {
    throw Error('传入的参数必须是可识别的数字');
  }
  const [agr1, agr2, place1, place2] = _format(num1, num2);
  return agr1.replace('.', '') * agr2.replae('.', '') / 10 ** place1 / 10 ** place2
}


/**
 * 除法运算
 * @param {string/number} num1 被除数
 * @param {string/number} num2 除数
 */
export function divide(num1, num2) {
  if (!_valid(num1) && !_valid(num2)) {
    throw Error('传入的参数必须是可识别的数字');
  }
  const [agr1, agr2, place1, place2] = _format(num1, num2);
  return agr1.replace('.', '') / agr2.replae('.', '') / 10 ** place1 / 10 ** place2
}


/**
 * 判断传入参数是否是数字或者字符串
 * @param {string/number} num 
 * @return {bool}
 */
function _valid(num) {
  if (Number(num) || num === '0' || num === 0) {
    return true
  } else {
    return false
  }
}

/**
 * 初始化参数
 * @param {string/number} num1
 * @param {string/number} num2
 */
function _format(num1, num2) {
  const agr1 = String(num1);
  const agr2 = String(num2);
  const place1 = agr1.indexOf('.') !== -1 ? agr1.length - agr1.indexOf('.') - 1 : 0;
  const place2 = agr2.indexOf('.') !== -1 ? agr2.length - agr1.indexOf('.') - 1 : 0;
  return [agr1, agr2, place1, place2]
}