from PIL import Image
from collections import deque

def process_navbar_logo():
    input_path = r"C:\Users\Fatir Bahri\.gemini\antigravity-ide\brain\625ce38c-9445-44bb-adc8-e56047bf8c89\media__1785816184005.png"
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()

    visited = [[False for _ in range(height)] for _ in range(width)]
    queue = deque()

    # Border pixels
    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
        visited[x][0] = True
        visited[x][height - 1] = True

    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))
        visited[0][y] = True
        visited[width - 1][y] = True

    def is_bg(r, g, b, a):
        return r > 240 and g > 240 and b > 240

    while queue:
        x, y = queue.popleft()
        r, g, b, a = pixels[x, y]

        if is_bg(r, g, b, a):
            pixels[x, y] = (0, 0, 0, 0)
            for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny]:
                    visited[nx][ny] = True
                    queue.append((nx, ny))

    output_path = r"d:\PKL IPB\public\sv_ipb_navbar_logo.png"
    img.save(output_path, "PNG")
    print("Transparent navbar logo saved to:", output_path)

if __name__ == "__main__":
    process_navbar_logo()
