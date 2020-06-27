export function loadImage(width, height, url)
{
    return new Promise((resolve, reject) =>
    {
        const img = new Image(width, height);

        img.addEventListener("load", () => resolve(img));
        img.addEventListener("error", err => reject(err));

        img.src = url;
    });
}