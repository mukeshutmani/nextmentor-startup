
import fs from 'fs'
import path from 'path'



export const SaveFilesLocally =  async (file: File) => {
       
    const buffer = Buffer.from( await file.arrayBuffer());

    const uploadDir = path.join(process.cwd(), "./uploads")

    if( !fs.existsSync(uploadDir )) {
        fs.mkdirSync(uploadDir, { recursive: true})
    }

    const filePath = path.join(uploadDir, file.name);
    console.log("file Path", filePath);
    
    fs.writeFileSync(filePath, buffer)

    return { filePath, __filename: file.name}
}