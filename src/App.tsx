import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useChainId } from 'wagmi'
import { formatEther } from 'viem'
import { useState, useEffect } from 'react'

function App() {
  const { isConnected, address } = useAccount()
  const { data: balance } = useBalance({ address })
  const chainId = useChainId()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-[#0d0a12] text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Purple gradient orb following mouse */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] transition-all duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, #7c3aed 0%, #4c1d95 50%, transparent 70%)',
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
          }}
        />
        {/* Static ambient glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-800/15 rounded-full blur-[120px]" />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(124, 58, 237, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-4 md:p-6 lg:p-8">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-900 flex items-center justify-center border border-purple-400/30 shadow-lg shadow-purple-500/20">
            <span className="text-sm md:text-lg">🐱</span>
          </div>
          <span className="font-display text-lg md:text-xl tracking-wider text-purple-200">ASHE</span>
        </div>
        <ConnectButton />
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 md:px-8 lg:px-16 pb-20">
        {isConnected ? (
          <SyndicateHQ address={address!} balance={balance} chainId={chainId} />
        ) : (
          <LandingPage />
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 p-4 text-center">
        <p className="text-[10px] md:text-xs text-purple-400/40 tracking-wide">
          Requested by @asheontoshi · Built by @clonkbot
        </p>
      </footer>
    </div>
  )
}

function LandingPage() {
  return (
    <div className="max-w-6xl mx-auto pt-8 md:pt-16">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Character Portrait */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/40 via-violet-500/30 to-purple-800/40 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700 animate-pulse" />
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-4 border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-900/50">
            {/* Ashe Character Visual */}
            <div className="w-full h-full bg-gradient-to-br from-[#1a1625] via-[#2d1f47] to-[#0d0a12] flex items-center justify-center relative">
              {/* Stylized Cat Silhouette */}
              <svg viewBox="0 0 200 200" className="w-full h-full p-8">
                {/* Background glow */}
                <defs>
                  <radialGradient id="catGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <linearGradient id="goldTooth" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="80" fill="url(#catGlow)" />
                {/* Cat head shape */}
                <ellipse cx="100" cy="115" rx="55" ry="50" fill="#374151" stroke="#4b5563" strokeWidth="2" />
                {/* Ears */}
                <polygon points="55,75 45,30 75,60" fill="#374151" stroke="#4b5563" strokeWidth="2" />
                <polygon points="145,75 155,30 125,60" fill="#374151" stroke="#4b5563" strokeWidth="2" />
                <polygon points="52,70 48,38 70,58" fill="#1f2937" />
                <polygon points="148,70 152,38 130,58" fill="#1f2937" />
                {/* Eye patch */}
                <ellipse cx="75" cy="100" rx="20" ry="15" fill="#111827" />
                <line x1="55" y1="85" x2="95" y2="85" stroke="#111827" strokeWidth="6" />
                {/* Good eye */}
                <ellipse cx="125" cy="100" rx="12" ry="10" fill="#fefce8" />
                <ellipse cx="127" cy="100" rx="6" ry="8" fill="#4c1d95" />
                <circle cx="129" cy="98" r="2" fill="white" />
                {/* Nose */}
                <ellipse cx="100" cy="130" rx="8" ry="5" fill="#1f2937" />
                {/* Smirk mouth */}
                <path d="M 85 145 Q 100 155, 120 142" stroke="#1f2937" strokeWidth="3" fill="none" />
                {/* Gold tooth */}
                <rect x="107" y="142" width="4" height="6" fill="url(#goldTooth)" />
                {/* Suit collar hints */}
                <path d="M 60 165 L 80 150 L 100 170 L 120 150 L 140 165" fill="#111827" />
                <polygon points="100,170 90,155 100,160 110,155" fill="white" />
              </svg>
              {/* Decorative ring */}
              <div className="absolute inset-4 rounded-full border border-purple-500/20" />
            </div>
          </div>
          {/* Floating badges */}
          <div className="absolute -top-2 -right-2 md:top-0 md:right-0 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full shadow-lg animate-bounce">
            BOSS
          </div>
          <div className="absolute bottom-4 -left-4 bg-purple-900/80 backdrop-blur-sm text-purple-200 text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full border border-purple-500/30">
            SYNDICATE LEADER
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-block mb-4">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-purple-400 bg-purple-500/10 px-3 md:px-4 py-1 md:py-2 rounded-full border border-purple-500/20">
              The Mastermind of the Meme Underworld
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-8xl font-black mb-4 md:mb-6 leading-none">
            <span className="bg-gradient-to-r from-purple-300 via-violet-200 to-purple-400 bg-clip-text text-transparent">
              ASHE
            </span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl text-purple-400/60 tracking-wider">
              THE SYNDICATE CAT
            </span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-purple-200/70 max-w-xl leading-relaxed mb-6 md:mb-8 mx-auto lg:mx-0">
            In the shadows of the crypto streets, Ashe rules with a gold tooth smile and an eye that sees everything.
            <span className="text-amber-400"> Nothing escapes his watch.</span>
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start mb-8 md:mb-12">
            <StatCard icon="🌙" label="Moon Missions" value="∞" />
            <StatCard icon="🤝" label="Loyal Crew" value="GROWING" />
            <StatCard icon="⛓️" label="Chain" value="BASE" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-[2px] rounded-xl">
              <div className="bg-[#0d0a12] rounded-xl px-6 md:px-8 py-3 md:py-4 text-center">
                <p className="text-purple-200/60 text-xs md:text-sm mb-1">Join The Syndicate</p>
                <p className="text-purple-100 font-medium text-sm md:text-base">Connect Your Wallet</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="mt-16 md:mt-24 lg:mt-32">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent hidden md:block" />

            <div className="space-y-8 md:space-y-12 md:pl-8">
              <StoryBlock
                title="The Origin"
                content="They say Ashe didn't join the syndicate... he built it. From the darkest corners of the blockchain, he emerged with a vision: unite the dreamers, the traders, and the meme lords under one banner."
                icon="🏗️"
              />
              <StoryBlock
                title="The Legend"
                content="With dark gray fur, a sharp eye hidden behind a black eye patch, and a single gold tooth flashing when he smiles, Ashe is known as the mastermind of the meme underworld."
                icon="⚔️"
              />
              <StoryBlock
                title="The Mission"
                content="Calm, clever, and always one step ahead, Ashe gathers a loyal crew of believers who understand one truth: the power of community and chaos, working together toward the ultimate moon mission."
                icon="🚀"
              />
              <StoryBlock
                title="The Future"
                content="Every move he makes sends ripples through the blockchain. With Ashe leading the way, the syndicate grows stronger every day. The question isn't if we'll reach the moon... it's when."
                icon="🌕"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 md:mt-24 lg:mt-32 text-center">
        <div className="inline-block relative">
          <div className="absolute -inset-8 bg-purple-600/20 blur-3xl rounded-full" />
          <div className="relative bg-gradient-to-br from-purple-900/50 to-violet-900/30 border border-purple-500/30 rounded-2xl p-6 md:p-8 lg:p-12 backdrop-blur-sm">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-purple-100 mb-3 md:mb-4">
              Ready to Join the Syndicate?
            </h2>
            <p className="text-purple-300/60 mb-4 md:mb-6 max-w-md mx-auto text-sm md:text-base">
              Connect your wallet to enter Ashe's inner circle. The streets are watching.
            </p>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SyndicateHQProps {
  address: `0x${string}`
  balance: { formatted: string; symbol: string } | undefined
  chainId: number
}

function SyndicateHQ({ address, balance, chainId }: SyndicateHQProps) {
  const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`

  return (
    <div className="max-w-4xl mx-auto pt-8 md:pt-12">
      {/* Welcome Banner */}
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-block mb-4">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-amber-400 bg-amber-500/10 px-3 md:px-4 py-1 md:py-2 rounded-full border border-amber-500/30">
            Welcome to the Inner Circle
          </span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-purple-100 mb-4">
          Syndicate HQ
        </h1>
        <p className="text-purple-300/60 text-sm md:text-base">
          Ashe sees you, <span className="text-purple-200 font-mono">{truncatedAddress}</span>
        </p>
      </div>

      {/* Member Card */}
      <div className="relative mb-8 md:mb-12">
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-violet-500/10 to-amber-500/20 blur-2xl rounded-3xl" />
        <div className="relative bg-gradient-to-br from-[#1a1625] to-[#0d0a12] border border-purple-500/30 rounded-2xl md:rounded-3xl overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-purple-900/50 to-violet-900/30 px-4 md:px-6 lg:px-8 py-4 md:py-6 border-b border-purple-500/20">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-500 to-violet-900 flex items-center justify-center border-2 border-purple-400/50 shadow-lg shadow-purple-500/30">
                  <span className="text-xl md:text-2xl">🐱</span>
                </div>
                <div>
                  <p className="text-purple-400 text-[10px] md:text-xs uppercase tracking-wider">Syndicate Member</p>
                  <p className="font-display text-lg md:text-xl text-purple-100 font-mono">{truncatedAddress}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-xs md:text-sm">Connected</span>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 md:p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <InfoTile
              label="Wallet Balance"
              value={balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '...'}
              icon="💰"
            />
            <InfoTile
              label="Network"
              value={chainId === 8453 ? 'Base' : chainId === 1 ? 'Ethereum' : `Chain ${chainId}`}
              icon="⛓️"
            />
            <InfoTile
              label="Status"
              value="VERIFIED"
              icon="✨"
              highlight
            />
          </div>

          {/* Card Footer */}
          <div className="px-4 md:px-6 lg:px-8 py-4 md:py-6 bg-purple-900/20 border-t border-purple-500/20">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-purple-400/60 text-xs md:text-sm">
                Member since: <span className="text-purple-300">Today</span>
              </p>
              <div className="flex items-center gap-2 text-amber-400 text-xs md:text-sm">
                <span>🏆</span>
                <span>Early Syndicate Member</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ashe's Message */}
      <div className="bg-gradient-to-br from-purple-900/30 to-violet-900/20 border border-purple-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
        <div className="flex items-start gap-4">
          <div className="hidden md:flex w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-900 items-center justify-center flex-shrink-0 border border-purple-400/30">
            <span className="text-lg">🐱</span>
          </div>
          <div>
            <p className="text-purple-400 text-xs uppercase tracking-wider mb-2">Message from Ashe</p>
            <p className="text-purple-200/80 text-sm md:text-base lg:text-lg leading-relaxed italic">
              "Welcome to the inner circle, friend. The streets talk, and they told me you're one of us.
              Stay sharp, stay loyal, and remember – in this syndicate, we rise together.
              The moon isn't just a destination... it's our destiny."
            </p>
            <p className="text-amber-400 text-xs md:text-sm mt-4">— Ashe, The Syndicate Cat 🐱💰</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <QuickStat label="Crew Members" value="MANY" />
        <QuickStat label="Moon Progress" value="ON TRACK" />
        <QuickStat label="Vibes" value="IMMACULATE" />
        <QuickStat label="Your Role" value="SYNDICATE" />
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className="text-base md:text-lg">{icon}</span>
        <div>
          <p className="text-purple-400/60 text-[10px] md:text-xs uppercase tracking-wider">{label}</p>
          <p className="text-purple-100 font-bold text-sm md:text-base">{value}</p>
        </div>
      </div>
    </div>
  )
}

function StoryBlock({ title, content, icon }: { title: string; content: string; icon: string }) {
  return (
    <div className="relative group">
      <div className="absolute left-0 top-0 w-3 h-3 bg-purple-500 rounded-full -translate-x-[17px] group-hover:scale-125 transition-transform hidden md:block" />
      <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg md:rounded-xl p-4 md:p-6 hover:bg-purple-900/30 transition-colors">
        <div className="flex items-start gap-3 md:gap-4">
          <span className="text-xl md:text-2xl flex-shrink-0">{icon}</span>
          <div>
            <h3 className="font-display text-lg md:text-xl font-bold text-purple-100 mb-2">{title}</h3>
            <p className="text-purple-200/70 text-sm md:text-base leading-relaxed">{content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoTile({ label, value, icon, highlight = false }: { label: string; value: string; icon: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-4 md:p-6 ${highlight ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30' : 'bg-purple-900/30 border border-purple-500/20'}`}>
      <div className="flex items-center gap-3">
        <span className="text-xl md:text-2xl">{icon}</span>
        <div>
          <p className="text-purple-400/60 text-[10px] md:text-xs uppercase tracking-wider">{label}</p>
          <p className={`font-bold text-sm md:text-lg ${highlight ? 'text-amber-400' : 'text-purple-100'}`}>{value}</p>
        </div>
      </div>
    </div>
  )
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg md:rounded-xl p-3 md:p-4 text-center hover:bg-purple-900/30 transition-colors">
      <p className="text-purple-400/60 text-[10px] md:text-xs uppercase tracking-wider mb-1">{label}</p>
      <p className="text-purple-100 font-bold text-sm md:text-base">{value}</p>
    </div>
  )
}

export default App
