const extension = [
  'png',
  'jpg',
  'jpeg',
  'bmp'
];

/**
 * Method to validate if file extension is ok for img
 * @param imgName Name of img File
 * @return Boolean, true if extension is ok, false otherwise
 */
export function imgValidator(imgName: string): boolean {
  const extensionImg = imgName.substr(imgName.lastIndexOf('.') + 1);

  return extension.includes(extensionImg.toLowerCase());
}
