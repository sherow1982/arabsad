const fs = require('fs');
const path = require('path');

const files = ['index.html', 'blog/index.html', 'services/google-ads.html'];

files.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // إضافة width وheight للصور
        content = content.replace(/<img([^>]*?)src="([^"]*)"([^>]*?)>/g, (match, before, src, after) => {
            if (!match.includes('width=') && !match.includes('height=')) {
                if (src.includes('بانر')) {
                    return `<img${before}src="${src}"${after} width="900" height="400">`;
                } else if (src.includes('خدمات') || src.includes('سيو') || src.includes('وسائل')) {
                    return `<img${before}src="${src}"${after} width="300" height="200">`;
                }
            }
            return match;
        });
        
        // إضافة loading="lazy" للصور
        content = content.replace(/<img([^>]*?)(?<!loading="[^"]*")>/g, (match, attrs) => {
            if (!attrs.includes('loading=')) {
                return `<img${attrs} loading="lazy">`;
            }
            return match;
        });
        
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ Fixed: ${file}`);
    }
});

console.log('🎉 Image optimization completed!');