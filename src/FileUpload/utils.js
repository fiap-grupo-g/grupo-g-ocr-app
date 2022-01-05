
export function acceptedFileExtensions(extensions) {
  if (extensions.length) {
    let accept = "";
    extensions.forEach(ext => (accept += `.${ext},`));
    return { accept };
  }
  return null;
};

export const fileToBase64 = async (file) =>
new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsBinaryString(file)
  reader.onload = () => resolve(btoa(reader.result))
  reader.onerror = (e) => reject(e)
})

// const extractFile = el => el && el.files && el.files.length > 0 && el.files[0];
