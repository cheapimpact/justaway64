export const isEmpty = (value: any) => {
  console.log(typeof value);
  const isArray = Array.isArray(value);
  let empty = [];
  if (isArray) {
    console.log("arraay");
    for (let i = 0; i < value.length; i++) {
      if (value[i] === undefined || value[i] === "" || value[i] === null) {
        empty.push(i);
      }
    }
  } else {
    switch (typeof value) {
      case "object":
        console.log("object");
        for (const key in value) {
          if (Object.prototype.hasOwnProperty.call(value, key)) {
            if (
              value[key] === undefined ||
              value[key] === "" ||
              value[key] === null
            ) {
              empty.push(key);
            }
          }
        }
        break;

      default:
        if (value === undefined || value === "" || value === null) {
          empty.push(value);
        }
        break;
    }
  }
  console.log({ empty });

  return empty;
};
