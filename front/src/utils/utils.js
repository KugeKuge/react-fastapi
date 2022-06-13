function pictureReseizeCalculator (baseSize, width, height) {
    const calculatedSize = [0, 0];
    let magnification = 0;

    if (width > height) {
        magnification = baseSize / width;
    } else {
        magnification = baseSize / height;
    }

    calculatedSize[0] = magnification * width;
    calculatedSize[1] = magnification * height;

    return calculatedSize;
}

export default {pictureReseizeCalculator};