import { CanvasTexture } from "three"

export const createTextTexture = (
  text: string,
  fontSize: number,
  color: string
) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  ctx.font = `${fontSize}px sans-serif`;
  const textMetrics = ctx.measureText(text);
  const textWidth = Math.ceil(textMetrics.width);
  const textHeight = Math.ceil(fontSize);
  canvas.width = textWidth;
  canvas.height = textHeight;
  ctx.font = `${fontSize}px sans-serif`;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.fillText(text, 0, fontSize);

  const texture = new CanvasTexture(canvas)
  texture.needsUpdate = true

  canvas.remove()

  return {
    texture,
    aspect: textWidth / textHeight
  }
}
