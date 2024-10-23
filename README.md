# Miro

Miro is an open-source Chrome extension that notifies users when ChatGPT or Claude.AI has finished generating a response.

## Features

- **Real-time Notifications**: Get notified instantly when ChatGPT or Claude.AI completes its response.
- **Open Source**: Miro is fully open-source, allowing developers to contribute and improve the extension.

## Project Setup

To set up Miro locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone  https://github.com/Shailendra1703/Miro.git
   cd miro
   ```

2. **Directory Structure**:
   Ensure that your directory contains the following files:
   ```
   miro/
   ├── background.js
   ├── content.js
   ├── manifest.json
   └── README.md
   └── popup.html
   ```

## Installation

To install Miro in your Chrome browser, follow these steps:

1. **Open Chrome**.
2. Go to `chrome://extensions/`.
3. Enable **Developer mode** by toggling the switch in the top right corner.
4. Click on **Load unpacked**.
5. Select the directory where you cloned Miro.
6. The extension should now be visible in your list of extensions.

### Permissions

Miro requires the following permissions:

- `background`: To monitor Web Request (HTTP Request) in background.
- `notifications`: To send desktop notifications when a response is complete.
- `webRequest`: To monitor Web Request Events.

## Contributing

Contributions to Miro are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push to your branch and open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/Shailendra1703/Miro/blob/master/LICENSE.md) file for details.
