# Testing Guide for RobinReach N8N Node

This guide helps you test the RobinReach N8N community node thoroughly before publishing.

## Prerequisites

- N8N instance (local or cloud)
- RobinReach account with Bloom or Thrive plan
- RobinReach API key
- Connected social media accounts in RobinReach

## Setup for Testing

### 1. Development Setup

```bash
# Clone and setup
git clone https://github.com/robinreach/n8n-nodes-robinreach.git
cd n8n-nodes-robinreach

# Run setup script
./scripts/setup-dev.sh

# Or manual setup:
npm install
npm run build
npm link
```

### 2. N8N Configuration

```bash
# Link in N8N
cd ~/.n8n/custom
npm link n8n-nodes-robinreach

# Start N8N
n8n start
```

### 3. Credential Setup

1. Open N8N at `http://localhost:5678`
2. Go to **Settings** → **Credentials**
3. Click **Add Credential**
4. Search for "RobinReach API"
5. Add your API key and select environment

## Test Cases

### 🔐 Authentication Tests

#### Test 1: Valid API Key
- **Setup**: Use valid RobinReach API key
- **Expected**: Credential test passes
- **Verify**: Green checkmark, no errors

#### Test 2: Invalid API Key
- **Setup**: Use invalid/fake API key
- **Expected**: Credential test fails
- **Verify**: Error message displayed

#### Test 3: Expired/Revoked Key
- **Setup**: Use expired API key
- **Expected**: Authentication fails gracefully
- **Verify**: Clear error message

### 📋 List Brands Operation

#### Test 4: List Brands - Success
- **Setup**: Valid credentials, brands exist
- **Operation**: List Brands
- **Expected**: Returns array of brands
- **Verify**: 
  - `success: true`
  - `brands` array with id, name, email
  - `count` matches array length

#### Test 5: List Brands - No Brands
- **Setup**: Account with no brands
- **Expected**: Empty array
- **Verify**: `brands: []`, `count: 0`

#### Test 6: List Brands - API Error
- **Setup**: Simulate API error
- **Expected**: Graceful error handling
- **Verify**: Error message, `success: false`

### 👥 List Social Profiles Operation

#### Test 7: List Profiles - Success
- **Setup**: Valid brand with connected profiles
- **Operation**: List Social Profiles
- **Expected**: Returns social profiles
- **Verify**:
  - `socialProfiles` array
  - Each profile has id, name, platform
  - Platform names are correct

#### Test 8: List Profiles - No Profiles
- **Setup**: Brand with no connected accounts
- **Expected**: Empty array
- **Verify**: `socialProfiles: []`, `count: 0`

#### Test 9: List Profiles - Invalid Brand
- **Setup**: Non-existent brand ID
- **Expected**: Error or empty result
- **Verify**: Appropriate error handling

### ✍️ Create Post Operation

#### Test 10: Draft Post Creation
- **Setup**: Valid content and profiles
- **Operation**: Create Post (Draft)
- **Expected**: Post saved as draft
- **Verify**:
  - `success: true`
  - `status: "draft"`
  - `postId` returned

#### Test 11: Immediate Publishing
- **Setup**: Valid content and profiles
- **Operation**: Create Post (Publish)
- **Expected**: Post published immediately
- **Verify**:
  - `success: true`
  - `status: "published"`
  - Posts appear on social media

#### Test 12: Scheduled Post
- **Setup**: Future datetime, timezone
- **Operation**: Create Post (Schedule)
- **Expected**: Post scheduled for future
- **Verify**:
  - `success: true`
  - `status: "scheduled"`
  - `scheduleTime` matches input

#### Test 13: Empty Content
- **Setup**: Empty or whitespace content
- **Expected**: Validation error
- **Verify**: Clear error message

#### Test 14: No Social Profiles
- **Setup**: No profiles selected
- **Expected**: Validation error
- **Verify**: "Select at least one profile" error

#### Test 15: Invalid Schedule Time
- **Setup**: Past datetime for scheduling
- **Expected**: Validation error
- **Verify**: "Schedule time must be in future" error

### 🎯 Advanced Features Tests

#### Test 16: AI Enhancement
- **Setup**: Enable AI with specific tone
- **Operation**: Create Post with AI
- **Expected**: Content enhanced (if API available)
- **Verify**: `ai_enhanced: true` in response

#### Test 17: Media Attachments
- **Setup**: Valid image/video URLs
- **Operation**: Create Post with media
- **Expected**: Media attached to post
- **Verify**: Media URLs processed

#### Test 18: Platform-Specific Settings
- **Setup**: Facebook post type, Instagram comment
- **Operation**: Create Post with platform settings
- **Expected**: Settings applied correctly
- **Verify**: Platform attributes in payload

