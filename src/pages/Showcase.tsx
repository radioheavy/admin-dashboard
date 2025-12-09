import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign, ShoppingBag, Users, TrendingUp,
  ChevronLeft, ChevronRight, Monitor, Tablet, Smartphone,
  Sparkles, BarChart3, PieChartIcon, LineChartIcon,
  Layers, Zap, Moon, Code2, Palette, Layout, MousePointer2, Shield
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { AreaChart, BarChart, PieChart, LineChart } from '../components/charts';
import {
  revenueData,
  weeklyRevenueData,
  salesByCategoryData,
  userGrowthData,
  dashboardStats
} from '../data/analytics';

// ============================================
// MOCKUP COMPONENTS - Premium Device Frames
// ============================================

// Browser/Desktop Mockup - macOS Style
const BrowserMockup = ({ children, url = 'localhost:5173', className = '' }: {
  children: React.ReactNode;
  url?: string;
  className?: string;
}) => (
  <div className={`relative ${className}`}>
    {/* Ambient glow */}
    <div className="absolute -inset-6 bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-blue-500/15 rounded-[32px] blur-3xl" />

    {/* Monitor frame */}
    <div className="relative">
      {/* Screen bezel */}
      <div className="bg-[#1c1c1e] rounded-2xl p-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_25px_50px_-12px_rgba(0,0,0,0.8)]">
        {/* Inner screen */}
        <div className="bg-[#0a0a0a] rounded-[14px] overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1c1c1e]/80 backdrop-blur-xl border-b border-white/[0.06]">
            {/* Traffic lights */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_0_0.5px_rgba(0,0,0,0.2)]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_0_0.5px_rgba(0,0,0,0.2)]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_0_0.5px_rgba(0,0,0,0.2)]" />
            </div>
            {/* URL bar */}
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/30 border border-white/[0.06]">
                <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-[11px] text-white/40 font-medium">{url}</span>
              </div>
            </div>
            {/* Window controls placeholder */}
            <div className="w-14" />
          </div>
          {/* Content */}
          <div className="bg-[#050505]">
            {children}
          </div>
        </div>
      </div>
      {/* Stand */}
      <div className="flex justify-center">
        <div className="w-16 h-4 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-lg" />
      </div>
      <div className="flex justify-center -mt-0.5">
        <div className="w-28 h-2 bg-gradient-to-b from-[#252525] to-[#1a1a1a] rounded-b-xl shadow-lg" />
      </div>
    </div>
  </div>
);

// Phone Mockup - iPhone Style with Dynamic Island
const PhoneMockup = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative ${className}`}>
    {/* Ambient glow */}
    <div className="absolute -inset-4 bg-gradient-to-b from-pink-500/20 via-purple-500/15 to-blue-500/10 rounded-[48px] blur-2xl" />

    {/* Phone frame */}
    <div className="relative">
      {/* Outer frame - titanium style */}
      <div className="bg-gradient-to-b from-[#3a3a3c] via-[#2c2c2e] to-[#1c1c1e] rounded-[44px] p-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_25px_50px_-12px_rgba(0,0,0,0.9)]">
        {/* Inner frame */}
        <div className="bg-[#0a0a0a] rounded-[42px] p-[10px]">
          {/* Screen */}
          <div className="relative bg-[#050505] rounded-[32px] overflow-hidden">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-black rounded-full">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1c1c1e] ring-1 ring-white/10" />
                <div className="w-2 h-2 rounded-full bg-[#1c1c1e]" />
              </div>
            </div>
            {/* Content with top padding for dynamic island */}
            <div className="pt-2">
              {children}
            </div>
          </div>
        </div>
      </div>
      {/* Side buttons */}
      <div className="absolute left-0 top-24 w-[3px] h-8 bg-[#2c2c2e] rounded-l-sm" />
      <div className="absolute left-0 top-36 w-[3px] h-12 bg-[#2c2c2e] rounded-l-sm" />
      <div className="absolute left-0 top-52 w-[3px] h-12 bg-[#2c2c2e] rounded-l-sm" />
      <div className="absolute right-0 top-32 w-[3px] h-16 bg-[#2c2c2e] rounded-r-sm" />
    </div>
  </div>
);

// Tablet Mockup - iPad Style
const TabletMockup = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative ${className}`}>
    {/* Ambient glow */}
    <div className="absolute -inset-5 bg-gradient-to-br from-purple-500/15 via-blue-500/10 to-cyan-500/10 rounded-[36px] blur-2xl" />

    {/* Tablet frame */}
    <div className="relative">
      {/* Outer frame */}
      <div className="bg-gradient-to-b from-[#3a3a3c] via-[#2c2c2e] to-[#1c1c1e] rounded-[28px] p-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_25px_50px_-12px_rgba(0,0,0,0.85)]">
        {/* Inner frame */}
        <div className="bg-[#0a0a0a] rounded-[26px] p-[8px]">
          {/* Screen */}
          <div className="relative bg-[#050505] rounded-[18px] overflow-hidden">
            {/* Front camera */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#1c1c1e] ring-1 ring-white/5 z-10" />
            {/* Content */}
            {children}
          </div>
        </div>
      </div>
      {/* Side button */}
      <div className="absolute right-0 top-16 w-[3px] h-8 bg-[#2c2c2e] rounded-r-sm" />
      {/* Volume buttons */}
      <div className="absolute right-0 top-28 w-[3px] h-6 bg-[#2c2c2e] rounded-r-sm" />
      <div className="absolute right-0 top-36 w-[3px] h-6 bg-[#2c2c2e] rounded-r-sm" />
    </div>
  </div>
);

