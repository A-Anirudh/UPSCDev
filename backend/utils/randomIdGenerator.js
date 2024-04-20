export const generateRandomString = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    
    // Generate random string of length 9
    for (let i = 0; i < 9; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    // Insert hyphens after every 3 characters
    const stringWithHyphens = randomString.replace(/(.{3})/g, '$1-');
    
    // Remove the trailing hyphen
    return stringWithHyphens.slice(0, -1);
  }