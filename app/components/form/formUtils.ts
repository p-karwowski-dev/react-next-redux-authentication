export const formValidation = (formData: FormData): boolean => {
  for (const key of formData.keys()) {
    if (!formData.get(key)) return false
  }
  return true
}
