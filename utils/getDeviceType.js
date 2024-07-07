import UAParser from 'ua-parser-js';

export const getDeviceType = (userAgent) => {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  return {
    device: result.device.type || 'desktop',
    browser: result.browser.name,
    os: result.os.name,
  };
};
