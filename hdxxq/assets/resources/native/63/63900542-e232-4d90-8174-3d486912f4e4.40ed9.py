from PIL import Image
import os

# ====================== 配置 ======================
FOLDER = "."  # 当前文件夹
BORDER_WIDTH = 200  # 描边粗细
BORDER_COLOR = (255, 255, 255)  # 白色
# ==================================================

def add_stroke(img_path):
    try:
        img = Image.open(img_path).convert("RGBA")
        w, h = img.size

        # 放大一圈，用来画描边
        expanded = Image.new("RGBA", (w + BORDER_WIDTH * 2, h + BORDER_WIDTH * 2), (0, 0, 0, 0))
        expanded.paste(img, (BORDER_WIDTH, BORDER_WIDTH))

        # 核心：膨胀一圈白色 = 描边
        pixels = expanded.load()
        stroke_img = expanded.copy()
        stroke_pixels = stroke_img.load()

        for x in range(expanded.width):
            for y in range(expanded.height):
                r, g, b, a = pixels[x, y]
                if a > 50:  # 不透明的地方
                    # 上下左右全部涂成白色
                    for dx in (-1, 0, 1):
                        for dy in (-1, 0, 1):
                            nx = x + dx
                            ny = y + dy
                            if 0 <= nx < expanded.width and 0 <= ny < expanded.height:
                                sr, sg, sb, sa = stroke_pixels[nx, ny]
                                if sa == 0:  # 只涂透明区域
                                    stroke_pixels[nx, ny] = (*BORDER_COLOR, 255)

        # 贴回原图
        stroke_img.paste(img, (BORDER_WIDTH, BORDER_WIDTH), img)
        
        # 保存
        # stroke_img.save(img_path, "PNG")
        # 保存到新文件夹
        os.makedirs("bordered", exist_ok=True)
        save_path = os.path.join("bordered", os.path.basename(img_path))
        stroke_img.save(save_path, "PNG")
        print(f"✅ 描边成功：{img_path}")

    except Exception as e:
        print(f"❌ 失败：{img_path} | {e}")

if __name__ == "__main__":
    for f in os.listdir(FOLDER):
        if f.lower().endswith(".png"):
            add_stroke(os.path.join(FOLDER, f))

    print("\n🎉 全部处理完成！")




        