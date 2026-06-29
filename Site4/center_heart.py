f = 'assets/feat-3-matching.svg'
with open(f, 'r') as file:
    content = file.read()

# Wrap the path in a translated group
content = content.replace('<path', '<g transform="translate(1.35, 3.14)"><path')
content = content.replace('/>\n</svg>', '/>\n</g>\n</svg>')

with open(f, 'w') as file:
    file.write(content)
print("Centered heart icon")
