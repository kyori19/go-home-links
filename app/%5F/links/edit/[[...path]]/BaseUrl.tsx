'use client';

import { useEffect, useState } from 'react';

const BaseUrl = () => {
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    if (window) {
      setBaseUrl(window.location.origin);
    }
  }, []);

  return baseUrl;
};

export default BaseUrl;
