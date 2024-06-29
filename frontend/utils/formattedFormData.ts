const formattedFormData = (data: any) => {
  const camelCaseToNormal = (name: string) => {
    const words = name.split(/(?=[A-Z])/);

    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const isDate = (value: any): value is Date => {
    return value instanceof Date && !isNaN(value.getTime());
  };

  const formattedData = Object.entries(data).map(([key, value]) => {
    const normalKey = camelCaseToNormal(key);
    const formattedValue = isDate(value) ? value.toLocaleDateString() : value;
    return `${normalKey}: ${formattedValue}`;
  });

  return formattedData;
};

export default formattedFormData;
