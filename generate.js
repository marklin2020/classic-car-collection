const fs = require('fs');
const path = require('path');

const cars = require('./cars.json');
const template = fs.readFileSync('./template.html', 'utf-8');
const outputDir = path.join(__dirname, 'cars');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

cars.forEach(car => {
  let specsHTML = '';
  for (const [key, value] of Object.entries(car.specs)) {
    specsHTML += `<div class="spec-item"><strong>${key}：</strong> ${value}</div>\n`;
  }

  const filledHTML = template
    .replace(/{{name}}/g, car.name)
    .replace('{{description}}', car.description)
    .replace('{{image}}', car.image)
    .replace('{{specs}}', specsHTML);

  fs.writeFileSync(
    path.join(outputDir, `${car.slug}.html`),
    filledHTML,
    'utf-8'
  );
});


console.log('✅ 頁面已生成完成！');
