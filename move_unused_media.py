import os
import re
import shutil

base_dir = r"C:\Users\leand\OneDrive\Antigravity Projects\LAST"
images_dir = os.path.join(base_dir, "assets", "images")
unused_dir = os.path.join(base_dir, "__no_utilizado__", "images")

if not os.path.exists(unused_dir):
    os.makedirs(unused_dir)

# Read all files that could reference images
files_to_check = [
    os.path.join(base_dir, "index.html"),
    os.path.join(base_dir, "assets", "css", "team-last.css"),
    os.path.join(base_dir, "assets", "js", "custom.js"),
    os.path.join(base_dir, "assets", "js", "members-filter.js"),
    os.path.join(base_dir, "assets", "js", "page-nav.js")
]

content = ""
for f in files_to_check:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content += file.read()

unused_files = []

for root, dirs, files in os.walk(images_dir):
    for filename in files:
        # Check if the filename is mentioned in any of the files
        # It's an approximation, but safe enough if the name isn't there at all
        if filename not in content:
            file_path = os.path.join(root, filename)
            rel_path = os.path.relpath(file_path, images_dir)
            target_path = os.path.join(unused_dir, rel_path)
            
            target_dir = os.path.dirname(target_path)
            if not os.path.exists(target_dir):
                os.makedirs(target_dir)
                
            shutil.move(file_path, target_path)
            unused_files.append(rel_path)

print(f"Moved {len(unused_files)} unused files to __no_utilizado__/images:")
for f in unused_files:
    print(f)
