import {convert } from 'html-to-text';
import gTTS from 'gtts';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';


dotenv.config();
// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

  const TextToSpeechConvert = (text) => {
    return new Promise(async (resolve, reject) => {
      try {
        const plainText = convert(text, {
          wordwrap: false,
          selectors: [
            { selector: 'img', format: 'skip' },
            { selector: 'button', format: 'skip' },
          ]
        });
  
        const language = 'en';
        const speech = new gTTS(plainText, language);
        const mp3FilePath = 'output.mp3';
  
        speech.save(mp3FilePath, async (err) => {
          if (err) {
            console.error('Error converting text to MP3:', err);
            reject(err);
          } else {
            // console.log(`MP3 file saved at: ${mp3FilePath}`);
            try {
              const uploadResult = await cloudinary.uploader.upload(mp3FilePath, {
                resource_type: 'auto',
                public_id: `audio/${Date.now()}`,
              });
              // console.log('Upload success:', uploadResult);
              resolve(uploadResult);
            } catch (uploadError) {
              // console.error('Error uploading audio file:', uploadError);
              reject(uploadError);
            } finally {
              fs.unlinkSync(mp3FilePath);
            }
          }
        });
      } catch (error) {
        // console.error('Error converting text:', error);
        reject(error);
      }
    });
  };
  
  export default TextToSpeechConvert;
  