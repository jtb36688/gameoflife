const cellData = []
const gosperGun = []
let gosperGunCells = [353, 354, 404, 403, 411, 461,
    462, 362, 363, 413, 469, 519, 569, 470, 521, 375, 376,
    325, 276, 277, 327, 287, 337, 338, 288, 638, 639, 690, 688,
    738, 877, 878, 879, 927, 978]

for (let i = 1; i <= 2500; i++) {
    if (gosperGunCells.includes(i)) {
        gosperGun.push(true)
    } else {
        gosperGun.push(false)
    }
}

for (let i = 1; i <= 2500; i++) {
    if (i === 0) {
        cellData.push(true)
    } else {
        cellData.push(false)
    }
}




export {cellData, gosperGun};