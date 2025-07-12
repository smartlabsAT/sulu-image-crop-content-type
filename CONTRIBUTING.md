# Contributing to Sulu Image Crop Content Type

First off, thank you for considering contributing to this project! 🎉

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please report unacceptable behavior to christopher@smartlabs.at.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and expected**
- **Include screenshots if possible**
- **Include your environment details** (Sulu version, PHP version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Provide specific examples to demonstrate the enhancement**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repository and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code follows the existing code style
5. Issue the pull request

## Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/your-username/sulu-image-crop-content-type.git
   cd sulu-image-crop-content-type
   ```

2. Install dependencies:
   ```bash
   composer install
   cd Resources/js && npm install
   ```

3. Make your changes

4. Run tests (when available):
   ```bash
   vendor/bin/phpunit
   ```

## Coding Standards

### PHP
- Follow PSR-12 coding standards
- Use PHP 8.2+ features where appropriate
- Add PHPDoc comments for all public methods
- Use type declarations for parameters and return types

### JavaScript
- Use ES6+ syntax
- Follow the existing code style
- Add JSDoc comments for complex functions
- Ensure React components are properly documented

### Commit Messages
- Use clear and meaningful commit messages
- Start with a verb in present tense (e.g., "Add", "Fix", "Update")
- Reference issues and pull requests when applicable
- Examples:
  - `Add validation for media data structure`
  - `Fix memory leak in SingleSelectionStore`
  - `Update documentation for installation process`

## Testing

- Write unit tests for new functionality
- Ensure all tests pass before submitting PR
- Include both positive and negative test cases
- Test edge cases

## Documentation

- Update the README.md if you change functionality
- Update the CHANGELOG.md following the Keep a Changelog format
- Document new features with examples
- Keep documentation concise and clear

## Questions?

Feel free to open an issue with your question or contact the maintainers directly.

Thank you for contributing! 🚀