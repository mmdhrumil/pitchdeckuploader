import { downloadWrapper } from '../../lib/supabaseUtilities';
const libre = require('libreoffice-convert');
import fs from 'fs';

export default async (req, res) => {
    const filename = req.body.filename

    const outputPath = "cache/" + filename + ".pdf"

    const downloadedResponse = await downloadWrapper(filename);
    const currentBuffer = await downloadedResponse.data.arrayBuffer();
    var convertedBuffer = "";

    libre.convert(Buffer.from(currentBuffer), ".pdf", undefined, (err, done) => {
      if (err) {
        console.log(`Error converting file: ${err}`);
      }
      // fs.writeFileSync(outputPath, done);
      res.send({msg: "success", convertedFileBlob: done})
    });
    
  }

