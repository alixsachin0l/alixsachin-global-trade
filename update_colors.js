const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/yellow-500/g, 'cyan-400');
content = content.replace(/yellow-400/g, 'cyan-300');
content = content.replace(/yellow-600/g, 'cyan-500');
content = content.replace(/yellow-100/g, 'cyan-100');
content = content.replace(/yellow-50/g, 'cyan-50');
content = content.replace(/yellow-800/g, 'cyan-800');
content = content.replace(/yellow-900/g, 'cyan-900');

// Also update the logo icon and text
content = content.replace(/Globe2/g, 'Anchor');
content = content.replace(/AlixSachin <span className="text-cyan-400">Global Trade<\/span>/g, 'Alix<span className="text-cyan-400">Sachin</span>');
content = content.replace(/<span className="font-bold text-lg text-white tracking-tight">AlixSachin<\/span>/g, '<span className="font-bold text-lg text-white tracking-tight">Alix<span className="text-cyan-400">Sachin</span></span>');

fs.writeFileSync('src/App.tsx', content);
