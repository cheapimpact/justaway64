import { Storage } from "@google-cloud/storage";
export const bucketName = "wasted";

export const gcsBucket = () =>
  // allowedTypes: Array<string> = ["pdf", "jpg", "jpeg", "png"],
  // fileSize: number = 4096 * 4096
  {
    const storage = new Storage({
      keyFilename: "wasted2.json",
    });
    let ext = bucketName;
    // if (folderName) ext += "/" + folderName;
    console.log(ext);

    return storage.bucket(ext);
  };
