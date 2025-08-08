import React from 'react'
import { createRoot } from 'react-dom/client'
import EnergyApp from './EnergyApp.jsx'
import './index.css' // Tailwind or shadcn styles

createRoot(document.getElementById('root')).render(
  <EnergyApp />
)
