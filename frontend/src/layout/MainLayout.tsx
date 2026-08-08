import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import AnimatedBackground from '../components/AnimatedBackground'

const MainLayout: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [location.pathname])

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <AnimatedBackground />

      <Sidebar
        collapsed={isSidebarCollapsed}
        mobileOpen={isMobileSidebarOpen}
        onCollapseToggle={() => setSidebarCollapsed((value) => !value)}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className={`relative min-h-screen transition-all duration-300 ${isSidebarCollapsed ? 'md:pl-20' : 'md:pl-72'}`}>
        <Header
          onMobileToggle={() => setMobileSidebarOpen((value) => !value)}
          isSidebarCollapsed={isSidebarCollapsed}
          onCollapseToggle={() => setSidebarCollapsed((value) => !value)}
        />

        <main className="relative mx-auto max-w-full px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="min-h-[calc(100vh-14rem)]"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
