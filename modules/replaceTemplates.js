module.exports = function (template, JSON_Data) {
  let output = template.replace(/{%ID%}/g, JSON_Data.id);
  output = output.replace(/{%name%}/g, JSON_Data.productName);
  output = output.replace(/{%from%}/g, JSON_Data.from);
  output = output.replace(/{%image%}/g, JSON_Data.image);
  output = output.replace(/{%nutations%}/g, JSON_Data.nutrients);
  output = output.replace(/{%quantity%}/g, JSON_Data.quantity);
  output = output.replace(/{%price%}/g, JSON_Data.price);
  output = output.replace(/{%description%}/g, JSON_Data.description);

  if (!JSON_Data.organic)
    output = output.replace(/{%not-organic%}/g, "not-organic");
  return output;
};
