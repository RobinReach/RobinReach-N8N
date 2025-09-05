# n8n-nodes-robinreach

![RobinReach Logo](https://robinreach.com/logo.png)

An n8n community node for the **RobinReach API** - the AI-powered social media management platform.

**Schedule and manage AI-enhanced social media posts across 10+ platforms:**

* 🐦 **Twitter/X** - Posts, threads, and automation
* 📸 **Instagram** - Posts, Stories, Reels with AI optimization
* 👤 **Facebook** - Page management and AI-enhanced posting
* 💼 **LinkedIn** - Personal and company page posting
* 🎵 **TikTok** - Video posting with AI content suggestions
* 📹 **YouTube** - Videos and Shorts with AI descriptions
* 🧵 **Threads** - Meta's social platform
* 📌 **Pinterest** - Visual content with AI optimization
* 📱 **WhatsApp Business** - Business messaging
* 🎭 **Mastodon** - Decentralized social networking

## Version History

* **1.0.0** - Initial release with comprehensive RobinReach API integration

## Installation

### From n8n Community Nodes Panel (Recommended)

1. Go to **Settings** → **Community Nodes** in your n8n instance
2. Select **Install** and enter `n8n-nodes-robinreach`
3. Click **Install** and restart n8n
4. The RobinReach node will appear in your node palette

### From npm

```bash
npm install n8n-nodes-robinreach
```

### From Source

```bash
git clone https://github.com/robinreach/n8n-nodes-robinreach.git
cd n8n-nodes-robinreach
npm install
npm run build
```

## Prerequisites

1. **RobinReach Account**: Sign up at [robinreach.com](https://robinreach.com)
2. **Bloom or Thrive Plan**: API access requires paid plan
3. **API Key**: Generate from your RobinReach dashboard
4. **Social Accounts**: Connect your social media accounts to RobinReach

## Credentials Setup

1. Add a new credential in n8n
2. Search for "RobinReach API"
3. Enter your API key from the RobinReach dashboard
4. Select environment (Production/Development)

## Quick Start

### 1. List Your Brands

Get all your RobinReach brands/companies:

```json
{
  "operation": "listBrands"
}
```

### 2. Get Connected Social Profiles

List social media accounts connected to a brand:

```json
{
  "operation": "listSocialProfiles",
  "brandId": "brand_123_abc"
}
```

### 3. Create and Publish a Post

Create AI-enhanced posts across multiple platforms:

```json
{
  "operation": "createPost",
  "brandId": "brand_123_abc",
  "content": "Hello, world! 🌍 #automation",
  "socialProfileIds": ["profile_123", "profile_456"],
  "publishType": "publish_now",
  "useAiEnhancement": true,
  "platformSettings": {
    "facebook": {
      "link_preview": true
    },
    "twitter": {
      "thread_unroll": false
    },
    "instagram": {
      "first_comment": "Check out our latest update! 🚀"
    }
  }
}
```

## Supported Operations

### Brands Management

* **List Brands** - Get all your RobinReach brands/companies
* **Get Brand** - Get specific brand details

### Social Profiles

* **List Social Profiles** - Get connected social media accounts for a brand
* **Get Profile** - Get specific social profile details

### Posts Management

* **Create Post** - Create and publish/schedule/draft posts
* **List Posts** - Get posts with pagination and filters
* **Get Post** - Get specific post details
* **Update Post** - Edit draft/scheduled posts
* **Delete Post** - Delete posts (published posts may have limitations)

### AI Enhancement

* **Generate Content** - Use RobinReach's AI to generate post content
* **Optimize Content** - AI-optimize existing content for specific platforms
* **Generate Hashtags** - AI-powered hashtag suggestions
* **Content Analysis** - Analyze content performance potential

## Advanced Features

### AI Content Generation

Leverage RobinReach's AI capabilities:

```json
{
  "operation": "createPost",
  "brandId": "brand_123_abc",
  "content": "Write about sustainable technology trends",
  "useAiEnhancement": true,
  "aiSettings": {
    "tone": "professional",
    "length": "medium",
    "include_hashtags": true,
    "include_emojis": true,
    "target_audience": "tech professionals"
  }
}
```

### Platform-Specific Settings

#### Facebook Settings

```json
{
  "platformSettings": {
    "facebook": {
      "link_preview": true,
      "call_to_action": "Learn More"
    }
  }
}
```

#### Instagram Settings

```json
{
  "platformSettings": {
    "instagram": {
      "first_comment": "What do you think? Let me know below! 👇",
      "location_id": "123456789",
      "user_tags": ["@username"]
    }
  }
}
```

#### Twitter/X Settings

```json
{
  "platformSettings": {
    "twitter": {
      "thread_unroll": true,
      "reply_restrictions": "everyone"
    }
  }
}
```

### Media Attachments

Add media via URLs:

```json
{
  "operation": "createPost",
  "content": "Check out this amazing content!",
  "mediaUrls": [
    "https://your-domain.com/image1.jpg",
    "https://your-domain.com/video1.mp4"
  ]
}
```

### Scheduling Posts

Schedule posts for optimal engagement:

```json
{
  "operation": "createPost",
  "publishType": "schedule",
  "scheduledDate": "2024-12-25",
  "scheduledTime": "09:00",
  "timezone": "America/New_York"
}
```

### Labels and Organization

Organize posts with labels:

```json
{
  "operation": "createPost",
  "content": "Holiday promotion post",
  "labels": ["holiday", "promotion", "december"]
}
```

## Platform Requirements

* **Instagram**: Business account recommended for advanced features
* **Facebook**: Page admin access required
* **LinkedIn**: Company page admin access for business posting
* **TikTok**: Creator account recommended
* **YouTube**: Channel access required
* **Twitter/X**: Standard account
* **Pinterest**: Business account recommended

## Plan Limits

RobinReach enforces usage limits based on your plan:

* **Bloom Plan**: Advanced features, API access
* **Thrive Plan**: Full API access, unlimited automation
* **Enterprise**: Custom limits and features

Monitor your usage through the RobinReach dashboard.

## Error Handling

The node handles various error scenarios:

* **401**: Invalid API key or authentication failed
* **403**: Plan limits exceeded or insufficient permissions
* **400**: Invalid request data or missing parameters
* **404**: Resource not found (brand, profile, post)
* **429**: Rate limit exceeded

Check the node output for detailed error messages and solutions.

## Workflow Examples

### Daily Automated Posts

Create a workflow that posts daily content:

1. **Schedule Trigger** - Daily at 9 AM
2. **RobinReach: List Brands** - Get your brands
3. **RobinReach: List Social Profiles** - Get connected accounts
4. **RobinReach: Create Post** - AI-generated daily content

### RSS to Social Media

Convert blog posts to social media content:

1. **RSS Feed Read** - Monitor your blog
2. **RobinReach: Create Post** - AI-enhanced social posts
3. **Multiple Platforms** - Automatic cross-posting

### Content Repurposing

Repurpose content across platforms:

1. **Webhook Trigger** - New content alert
2. **RobinReach: Generate Content** - AI adaptation for each platform
3. **RobinReach: Create Post** - Platform-optimized posting

## Development

### Prerequisites

* Node.js 18+
* TypeScript
* n8n development environment

### Setup

```bash
git clone https://github.com/robinreach/n8n-nodes-robinreach.git
cd n8n-nodes-robinreach
npm install
npm run build
```

### Linting

```bash
npm run lint        # Check for issues
npm run lintfix     # Fix automatically
```

## Support

* **Documentation**: [RobinReach API Docs](https://robinreach.com/api-docs)
* **Dashboard**: [robinreach.com/dashboard](https://robinreach.com/dashboard)
* **Email**: support@robinreach.com
* **Issues**: [GitHub Issues](https://github.com/robinreach/n8n-nodes-robinreach/issues)

## License

MIT

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) and submit pull requests.

---

**Made with ❤️ by the RobinReach team**

[Website](https://robinreach.com) • [Documentation](https://robinreach.com/api-docs) • [Dashboard](https://robinreach.com/dashboard)
