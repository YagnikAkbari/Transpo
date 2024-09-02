function ValidationCheck(values, ...args) {
  let missingKeys = [];  

  if (args && args?.length) {
    missingKeys = args?.map((key) => {
      if (
        values[key] === null ||
        values[key] === undefined ||
        values[key] === ""
      ) {
        return {[key]: `Please Enter ${key}.`};
      }
    });
  }  
  return missingKeys.filter(item => item);
}

module.exports = { ValidationCheck };
