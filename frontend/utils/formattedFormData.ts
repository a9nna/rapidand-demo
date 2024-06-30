const formattedFormData = (data: any) => {
  const camelCaseToNormal = (name: string) => {
    const words = name.split(/(?=[A-Z])/)

    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const formattedData = Object.entries(data).map(([key, value]) => {
    function isValidDate(value: string): boolean {
      const date = new Date(value)
      return !isNaN(date.getTime())
    }

    const normalKey = camelCaseToNormal(key)
    const formattedValue = isValidDate(value as string)
      ? new Date(value as string).toLocaleDateString()
      : (value as string)

    return { key: normalKey, value: formattedValue }
  })

  return formattedData
}

export default formattedFormData
