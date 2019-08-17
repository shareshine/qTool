/**
 * 通过key获取value
 * @params key 要获取地value对应地key
 * @params list 数据源  [{ "key": ${key}, "value": ${value} }]
 * @return value
 */
export function keyTovalue(key, list) {
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (item.key === key) {
            return item.value
        }
    }
    return key
}

/**
 * 通过key获取value
 * @params value 要获取地key对应地value
 * @params list 数据源  [{ "key": ${key}, "value": ${value} }]
 * @return key
 */
export function valueToKey(value, list) {
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (item.value === value) {
            return item.key
        }
    }
    return value
}
