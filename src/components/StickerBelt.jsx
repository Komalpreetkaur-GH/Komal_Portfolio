import React from 'react';
import '../styles/StickerBelt.css';

const StickerBelt = () => {
    // Generate array of stickers from Me1 to Me12
    const stickers = Array.from({ length: 12 }, (_, i) => `/Me${i + 1}.png`);

    return (
        <div className="sticker-belt-container">
            <div className="sticker-track">
                {/* First set of stickers */}
                {stickers.map((src, index) => (
                    <div key={`sticker-1-${index}`} className="sticker-item">
                        <img src={src} alt={`Sticker ${index + 1}`} />
                        <div className="sparkle s1">✦</div>
                        <div className="sparkle s2">✦</div>
                        <div className="sparkle s3">✦</div>
                    </div>
                ))}
                {/* Duplicate set for seamless scrolling */}
                {stickers.map((src, index) => (
                    <div key={`sticker-2-${index}`} className="sticker-item">
                        <img src={src} alt={`Sticker ${index + 1}`} />
                        <div className="sparkle s1">✦</div>
                        <div className="sparkle s2">✦</div>
                        <div className="sparkle s3">✦</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StickerBelt;
