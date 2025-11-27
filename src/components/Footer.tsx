function Footer() {
  return (
    <footer className="relative z-10 border-t border-neon-green/20 mt-16 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-body text-gray-400">Built on</span>
            <a
              href="https://base.org"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-heading font-bold hover:bg-blue-600 transition-colors"
            >
              BASE
            </a>
          </div>
          
          <div className="flex gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-green hover:neon-text transition-all font-body"
            >
              Twitter
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-green hover:neon-text transition-all font-body"
            >
              Discord
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-green hover:neon-text transition-all font-body"
            >
              GitHub
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs font-body text-gray-500">
          © {new Date().getFullYear()} Portion Club DAO. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

