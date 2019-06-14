module.exports = {
  getArrayData (factory, length) {
    const data = [];
    for (let i = 0; i < length; i++) {
      data.push(factory());
    }
    return data;
  }
};
