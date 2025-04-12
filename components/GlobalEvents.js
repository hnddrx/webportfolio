'use client';

import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GlobalEvents() {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      toast.info("Hey! This is Wren 👋", {
        position: 'bottom-center',
        autoClose: 3000,
        theme: 'colored',
      });
    };

    const handleCopy = (e) => e.preventDefault();
    const handlePaste = (e) => e.preventDefault();

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  return <ToastContainer />;
}