#### Test 19: Labels/Tags
- **Setup**: Comma-separated labels
- **Operation**: Create Post with labels
- **Expected**: Labels applied to post
- **Verify**: `label_list` in payload

#### Test 20: Multiple Platforms
- **Setup**: Select multiple social profiles
- **Operation**: Create Post
- **Expected**: Post created for all platforms
- **Verify**: All platform IDs in payload

### 🌐 Platform-Specific Tests

#### Test 21: Facebook Features
- **Setup**: Facebook profile, story/reel type
- **Operation**: Create Facebook post
- **Expected**: Platform-specific features work
- **Verify**: Post appears on Facebook correctly

#### Test 22: Instagram Features
- **Setup**: Instagram profile, first comment
- **Operation**: Create Instagram post
- **Expected**: Post with comment
- **Verify**: Comment appears on Instagram

#### Test 23: Twitter/X Features
- **Setup**: Twitter profile, thread replies
- **Operation**: Create Twitter post
- **Expected**: Thread created
- **Verify**: All tweets in thread

### 🔄 Workflow Integration Tests

#### Test 24: Simple Workflow
```
Manual Trigger → RobinReach (List Brands) → RobinReach (Create Post)
```
- **Expected**: Data flows correctly between nodes
- **Verify**: Brand ID passes to create post

#### Test 25: Complex Workflow
```
Schedule → RSS Feed → RobinReach (Create Post) → Email Notification
```
- **Expected**: Full automation works
- **Verify**: RSS content becomes social post

#### Test 26: Error Handling in Workflow
- **Setup**: Invalid data between nodes
- **Expected**: Graceful error handling
- **Verify**: Workflow doesn't break completely

### 🚨 Error Handling Tests

#### Test 27: Network Timeout
- **Setup**: Simulate slow network
- **Expected**: Timeout handling
- **Verify**: Clear timeout error message

#### Test 28: Rate Limiting
- **Setup**: Exceed API rate limits
- **Expected**: Rate limit error
- **Verify**: Appropriate error message

#### Test 29: Invalid JSON Response
- **Setup**: Malformed API response
- **Expected**: JSON parsing error
- **Verify**: Graceful error handling

#### Test 30: Continue on Fail
- **Setup**: Enable "Continue on Fail"
- **Operation**: Trigger error
- **Expected**: Node continues with error data
- **Verify**: Error in output, workflow continues

## Performance Tests

### Test 31: Large Content
- **Setup**: Maximum character content
- **Expected**: Handles large content
- **Verify**: No truncation or errors

### Test 32: Many Social Profiles
- **Setup**: Select all available profiles
- **Expected**: Handles multiple profiles
- **Verify**: All profiles receive post

### Test 33: Concurrent Requests
- **Setup**: Multiple nodes running simultaneously
- **Expected**: No conflicts
- **Verify**: All requests succeed

## Manual Testing Checklist

### UI/UX Testing
- [ ] Node appears in N8N node list
- [ ] Icon displays correctly
- [ ] All parameters show/hide correctly
- [ ] Dropdown options load properly
- [ ] Error messages are clear
- [ ] Success messages are informative

### Functionality Testing
- [ ] All operations work as expected
- [ ] Data validation works
- [ ] Error handling is graceful
- [ ] Workflow integration works
- [ ] Advanced features function

### Cross-Platform Testing
- [ ] Works on different N8N versions
- [ ] Works on different operating systems
- [ ] Works with different Node.js versions

## Automated Testing

### Unit Tests (Future)
```bash
# When implemented
npm test
```

### Integration Tests (Future)
```bash
# When implemented
npm run test:integration
```

## Reporting Issues

When reporting test failures:

1. **Test Case**: Which test failed
2. **Environment**: N8N version, OS, Node.js version
3. **Steps**: Exact steps to reproduce
4. **Expected**: What should happen
5. **Actual**: What actually happened
6. **Logs**: Any error messages or logs
7. **Screenshots**: If UI-related

## Test Data

### Sample API Key Format
```
rr_1234567890abcdef1234567890abcdef
```

### Sample Brand Response
```json
{
  "success": true,
  "data": [
    {
      "id": 123,
      "name": "Test Brand",
      "email": "test@example.com",
      "website": "https://example.com",
      "timezone": "America/New_York"
    }
  ]
}
```

### Sample Social Profile Response
```json
{
  "success": true,
  "data": [
    {
      "id": 456,
      "name": "Test Page",
      "platform": "facebook",
      "image_url": "https://example.com/image.jpg"
    }
  ]
}
```

## Success Criteria

✅ **All test cases pass**
✅ **No critical errors**
✅ **Graceful error handling**
✅ **Clear user feedback**
✅ **Workflow integration works**
✅ **Performance is acceptable**
✅ **Documentation is accurate**

Ready for production when all criteria are met! 🚀
