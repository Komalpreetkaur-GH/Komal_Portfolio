import { useState, useEffect, useRef, useCallback } from 'react';

export const useFullPageScroll = (totalSections) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const isScrolling = useRef(false);
    const touchStart = useRef(0);

    const scrollTo = useCallback((index) => {
        if (index >= 0 && index < totalSections) {
            setActiveIndex(index);
        }
    }, [totalSections]);

    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();
            if (isScrolling.current) return;

            isScrolling.current = true;
            if (e.deltaY > 0) {
                scrollTo(activeIndex + 1);
            } else {
                scrollTo(activeIndex - 1);
            }

            setTimeout(() => {
                isScrolling.current = false;
            }, 1000); // Transition lock
        };

        const handleTouchStart = (e) => {
            touchStart.current = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            if (isScrolling.current) return;

            const touchEnd = e.touches[0].clientY;
            const diff = touchStart.current - touchEnd;

            if (Math.abs(diff) > 50) {
                isScrolling.current = true;
                if (diff > 0) {
                    scrollTo(activeIndex + 1);
                } else {
                    scrollTo(activeIndex - 1);
                }

                setTimeout(() => {
                    isScrolling.current = false;
                }, 1000);
            }
        };

        const handleKeyDown = (e) => {
            if (isScrolling.current) return;

            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                isScrolling.current = true;
                scrollTo(activeIndex + 1);
                setTimeout(() => isScrolling.current = false, 1000);
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                isScrolling.current = true;
                scrollTo(activeIndex - 1);
                setTimeout(() => isScrolling.current = false, 1000);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeIndex, scrollTo]);

    return { activeIndex, scrollTo };
};
