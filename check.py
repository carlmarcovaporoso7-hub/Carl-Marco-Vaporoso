import re

with open(r'c:\Users\acer\Desktop\portfolio\script.js', 'r', encoding='utf-8') as f:
    js = f.read()
with open(r'c:\Users\acer\Desktop\portfolio\index.html', 'r', encoding='utf-8') as f:
    html = f.read()
with open(r'c:\Users\acer\Desktop\portfolio\style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Check JS IDs
print("=== JS ID REFERENCES ===")
js_ids = re.findall(r"\$\('#([^']+)'\)", js)
for id_ in sorted(set(js_ids)):
    found = ('id="' + id_ + '"') in html
    print("  #" + id_ + ": " + ("OK" if found else "*** MISSING ***"))

# Check for reveal classes usage
print("\n=== CSS REVEAL CLASSES ===")
for cls in ['reveal', 'reveal-left', 'reveal-right']:
    in_css = ('.' + cls) in css
    in_js  = cls in js
    print("  ." + cls + ": css=" + str(in_css) + " js=" + str(in_js))

# Check opacity:0 traps (elements hidden by default)
print("\n=== OPACITY:0 in CSS ===")
for m in re.finditer(r'([^{]+)\{[^}]*opacity\s*:\s*0[^}]*\}', css):
    print("  " + m.group(0)[:80].strip())

# Check section IDs in HTML
print("\n=== SECTION IDs in HTML ===")
section_ids = re.findall(r'<section[^>]+id="([^"]+)"', html)
print("  Found:", section_ids)

# Check data-section in nav links
print("\n=== NAV data-section attrs ===")
ds = re.findall(r'data-section="([^"]+)"', html)
print("  Found:", ds)

print("\nDone.")
