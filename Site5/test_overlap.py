import re

html = open('index.html').read()
divs = re.findall(r'style="([^"]*)"', html)
for i, style in enumerate(divs):
    if 'left:' in style and 'top:' in style:
        try:
            top = float(re.search(r'top:([\d.]+)px', style).group(1))
            height_m = re.search(r'height:([\d.]+)px', style)
            height = float(height_m.group(1)) if height_m else 0
            if top > 3500 and top < 5000:
                print(f"Index {i}, Top {top}, Height {height}, Bottom {top+height}, Style: {style[:50]}...")
        except Exception as e:
            pass

