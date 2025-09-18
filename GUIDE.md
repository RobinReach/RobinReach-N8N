# How to Use the RobinReach Node in n8n

*Complete guide to automating your social media with RobinReach and n8n workflows*

---

## Table of Contents

1. [What is the RobinReach n8n Node?](#what-is-the-robinreach-n8n-node)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Setting Up Credentials](#setting-up-credentials)
5. [Available Operations](#available-operations)
6. [Step-by-Step Workflow Examples](#step-by-step-workflow-examples)
7. [Advanced Platform Settings](#advanced-platform-settings)
8. [Scheduling and Automation](#scheduling-and-automation)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)
11. [FAQ](#faq)

---

## What is the RobinReach n8n Node?

The RobinReach n8n Node is a community-built integration that connects [RobinReach](https://robinreach.com) with [n8n](https://n8n.io), allowing you to automate your social media posting workflows. With this node, you can:

- **Automate cross-platform posting** across 10+ social media platforms
- **Schedule content** for optimal engagement times
- **Create dynamic workflows** that respond to triggers like RSS feeds, webhooks, or time-based schedules
- **Manage multiple brands** and social profiles from one workflow
- **Customize platform-specific settings** for each social network

### Supported Platforms

- **Twitter/X** - Posts and threads
- **Instagram** - Feed posts, Stories, and Reels
- **Facebook** - Page posts, Stories, and Reels
- **LinkedIn** - Personal and company page posting
- **TikTok** - Video content
- **YouTube** - Videos and Shorts
- **Threads** - Meta's social platform
- **Pinterest** - Visual content
- **Bluesky** - Decentralized social networking
- **Google My Business** - Business profile updates

---

## Prerequisites

Before you can use the RobinReach n8n Node, you'll need:

### 1. RobinReach Account
- Sign up at [robinreach.com](https://robinreach.com)
- **Bloom or Thrive Plan required** - API access is not available on free plans
- Connect your social media accounts to RobinReach

### 2. n8n Instance
- Self-hosted n8n instance or n8n Cloud account
- Admin access to install community nodes

### 3. API Access
- Generate API keys from your RobinReach dashboard
- Learn how to get your API keys: [How to get your API-keys](https://info.robinreach.com/)

---

## Installation

### Method 1: n8n Community Nodes Panel (Recommended)

1. **Open n8n Settings**
   - Navigate to **Settings** → **Community Nodes**
   
2. **Install the Node**
   - Click **Install**
   - Enter: `n8n-nodes-robinreach`
   - Click **Install**

3. **Restart n8n**
   - Restart your n8n instance
   - The RobinReach node will appear in your node palette under "Social Media"

### Method 2: Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the node package
npm install n8n-nodes-robinreach

# Restart n8n
n8n start
```

---

## Setting Up Credentials

### Step 1: Create RobinReach API Credential

1. **Add New Credential**
   - In n8n, click the **"+"** to add a new node
   - Search for "RobinReach"
   - Click on the node to add it to your workflow

2. **Configure Credential**
   - Click on **"Create New Credential"**
   - Select **"RobinReach API"**

3. **Enter API Details**
   - **API Key**: Your RobinReach API key from the dashboard
   - **Environment**: Select "Production" (or "Development" for testing)
   - **Base URL**: Leave as default unless using custom endpoint

4. **Test Connection**
   - Click **"Test"** to verify your credentials
   - Save the credential with a descriptive name

### Step 2: Connect Social Accounts in RobinReach

Before using the n8n node, ensure your social media accounts are connected in RobinReach:

1. Log into your [RobinReach dashboard](https://robinreach.com)
2. Navigate to **Social Profiles**
3. Connect your desired social media accounts
4. Verify all accounts show as "Connected"

---

## Available Operations

The RobinReach node supports three main operations:

### 1. List Brands
**Purpose**: Retrieve all brands/companies in your RobinReach account

**Use Cases**:
- Get brand IDs for other operations
- Display available brands in dynamic workflows
- Validate brand access

**Output**: Array of brand objects with ID, name, email, website, timezone, and country

### 2. List Social Profiles
**Purpose**: Get connected social media accounts for a specific brand

**Required Input**:
- **Brand**: Select from your available brands

**Use Cases**:
- Get profile IDs for posting
- Check which platforms are connected
- Validate social account status

**Output**: Array of social profile objects with ID, name, platform, and connection status

### 3. Create Post
**Purpose**: Create, schedule, or draft social media posts

**Required Inputs**:
- **Brand**: Target brand
- **Post Content**: Your message text
- **Social Profiles**: Select which accounts to post to
- **Action**: Publish Now, Schedule, or Save as Draft

**Optional Advanced Settings**:
- Media attachments
- Platform-specific customization
- AI content enhancement
- Labels for organization
- Scheduling options

---

## Step-by-Step Workflow Examples

### Example 1: Daily Automated Post

**Scenario**: Post daily motivational quotes at 9 AM across all your social platforms

#### Step 1: Add Schedule Trigger
1. Add **"Schedule Trigger"** node
2. Set to trigger **daily at 9:00 AM**
3. Configure your timezone

#### Step 2: Prepare Content
1. Add **"Set"** node after the trigger
2. Create your content:
```json
{
  "quote": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "hashtags": "#motivation #success #mondayvibes"
}
```

#### Step 3: Get Your Brand
1. Add **"RobinReach"** node
2. Select **"List Brands"** operation
3. This will fetch your available brands

#### Step 4: Get Social Profiles
1. Add another **"RobinReach"** node
2. Select **"List Social Profiles"** operation
3. Set **Brand** to: `{{ $node["RobinReach"].json["brands"][0]["id"] }}`

#### Step 5: Create the Post
1. Add final **"RobinReach"** node
2. Select **"Create Post"** operation
3. Configure:
   - **Brand**: `{{ $node["RobinReach"].json["brands"][0]["id"] }}`
   - **Post Content**: `{{ $node["Set"].json["quote"] }} {{ $node["Set"].json["hashtags"] }}`
   - **Social Profiles**: Select all desired profiles
   - **Action**: "Publish Now"

### Example 2: RSS to Social Media

**Scenario**: Automatically post new blog articles to social media

#### Step 1: RSS Feed Trigger
1. Add **"RSS Feed Read"** node
2. Enter your blog's RSS URL
3. Set polling interval (e.g., every hour)

#### Step 2: Format Content
1. Add **"Set"** node
2. Create social media friendly content:
```json
{
  "content": "New blog post: {{ $node["RSS Feed Read"].json["title"] }}\n\n{{ $node["RSS Feed Read"].json["contentSnippet"] }}\n\nRead more: {{ $node["RSS Feed Read"].json["link"] }}\n\n#blog #newpost"
}
```

#### Step 3: Post to Social Media
1. Add **"RobinReach"** node
2. Select **"Create Post"** operation
3. Use the formatted content from Step 2
4. Set **Action** to "Publish Now" or "Schedule"

### Example 3: Multi-Platform Content Customization

**Scenario**: Post the same content with platform-specific customizations

#### Step 1: Prepare Base Content
1. Add trigger of your choice
2. Add **"Set"** node with base content

#### Step 2: Create Customized Post
1. Add **"RobinReach"** node
2. Select **"Create Post"** operation
3. In **Advanced Options** → **Platform-Specific Settings**:

**Facebook Settings**:
```json
{
  "postType": "post",
  "comment": "What do you think about this? Share your thoughts! 👇"
}
```

**Instagram Settings**:
```json
{
  "postType": "post",
  "comment": "Double-tap if you agree! ❤️ #instagram #content"
}
```

**Twitter Settings**:
```json
{
  "replies": [
    "This is part 2 of the thread...",
    "And here's the final thought in this thread."
  ]
}
```

---

## Advanced Platform Settings

### Facebook Customization

The Facebook platform supports:
- **Post Type**: Choose between "post", "story", or "reels"
- **Comment**: Auto-comment after posting

```json
{
  "platformSettings": {
    "facebook": {
      "postType": "post",
      "comment": "Thanks for reading! What are your thoughts?"
    }
  }
}
```

### Instagram Customization

Instagram platform supports:
- **Post Type**: Choose between "post", "story", or "reels"
- **Comment**: First comment to add after posting

```json
{
  "platformSettings": {
    "instagram": {
      "postType": "post",
      "comment": "Don't forget to follow for more content! 🚀"
    }
  }
}
```

### Twitter/X Customization

Twitter platform supports:
- **Replies**: Array of follow-up tweets for creating threads

```json
{
  "platformSettings": {
    "twitter": {
      "replies": [
        "This is the second tweet in the thread...",
        "And this concludes our thread. Thanks for reading!"
      ]
    }
  }
}
```

### Media Attachments

Add images or videos to your posts:

```json
{
  "mediaUrls": [
    "https://your-domain.com/image1.jpg",
    "https://your-domain.com/video1.mp4"
  ]
}
```

**Supported Media Types**:
- **Images**: JPG, PNG, GIF, WebP
- **Videos**: MP4, MOV, AVI (platform limits apply)

---

## Scheduling and Automation

### Scheduling Posts

1. Set **Action** to "Schedule"
2. Configure **Schedule Time** with date and time
3. Select appropriate **Timezone**

**Example**: Schedule for Christmas morning
```json
{
  "scheduleTime": "2024-12-25T09:00:00",
  "timezone": "America/New_York"
}
```

### Popular Automation Triggers

#### Time-Based Triggers
- **Schedule Trigger**: Daily, weekly, monthly posting
- **Cron**: Advanced scheduling with cron expressions

#### Content Triggers
- **RSS Feed**: New blog posts
- **Webhook**: External system notifications
- **HTTP Request**: API-based triggers

#### Data-Driven Triggers
- **Google Sheets**: Content calendar integration
- **Airtable**: Content management workflows
- **Database**: Dynamic content from databases

---

## Best Practices

### Content Strategy

1. **Plan Your Content**
   - Use content calendars
   - Batch create content in advance
   - Maintain consistent posting schedule

2. **Platform Optimization**
   - Customize content for each platform
   - Use platform-specific features (hashtags, mentions)
   - Consider optimal posting times per platform

3. **Engagement Focus**
   - Include call-to-actions
   - Ask questions to encourage interaction
   - Use relevant hashtags and mentions

### Workflow Design

1. **Error Handling**
   - Enable "Continue on Fail" for non-critical nodes
   - Add error notification workflows
   - Log failed posts for manual review

2. **Testing**
   - Use "Save as Draft" during development
   - Test with single social profile first
   - Verify content formatting across platforms

3. **Monitoring**
   - Set up workflow execution notifications
   - Monitor posting success rates
   - Track engagement metrics in RobinReach

### Security

1. **API Key Management**
   - Use environment variables for sensitive data
   - Regularly rotate API keys
   - Limit API key permissions when possible

2. **Content Validation**
   - Validate content length per platform
   - Check for inappropriate content
   - Verify media URLs are accessible

---

## Troubleshooting

### Common Issues

#### "Authentication Failed" Error
**Cause**: Invalid or expired API key
**Solution**:
1. Verify API key in RobinReach dashboard
2. Check if API key has proper permissions
3. Regenerate API key if necessary
4. Update credential in n8n

#### "Brand Not Found" Error
**Cause**: Brand ID doesn't exist or access denied
**Solution**:
1. Use "List Brands" operation to get valid brand IDs
2. Verify brand access in RobinReach dashboard
3. Check if brand was deleted or access revoked

#### "Social Profile Not Connected" Error
**Cause**: Selected social profile is disconnected in RobinReach
**Solution**:
1. Check social profile status in RobinReach dashboard
2. Reconnect the social media account
3. Use "List Social Profiles" to verify connection status

#### "Post Creation Failed" Error
**Cause**: Various reasons (content issues, platform limits, etc.)
**Solution**:
1. Check error message for specific cause
2. Verify content meets platform requirements
3. Check if social account has proper permissions
4. Ensure media URLs are accessible

#### Rate Limiting
**Cause**: Too many API requests in short time
**Solution**:
1. Add delays between requests
2. Implement retry logic with exponential backoff
3. Monitor API usage in RobinReach dashboard
4. Upgrade to higher plan if needed

### Debugging Tips

1. **Use Manual Execution**
   - Test workflows manually before scheduling
   - Check each node's output data
   - Verify data transformations

2. **Enable Detailed Logging**
   - Turn on execution logging in n8n
   - Monitor workflow execution history
   - Check for patterns in failures

3. **Validate Data Flow**
   - Use "Edit Fields" nodes to transform data
   - Add "Set" nodes to debug data structure
   - Check expressions and references

---

## FAQ

### General Questions

**Q: Do I need a paid RobinReach plan to use the n8n node?**
A: Yes, API access requires a Bloom or Thrive plan. Free plans don't include API access.

**Q: Can I use the node with n8n Cloud?**
A: Yes, the node works with both self-hosted n8n and n8n Cloud instances.

**Q: How many social profiles can I post to simultaneously?**
A: You can post to all connected social profiles in a single operation, limited by your RobinReach plan.

### Technical Questions

**Q: Can I schedule posts for different timezones?**
A: Yes, you can specify the timezone for each scheduled post.

**Q: What happens if a social account gets disconnected?**
A: The post will fail for that specific platform, but succeed for other connected platforms.

**Q: Can I edit or delete posts after creation?**
A: Currently, the node supports creation only. Use the RobinReach dashboard for editing or deleting posts.

**Q: Are there rate limits for the API?**
A: Yes, RobinReach enforces rate limits based on your plan. Monitor usage in your dashboard.

### Content Questions

**Q: What's the maximum character limit for posts?**
A: Limits vary by platform and are enforced by RobinReach. The node will return an error if content exceeds limits.

**Q: Can I use emojis and special characters?**
A: Yes, full Unicode support is available for all platforms that support it.

**Q: How do I handle platform-specific content length limits?**
A: Use conditional logic in n8n to create different content versions for different platforms.

---

## Support Resources

- **RobinReach Knowledge Base**: [info.robinreach.com](https://info.robinreach.com/)
- **RobinReach API Documentation**: [robinreach.com/api-docs](https://robinreach.com/api-docs)
- **n8n Community**: [community.n8n.io](https://community.n8n.io)
- **GitHub Issues**: [Report bugs and feature requests](https://github.com/robinreach/n8n-nodes-robinreach/issues)
- **Email Support**: support@robinreach.com

---

**Last Updated**: September 2024
**Node Version**: 1.0.0

*This guide is maintained by the RobinReach team. For the most up-to-date information, visit [info.robinreach.com](https://info.robinreach.com/).*
