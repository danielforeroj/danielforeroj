
import React from 'react';
import { useUi } from '../lib/i18n';

const SkipToContent: React.FC = () => {
  const t = useUi();
  return (
    <a 
      href="#main-content" 
      className="absolute top-0 left-0 m-3 p-3 -translate-y-16 focus:translate-y-0 transition-transform duration-300 rounded-lg text-sm font-semibold z-[100]"
      style={{
        backgroundColor: 'var(--md-sys-color-primary)',
        color: 'var(--md-sys-color-on-primary)'
      }}
    >
      {t.skipToContent}
    </a>
  );
};

export default SkipToContent;
