# Contributing to N8N RobinReach Node

Thank you for your interest in contributing to the RobinReach N8N community node! 🎉

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- N8N instance for testing
- RobinReach account with API access

### Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/RobinReach/RobinReach-N8N.git
cd RobinReach-N8N
```

2. **Install dependencies**
```bash
npm install
```

3. **Build the project**
```bash
npm run build
```

4. **Link for local development**
```bash
npm link
cd ~/.n8n/custom
npm link n8n-nodes-robinreach
```

5. **Start N8N**
```bash
n8n start
```

## Development Workflow

### Making Changes

1. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**
   - Edit TypeScript files in `nodes/` or `credentials/`
   - Update tests if applicable
   - Update documentation

3. **Test your changes**
```bash
npm run build
npm run lint
```

4. **Test in N8N**
   - Restart N8N
   - Test your changes with real workflows
   - Verify all operations work correctly

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lintfix

# Format code
npm run format
```

### Commit Guidelines

Use conventional commit messages:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Build process or auxiliary tool changes

Examples:
```
feat: add support for Instagram Reels
fix: resolve timezone handling in scheduled posts
docs: update README with new examples
```

## Types of Contributions

### 🐛 Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to reproduce the bug
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: N8N version, node version, OS
- **Screenshots**: If applicable

### ✨ Feature Requests

For feature requests, please include:

- **Use Case**: Why is this feature needed?
- **Description**: Detailed description of the feature
- **Examples**: How would it be used?
- **Alternative Solutions**: Any alternatives considered?

### 🔧 Code Contributions

#### Adding New Operations

1. **Update the node file** (`nodes/RobinReach/RobinReach.node.ts`)
   - Add new operation to the options array
   - Add required parameters
   - Implement the operation logic

2. **Update documentation**
   - Add examples to README
   - Update operation descriptions

3. **Test thoroughly**
   - Test with real RobinReach API
   - Test error scenarios
   - Test with different data types

#### Adding Platform-Specific Features

1. **Research platform requirements**
   - Check RobinReach API documentation
   - Understand platform-specific parameters

2. **Implement the feature**
   - Add to platform-specific settings
   - Handle validation
   - Add proper error handling

3. **Document the feature**
   - Add examples
   - Update README
   - Add to workflow examples

### 📚 Documentation

Documentation improvements are always welcome:

- Fix typos or unclear explanations
- Add more examples
- Improve workflow documentation
- Add troubleshooting guides

## Testing

### Manual Testing

1. **Test each operation**
   - List Brands
   - List Social Profiles
   - Create Post (all actions)

2. **Test edge cases**
   - Invalid API keys
   - Network failures
   - Invalid parameters

3. **Test workflows**
   - Simple workflows
   - Complex multi-step workflows
   - Error scenarios

### Automated Testing

We welcome contributions to automated testing:

```bash
# Run tests (when implemented)
npm test
```

## Pull Request Process

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test thoroughly**
5. **Update documentation**
6. **Submit pull request**

### Pull Request Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests pass (if applicable)
- [ ] No breaking changes (or clearly documented)
- [ ] Tested with real N8N instance

### Pull Request Description

Please include:

- **Summary**: What does this PR do?
- **Type**: Bug fix, feature, documentation, etc.
- **Testing**: How was this tested?
- **Screenshots**: If UI changes
- **Breaking Changes**: Any breaking changes?

## Community

### Getting Help

- **GitHub Issues**: For bugs and feature requests
- **N8N Community**: For general discussions
- **RobinReach Support**: For API-related questions

### Code of Conduct

Please be respectful and constructive in all interactions:

- Be welcoming to newcomers
- Be respectful of differing viewpoints
- Focus on what's best for the community
- Show empathy towards other community members

## Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes for significant contributions
- Special thanks in documentation

## Questions?

If you have questions about contributing, please:

1. Check existing issues and documentation
2. Open a GitHub issue with the "question" label
3. Reach out to maintainers

Thank you for contributing to make RobinReach N8N integration better! 🚀