import React, { useEffect, useRef, useCallback } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import YouTube from 'react-youtube';
import { MdClear } from 'react-icons/md';

export default function ModalVideo({
   isOpen,
   onClose,
   url,
   ratio = '16:9',
   width = '100%',
   height = '100%',
   animationSpeed = 300,
   classNames = {
       modalVideoEffect: 'modal-video-effect',
       modalVideo: 'modal-video',
       modalVideoBody: 'modal-video-body',
       modalVideoInner: 'modal-video-inner',
       modalVideoIframeWrap: 'modal-video-movie-wrap',
       modalVideoCloseBtn: 'modal-video-close-btn'
   },
   aria = {
       openMessage: 'You just opened the modal video',
       dismissBtnMessage: 'Close the modal by clicking here'
   },
   children
}) {

    const modalRef = useRef(null);
    const closeBtnRef = useRef(null);

    const closeModal = useCallback(() => {
        if (typeof onClose === 'function') onClose();
    }, [onClose]);

    // ESC key
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [closeModal]);

    // Focus trap
    const handleFocusTrap = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            if (document.activeElement === modalRef.current) {
                closeBtnRef.current?.focus();
            } else {
                modalRef.current?.focus();
            }
        }
    };

    // Auto-focus when opened
    useEffect(() => {
        if (isOpen && modalRef.current) {
            modalRef.current.focus();
        }
    }, [isOpen]);

    // Extract YouTube ID
    const getYoutubeID = (url) => {
        let cleaned = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (cleaned[2]) {
            return cleaned[2].split(/[^0-9a-z_\-]/i)[0];
        }
        return cleaned[0];
    };

    const videoId = getYoutubeID(url);

    const getPadding = (ratio) => {
        const [w, h] = ratio.split(':').map(Number);
        return `${(h * 100) / w}%`;
    };

    const optsYoutube = {
        height,
        width,
        playerVars: { autoplay: 1 }
    };

    return (
        <CSSTransition
            in={isOpen}
            timeout={animationSpeed}
            classNames={classNames.modalVideoEffect}
            unmountOnExit
        >
            <div
                className={classNames.modalVideo}
                tabIndex="-1"
                role="dialog"
                aria-label={aria.openMessage}
                onClick={closeModal}
                ref={modalRef}
                onKeyDown={handleFocusTrap}
            >
                <div className={classNames.modalVideoBody}>
                    <div className={classNames.modalVideoInner}>
                        <div
                            className={classNames.modalVideoIframeWrap}
                            style={{ paddingBottom: getPadding(ratio) }}
                        >
                            <button
                                className={classNames.modalVideoCloseBtn}
                                aria-label={aria.dismissBtnMessage}
                                ref={closeBtnRef}
                                onClick={closeModal}
                            >
                                <MdClear size={22} color="#fff" />
                            </button>

                            {children || (
                                <YouTube
                                    videoId={videoId}
                                    opts={optsYoutube}
                                    onReady={(e) => e.target.playVideo()}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
}
