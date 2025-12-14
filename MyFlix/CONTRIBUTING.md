# 🤝 Contributing to MyFlix

Thank you for considering contributing to MyFlix! This document provides guidelines and instructions for contributing.

---

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Feature Requests](#feature-requests)
- [Bug Reports](#bug-reports)

---

## 📜 Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive experience for everyone.

### Our Standards
- ✅ Be respectful and inclusive
- ✅ Accept constructive criticism gracefully
- ✅ Focus on what's best for the community
- ❌ No harassment, trolling, or inappropriate behavior
- ❌ No sharing of copyrighted content

---

## 🎯 How Can I Contribute?

### 1. Report Bugs
Found a bug? Please open an issue with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, Python version, etc.)

### 2. Suggest Enhancements
Have an idea? Open an issue with:
- Clear feature description
- Use case / motivation
- Possible implementation approach
- Examples from other apps (if applicable)

### 3. Write Code
- Fix bugs
- Implement new features
- Improve documentation
- Add tests
- Optimize performance

### 4. Improve Documentation
- Fix typos
- Add examples
- Clarify instructions
- Translate to other languages

---

## 🛠️ Development Setup

### 1. Fork and Clone
```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/MyFlix.git
cd MyFlix
```

### 2. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Set Up Configuration
```bash
cp .env.example .env
# Edit .env with your Telegram credentials
```

### 5. Create Feature Branch
```bash
git checkout -b feature/amazing-feature
```

---

## 📝 Coding Standards

### Python Style Guide
Follow [PEP 8](https://pep8.org/) standards:

```python
# Good
def fetch_movies_from_channel(channel_id):
    """Fetch all movies from specified channel"""
    movies = []
    # Implementation
    return movies

# Bad
def FetchMovies(ch):
    movies=[]
    return movies
```

### Code Organization
```python
# 1. Imports (grouped)
import os
import json
from typing import List, Dict

# 2. Constants
MAX_RETRIES = 3
CACHE_FILE = 'cache/movies.json'

# 3. Classes
class MovieClient:
    pass

# 4. Functions
def helper_function():
    pass

# 5. Main execution
if __name__ == '__main__':
    main()
```

### Comments and Docstrings
```python
def parse_movie_caption(caption: str) -> Dict:
    """
    Parse movie metadata from caption text.
    
    Args:
        caption: Caption text from Telegram message
        
    Returns:
        Dictionary containing movie metadata
        
    Example:
        >>> parse_movie_caption("Title: Inception\\nYear: 2010")
        {'title': 'Inception', 'year': '2010'}
    """
    # Implementation
    pass
```

### Error Handling
```python
# Good - Specific exception handling
try:
    movies = await fetch_movies()
except ChannelInvalid:
    print("Invalid channel ID")
except FloodWait as e:
    print(f"Rate limited. Wait {e.value}s")
except Exception as e:
    print(f"Unexpected error: {e}")

# Bad - Catch all exceptions
try:
    movies = await fetch_movies()
except:
    pass
```

---

## 🔄 Pull Request Process

### 1. Before Submitting
- [ ] Code follows style guidelines
- [ ] Comments added for complex logic
- [ ] Documentation updated (if needed)
- [ ] Tested locally
- [ ] No merge conflicts with main branch

### 2. Commit Messages
Use clear, descriptive commit messages:

```bash
# Good
git commit -m "Add search functionality with debouncing"
git commit -m "Fix: Video streaming on mobile devices"
git commit -m "Docs: Update deployment guide for Railway"

# Bad
git commit -m "fixed stuff"
git commit -m "update"
```

### 3. Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested locally
- [ ] Works on production

## Screenshots (if applicable)
[Add screenshots here]

## Related Issues
Fixes #123
```

### 4. Review Process
1. Submit PR
2. Maintainer reviews code
3. Address feedback (if any)
4. PR is merged or closed

---

## 🐛 Bug Report Template

```markdown
### Bug Description
Clear description of the bug

### Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

### Expected Behavior
What you expected to happen

### Actual Behavior
What actually happened

### Screenshots
If applicable, add screenshots

### Environment
- OS: [e.g., Windows 10, macOS 13, Ubuntu 22.04]
- Python Version: [e.g., 3.10.5]
- Browser: [e.g., Chrome 120]
- Deployment: [e.g., Local, Render, Heroku]

### Additional Context
Any other relevant information
```

---

## ✨ Feature Request Template

```markdown
### Feature Description
Clear description of the feature

### Problem It Solves
What problem does this solve?

### Proposed Solution
How should this work?

### Alternatives Considered
Other approaches you've thought of

### Additional Context
Screenshots, mockups, examples from other apps
```

---

## 🧪 Testing Guidelines

### Manual Testing
Before submitting:
1. Test on clean installation
2. Test all affected features
3. Test on different screen sizes (if UI changes)
4. Test error scenarios

### Test Checklist
- [ ] Application starts without errors
- [ ] Home page loads correctly
- [ ] Search functionality works
- [ ] Video streaming works
- [ ] Category filtering works
- [ ] Mobile responsive

---

## 📚 Documentation Guidelines

### README Updates
- Keep it concise and organized
- Use clear headings
- Include code examples
- Add screenshots/GIFs for visual features

### Code Comments
```python
# Good - Explains "why", not "what"
# Cache movies to reduce Telegram API calls
cache_movies(movie_list)

# Bad - States the obvious
# Set x to 5
x = 5
```

### Markdown Style
- Use proper headings hierarchy (H1 → H2 → H3)
- Include table of contents for long docs
- Use code blocks with language specification
- Add emojis sparingly for visual appeal

---

## 🏆 Recognition

Contributors will be:
- Listed in README.md
- Credited in release notes
- Mentioned in project documentation

---

## 📞 Questions?

- **General Questions:** Open a GitHub Discussion
- **Bug Reports:** Open a GitHub Issue
- **Security Issues:** Email security@myflix.example.com

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing to MyFlix! 🎬**
