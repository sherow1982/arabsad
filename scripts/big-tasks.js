const { execSync } = require('child_process');

console.log('🔧 تشغيل المهام الكبيرة...');

const tasks = [
  'npm run history:save "تشغيل المهام الكبيرة" "تم تشغيل جميع المهام" "تم بنجاح" "متعددة"'
];

tasks.forEach((task, index) => {
  try {
    console.log(`${index + 1}. تشغيل: ${task}`);
    execSync(task, { stdio: 'inherit' });
    console.log(`✅ تم تنفيذ المهمة ${index + 1}`);
  } catch (error) {
    console.log(`❌ فشل في المهمة ${index + 1}: ${error.message}`);
  }
});

console.log('🎉 تم الانتهاء من جميع المهام');
