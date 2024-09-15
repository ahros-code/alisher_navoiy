"use client"
import { useEffect } from 'react';

import AOS from "aos";
import "aos/dist/aos.css";
import Home from '@/components/Home';

export default function Index() {
  useEffect(() => {
    AOS.init({ once: false, easing: "ease-in-sine", delay: 50 });
    AOS.refresh();

  }, []);


  return (
    <>
      <Home />
    </>
  );
}