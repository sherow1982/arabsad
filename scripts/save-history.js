const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const [subject, request, result, files] = args;

if (!subject) {
  console.log('❌ يجب تمرير موضوع السجل');
  process.exit(1);
}

const today = new Date().toISOString().split('T')[0];
const historyFile = path.join(process.cwd(), '.history-memo', `${today}.md`);

const entry = `
---

## [${new Date().toLocaleTimeString('ar-EG', { hour12: false })}] - ${subject}

**الطلب:** ${request || 'غير محدد'}
**النتيجة:** ${result || 'تم التنفيذ'}
**الملفات:** ${files || 'متعددة'}

`;

if (fs.existsSync(historyFile)) {
  fs.appendFileSync(historyFile, entry);
} else {
  const header = `# سجل المحادثات - ${today}

${entry}`;
  fs.writeFileSync(historyFile, header);
}

console.log(`✅ تم حفظ السجل في: ${historyFile}`);
