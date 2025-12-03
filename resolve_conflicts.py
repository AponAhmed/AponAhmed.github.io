#!/usr/bin/env python3
"""
Resolve Git Merge Conflicts in Service Pages
Automatically resolves merge conflicts by keeping the HEAD version.
"""

import re
import os

SERVICE_FILES = [
    'services/wordpress-development.html',
    'services/web-app-development.html',
    'services/ecommerce-solutions.html',
    'services/server-management.html',
    'services/technology-consultation.html'
]

def resolve_conflicts(filepath):
    """Resolve git merge conflicts in a file by accepting HEAD version."""
    print(f"\n📝 Processing: {filepath}")
    
    if not os.path.exists(filepath):
        print(f"   ❌ File not found: {filepath}")
        return False
    
    # Read file
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if there are conflicts
    if '<<<<<<< HEAD' not in content:
        print("   ℹ️  No conflicts found")
        return False
    
    # Pattern to match git conflict markers
    # <<<<<<< HEAD
    # ... HEAD content ...
    # =======
    # ... incoming content ...
    # >>>>>>> commit-hash
    conflict_pattern = re.compile(
        r'<<<<<<< HEAD\r?\n(.*?)\r?\n=======\r?\n(.*?)\r?\n>>>>>>> [a-f0-9]+\r?\n',
        re.DOTALL
    )
    
    # Replace conflicts with HEAD version (group 1)
    resolved_content = conflict_pattern.sub(r'\1\n', content)
    
    # Count how many conflicts were resolved
    conflicts_found = len(conflict_pattern.findall(content))
    
    if conflicts_found > 0:
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(resolved_content)
        
        print(f"   ✅ Resolved {conflicts_found} conflict(s)")
        return True
    else:
        print("   ℹ️  No conflicts to resolve")
        return False


def main():
    """Main function to resolve all conflicts."""
    print("=" * 60)
    print("🔧 Resolving Git Merge Conflicts")
    print("=" * 60)
    
    resolved_count = 0
    
    for filepath in SERVICE_FILES:
        if resolve_conflicts(filepath):
            resolved_count += 1
    
    print("\n" + "=" * 60)
    print(f"✨ Complete! Resolved conflicts in {resolved_count}/{len(SERVICE_FILES)} files")
    print("=" * 60)
    print("\n📌 Next steps:")
    print("   1. Review the changes")
    print("   2. Run: git add services/")
    print("   3. Run: git commit -m 'Resolved merge conflicts in service pages'")


if __name__ == "__main__":
    main()
