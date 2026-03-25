import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'motion/react';
import ShipScene from './components/ShipScene';
import CurrencyRates from './components/CurrencyRates';
import Chatbot from './components/Chatbot';
import { 
  Anchor, 
  Globe2,
  TrendingUp, 
  ShieldCheck, 
  Handshake, 
  Ship, 
  Plane, 
  Package, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle2,
  ArrowRight,
  Wheat,
  Apple,
  Shirt,
  Droplet,
  Sprout,
  Grid3X3,
  Wrench,
  Zap,
  Factory,
  Loader2,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [userCountry, setUserCountry] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    // Automatically detect user's country
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.country_name) {
          setUserCountry(data.country_name);
        }
      })
      .catch(err => console.error('Error fetching country:', err));
  }, []);
  
  const formRef = useRef<HTMLFormElement>(null);
  const [contactStatus, setContactStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const contactFormRef = useRef<HTMLFormElement>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactFormRef.current) return;

    setIsContactSubmitting(true);
    setContactStatus('idle');

    const formData = new FormData(contactFormRef.current);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formsubmit.co/ajax/alixsachin0l@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: "New Contact Message from AlixSachin Website",
            ...data
        })
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      setContactStatus('success');
      contactFormRef.current.reset();
      
      setTimeout(() => {
        setContactStatus('idle');
      }, 5000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setContactStatus('error');
    } finally {
      setIsContactSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formsubmit.co/ajax/alixsachin0l@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `New ${activeTab === 'buyer' ? 'Buyer' : 'Seller'} Enquiry from AlixSachin Website`,
            ...data
        })
      });

      if (!response.ok) throw new Error('Failed to send enquiry');
      
      setSubmitStatus('success');
      formRef.current.reset();
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-cyan-400/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-blue-950 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <Anchor className="h-8 w-8 text-cyan-400" />
              <span className="font-bold text-xl tracking-tight">Alix<span className="text-cyan-400">Sachin</span></span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-cyan-400 transition-colors font-medium">How It Works</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-cyan-400 transition-colors font-medium">Services</button>
              <button onClick={() => scrollToSection('categories')} className="hover:text-cyan-400 transition-colors font-medium">Categories</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-cyan-400 transition-colors font-medium">Contact</button>
            </div>
            <div className="hidden md:flex">
              <button 
                onClick={() => scrollToSection('forms')}
                className="bg-cyan-400 text-blue-950 px-6 py-2.5 rounded-md font-bold hover:bg-cyan-300 transition-colors shadow-md"
              >
                Get Started
              </button>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-cyan-400 focus:outline-none p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-900 border-t border-blue-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
              <button onClick={() => scrollToSection('how-it-works')} className="text-left px-3 py-3 text-base font-medium hover:bg-blue-800 hover:text-cyan-400 rounded-md transition-colors">How It Works</button>
              <button onClick={() => scrollToSection('services')} className="text-left px-3 py-3 text-base font-medium hover:bg-blue-800 hover:text-cyan-400 rounded-md transition-colors">Services</button>
              <button onClick={() => scrollToSection('categories')} className="text-left px-3 py-3 text-base font-medium hover:bg-blue-800 hover:text-cyan-400 rounded-md transition-colors">Categories</button>
              <button onClick={() => scrollToSection('contact')} className="text-left px-3 py-3 text-base font-medium hover:bg-blue-800 hover:text-cyan-400 rounded-md transition-colors">Contact</button>
              <button 
                onClick={() => scrollToSection('forms')}
                className="mt-4 w-full bg-cyan-400 text-blue-950 px-6 py-3 rounded-md font-bold hover:bg-cyan-300 transition-colors shadow-md text-center"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-blue-950 text-white overflow-hidden">
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-32 lg:pt-32 lg:pb-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-800 text-cyan-400 text-sm font-semibold mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span>Trusted Global Trade Partner</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                Connecting Global <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500">Buyers & Sellers</span>
              </h1>
              <p className="text-lg lg:text-xl text-blue-100 mb-10 max-w-xl leading-relaxed">
                We bridge the gap in international trade. We help you find trusted suppliers and verified buyers worldwide, ensuring secure and profitable deals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => { setActiveTab('buyer'); scrollToSection('forms'); }}
                  className="bg-cyan-400 text-blue-950 px-8 py-4 rounded-md font-bold text-lg hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] flex items-center justify-center gap-2"
                >
                  I am a Buyer <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => { setActiveTab('seller'); scrollToSection('forms'); }}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  I am a Seller <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block relative mt-12 lg:mt-0 h-[350px] lg:h-auto"
            >
              <ShipScene />
              
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-2 lg:-left-6 bg-white text-blue-950 p-4 lg:p-6 rounded-xl shadow-xl border border-slate-100 z-20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-500">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-sm text-slate-500 font-medium">Countries Reached</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Ocean Wave SVG Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 transform translate-y-[1px]">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" fill="#0f172a" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-51.44V120H0Z" fill="#0f172a" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V120H0Z" fill="#0f172a"></path>
          </svg>
        </div>
      </section>

      {/* Global Reach Marquee */}
      <section className="bg-slate-900 py-6 overflow-hidden border-y border-slate-800">
        <div className="flex">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            className="flex gap-10 min-w-max px-5"
          >
            {[
              { code: 'in', name: 'India' },
              { code: 'us', name: 'USA' },
              { code: 'ru', name: 'Russia' },
              { code: 'cn', name: 'China' },
              { code: 'my', name: 'Malaysia' },
              { code: 'id', name: 'Indonesia' },
              { code: 'au', name: 'Australia' },
              { code: 'de', name: 'Germany' },
              { code: 'ca', name: 'Canada' },
              { code: 'vn', name: 'Vietnam' },
              { code: 'lk', name: 'Sri Lanka' },
              { code: 'bd', name: 'Bangladesh' },
              { code: 'ae', name: 'UAE' },
            ].map((flag, i) => (
              <div key={`flag1-${i}`} className="w-16 h-11 relative rounded shadow-sm overflow-hidden flex-shrink-0 border border-slate-700">
                <img 
                  src={`https://flagcdn.com/w80/${flag.code}.png`} 
                  alt={flag.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
            {[
              { code: 'in', name: 'India' },
              { code: 'us', name: 'USA' },
              { code: 'ru', name: 'Russia' },
              { code: 'cn', name: 'China' },
              { code: 'my', name: 'Malaysia' },
              { code: 'id', name: 'Indonesia' },
              { code: 'au', name: 'Australia' },
              { code: 'de', name: 'Germany' },
              { code: 'ca', name: 'Canada' },
              { code: 'vn', name: 'Vietnam' },
              { code: 'lk', name: 'Sri Lanka' },
              { code: 'bd', name: 'Bangladesh' },
              { code: 'ae', name: 'UAE' },
            ].map((flag, i) => (
              <div key={`flag2-${i}`} className="w-16 h-11 relative rounded shadow-sm overflow-hidden flex-shrink-0 border border-slate-700">
                <img 
                  src={`https://flagcdn.com/w80/${flag.code}.png`} 
                  alt={flag.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">How It Works</h2>
            <div className="w-20 h-1 bg-cyan-400 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600">Our streamlined process ensures secure and efficient global trade connections.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
            
            {[
              {
                step: "01",
                title: "Submit Enquiry",
                desc: "Tell us what you need to buy or what you have to sell using our simple forms.",
                icon: <MessageSquare className="w-8 h-8" />
              },
              {
                step: "02",
                title: "We Match",
                desc: "Our experts leverage our global network to find the perfect verified match for your requirements.",
                icon: <Handshake className="w-8 h-8" />
              },
              {
                step: "03",
                title: "Deal & Earn",
                desc: "We facilitate the negotiation and secure the deal. You grow your business globally.",
                icon: <TrendingUp className="w-8 h-8" />
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 0.4
                  }}
                  className="w-20 h-20 bg-blue-950 text-cyan-400 rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-white group-hover:bg-cyan-400 group-hover:text-blue-950 transition-colors duration-300"
                >
                  <div className="group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                    {item.icon}
                  </div>
                </motion.div>
                <div className="text-cyan-400 font-bold text-sm tracking-widest uppercase mb-2">Step {item.step}</div>
                <h3 className="text-xl font-bold text-blue-950 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Our Services</h2>
            <div className="w-20 h-1 bg-cyan-400 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600">Comprehensive brokerage services to facilitate your international trade.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Buyer Sourcing", desc: "Finding reliable buyers for your products across international markets.", icon: <Package className="w-6 h-6" /> },
              { title: "Seller Sourcing", desc: "Locating verified manufacturers and suppliers for your specific needs.", icon: <Ship className="w-6 h-6" /> },
              { title: "Deal Negotiation", desc: "Expert mediation to ensure fair prices and favorable terms for both parties.", icon: <Handshake className="w-6 h-6" /> },
              { title: "Global Connections", desc: "Access to our extensive network of trade professionals worldwide.", icon: <Globe2 className="w-6 h-6" /> }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:border-cyan-400 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-blue-50 text-blue-950 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-400 group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Currency Rates Feature */}
          <CurrencyRates />
        </div>
      </section>

      {/* Industry Sectors */}
      <section id="sectors" className="py-24 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Diverse Industry Sectors</h2>
              <div className="w-20 h-1 bg-cyan-400 mb-6"></div>
              <p className="text-lg text-blue-200">
                Enable small and large businesses to grow across global markets through our diverse industry sectors.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: 'Spices & Food Products', icon: <Wheat className="w-8 h-8" /> },
              { name: 'Vegetables & Fruits', icon: <Apple className="w-8 h-8" /> },
              { name: 'Textile & Garments', icon: <Shirt className="w-8 h-8" /> },
              { name: 'Oil & Seeds', icon: <Droplet className="w-8 h-8" /> },
              { name: 'Pulses & Lentils', icon: <Sprout className="w-8 h-8" /> },
              { name: 'Tiles & Marble', icon: <Grid3X3 className="w-8 h-8" /> },
              { name: 'Hardware & Kitchenware', icon: <Wrench className="w-8 h-8" /> },
              { name: 'Electrical & Household Items', icon: <Zap className="w-8 h-8" /> },
              { name: 'Engineering & Machinery', icon: <Factory className="w-8 h-8" /> },
            ].map((sector, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-blue-900/40 border border-blue-800/60 p-8 rounded-2xl hover:bg-blue-800/60 hover:border-cyan-400/50 transition-all text-center cursor-pointer group flex flex-col items-center justify-center gap-4"
              >
                <div className="text-cyan-400 group-hover:text-white transition-colors group-hover:scale-110 duration-300">
                  {sector.icon}
                </div>
                <div className="text-xl font-semibold text-blue-50 group-hover:text-cyan-300 transition-colors">
                  {sector.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section id="forms" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Submit Your Requirement</h2>
            <p className="text-lg text-slate-600">Choose your role and let us know how we can help you.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            {/* Tabs */}
            <div className="flex border-b border-slate-200">
              <button 
                className={`flex-1 py-5 text-lg font-bold transition-colors ${activeTab === 'buyer' ? 'bg-blue-950 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                onClick={() => setActiveTab('buyer')}
              >
                I am a Buyer
              </button>
              <button 
                className={`flex-1 py-5 text-lg font-bold transition-colors ${activeTab === 'seller' ? 'bg-blue-950 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                onClick={() => setActiveTab('seller')}
              >
                I am a Seller
              </button>
            </div>

            {/* Form */}
            <div className="p-8 md:p-12">
              {submitStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-950 mb-2">Enquiry Submitted Successfully!</h3>
                  <p className="text-slate-600 mb-8">Thank you for reaching out. Our team will review your requirements and get back to you shortly.</p>
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="bg-blue-950 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-900 transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="role" value={activeTab} />
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                      <input required type="text" name="user_name" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                      <input required type="email" name="user_email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {activeTab === 'buyer' ? 'Product Needed *' : 'Product Offered *'}
                      </label>
                      <input required type="text" name="product" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all" placeholder="e.g., Organic Coffee Beans" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {activeTab === 'buyer' ? 'Quantity Required *' : 'Price / Quantity *'}
                      </label>
                      <input required type="text" name="quantity_price" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all" placeholder={activeTab === 'buyer' ? "e.g., 1000 MT" : "e.g., $500 / MT"} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Country *</label>
                    <input 
                      required 
                      type="text" 
                      name="country" 
                      defaultValue={userCountry}
                      key={userCountry}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all" 
                      placeholder="Your Country" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Additional Message</label>
                    <textarea name="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all resize-none" placeholder="Provide any specific details or requirements..."></textarea>
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                      There was an error submitting your form. Please try again or contact us directly.
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-cyan-400 text-blue-950 py-4 rounded-lg font-bold text-lg hover:bg-cyan-300 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                    ) : (
                      <>Submit Enquiry <Plane className="w-5 h-5" /></>
                    )}
                  </button>
                  <p className="text-xs text-center text-slate-500 mt-4">
                    By submitting, you agree to our terms of service and privacy policy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden border-t border-slate-200">
        {/* Premium background effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1/2 bg-cyan-400/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-blue-950 mb-6 tracking-tight">Recognized Excellence</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-16 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: '7DV6sXZ', name: 'ISO 9001 Certified' },
              { id: 'Kp9VsLSz', name: 'Global Trade Standards' },
              { id: 'bVpc6Gp', name: 'Quality Assurance' },
              { id: 'rRpd5Jvs', name: 'Export Excellence' }
            ].map((cert, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.7, type: "spring", bounce: 0.3 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-slate-100 flex flex-col justify-center items-center transition-all duration-500"
              >
                {/* Glowing border effect on hover */}
                <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-b from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-sm"></div>
                
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5, ease: "easeInOut" }}
                  className="relative z-10 flex-1 flex items-center justify-center w-full h-40"
                >
                  <img 
                    src={`https://i.ibb.co/${cert.id}/image.png`} 
                    alt={`Certification ${cert.name}`} 
                    className="max-w-full h-full object-contain drop-shadow-sm filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.endsWith('.png')) {
                        target.src = `https://i.ibb.co/${cert.id}/image.jpg`;
                      } else if (target.src.endsWith('.jpg')) {
                        target.src = `https://i.ibb.co/${cert.id}/image.jpeg`;
                      }
                    }}
                  />
                </motion.div>
                <div className="mt-8 text-slate-500 font-semibold tracking-wide group-hover:text-blue-600 transition-colors duration-300">
                  {cert.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
              <p className="text-blue-200 text-lg mb-10">
                Have questions about our brokerage services? Contact us directly. We are here to help you navigate global trade.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center shrink-0 text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Email Us</h4>
                    <a href="mailto:alixsachin0l@gmail.com" className="text-blue-200 hover:text-cyan-400 transition-colors">alixsachin0l@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center shrink-0 text-cyan-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Global Headquarters</h4>
                    <p className="text-blue-200">123 Trade Center Blvd,<br/>Suite 400, Business District</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-900/50 p-8 rounded-2xl border border-blue-800">
              <h3 className="text-2xl font-bold mb-6">Quick Message</h3>
              {contactStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-blue-200 text-sm">We will get back to you at the earliest.</p>
                  <button 
                    onClick={() => setContactStatus('idle')}
                    className="mt-6 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form ref={contactFormRef} className="space-y-4" onSubmit={handleContactSubmit}>
                  <input type="text" name="user_name" placeholder="Your Name" required className="w-full px-4 py-3 rounded-lg bg-blue-950/50 border border-blue-800 text-white placeholder-blue-400 focus:ring-2 focus:ring-cyan-400 outline-none" />
                  <input type="email" name="user_email" placeholder="Your Email" required className="w-full px-4 py-3 rounded-lg bg-blue-950/50 border border-blue-800 text-white placeholder-blue-400 focus:ring-2 focus:ring-cyan-400 outline-none" />
                  <textarea name="message" rows={4} placeholder="Your Message" required className="w-full px-4 py-3 rounded-lg bg-blue-950/50 border border-blue-800 text-white placeholder-blue-400 focus:ring-2 focus:ring-cyan-400 outline-none resize-none"></textarea>
                  
                  {contactStatus === 'error' && (
                    <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg text-sm">
                      Failed to send message. Please try again.
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isContactSubmitting}
                    className="w-full bg-cyan-400 text-blue-950 py-3 rounded-lg font-bold hover:bg-cyan-300 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {isContactSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Anchor className="h-6 w-6 text-cyan-400" />
                <span className="font-bold text-lg text-white tracking-tight">Alix<span className="text-cyan-400">Sachin</span></span>
              </div>
              <p className="text-sm mb-4">Your trusted partner in global trade brokerage, connecting reliable buyers and sellers worldwide.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-cyan-400 transition-colors">How It Works</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-cyan-400 transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection('forms')} className="hover:text-cyan-400 transition-colors">Submit Enquiry</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Brokerage Agreement</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Dashboard</h4>
              <p className="text-sm mb-4">Client portal coming soon.</p>
              <button className="bg-slate-800 text-slate-300 px-4 py-2 rounded text-sm cursor-not-allowed opacity-70">
                Login (Coming Soon)
              </button>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} AlixSachin Global Trade. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Connecting the world, one deal at a time.</p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
}
