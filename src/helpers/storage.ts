export const setStorageItem = (itemKey: string, itemValue: any) => {
  const item = JSON.stringify(itemValue)
  localStorage.setItem(itemKey, item)
}
export const getStorageItem = (itemKey: string) => {
  const item = localStorage.getItem(itemKey) as string
  return JSON.parse(item)
}
