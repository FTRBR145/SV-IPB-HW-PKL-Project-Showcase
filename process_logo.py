from PIL import Image
from collections import deque

def create_precise_transparent_shield():
    input_path = r"C:\Users\Fatir Bahri\.gemini\antigravity-ide\brain\625ce38c-9445-44bb-adc8-e56047bf8c89\media__1785814706808.png"
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()

    # Create a visited matrix
    visited = [[False for _ in range(height)] for _ in range(width)]
    
    # BFS Queue to flood-fill background starting from all 4 borders
    queue = deque()

    # Add all border pixels to queue
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

    # Helper function to check if pixel is background (white / top pink bar / light gray border)
    def is_bg(r, g, b, a):
        # White or light gray
        if r > 230 and g > 230 and b > 230:
            return True
        # Top pink bar edge
        if r > 200 and g < 60 and b > 100:
            return True
        return False

    # Flood fill
    while queue:
        x, y = queue.popleft()
        r, g, b, a = pixels[x, y]

        if is_bg(r, g, b, a):
            # Make outer background pixel fully transparent
            pixels[x, y] = (0, 0, 0, 0)

            # Check 4 neighbors
            for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny]:
                    visited[nx][ny] = True
                    queue.append((nx, ny))

    output_path = r"d:\PKL IPB\public\sv_ipb_logo.png"
    img.save(output_path, "PNG")
    print("Precise transparent shield logo saved to:", output_path)

if __name__ == "__main__":
    create_precise_transparent_shield()
