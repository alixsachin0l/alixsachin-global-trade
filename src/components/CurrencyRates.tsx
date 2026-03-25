import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, RefreshCw } from 'lucide-react';

interface Rates {
  [key: string]: number;
}

const MAJOR_CURRENCIES = [
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
];

export default function CurrencyRates() {
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchRates = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setRates(data.rates);
      setLastUpdated(new Date(data.time_last_update_unix * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    // Refresh every 5 minutes
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-blue-950 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-cyan-500" />
            Live Market Rates
          </h3>
          <p className="text-slate-500 text-sm mt-1">Real-time currency conversion (Base: 1 USD)</p>
        </div>
        <button 
          onClick={fetchRates}
          disabled={loading}
          className="flex items-center gap-2 text-sm font-medium text-cyan-600 bg-cyan-50 px-4 py-2 rounded-full hover:bg-cyan-100 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Updating...' : `Updated: ${lastUpdated}`}
        </button>
      </div>

      {error ? (
        <div className="text-center py-8 text-red-500 bg-red-50 rounded-xl">
          Failed to load exchange rates. Please try again later.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {MAJOR_CURRENCIES.map((currency, i) => (
            <motion.div
              key={currency.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-cyan-200 hover:shadow-md transition-all group"
            >
              <div className="text-slate-400 text-xs font-medium mb-1 uppercase tracking-wider">{currency.name}</div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-blue-950 group-hover:text-cyan-600 transition-colors">
                  {rates ? rates[currency.code]?.toFixed(2) : '---'}
                </span>
                <span className="text-slate-500 font-medium mb-1">{currency.code}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
