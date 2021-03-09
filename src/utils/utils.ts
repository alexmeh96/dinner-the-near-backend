import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';


// const storage = (dir: string): Object =>  {
//   console.log(dir)
//   console.log('!!!!!!!!!!!!!!!!1')
//   return {
//     storage: diskStorage({
//       destination: dir,
//       filename: (req, file, cb) => {
//         const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
//         const extension: string = path.parse(file.originalname).ext;
//
//         cb(null, `${filename}${extension}`);
//       },
//     })
//   }
// };

export function storage(dir: string): Object {
  console.log(dir)
  console.log('!!!!!!!!!!!!!!!!')
  return {
    storage: diskStorage({
      destination: dir,
      filename: (req, file, cb) => {
        const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension: string = path.parse(file.originalname).ext;

        cb(null, `${filename}${extension}`);
      },
    })
  }
}
