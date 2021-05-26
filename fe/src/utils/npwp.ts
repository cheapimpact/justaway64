// wowkowkwokwok
// cara tau biar bisa pake regex tapi dinamis
export const npwpFormat = (val: string) => {
  if (val === null || val === undefined) {
    return "";
  }
  let dot3 = val.length >= 3 ? "." : "";
  let dot6 = val.length >= 6 ? "." : "";
  let dot9 = val.length >= 9 ? "." : "";
  let strip = val.length >= 10 ? "-" : "";
  let dot13 = val.length >= 13 ? "." : "";
  return (
    val.substring(0, 3) +
    dot3 +
    val.substring(3, 5) +
    dot6 +
    val.substring(5, 8) +
    dot9 +
    val.substring(8, 9) +
    strip +
    val.substring(9, 12) +
    dot13 +
    val.substring(12)
  );
};
export const npwpParse = (val: string) => {
  let res = val;
  // eslint-disable-next-line
  while (/[\.\-\,]/.test(res)) {
    // eslint-disable-next-line
    res = res.replace(/[\.\-\,]/, "");
  }
  return res.substring(0, 15);
};
