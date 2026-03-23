import React, { useEffect, useRef, useCallback } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import YouTube from 'react-youtube';
import { MdClear } from 'react-icons/md';

export default function ModalVideo({ channel = 'youtube', isOpen, url, onClose }) {

    const modalRef = useRef(null);
    const closeBtnRef = useRef(null);

    const closeModal = useCallback(() => {
        if (typeof onClose === 'function') onClose();
    }, [onClose]);

    // ESC key closes modal
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

    // Auto-focus modal when opened
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

    function getPadding(ratio) {
        const arr = ratio.split(':');
        const width = Number(arr[0]);
        const height = Number(arr[1]);
        const padding = (height * 100) / width;
        return padding + '%';
    }

    const paddingStyle = {
        paddingBottom: getPadding('16:9')
    }

    return (
        <CSSTransition
            in={isOpen}
            timeout={300}
            classNames="modal-video-effect"
            unmountOnExit
            nodeRef={modalRef}   // ← REQUIRED FIX
        >
            <div
                className="modal-video"
                tabIndex="-1"
                role="dialog"
                onClick={closeModal}
                ref={modalRef}     // ← MUST MATCH nodeRef
                onKeyDown={handleFocusTrap}
            >
                <div className="modal-video-body">
                    <div className="modal-video-inner">
                        <div className="modal-video-movie-wrap"  style={paddingStyle}>
                            <button
                                className="modal-video-close-btn"
                                aria-label="Close"
                                ref={closeBtnRef}
                                onClick={closeModal}
                            >
                                <MdClear size={22} color="#fff" />
                            </button>

                            {channel === 'youtube' && (
                                <YouTube
                                    videoId={videoId}
                                    opts={{ playerVars: { autoplay: 1 } }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
}
