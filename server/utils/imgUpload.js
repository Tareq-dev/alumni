// utils/imgUpload.js

import fileSystem from "fs";
import compressImages from "compress-images";
import path from "path";

const imgUploader = async (image) => {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(image.path);

    if (image.size > 0) {
      if (image.mimetype == "image/png" || image.mimetype == "image/jpeg") {
        const tempUploadsDir = "temp-uploads";
        const compressedFilePath = "uploads/";
        const compression = 50;

        if (fileSystem.existsSync(`${tempUploadsDir}/${fileName}`)) {
          const filePath = `${tempUploadsDir}/${fileName}`;

          compressImages(
            filePath,
            compressedFilePath,
            { compress_force: false, statistic: true, autoupdate: true },
            false,
            {
              jpg: { engine: "mozjpeg", command: ["-quality", compression] },
            },
            {
              png: {
                engine: "pngquant",
                command: ["--quality=" + compression + "-" + compression, "-o"],
              },
            },
            { svg: { engine: "svgo", command: "--multipass" } },
            {
              gif: {
                engine: "gifsicle",
                command: ["--colors", "64", "--use-col=web"],
              },
            },
            async function (error, completed, statistic) {
              if (error) {
                reject(error);
                return;
              }

              fileSystem.unlink(filePath, function (error) {
                if (error) {
                  reject(error);
                  return;
                }

                // Use the path module to extract the file name
                const compressedFileName = path.basename(filePath);

                resolve(compressedFileName);
              });
            }
          );
        } else {
          console.log("File not found");
          reject("File not found");
        }
      } else {
        reject("Please select an image");
      }
    } else {
      reject("Please select an image");
    }
  });
};

export { imgUploader };
