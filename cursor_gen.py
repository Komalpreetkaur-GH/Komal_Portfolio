import base64

def get_pixel_path(grid, color):
    # Helper to convert a grid of 1s to an SVG path
    # This is a naive implementation that draws a rect for every '1'
    # Optimization: merge adjacent rects? For 32x32 cursor, raw rects are fine.
    path_d = ""
    for y, row in enumerate(grid):
        for x, cell in enumerate(row):
            if cell == 1:
                path_d += f"M{x} {y}h1v1h-1z "
    return path_d

def get_sticker_svg():
    # Grid size: 16x16 (will scale to 32x32 via viewbox)
    w, h = 16, 16
    
    # 0 = Transparent
    # 1 = Black (Border)
    # 2 = White (Fill)
    
    # Designing the "Inspo" shape manually in a grid
    # It seems to be roughly:
    #   XXX 
    #  X   X
    #      X
    #     X
    #    X
    #    X
    # 
    #    X
    
    # Let's define the Fill first (2), then wrap it in Border (1)
    
    pixels = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0], # Row 1 Border
        [0,0,0,1,2,2,2,2,2,1,0,0,0,0,0,0], # Row 2 Fill top
        [0,0,0,1,2,2,2,2,2,1,1,0,0,0,0,0], # Row 3 Fill
        [0,0,0,1,2,1,1,1,2,2,1,0,0,0,0,0], # Row 4 ... tricky hook shape
        [0,0,0,1,1,0,0,0,1,2,2,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,1,2,2,1,0,0,0],
        [0,0,0,0,0,0,0,0,1,2,2,1,0,0,0,0],
        [0,0,0,0,0,0,0,1,2,2,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,2,2,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,2,2,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,2,2,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
    ]
    
    # Wait, let's try a simpler Block shape based on standard 8-bit bold font
    #    XXX
    #   X   X
    #      X
    #     X
    #     X
    #
    #     X
    
    grid_fill = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0],
        [0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0], 
        [0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0],
        [0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]
    
    # Now generate the Border by expanding the Fill 1 pixel in all directions
    grid_border = [[0]*16 for _ in range(16)]
    
    for y in range(16):
        for x in range(16):
            if grid_fill[y][x] == 1:
                # If pixel is fill, ensure border covers it? No, border is OUTSIDE.
                # Actually for this style (Sticker), the Border is BEHIND.
                for dy in [-1,0,1]:
                    for dx in [-1,0,1]:
                        ny, nx = y+dy, x+dx
                        if 0 <= ny < 16 and 0 <= nx < 16:
                            grid_border[ny][nx] = 1
                            
    # Generate Paths
    fill_path = get_pixel_path(grid_fill, "")
    border_path = get_pixel_path(grid_border, "")

    svg = f'''<svg width="32" height="32" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <style>
        .p {{ fill: #FFFFFF; }}
        .b {{ fill: #000000; }}
    </style>
    <!-- Border (drawn first to be behind) -->
    <path class="b" d="{border_path}" />
    <!-- Fill -->
    <path class="p" d="{fill_path}" />
    </svg>'''
    return svg

universal_b64 = base64.b64encode(get_sticker_svg().encode('utf-8')).decode('utf-8')

with open('universal.txt', 'w', encoding='utf-8') as f:
    f.write(universal_b64)
