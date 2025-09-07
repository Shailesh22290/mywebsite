import React, { useState } from 'react';
import { User, Camera, X } from 'lucide-react';

const ProfileImage = ({ 
  src = '/assets/images/profile.jpg', 
  alt = 'Profile Picture', 
  size = 'large',
  showBorder = true,
  animated = true 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);

  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-24 h-24',
    large: 'w-56 h-56',
    xlarge: 'w-64 h-64'
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageClick = () => {
    if (!imageError && imageLoaded) {
      setIsEnlarged(true);
    }
  };

  const handleCloseEnlarged = () => {
    setIsEnlarged(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsEnlarged(false);
    }
  };

  return (
    <>
      <div className="relative inline-block">
        <div 
          className={`
            ${sizeClasses[size]} 
            relative overflow-hidden rounded-full
            ${showBorder ? 'border-4 border-white shadow-xl' : ''}
            ${animated ? 'transform transition-all duration-300 hover:scale-110 cursor-pointer' : ''}
            bg-gradient-to-br from-blue-500 to-purple-600
            ${imageLoaded && !imageError ? 'hover:shadow-2xl' : ''}
          `}
          onClick={handleImageClick}
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
          {animated && imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
              <div className="text-center">
                <Camera className="w-6 h-6 text-white mx-auto mb-1" />
                <span className="text-white text-xs font-medium">Click to enlarge</span>
              </div>
            </div>
          )}
        </div>

        {/* Status Indicator */}
        <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
      </div>

      {/* Enlarged Image Modal */}
      {isEnlarged && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={handleBackdropClick}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseEnlarged}
            className="absolute top-4 right-4 z-10 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all duration-200 text-white hover:scale-110"
            aria-label="Close enlarged image"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Enlarged Image Container */}
          <div className="relative max-w-2xl max-h-[80vh] animate-in zoom-in duration-300">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-contain rounded-lg shadow-2xl max-w-full max-h-full"
              style={{ maxHeight: '80vh' }}
            />
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
              <p className="text-white text-sm font-medium">{alt}</p>
            </div>
          </div>

          {/* Click outside hint */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-70">
            Click outside or press ESC to close
          </div>
        </div>
      )}

      {/* Keyboard support for closing modal */}
      {isEnlarged && (
        <div
          className="fixed inset-0 z-40"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsEnlarged(false);
            }
          }}
          tabIndex={-1}
        />
      )}
    </>
  );
};

export default ProfileImage;