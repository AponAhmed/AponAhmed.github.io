#!/usr/bin/env python3
"""
Fix Service Pages Script - Version 2
Fixes the CTA section that was incorrectly modified.
"""

import re
import os

# Service files to fix
SERVICE_FILES = [
    'services/wordpress-development.html',
    'services/web-app-development.html',
    'services/ecommerce-solutions.html',
    'services/server-management.html',
    'services/technology-consultation.html'
]

# The WRONG class that was applied to CTA sections (badge class)
WRONG_CTA_CLASS = 'px-4 py-2 bg-zinc-800/50 border border-zinc-700 text-gray-300 rounded-full text-sm hover:border-primary-color/50 transition-colors'

# The CORRECT class for CTA sections
CORRECT_CTA_CLASS = 'bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center mb-20 relative overflow-hidden group hover:border-primary-color/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-color/10'


def fix_cta_section(filepath):
    """Fix the CTA section in a single HTML file."""
    print(f"\n📝 Processing: {filepath}")
    
    if not os.path.exists(filepath):
        print(f"   ❌ File not found: {filepath}")
        return False
    
    # Read file
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Fix: Replace the wrong CTA div class with the correct one
    # We need to find divs that have h3 with "Ready to" text pattern
    # Pattern: <div class="WRONG_CLASS"><h3...>Ready to.../Need a...
    
    cta_pattern = re.compile(
        r'<div\s+class="' + re.escape(WRONG_CTA_CLASS) + r'"\s*>\s*<h3',
        re.DOTALL
    )
    
    if cta_pattern.search(content):
        # Replace the wrong class with correct class in CTA sections
        content = cta_pattern.sub(
            f'<div class="{CORRECT_CTA_CLASS}">\n            <h3',
            content
        )
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"   ✅ Fixed CTA section classes")
        return True
    else:
        print("   ℹ️  No CTA section issues found")
        return False


def main():
    """Main function to fix CTA sections."""
    print("=" * 60)
    print("🔧 Fixing Service Page CTA Sections")
    print("=" * 60)
    
    fixed_count = 0
    
    for filepath in SERVICE_FILES:
        if fix_cta_section(filepath):
            fixed_count += 1
    
    print("\n" + "=" * 60)
    print(f"✨ Complete! Fixed {fixed_count}/{len(SERVICE_FILES)} files")
    print("=" * 60)


if __name__ == "__main__":
    main()
