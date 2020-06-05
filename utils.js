
exports.pad = (val, size=2, str='0') => {
    return String(val).padStart(size,str);
};

exports.fit = (val, size=2, str=' ') => {
    return String(val + [].constructor(size).join(str) ).substr(0, size);
};

exports.center = (val, size=80, str=' ') => {
    val = String(val);
    let len = Math.floor((size - val.length)/2);
    let s = [].constructor(len).join(str) + val + [].constructor(len).join(str)
    s += s.length<size ? str : '';
    return s;
};