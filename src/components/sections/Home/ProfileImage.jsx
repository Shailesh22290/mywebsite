import React, { useState } from 'react';
import { User, Camera } from 'lucide-react';

const ProfileImage = ({ 
  src = '/assets/images/profile.jpg', 
  alt = 'Profile Picture', 
  size = 'large',
  showBorder = true,
  animated = true 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-24 h-24',
    large: 'w-48 h-48',
    xlarge: 'w-64 h-64'
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="relative inline-block">
      <div 
        className={`
          ${sizeClasses[size]} 
          relative overflow-hidden rounded-full
          ${showBorder ? 'border-4 border-white shadow-xl' : ''}
          ${animated ? 'transform transition-all duration-300 hover:scale-105' : ''}
          bg-gradient-to-br from-blue-500 to-purple-600
        `}
      >
        {/* Loading/Error State */}
        {(!imageLoaded || imageError) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            {imageError ? (
              <User className="w-1/2 h-1/2 text-gray-400" />
            ) : (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            )}
          </div>
        )}

        {/* Profile Image */}
        {!imageError && (
          <img
            src={src}
            alt={alt}
            className={`
              w-full h-full object-cover transition-opacity duration-300
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}

        {/* Hover Overlay */}
        {animated && (
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
            <Camera className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      {/* Status Indicator */}
      <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
    </div>
  );
};

export default ProfileImage;