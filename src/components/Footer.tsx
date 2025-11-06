"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0" />
      <div className="relative w-full px-4 md:px-16 py-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-white/60">©</span>
            <span className="text-white/60">{new Date().getFullYear()}</span>
            <span className="text-white/60">•</span>
            <span className="text-white/60">All rights reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/60">Designed & Built by</span>
            <Link
              href="https://www.linkedin.com/in/devxsubh/"
              target="_blank"
              className="text-white hover:text-white/80 transition-colors relative group"
            >
              <span className="relative">
                Subham Mahapatra
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
