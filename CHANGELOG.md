# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2025-07-12

### Added
- Comprehensive documentation (CONTRIBUTING.md, CODE_OF_CONDUCT.md)
- GitHub Actions CI/CD pipeline
- PHPUnit configuration for testing
- PHPStan configuration for static analysis
- PHP CS Fixer configuration for code style
- EditorConfig for consistent code formatting
- Issue and Pull Request templates
- Composer scripts for testing and code quality checks
- Dev dependencies for development tools

### Security
- Added HTML escaping to prevent XSS vulnerabilities in media titles
- Implemented input validation for media data to prevent injection attacks
- Added `noopener,noreferrer` attributes to window.open calls
- Added proper error handling for JSON operations

### Fixed
- Fixed memory leak by properly cleaning up SingleSelectionStore in componentWillUnmount
- Eliminated code duplication with isMultipleProperty helper method

### Changed
- Improved error handling with try-catch blocks for JSON operations
- Enhanced composer.json with keywords, homepage, and support information
- Updated .gitignore to exclude common development files

## [1.0.2] - 2025-02-09

### Added
- Initial release of sulu-image-crop-content-type
- Custom content type for Sulu CMS with image cropping functionality
- React component for intuitive image cropping interface
- Integration with Sulu's media management system
- Support for single and multi-value properties
- Preview crop configuration option
- Internationalization support (English/German)

[Unreleased]: https://github.com/smartlabsAT/sulu-image-crop-content-type/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/smartlabsAT/sulu-image-crop-content-type/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/smartlabsAT/sulu-image-crop-content-type/releases/tag/v1.0.2