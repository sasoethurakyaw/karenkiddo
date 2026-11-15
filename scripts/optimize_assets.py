import os
import shutil
from PIL import Image

PROJECT_ROOT = "/home/soethurakyaw/Personal/karenkiddo"
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "public")
BACKUP_DIR = os.path.join(PROJECT_ROOT, "raw_design_assets", "original_images_backup")

os.makedirs(BACKUP_DIR, exist_ok=True)

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".gif"}

total_orig_bytes = 0
total_webp_bytes = 0
converted_count = 0
file_map = {}

print("=== 1. Backing up and converting images in public/ to WebP ===")

for root, dirs, files in os.walk(PUBLIC_DIR):
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if ext in IMAGE_EXTS:
            src_path = os.path.join(root, f)
            rel_path = os.path.relpath(src_path, PUBLIC_DIR)
            backup_path = os.path.join(BACKUP_DIR, rel_path)
            os.makedirs(os.path.dirname(backup_path), exist_ok=True)
            
            # Backup original
            shutil.copy2(src_path, backup_path)
            
            orig_size = os.path.getsize(src_path)
            total_orig_bytes += orig_size
            
            # Target webp path
            base_name = os.path.splitext(f)[0]
            webp_name = base_name + ".webp"
            webp_path = os.path.join(root, webp_name)
            
            try:
                im = Image.open(src_path)
                
                # Check if animated gif
                is_animated = getattr(im, "is_animated", False)
                
                if is_animated:
                    im.save(webp_path, "WEBP", save_all=True, quality=80, method=4)
                else:
                    # Resize if unreasonably huge
                    max_dim = 1400
                    w, h = im.size
                    if w > max_dim or h > max_dim:
                        im.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
                    
                    # Convert mode if necessary for WebP
                    if im.mode not in ("RGB", "RGBA"):
                        im = im.convert("RGBA" if "transparency" in im.info else "RGB")
                        
                    im.save(webp_path, "WEBP", quality=82, method=6, optimize=True)
                
                webp_size = os.path.getsize(webp_path)
                total_webp_bytes += webp_size
                converted_count += 1
                
                # Remove original from public to save disk and bundle size
                os.remove(src_path)
                
                file_map[f] = webp_name
                
            except Exception as e:
                print(f"Error converting {src_path}: {e}")

print(f"Converted {converted_count} images.")
print(f"Original images total: {total_orig_bytes / 1024 / 1024:.2f} MB")
print(f"WebP images total:     {total_webp_bytes / 1024 / 1024:.2f} MB")
if total_orig_bytes > 0:
    savings = (1 - total_webp_bytes / total_orig_bytes) * 100
    print(f"Savings:               {savings:.1f}% reduction ({(total_orig_bytes - total_webp_bytes) / 1024 / 1024:.2f} MB saved)")

print("\n=== 2. Updating file references in src/ and index.html ===")

CODE_EXTS = {".ts", ".tsx", ".js", ".jsx", ".html", ".css"}
updated_files = 0

for root, dirs, files in os.walk(PROJECT_ROOT):
    # skip node_modules, dist, .git, legacy_html, raw_design_assets
    if any(skip in root for skip in ["node_modules", "dist", ".git", "legacy_html", "raw_design_assets", "public"]):
        continue
    for f in files:
        if os.path.splitext(f)[1] in CODE_EXTS:
            file_path = os.path.join(root, f)
            with open(file_path, "r", encoding="utf-8") as fh:
                content = fh.read()
            
            new_content = content
            # Replace references to converted images
            for old_img, new_img in file_map.items():
                if old_img in new_content:
                    new_content = new_content.replace(old_img, new_img)
            
            if new_content != content:
                with open(file_path, "w", encoding="utf-8") as fh:
                    fh.write(new_content)
                updated_files += 1
                print(f"Updated references in: {os.path.relpath(file_path, PROJECT_ROOT)}")

print(f"Updated {updated_files} code files.")
print("=== Done! ===")
