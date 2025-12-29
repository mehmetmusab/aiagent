const express = require('express');
const router = express.Router();


const llmService = require('../services/llmService');
const midtermApiService = require('../services/midtermApiService');

router.post('/', async (req, res) => {
  const { message } = req.body;
  try {
    // Parse intent using LLM
    const { intent, params } = await llmService.parseIntent(message);
    let tuition = null;
    let reply = '';
    if (intent === 'query_tuition') {
      tuition = await midtermApiService.queryTuition(params.studentNumber || '123456');
      reply = `Here is your tuition information.`;
    } else if (intent === 'unpaid_tuition') {
      tuition = await midtermApiService.unpaidTuition(params.studentNumber || '123456');
      reply = tuition.unpaid ? 'You have unpaid tuition.' : 'You have no unpaid tuition.';
    } else if (intent === 'pay_tuition') {
      tuition = await midtermApiService.payTuition(params.studentNumber || '123456');
      reply = tuition.paymentStatus === 'success' ? 'Payment successful.' : 'Payment failed.';
    } else {
      reply = 'Sorry, I did not understand your request.';
    }
    res.json({ message: reply, tuition });
  } catch (err) {
    res.status(500).json({ message: 'Error processing your request.' });
  }
});

module.exports = router;
