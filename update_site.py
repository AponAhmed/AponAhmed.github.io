"""
Update Sitemap and Refactor Services
1. Generate sitemap.xml with all project and service pages
2. Refactor service pages with modern design (if not already done)
"""

import os
import re
import datetime

PROJECT_DIR = r"c:\Users\LENOVO\Desktop\My Desk\AponAhmed.github.io"
BASE_URL = "https://aponahmed.github.io"

# Mappings for Service Pages (to ensure we find them all)
SERVICES = [
    "web-app-development.html",
    "wordpress-development.html",
    "desktop-app-development.html",
    "ecommerce-solutions.html",
    "server-management.html",
    "technology-consultation.html"
]

PROJECTS = [
    "team-pulse.html", "cronify.html", "sshost.html", "block-editor.html", 
    "bulk-desktop.html", "helpdesk.html", "customizer.html", "bulk-web.html", 
    "wp-backup.html", "wp-cache.html", "wp-contact.html", "private-plugins.html", 
    "erp.html"
]

def generate_sitemap():
    print("Generating sitemap.xml...")
    
    urls = []
    
    # Add static main pages
    # Priority 1.0 for home, 0.8 for main sections
    urls.append((f"{BASE_URL}/", "1.0"))
    urls.append((f"{BASE_URL}/index.html", "1.0"))
    urls.append((f"{BASE_URL}/about.html", "0.9"))
    
    # Add Service Pages (Priority 0.8)
    for service in SERVICES:
        if os.path.exists(os.path.join(PROJECT_DIR, "services", service)):
            urls.append((f"{BASE_URL}/services/{service}", "0.8"))
            
    # Add Project Pages (Priority 0.7)
    for project in PROJECTS:
        if os.path.exists(os.path.join(PROJECT_DIR, "projects", project)):
            urls.append((f"{BASE_URL}/projects/{project}", "0.7"))

    # Generate XML
    sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    today = datetime.date.today().isoformat()
    
    for url, priority in urls:
        sitemap_content += '  <url>\n'
        sitemap_content += f'    <loc>{url}</loc>\n'
        sitemap_content += f'    <lastmod>{today}</lastmod>\n'
        sitemap_content += '    <changefreq>weekly</changefreq>\n'
        sitemap_content += f'    <priority>{priority}</priority>\n'
        sitemap_content += '  </url>\n'
        
    sitemap_content += '</urlset>'
    
    with open(os.path.join(PROJECT_DIR, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(sitemap_content)
        
    print(f"✓ Generated sitemap.xml with {len(urls)} URLs")

def refactor_service_pages():
    print("\nRefactoring Service Pages...")
    services_dir = os.path.join(PROJECT_DIR, "services")
    
    if not os.path.exists(services_dir):
        print("Services directory not found")
        return

    for file in os.listdir(services_dir):
        if file.endswith(".html"):
            filepath = os.path.join(services_dir, file)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Apply Modern Design Changes
            
            # 1. Modernize "What I Offer" and "Technologies" Cards
            # Add border, hover effects, shadow
            if 'class="bg-zinc-900 p-5 rounded-xl "' in content:
                content = content.replace(
                    'class="bg-zinc-900 p-5 rounded-xl "',
                    'class="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-primary-color/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary-color/5 group"'
                )
                
            # 2. Modernize CTA Section
            # Ensure it has consistent styling with projects but slightly more modern
            # Check for the specific CTA class we might have added or the old one
            # We want: bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center mb-20 relative overflow-hidden group hover:border-primary-color/30 transition-colors duration-300
            
            # Regex to find the CTA div and replace classes
            # It usually starts with <div class="bg-zinc-900... p-12...
            
            cta_pattern = r'class="bg-zinc-900[^"]*?p-12[^"]*?"'
            new_cta_class = 'class="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center mb-20 relative overflow-hidden group hover:border-primary-color/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-color/10"'
            
            content = re.sub(cta_pattern, new_cta_class, content)
            
            # 3. Fix any broken tags from previous regex mishaps (if any)
            # Look for span tags that might have gotten the CTA class by mistake
            broken_tag_pattern = r'<span class="bg-zinc-900[^"]*?p-12[^"]*?">'
            fixed_tag = '<span class="px-4 py-2 bg-zinc-800/50 border border-zinc-700 text-gray-300 rounded-full text-sm hover:border-primary-color/50 transition-colors">'
            
            content = re.sub(broken_tag_pattern, fixed_tag, content)

            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"✓ Refactored {file}")

def main():
    generate_sitemap()
    refactor_service_pages()

if __name__ == "__main__":
    main()
