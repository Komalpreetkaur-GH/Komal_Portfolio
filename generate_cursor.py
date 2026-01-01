import base64
import io
from PIL import Image, ImageDraw

def generate_cursor():
    # Create 32x32 transparent image
    img = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
    pixels = img.load()
    
    # Define pixel art map (1 = black/outline, 2 = white/fill)
    # 12x16 grid for the question mark itself, centered in 32x32
    # Starting around x=10, y=6
    
    # Visual grid for Retro Question Mark
    # Black Outline (1)
    # White Fill (2)
    
    # Manual pixel painting for precision
    
    # Top Arch
    # Outline
    for x in range(10, 21): pixels[x, 4] = (0, 0, 0, 255) # Top Border
    for x in range(10, 21): pixels[x, 9] = (0, 0, 0, 255) # Inner Top
    
    # Just defining the distinct rectangles for the "8-bit" look
    draw = ImageDraw.Draw(img)
    
    # Colors
    B = (0, 0, 0, 255)
    W = (255, 255, 255, 255)
    
    # 2px scale for chunkiness
    scale = 2
    ox, oy = 8, 4 # Offset
    
    # Shape definition (1 = Black, 2 = White)
    # 7x9 grid approx
    shape = [
        [0, 1, 1, 1, 1, 1, 0],
        [1, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 2, 2, 1],
        [0, 1, 0, 0, 2, 2, 1],
        [0, 0, 0, 1, 2, 2, 1],
        [0, 0, 0, 1, 2, 2, 1],
        [0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0], # Gap
        [0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 1, 2, 2, 1],
        [0, 0, 0, 1, 2, 2, 1],
        [0, 0, 0, 1, 1, 1, 1]
    ]
    
    # Actually, let's draw strictly with logic to match the SVG geometry but in pixels
    # SVG was:
    # Outer: M12 4h8v4h4v8h-4v4h-4v4h-4v4h-4v-4h4v-4h4v-4h4v-4h-4v-4H12z (Logic from previous step)
    
    # Let's paint the "White" regions then outline them
    # White Blocks
    # Top Bar: x=10..22, y=6..10
    # Right Drop: x=18..22, y=10..14
    # Middle: x=14..18, y=14..18 (approx)
    
    # Plan B: Simple Block Painting
    # Outer (Black)
    draw.rectangle([10, 4, 22, 16], fill=B) # Main head block
    draw.rectangle([18, 12, 22, 20], fill=B) # Right side down
    draw.rectangle([14, 16, 22, 24], fill=B) # Curve in
    draw.rectangle([14, 20, 18, 24], fill=B) # Middle down
    # ... this is getting messy to guess.
    
    # Let's use the explicit "Retro ? Block" pattern
    # 001111100
    # 012222210
    # 012222210
    # 000002210
    # 000012210
    # 000012100
    # 000012100
    # 000000000
    # 000012100
    # 000012100
    
    # Clear image again
    img = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
    pixels = img.load()
    
    # The Pattern (W=White, B=Black, _=Transparent)
    # Using a standard 12px height pattern, scaled 2x => 24px tall
    # fit in 32x32
    
    p = [
        "__BBBBB___",
        "_BWWWWWB__",
        "BWWWWWWWB_",
        "BWWWWWWWB_",
        "BWWWBBWWB_",
        "_BB__BWWB_",
        "_____BWWB_",
        "____BWWBB_",
        "____BWWB__",
        "____BWWB__",
        "____BBBB__",
        "__________",
        "____BBBB__",
        "____BWWB__",
        "____BWWB__",
        "____BBBB__"
    ]
    
    start_x = 6
    start_y = 0
    scale = 2
    
    for y, row in enumerate(p):
        for x, char in enumerate(row):
            color = None
            if char == 'B': color = (0,0,0,255)
            if char == 'W': color = (255,255,255,255)
            
            if color:
                # Draw scaled pixel
                for dy in range(scale):
                    for dx in range(scale):
                        pixels[start_x + x*scale + dx, start_y + y*scale + dy] = color

    # Save to buffer
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    b64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    print(b64)

if __name__ == "__main__":
    generate_cursor()
