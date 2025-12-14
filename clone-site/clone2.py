import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urljoin, urlparse
import time

class SimpleWebsiteCloner:
    def __init__(self, base_url, output_dir="cloned_site"):
        self.base_url = base_url.rstrip('/')
        self.output_dir = output_dir
        self.visited = set()
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        
        # Create output directory
        os.makedirs(output_dir, exist_ok=True)
    
    def save_page(self, url, content, content_type="html"):
        """Save content to file"""
        parsed = urlparse(url)
        path = parsed.path
        
        if not path or path == '/':
            path = '/index.html'
        
        # Create file path
        filepath = os.path.join(self.output_dir, path.lstrip('/'))
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        # Ensure .html extension
        if content_type == "html" and not filepath.endswith('.html'):
            filepath += '.html'
        
        # Save file
        if isinstance(content, bytes):
            with open(filepath, 'wb') as f:
                f.write(content)
        else:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
        
        return filepath
    
    def clone_site(self, login_data=None, max_pages=50):
        """
        Clone website (with optional login for simple sites)
        
        Args:
            login_data: Dict with 'email', 'password', 'login_url', and 'form_selectors'
            max_pages: Maximum pages to clone
        """
        
        if login_data:
            print(f"Attempting login to {login_data.get('login_url', self.base_url)}")
            success = self.perform_login(login_data)
            if not success:
                print("Login failed. Cloning public pages only.")
        
        print(f"Starting to clone: {self.base_url}")
        
        urls_to_visit = [self.base_url]
        pages_cloned = 0
        
        while urls_to_visit and pages_cloned < max_pages:
            current_url = urls_to_visit.pop(0)
            
            if current_url in self.visited:
                continue
            
            try:
                print(f"Cloning: {current_url}")
                response = self.session.get(current_url, timeout=10)
                
                if response.status_code == 200:
                    # Check if it's HTML
                    if 'text/html' in response.headers.get('content-type', ''):
                        soup = BeautifulSoup(response.text, 'html.parser')
                        
                        # Save HTML
                        saved_path = self.save_page(current_url, response.text)
                        print(f"  Saved to: {saved_path}")
                        
                        # Extract links for further cloning
                        new_urls = self.extract_links(soup, current_url)
                        for url in new_urls:
                            if url not in self.visited and url not in urls_to_visit:
                                urls_to_visit.append(url)
                        
                        # Download resources
                        self.download_resources(soup, current_url)
                    
                    else:
                        # Save non-HTML content
                        saved_path = self.save_page(current_url, response.content, "binary")
                        print(f"  Saved binary to: {saved_path}")
                    
                    self.visited.add(current_url)
                    pages_cloned += 1
                    
                    # Be respectful
                    time.sleep(0.5)
                
                else:
                    print(f"  Failed with status: {response.status_code}")
            
            except Exception as e:
                print(f"  Error: {e}")
        
        print(f"\nCloning complete!")
        print(f"Total pages cloned: {pages_cloned}")
        print(f"Output directory: {os.path.abspath(self.output_dir)}")
    
    def perform_login(self, login_data):
        """
        Perform login for simple forms (NOT for Wix)
        """
        try:
            login_url = login_data.get('login_url', self.base_url)
            
            # First get the login page to extract CSRF tokens if any
            response = self.session.get(login_url)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Prepare form data
            form_data = {
                login_data.get('email_field', 'email'): login_data['email'],
                login_data.get('password_field', 'password'): login_data['password']
            }
            
            # Look for other hidden form fields
            hidden_inputs = soup.find_all('input', type='hidden')
            for inp in hidden_inputs:
                if inp.get('name') and inp.get('value'):
                    form_data[inp['name']] = inp['value']
            
            # Submit login
            form_action = login_data.get('form_action', login_url)
            response = self.session.post(
                form_action,
                data=form_data,
                headers={'Referer': login_url}
            )
            
            # Check if login was successful
            # This is site-specific - you need to customize this check
            if response.status_code == 200:
                print("Login successful (status check only)")
                return True
            
            return False
            
        except Exception as e:
            print(f"Login error: {e}")
            return False
    
    def extract_links(self, soup, base_url):
        """Extract all internal links from page"""
        links = set()
        
        for a_tag in soup.find_all('a', href=True):
            href = a_tag['href']
            full_url = urljoin(base_url, href)
            
            # Only include links from the same domain
            if urlparse(full_url).netloc == urlparse(self.base_url).netloc:
                links.add(full_url)
        
        return list(links)
    
    def download_resources(self, soup, base_url):
        """Download CSS, JS, and images"""
        tags_to_download = [
            ('link', 'href', ['stylesheet']),
            ('script', 'src', []),
            ('img', 'src', []),
            ('source', 'srcset', [])
        ]
        
        for tag_name, attr, filter_values in tags_to_download:
            for tag in soup.find_all(tag_name, **{attr: True}):
                resource_url = urljoin(base_url, tag[attr])
                
                # Check if it's from our domain
                if urlparse(resource_url).netloc == urlparse(self.base_url).netloc:
                    try:
                        response = self.session.get(resource_url, timeout=5)
                        if response.status_code == 200:
                            self.save_page(resource_url, response.content, "binary")
                    except:
                        pass  # Skip if download fails

def main():
    """Example usage"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Clone a website (simple sites only)')
    parser.add_argument('url', help='Website URL')
    parser.add_argument('-o', '--output', default='cloned_site', 
                       help='Output directory')
    
    # Login arguments
    parser.add_argument('--email', help='Login email')
    parser.add_argument('--password', help='Login password')
    parser.add_argument('--login-url', help='URL of login page')
    
    args = parser.parse_args()
    
    cloner = SimpleWebsiteCloner(args.url, args.output)
    
    # Prepare login data if provided
    login_data = None
    if args.email and args.password:
        login_data = {
            'email': args.email,
            'password': args.password,
            'login_url': args.login_url or args.url,
            'email_field': 'email',  # May need adjustment
            'password_field': 'password'  # May need adjustment
        }
    
    cloner.clone_site(login_data=login_data, max_pages=20)

if __name__ == "__main__":
    main()