export const generateFloors = (howMany: number) => {
  let floors: number[] = new Array(howMany).fill(1)
  floors = floors.map((_, index) => {
    return index + 1
  })
  return floors.reverse()
}
