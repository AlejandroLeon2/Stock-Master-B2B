import dotenv from "dotenv";
import  path from "path";
dotenv.config();

export const env = {
  firebase: {
    projectId: process.env.PROJECT_ID!,
    clientEmail: process.env.CLIENT_EMAIL!,
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n")!,
  },
  googleDrive: {
    keyfile: path.join(__dirname, process.env.GOOGLE_DRIVE_KEY_PATH!),
    folderID: process.env.GOOGLE_DRIVE_FOLDER_ID!
  }
};