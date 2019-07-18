import flowerCells from "./flowerCells"
import eurekaCells from "./eurekaCells"
import gosperGunCells from "./gosperGunCells"
import gliderDiamondCells from "./gliderDiamondCells"

const cellData = []
const gosperGun = []
const flower = []
const eureka = []
const gliderDiamond = []

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
    if (eurekaCells.includes(i)) {
        eureka.push(true)
    } else {
        eureka.push(false)
    }
}

for (let i = 1; i <= 2500; i++) {
    if (gliderDiamondCells.includes(i)) {
        gliderDiamond.push(true)
    } else {
        gliderDiamond.push(false)
    }
}

for (let i = 1; i <= 2500; i++) {
    if (i === 0) {
        cellData.push(true)
    } else {
        cellData.push(false)
    }
}


export {cellData, gosperGun, flower, eureka, gliderDiamond};