import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MainLayout from './layout/MainLayout'

const Home = lazy(() => import('./pages/Home'))
const Analytics = lazy(() => import('./pages/Analytics'))
const About = lazy(() => import('./pages/About'))
const Shorten = lazy(() => import('./pages/Shorten'))
const History = lazy(() => import('./pages/History'))
const Favorites = lazy(() => import('./pages/Favorites'))
const Summary = lazy(() => import('./pages/Summary'))
const Settings = lazy(() => import('./pages/Settings'))
const Help = lazy(() => import('./pages/Help'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Documentation = lazy(() => import('./pages/Documentation'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App(): JSX.Element {
  return (
    <div className="min-h-screen text-white bg-slate-950 selection:bg-cyan-400/30 selection:text-white">
      <Toaster position="top-right" />
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="about" element={<About />} />
            <Route path="shorten" element={<Shorten />} />
            <Route path="history" element={<History />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="summary" element={<Summary />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="documentation" element={<Documentation />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}