// ============================================
// SLIDE COMPONENTS
// ============================================

// Floating Orb Component
const FloatingOrb = ({ color, size, x, y, delay }: {
  color: string;
  size: number;
  x: string;
  y: string;
  delay: number;
}) => (
  <motion.div
    className="absolute rounded-full blur-3xl"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: color,
    }}
    animate={{
      x: [0, 30, -20, 0],
      y: [0, -40, 20, 0],
      scale: [1, 1.1, 0.9, 1],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Floating Card Component
const FloatingCard = ({ children, x, y, delay, rotate }: {
  children: React.ReactNode;
  x: string;
  y: string;
  delay: number;
  rotate: number;
}) => (
  <motion.div
    className="absolute"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: [0.6, 0.8, 0.6],
      y: [0, -15, 0],
      rotate: [rotate - 2, rotate + 2, rotate - 2],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

// Slide 1: Hero
const HeroSlide = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 py-4 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <FloatingOrb color="rgba(236, 72, 153, 0.12)" size={400} x="5%" y="10%" delay={0} />
      <FloatingOrb color="rgba(139, 92, 246, 0.10)" size={350} x="75%" y="60%" delay={2} />
      <FloatingOrb color="rgba(59, 130, 246, 0.08)" size={250} x="85%" y="5%" delay={4} />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Radial gradient spotlight following mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, rgba(236,72,153,0.06) 0%, transparent 50%)`,
        }}
      />

      {/* Floating UI elements - repositioned */}
      <FloatingCard x="3%" y="25%" delay={0} rotate={-8}>
        <div className="px-3 py-2 rounded-lg bg-gradient-to-br from-pink-500/20 to-pink-500/5 border border-pink-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-pink-500/30 flex items-center justify-center">
              <DollarSign size={12} className="text-pink-400" />
            </div>
            <p className="text-xs font-bold text-white">$284K</p>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard x="90%" y="20%" delay={1.5} rotate={8}>
        <div className="px-3 py-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <TrendingUp size={12} className="text-emerald-400" />
            <p className="text-xs font-bold text-emerald-400">+24%</p>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard x="92%" y="75%" delay={3} rotate={-6}>
        <div className="flex gap-0.5">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-pink-500/50"
              animate={{ height: [8, 16, 8] }}
              transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </div>
      </FloatingCard>

      {/* Main content */}
      <div className="relative z-10 text-center mb-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-4 backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={12} className="text-pink-400" />
          </motion.div>
          <span className="text-xs text-white/60">Premium Dashboard UI Kit</span>
          <div className="w-px h-3 bg-white/10" />
          <span className="text-[10px] text-pink-400 font-medium">v2.0</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.span
            className="block bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Starter
          </motion.span>
          <motion.span
            className="block bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Dashboard
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm md:text-base text-white/40 max-w-md mx-auto mb-4"
        >
          Beautiful glassmorphism admin panel with{' '}
          <span className="text-white/60">charts</span>,{' '}
          <span className="text-white/60">animations</span>, and{' '}
          <span className="text-white/60">dark mode</span>
        </motion.p>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 flex-wrap"
        >
          {['React', 'TypeScript', 'Tailwind', 'Recharts'].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[10px] text-white/40"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* 3D Tilted Browser Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        style={{
          perspective: 1000,
          transform: `perspective(1000px) rotateX(${2 + mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`,
        }}
        className="w-full max-w-4xl relative"
      >
        {/* Glow under mockup */}
        <motion.div
          className="absolute -inset-2 bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-blue-500/15 rounded-2xl blur-2xl"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <BrowserMockup url="dashboard.app">
          <div className="p-3">
            {/* Stats Grid - Compact */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { title: 'Revenue', value: '$284K', change: '+12.5%', color: 'pink', icon: DollarSign },
                { title: 'Orders', value: '1,847', change: '+8.2%', color: 'purple', icon: ShoppingBag },
                { title: 'Customers', value: '12.4K', change: '+15.3%', color: 'blue', icon: Users },
                { title: 'Growth', value: '67%', change: '+4.1%', color: 'emerald', icon: TrendingUp },
              ].map((stat, i) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="relative overflow-hidden rounded-lg p-3 bg-white/[0.02] border border-white/5"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/10 to-transparent`} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-7 h-7 rounded-md bg-${stat.color}-500/20 flex items-center justify-center`}>
                        <stat.icon size={14} className={`text-${stat.color}-400`} />
                      </div>
                      <span className="text-[10px] text-emerald-400 font-medium">{stat.change}</span>
                    </div>
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                    <p className="text-[10px] text-white/40">{stat.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </BrowserMockup>
      </motion.div>
    </div>
  );
};

// Slide 2: Full Dashboard
const DashboardSlide = () => (
  <div className="h-full flex items-center justify-center px-8">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-6xl"
    >
      <BrowserMockup url="dashboard.app">
        <div className="p-6">
          {/* Header skeleton */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="h-7 w-56 bg-gradient-to-r from-white/10 to-white/5 rounded-lg mb-2" />
              <div className="h-4 w-72 bg-white/5 rounded" />
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/10" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Revenue"
              value={dashboardStats.totalRevenue.value}
              prefix="$"
              change={12.5}
              trend="up"
              icon={<DollarSign size={18} />}
              variant="pink"
              sparklineData={[45, 52, 38, 65, 72, 58, 85, 78, 95, 88]}
            />
            <StatCard
              title="Orders"
              value={1847}
              change={8.2}
              trend="up"
              icon={<ShoppingBag size={18} />}
              variant="purple"
              sparklineData={[30, 45, 35, 50, 40, 55, 45, 60, 50, 65]}
            />
            <StatCard
              title="Customers"
              value={12453}
              change={15.3}
              trend="up"
              icon={<Users size={18} />}
              variant="blue"
              sparklineData={[25, 35, 45, 40, 50, 55, 60, 65, 70, 75]}
            />
            <StatCard
              title="Growth"
              value={67}
              suffix="%"
              icon={<TrendingUp size={18} />}
              variant="emerald"
              progress={67}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <AreaChart
                data={revenueData}
                title="Revenue Overview"
                subtitle="Monthly trend"
                color="#ec4899"
                color2="#8b5cf6"
                height={220}
              />
            </div>
            <PieChart
              data={salesByCategoryData}
              title="By Category"
              subtitle="Sales distribution"
              height={180}
            />
          </div>
        </div>
      </BrowserMockup>
    </motion.div>
  </div>
);

// Slide 3: Stats Cards Close-up
const StatsSlide = () => (
  <div className="h-full flex flex-col items-center justify-center px-8">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center mb-12"
    >
      <h2 className="text-5xl font-bold mb-3">
        Interactive <span className="text-pink-400">Stat Cards</span>
      </h2>
      <p className="text-white/40">3D tilt, sparklines, animated counters</p>
    </motion.div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full">
      {[
        { title: 'Total Revenue', value: 284500, prefix: '$', icon: DollarSign, variant: 'pink' as const, change: 12.5, trend: 'up' as const },
        { title: 'Orders', value: 1847, icon: ShoppingBag, variant: 'purple' as const, change: 8.2, trend: 'up' as const },
        { title: 'Customers', value: 12453, icon: Users, variant: 'blue' as const, change: 15.3, trend: 'up' as const },
        { title: 'Conversion', value: 67, suffix: '%', icon: TrendingUp, variant: 'emerald' as const, progress: 67 },
      ].map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
        >
          <StatCard
            title={card.title}
            value={card.value}
            prefix={card.prefix}
            suffix={card.suffix}
            change={card.change}
            trend={card.trend}
            icon={<card.icon size={20} />}
            variant={card.variant}
            progress={card.progress}
            size="large"
            sparklineData={card.progress ? undefined : [30, 45, 35, 55, 40, 60, 50, 70, 55, 80]}
          />
        </motion.div>
      ))}
    </div>
  </div>
);

// Slide 4: Charts Showcase - Area & Pie
const ChartsSlide1 = () => (
  <div className="h-full flex items-center justify-center px-8 relative">
    {/* Subtle background */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.05),transparent_70%)]" />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold mb-2">
          Beautiful <span className="text-pink-400">Charts</span>
        </h2>
        <p className="text-sm text-white/40">Area & Pie Charts</p>
      </div>

      {/* Single browser mockup with 2 charts */}
      <BrowserMockup url="dashboard.app/analytics">
        <div className="p-4 grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <AreaChart
              data={revenueData}
              title="Revenue Trend"
              subtitle="Monthly overview"
              color="#ec4899"
              color2="#8b5cf6"
              height={220}
            />
          </div>
          <div className="col-span-2">
            <PieChart
              data={salesByCategoryData}
              title="Categories"
              subtitle="Sales distribution"
              height={180}
            />
          </div>
        </div>
      </BrowserMockup>

      {/* Chart type indicators */}
      <div className="flex justify-center gap-12 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2"
        >
          <TrendingUp size={16} className="text-pink-400" />
          <span className="text-sm text-white/60">Area Chart</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2"
        >
          <PieChartIcon size={16} className="text-purple-400" />
          <span className="text-sm text-white/60">Pie Chart</span>
        </motion.div>
      </div>
    </motion.div>
  </div>
);

// Slide 5: Charts Showcase - Bar & Line
const ChartsSlide2 = () => (
  <div className="h-full flex items-center justify-center px-8 relative">
    {/* Subtle background */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05),transparent_70%)]" />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold mb-2">
          More <span className="text-purple-400">Charts</span>
        </h2>
        <p className="text-sm text-white/40">Bar & Line Charts</p>
      </div>

      {/* Single browser mockup with 2 charts */}
      <BrowserMockup url="dashboard.app/reports">
        <div className="p-4 grid grid-cols-2 gap-4">
          <div>
            <BarChart
              data={weeklyRevenueData}
              title="Weekly Revenue"
              subtitle="Last 7 days"
              color="#8b5cf6"
              height={220}
            />
          </div>
          <div>
            <LineChart
              data={userGrowthData}
              lines={[{ dataKey: 'users', color: '#10b981', name: 'Users' }]}
              title="User Growth"
              subtitle="Monthly users"
              height={220}
            />
          </div>
        </div>
      </BrowserMockup>

      {/* Chart type indicators */}
      <div className="flex justify-center gap-12 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2"
        >
          <BarChart3 size={16} className="text-purple-400" />
          <span className="text-sm text-white/60">Bar Chart</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2"
        >
          <LineChartIcon size={16} className="text-emerald-400" />
          <span className="text-sm text-white/60">Line Chart</span>
        </motion.div>
      </div>
    </motion.div>
  </div>
);

// Mini Chart SVG Component for mockups
const MiniAreaChart = ({ color = '#ec4899', className = '' }: { color?: string; className?: string }) => (
  <svg viewBox="0 0 100 40" className={className} preserveAspectRatio="none">
    <defs>
      <linearGradient id={`miniGrad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0,35 Q10,30 20,28 T40,22 T60,18 T80,12 T100,8 L100,40 L0,40 Z"
      fill={`url(#miniGrad-${color.replace('#', '')})`}
    />
    <path
      d="M0,35 Q10,30 20,28 T40,22 T60,18 T80,12 T100,8"
      fill="none"
      stroke={color}
      strokeWidth="2"
    />
  </svg>
);

const MiniBarChart = ({ color = '#8b5cf6' }: { color?: string }) => (
  <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
    {[15, 25, 18, 32, 28, 35, 22].map((h, i) => (
      <rect
        key={i}
        x={i * 14 + 2}
        y={40 - h}
        width="10"
        height={h}
        rx="2"
        fill={i === 5 ? color : `${color}50`}
      />
    ))}
  </svg>
);

const MiniPieChart = () => (
  <svg viewBox="0 0 40 40" className="w-full h-full">
    <circle cx="20" cy="20" r="16" fill="none" stroke="#ec4899" strokeWidth="6" strokeDasharray="35 100" transform="rotate(-90 20 20)" />
    <circle cx="20" cy="20" r="16" fill="none" stroke="#8b5cf6" strokeWidth="6" strokeDasharray="25 100" strokeDashoffset="-35" transform="rotate(-90 20 20)" />
    <circle cx="20" cy="20" r="16" fill="none" stroke="#3b82f6" strokeWidth="6" strokeDasharray="20 100" strokeDashoffset="-60" transform="rotate(-90 20 20)" />
    <circle cx="20" cy="20" r="16" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="20 100" strokeDashoffset="-80" transform="rotate(-90 20 20)" />
  </svg>
);

// Slide 6: Responsive Devices
const ResponsiveSlide = () => (
  <div className="h-full flex flex-col items-center justify-center px-8">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center mb-8"
    >
      <h2 className="text-4xl font-bold mb-2">
        Fully <span className="text-pink-400">Responsive</span>
      </h2>
      <p className="text-sm text-white/40">Perfect on every device</p>
    </motion.div>

    <div className="flex items-end justify-center gap-6">
      {/* Phone */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <PhoneMockup className="w-[160px]">
          <div className="h-[340px] bg-[#050505]">
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
              <div className="w-5 h-5 rounded bg-gradient-to-br from-pink-500/30 to-purple-500/30" />
              <div className="w-6 h-6 rounded-full bg-white/10" />
            </div>
            {/* Content */}
            <div className="p-3 space-y-2">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Revenue', value: '$284K', color: 'pink' },
                  { label: 'Orders', value: '1,847', color: 'purple' },
                ].map((stat) => (
                  <div key={stat.label} className={`p-2 rounded-lg bg-${stat.color}-500/10 border border-white/5`}>
                    <p className="text-[8px] text-white/40">{stat.label}</p>
                    <p className="text-sm font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>
              {/* Mini Chart */}
              <div className="rounded-lg bg-white/[0.02] border border-white/5 p-2">
                <p className="text-[8px] text-white/40 mb-1">Revenue</p>
                <div className="h-16">
                  <MiniAreaChart color="#ec4899" className="w-full h-full" />
                </div>
              </div>
              {/* Orders list */}
              <div className="rounded-lg bg-white/[0.02] border border-white/5 p-2">
                <p className="text-[8px] text-white/40 mb-2">Recent</p>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0">
                    <div className="w-5 h-5 rounded-full bg-white/10" />
                    <div className="flex-1">
                      <div className="h-2 w-16 bg-white/10 rounded" />
                    </div>
                    <div className="text-[8px] text-emerald-400">+$99</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PhoneMockup>
        <div className="text-center mt-3 flex items-center justify-center gap-2 text-white/30">
          <Smartphone size={12} />
          <span className="text-xs">Mobile</span>
        </div>
      </motion.div>

      {/* Tablet */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <TabletMockup className="w-[280px]">
          <div className="h-[380px] bg-[#050505]">
            {/* Tablet Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-pink-500/30 to-purple-500/30" />
                <div className="h-3 w-20 bg-white/10 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-white/5" />
                <div className="w-7 h-7 rounded-full bg-white/10" />
              </div>
            </div>
            {/* Content */}
            <div className="p-3">
              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  { label: 'Revenue', value: '$284K', icon: DollarSign, color: '#ec4899' },
                  { label: 'Orders', value: '1,847', icon: ShoppingBag, color: '#8b5cf6' },
                  { label: 'Users', value: '12.4K', icon: Users, color: '#3b82f6' },
                  { label: 'Growth', value: '67%', icon: TrendingUp, color: '#10b981' },
                ].map((stat) => (
                  <div key={stat.label} className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <stat.icon size={10} style={{ color: stat.color }} className="mb-1" />
                    <p className="text-[8px] text-white/40">{stat.label}</p>
                    <p className="text-xs font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>
              {/* Charts row */}
              <div className="grid grid-cols-5 gap-2 mb-3">
                <div className="col-span-3 rounded-lg bg-white/[0.02] border border-white/5 p-2">
                  <p className="text-[8px] text-white/40 mb-1">Revenue Trend</p>
                  <div className="h-24">
                    <MiniAreaChart color="#ec4899" className="w-full h-full" />
                  </div>
                </div>
                <div className="col-span-2 rounded-lg bg-white/[0.02] border border-white/5 p-2">
                  <p className="text-[8px] text-white/40 mb-1">Categories</p>
                  <div className="h-24 flex items-center justify-center">
                    <div className="w-16 h-16">
                      <MiniPieChart />
                    </div>
                  </div>
                </div>
              </div>
              {/* Table preview */}
              <div className="rounded-lg bg-white/[0.02] border border-white/5 p-2">
                <p className="text-[8px] text-white/40 mb-2">Recent Orders</p>
                <div className="space-y-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-2 text-[8px]">
                      <div className="w-5 h-5 rounded-full bg-white/10" />
                      <div className="flex-1 h-2 bg-white/5 rounded" />
                      <div className="w-10 h-2 bg-white/5 rounded" />
                      <div className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Done</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabletMockup>
        <div className="text-center mt-3 flex items-center justify-center gap-2 text-white/30">
          <Tablet size={12} />
          <span className="text-xs">Tablet</span>
        </div>
      </motion.div>

      {/* Desktop */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <BrowserMockup className="w-[440px]">
          <div className="h-[280px] flex">
            {/* Sidebar */}
            <div className="w-12 bg-[#080808] border-r border-white/5 py-3 flex flex-col items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-500/30 to-purple-500/30" />
              <div className="w-6 h-6 rounded-lg bg-pink-500/20" />
              <div className="w-6 h-6 rounded-lg bg-white/5" />
              <div className="w-6 h-6 rounded-lg bg-white/5" />
              <div className="w-6 h-6 rounded-lg bg-white/5" />
              <div className="mt-auto w-6 h-6 rounded-full bg-white/10" />
            </div>
            {/* Main content */}
            <div className="flex-1 p-3">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="h-3 w-32 bg-white/10 rounded mb-1" />
                  <div className="h-2 w-48 bg-white/5 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-white/5" />
                  <div className="w-6 h-6 rounded-lg bg-white/5" />
                  <div className="w-7 h-7 rounded-full bg-white/10" />
                </div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  { value: '$284K', color: '#ec4899' },
                  { value: '1,847', color: '#8b5cf6' },
                  { value: '12.4K', color: '#3b82f6' },
                  { value: '67%', color: '#10b981' },
                ].map((stat, i) => (
                  <div key={i} className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <div className="w-4 h-4 rounded mb-1" style={{ backgroundColor: `${stat.color}20` }} />
                    <p className="text-[10px] font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>
              {/* Charts */}
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 rounded-lg bg-white/[0.02] border border-white/5 p-2">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[8px] text-white/40">Revenue Overview</p>
                    <div className="flex gap-1">
                      <div className="w-8 h-3 rounded bg-white/5" />
                      <div className="w-8 h-3 rounded bg-white/5" />
                    </div>
                  </div>
                  <div className="h-20">
                    <MiniAreaChart color="#ec4899" className="w-full h-full" />
                  </div>
                </div>
                <div className="rounded-lg bg-white/[0.02] border border-white/5 p-2">
                  <p className="text-[8px] text-white/40 mb-1">Weekly</p>
                  <div className="h-20">
                    <MiniBarChart color="#8b5cf6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BrowserMockup>
        <div className="text-center mt-3 flex items-center justify-center gap-2 text-white/30">
          <Monitor size={12} />
          <span className="text-xs">Desktop</span>
        </div>
      </motion.div>
    </div>
  </div>
);

// Slide 6: Color System
const ColorsSlide = () => (
  <div className="h-full flex flex-col items-center justify-center px-8">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center mb-12"
    >
      <h2 className="text-5xl font-bold mb-3">
        Color <span className="text-pink-400">System</span>
      </h2>
      <p className="text-white/40">Carefully crafted palette</p>
    </motion.div>

    <div className="max-w-3xl w-full">
      {/* Main colors */}
      <div className="grid grid-cols-4 gap-6 mb-12">
        {[
          { name: 'Pink', color: '#ec4899', desc: 'Primary' },
          { name: 'Purple', color: '#8b5cf6', desc: 'Secondary' },
          { name: 'Blue', color: '#3b82f6', desc: 'Info' },
          { name: 'Emerald', color: '#10b981', desc: 'Success' },
        ].map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-center group"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              className="aspect-square rounded-2xl mb-4 cursor-pointer transition-shadow"
              style={{
                background: `linear-gradient(135deg, ${c.color}, ${c.color}aa)`,
                boxShadow: `0 20px 40px ${c.color}40`,
              }}
            />
            <p className="font-semibold">{c.name}</p>
            <p className="text-sm text-white/40">{c.desc}</p>
            <p className="text-xs text-white/20 font-mono mt-1">{c.color}</p>
          </motion.div>
        ))}
      </div>

      {/* Gradient showcase */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.4 }}
        className="h-16 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-emerald-500 mb-8"
      />

      {/* Dark theme note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-4 text-white/30"
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#050505] border border-white/10" />
          <span className="text-sm">Background #050505</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white/5 border border-white/10" />
          <span className="text-sm">Surface rgba(255,255,255,0.02)</span>
        </div>
      </motion.div>
    </div>
  </div>
);

// Slide 8: Features Grid - Premium Bento Style
const FeaturesSlide = () => {
  const features = [
    { icon: Layers, label: 'Glassmorphism', desc: 'Frosted glass effects with backdrop blur', color: '#ec4899', size: 'large' },
    { icon: Sparkles, label: 'Animations', desc: 'Smooth Framer Motion transitions', color: '#8b5cf6', size: 'normal' },
    { icon: BarChart3, label: '4 Chart Types', desc: 'Area, Bar, Pie, Line', color: '#3b82f6', size: 'normal' },
    { icon: Layout, label: 'Responsive', desc: 'Mobile, tablet & desktop', color: '#10b981', size: 'normal' },
    { icon: Moon, label: 'Dark Mode', desc: 'Easy on the eyes', color: '#f59e0b', size: 'normal' },
    { icon: Zap, label: 'Lightning Fast', desc: 'Vite + React 18', color: '#ef4444', size: 'large' },
    { icon: Code2, label: 'TypeScript', desc: 'Fully type safe', color: '#06b6d4', size: 'normal' },
    { icon: Palette, label: 'Tailwind CSS', desc: 'Utility-first styling', color: '#8b5cf6', size: 'normal' },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold mb-2">
          Premium <span className="text-pink-400">Features</span>
        </h2>
        <p className="text-sm text-white/40">Everything you need to build beautiful dashboards</p>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-4 gap-3 max-w-4xl w-full">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          const isLarge = feature.size === 'large';

          return (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`
                relative overflow-hidden rounded-2xl
                bg-white/[0.02] border border-white/[0.06]
                hover:border-white/[0.12] transition-all duration-300
                group cursor-default
                ${isLarge ? 'col-span-2 row-span-2 p-6' : 'col-span-1 p-4'}
              `}
            >
              {/* Gradient glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${feature.color}15, transparent 70%)`
                }}
              />

              {/* Icon container */}
              <div
                className={`
                  relative flex items-center justify-center rounded-xl mb-3
                  ${isLarge ? 'w-14 h-14' : 'w-10 h-10'}
                `}
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <Icon
                  size={isLarge ? 28 : 20}
                  style={{ color: feature.color }}
                  className="relative z-10"
                />
                {/* Icon glow */}
                <div
                  className="absolute inset-0 rounded-xl blur-xl opacity-50"
                  style={{ backgroundColor: feature.color }}
                />
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className={`font-semibold text-white mb-1 ${isLarge ? 'text-lg' : 'text-sm'}`}>
                  {feature.label}
                </h3>
                <p className={`text-white/40 ${isLarge ? 'text-sm' : 'text-xs'}`}>
                  {feature.desc}
                </p>
              </div>

              {/* Large card extra decoration */}
              {isLarge && (
                <div className="absolute bottom-4 right-4 opacity-10">
                  <Icon size={80} style={{ color: feature.color }} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom tech stack badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-3 mt-6"
      >
        {['React 18', 'TypeScript', 'Tailwind', 'Vite', 'Recharts', 'Framer Motion'].map((tech) => (
          <span
            key={tech}
            className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-white/40"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// Slide 9: Thank You - Premium Ending
const ThankYouSlide = () => (
  <div className="h-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
    {/* Animated background orbs */}
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
      style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}
      animate={{
        x: ['-20%', '20%', '-20%'],
        y: ['-10%', '10%', '-10%'],
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
      style={{ background: 'linear-gradient(135deg, #3b82f6, #10b981)', right: '10%', bottom: '20%' }}
      animate={{
        x: ['10%', '-10%', '10%'],
        y: ['5%', '-5%', '5%'],
        scale: [1.1, 0.9, 1.1],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* Grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />

    {/* Content */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center z-10"
    >
      {/* Main title */}
      <motion.h2
        className="text-6xl md:text-8xl font-bold mb-4 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Thank <span className="text-pink-400">You</span>
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-white/30 mb-8"
      >
        for watching the showcase
      </motion.p>

      {/* Tech stack */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-3 mb-10"
      >
        {[
          { label: 'React', color: '#61dafb' },
          { label: 'TypeScript', color: '#3178c6' },
          { label: 'Tailwind', color: '#38bdf8' },
          { label: 'Vite', color: '#646cff' },
        ].map((tech, i) => (
          <motion.span
            key={tech.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm"
            style={{ color: tech.color }}
          >
            {tech.label}
          </motion.span>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.a
        href="/"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(236,72,153,0.3)' }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 font-semibold text-lg shadow-lg shadow-pink-500/20 mb-12"
      >
        <span>View Live Dashboard</span>
        <ChevronRight size={20} />
      </motion.a>

      {/* Developer credit */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex flex-col items-center gap-3"
      >
        <p className="text-white/20 text-sm">Designed & Developed by</p>
        <motion.a
          href="https://github.com/radioheavy"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-pink-500/30 transition-colors"
        >
          {/* Avatar placeholder */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-sm font-bold">
            R
          </div>
          <span className="text-white font-medium">@radioheavy</span>
        </motion.a>
      </motion.div>
    </motion.div>

    {/* Floating decorative elements */}
    <motion.div
      className="absolute top-20 left-20"
      animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <div className="w-3 h-3 rounded-full bg-pink-500/40" />
    </motion.div>
    <motion.div
      className="absolute top-32 right-32"
      animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
      transition={{ duration: 3.5, repeat: Infinity }}
    >
      <div className="w-2 h-2 rounded-full bg-purple-500/40" />
    </motion.div>
    <motion.div
      className="absolute bottom-32 left-32"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity }}
    >
      <div className="w-4 h-4 rounded-full bg-blue-500/30" />
    </motion.div>
    <motion.div
      className="absolute bottom-20 right-20"
      animate={{ y: [0, 12, 0], x: [0, 5, 0] }}
      transition={{ duration: 4.5, repeat: Infinity }}
    >
      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
    </motion.div>
  </div>
);

// ============================================
// MAIN COMPONENT
// ============================================

const slides = [
  { id: 'hero', component: HeroSlide, label: 'Hero' },
  { id: 'dashboard', component: DashboardSlide, label: 'Dashboard' },
  { id: 'stats', component: StatsSlide, label: 'Stats' },
  { id: 'charts1', component: ChartsSlide1, label: 'Charts 1' },
  { id: 'charts2', component: ChartsSlide2, label: 'Charts 2' },
  { id: 'responsive', component: ResponsiveSlide, label: 'Responsive' },
  { id: 'colors', component: ColorsSlide, label: 'Colors' },
  { id: 'features', component: FeaturesSlide, label: 'Features' },
  { id: 'thanks', component: ThankYouSlide, label: 'Thanks' },
];

const Showcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isAnimating]);

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className="h-screen bg-[#030303] text-white overflow-hidden relative">
      {/* Slide content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="h-full"
        >
          <CurrentSlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-20"
        disabled={isAnimating}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-20"
        disabled={isAnimating}
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 text-white/30 text-sm font-mono z-20">
        {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

    </div>
  );
};

export default Showcase;
