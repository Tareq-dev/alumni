import fileSystem from "fs";
import compressImages from "compress-images";
import path from "path";
const imgUploader = async (image, result) => {
  return new Promise((resolve, reject) => {
    if (image.size > 0) {
      if (image.type == "image/png" || image.type == "image/jpeg") {
        const tempUploadsDir = "temp-uploads";

        if (!fileSystem.existsSync(tempUploadsDir)) {
          fileSystem.mkdirSync(tempUploadsDir);
        }

        const filePath = `${tempUploadsDir}/${new Date().getTime()}-${
          image.name
        }`;
        const compressedFilePath = "uploads/";
        const compression = 50;

        fileSystem.readFile(image.path, async function (error, data) {
          if (error) {
            reject(error);
            return;
          }

          fileSystem.writeFile(filePath, data, async function (error) {
            if (error) {
              reject(error);
              return;
            }

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
                  command: [
                    "--quality=" + compression + "-" + compression,
                    "-o",
                  ],
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
                });

                // Use the path module to extract the file name
                const fileName = path.basename(filePath);

                resolve(fileName);
              }
            );
          });

          fileSystem.unlink(image.path, function (error) {
            if (error) {
              reject(error);
            }
          });
        });
      } else {
        reject("Please select an image");
      }
    } else {
      reject("Please select an image");
    }
  });
};

export { imgUploader };
