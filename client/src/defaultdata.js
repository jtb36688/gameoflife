const cellData = []

for (let i = 1; i <= 2500; i++) {
    if (i === 0) {
       cellData.push(true)
    } else {
        cellData.push(false)
    }
}

export default cellData;