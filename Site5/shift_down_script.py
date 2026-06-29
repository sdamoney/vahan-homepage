import re

with open('index.html', 'r') as f:
    content = f.read()

def shift_top(match):
    prefix = match.group(1)
    val = float(match.group(2))
    suffix = match.group(3)
    if val >= 4800:
        val += 100
    
    # Format nicely
    if val.is_integer():
        return f"{prefix}{int(val)}{suffix}"
    return f"{prefix}{val}{suffix}"

# Match top: 4800px; or top:4800.5px;
new_content = re.sub(r'(top:\s*)([0-9]+(?:\.[0-9]+)?)(px;?)', shift_top, content)

# Also update the stage height
def shift_height(match):
    prefix = match.group(1)
    val = float(match.group(2))
    suffix = match.group(3)
    if val > 8000:
        val += 100
    if val.is_integer():
        return f"{prefix}{int(val)}{suffix}"
    return f"{prefix}{val}{suffix}"

new_content = re.sub(r'(height:\s*)([0-9]+(?:\.[0-9]+)?)(px;?)', shift_height, new_content)

with open('index.html', 'w') as f:
    f.write(new_content)

print("Shifted elements down by 100px.")
