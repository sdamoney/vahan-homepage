import glob, re
for f in glob.glob('assets/feat-*.svg'):
    with open(f, 'r') as file:
        content = file.read()
    
    # We want to extract just the path(s) inside the SVG and wrap them in a clean SVG tag.
    paths = re.findall(r'<path[^>]+>', content)
    
    new_svg = f'<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">\n'
    for p in paths:
        new_svg += p + '\n'
    new_svg += '</svg>'
    
    with open(f, 'w') as file:
        file.write(new_svg)
    print(f"Fixed {f}")
