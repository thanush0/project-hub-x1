import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from tqdm import tqdm

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}

def is_valid(url, base_domain):
    return base_domain in urlparse(url).netloc or urlparse(url).netloc == ""

def download_file(url, folder):
    try:
        r = requests.get(url, headers=HEADERS, timeout=10)
        r.raise_for_status()

        parsed = urlparse(url)
        path = parsed.path.lstrip("/")
        if not path:
            path = "index.html"

        full_path = os.path.join(folder, path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)

        with open(full_path, "wb") as f:
            f.write(r.content)

        return path
    except:
        return None

def clone_website(start_url, output_dir="cloned_site"):
    os.makedirs(output_dir, exist_ok=True)
    domain = urlparse(start_url).netloc

    visited = set()
    queue = [start_url]

    while queue:
        url = queue.pop(0)
        if url in visited:
            continue
        visited.add(url)

        try:
            r = requests.get(url, headers=HEADERS, timeout=10)
            r.raise_for_status()
        except:
            continue

        soup = BeautifulSoup(r.text, "lxml")

        for tag in soup.find_all(["a", "link", "script", "img"]):
            attr = "href" if tag.name in ["a", "link"] else "src"
            if not tag.get(attr):
                continue

            asset_url = urljoin(url, tag.get(attr))
            if not is_valid(asset_url, domain):
                continue

            saved_path = download_file(asset_url, output_dir)
            if saved_path:
                tag[attr] = saved_path

            if tag.name == "a" and asset_url not in visited:
                queue.append(asset_url)

        file_path = os.path.join(output_dir, "index.html")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(str(soup))

    print("✅ Static clone completed")

if __name__ == "__main__":
    clone_website("https://my-site-hvw7dfwv-thanushpriyan504.wix-vibe.com")
