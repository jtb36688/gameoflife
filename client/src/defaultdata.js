import flowerCells from "./flowerCells"
import gosperGunCells from "./gosperGunCells"

const cellData = []
const gosperGun = []
const flower = []

for (let i = 1; i <= 2500; i++) {
    if (gosperGunCells.includes(i)) {
        gosperGun.push(true)
    } else {
        gosperGun.push(false)
    }
}

for (let i = 1; i <= 2500; i++) {
    if (flowerCells.includes(i)) {
        flower.push(true)
    } else {
        flower.push(false)
    }
}

for (let i = 1; i <= 2500; i++) {
    if (i === 0) {
        cellData.push(true)
    } else {
        cellData.push(false)
    }
}




export {cellData, gosperGun, flower};