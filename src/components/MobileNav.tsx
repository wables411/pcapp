import { motion } from 'framer-motion'

interface MobileNavProps {
  activeTab: 'bidding' | 'gallery' | 'showcasing' | 'governance'
  setActiveTab: (tab: 'bidding' | 'gallery' | 'showcasing' | 'governance') => void
}

function MobileNav({ activeTab, setActiveTab }: MobileNavProps) {
  const tabs = [
    { id: 'bidding' as const, label: 'Bidding', icon: '⚡' },
    { id: 'gallery' as const, label: 'Gallery', icon: '🖼️' },
    { id: 'showcasing' as const, label: 'Showcase', icon: '✨' },
    { id: 'governance' as const, label: 'Vote', icon: '🗳️' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-t border-neon-green/30">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-all relative ${
              activeTab === tab.id ? 'text-neon-green' : 'text-gray-500'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 border-t-2 border-neon-green"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="text-xl mb-1">{tab.icon}</span>
            <span className="text-xs font-body font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MobileNav

