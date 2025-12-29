// OpenAI ile gerçek LLM entegrasyonu (yeni sürüm)
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: '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'
});

module.exports = {
  parseIntent: async (message) => {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Kullanıcıdan gelen mesajdan intent (niyet) ve parametreleri JSON olarak çıkar. Sadece JSON döndür.\nÖrnek: {"intent":"query_tuition","params":{"studentNumber":"123456"}}\nIntentler: query_tuition, unpaid_tuition, pay_tuition, free_text' },
          { role: 'user', content: message }
        ],
        temperature: 0.0
      });
      let intent = 'free_text';
      let params = {};
      try {
        const json = JSON.parse(completion.choices[0].message.content);
        intent = json.intent || 'free_text';
        params = json.params || {};
      } catch (e) {
        console.error('JSON parse error:', e, completion.choices[0].message.content);
      }
      return { intent, params };
    } catch (err) {
      console.error('OpenAI API error:', err);
      throw err;
    }
  }
};
