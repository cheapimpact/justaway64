export const numberIDFormat = (val: string | number) => {
  var number = val.toString(),
    split = number.split("."),
    sisa = split[0].length % 3,
    value = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? "." : "";
    value += separator + ribuan.join(".");
  }

  value = split[1] !== undefined ? value + "," + split[1] : value;
  return value;
};

// perlu dibenerin
// https://regex101.com/
export const numberIDParse = (val: string) => {
  let res = val;
  // eslint-disable-next-line
  if (/,,/.test(res) || res.split(",").length > 2) {
    res = res.slice(0, -1);
  }
  // ngilangin titik
  // eslint-disable-next-line
  while (/[\.\-]/.test(res)) {
    // eslint-disable-next-line
    res = res.replace(/[\.\-]/, "");
  }
  // pencegahan untuk logic pertama /[\.\-]/.test(res), soalnya gapaham code dibawah ini bakal keeksekusi pada saat while masih jalan
  // eslint-disable-next-line
  if (!/[\.\-]/.test(res) && /(?![\,|\d]).*/.test(res)) {
    // funsi ini untuk menghapus semua value selain "," ata "d" digit
    // eslint-disable-next-line
    res = res.replace(/(?![\,|\d]).*/, "");
  }
  // ganti koma jadi titik
  // wowokowkw
  return res.replace(",", ".");
};
