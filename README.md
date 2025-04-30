# Personal Bio Site

A modern, configurable personal bio site designed for GitHub Pages. Features include:
- Dynamic content via configuration file
- Gravatar integration
- Social media links
- Latest blog posts via RSS
- Modern gradient design
- Mobile responsive

## Quick Setup

1. Edit `config.json` with your information:
   - Profile details (name, tagline, bio)
   - Gravatar email
   - Social media links
   - Navigation links
   - Blog RSS feed
   - Support button settings

2. Deploy:
   - Enable GitHub Pages in your repository settings
   - Set the source to the main branch
   - Your site will be available at `https://mathetos.github.io/mathetos/`

## Configuration

All site content is managed through `config.json`. Here's what each section controls:

```json
{
  "profile": {
    "name": "Your Name",
    "tagline": "Your Tagline",
    "gravatarEmail": "your@email.com",
    "bio": "Your bio text here"
  },
  "social": {
    "x": "https://x.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "email": "your@email.com"
  },
  "links": [
    {
      "title": "Link Title",
      "url": "https://example.com"
    }
  ],
  "blog": {
    "rssFeed": "https://yourblog.com/feed/",
    "wordCount": 40
  },
  "support": {
    "buttonText": "Support Text",
    "url": "https://your-support-url.com"
  }
}
```

## Development

To run locally:
1. Clone the repository
2. Open `index.html` in your browser
3. Edit `config.json` to update content

## License

MIT License - Feel free to use and modify for your own personal bio site. 