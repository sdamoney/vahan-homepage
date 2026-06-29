import glob, re

for f in glob.glob('assets/feat-*.svg'):
    with open(f, 'r') as file:
        content = file.read()
    
    # Replace stroke="white" or stroke="#something" with stroke="#49210F"
    content = re.sub(r'stroke="[^"]+"', 'stroke="#49210F" stroke-opacity="0.7"', content)
    
    with open(f, 'w') as file:
        file.write(content)
    print(f"Updated color for {f}")
