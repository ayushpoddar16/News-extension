// config.js
let config = {};

// Function to load config from .env file
async function loadConfig() {
  try {
    const response = await fetch(chrome.runtime.getURL('.env'));
    const text = await response.text();
    
    // Parse the .env file
    const lines = text.split('\n');
    lines.forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        if (key && value) {
          config[key.trim()] = value.trim();
        }
      }
    });
    
    return config;
  } catch (error) {
    console.error('Error loading .env file:', error);
    return {};
  }
}

// Export the config and loader function
export { config, loadConfig };