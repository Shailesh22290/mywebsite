import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';

// Shows the image if the file exists; otherwise a dashed box naming the file to drop in.
// Spans (not divs) so it is valid inside the <p> that markdown wraps images in.
const ImageSlot = ({ src, alt, className = 'aspect-video' }) => {
  const [missing, setMissing] = useState(!src);
  if (missing) {
    return (
      <span className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/60 p-4 text-center not-prose ${className}`}>
        <ImageIcon className="h-8 w-8 text-gray-400" />
        {alt && <span className="text-sm text-gray-600 dark:text-gray-300">{alt}</span>}
        {src && <code className="text-xs text-gray-500 dark:text-gray-400 break-all">{src}</code>}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setMissing(true)}
      className={`w-full rounded-lg object-cover ${className}`}
    />
  );
};

export default ImageSlot;
