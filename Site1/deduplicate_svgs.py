import glob

for f in glob.glob('assets/feat-*.svg'):
    with open(f, 'r') as file:
        content = file.read()
    
    # Replace the duplicated attribute
    content = content.replace('stroke-opacity="0.7" stroke-opacity="0.7"', 'stroke-opacity="0.7"')
    
    with open(f, 'w') as file:
        file.write(content)
    print(f"Fixed {f}")
