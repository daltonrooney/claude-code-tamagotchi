import { LocalAIClient } from './src/llm/LocalAIClient.ts';

console.log('Testing LocalAIClient connection...');
console.log('Base URL:', process.env.PET_AI_BASE_URL || 'http://127.0.0.1:9999/v1');
console.log('Model:', process.env.PET_AI_MODEL || 'foundation');

const client = new LocalAIClient(
  process.env.PET_AI_API_KEY || 'dummy-key',
  process.env.PET_AI_BASE_URL || 'http://127.0.0.1:9999/v1',
  process.env.PET_AI_MODEL || 'foundation',
  2000,
  2
);

console.log('\n1. Testing API connection...');
const isConnected = await client.testConnection();
console.log('   Result:', isConnected ? '✓ Connected' : '✗ Failed');

if (isConnected) {
  console.log('\n2. Testing message analysis...');
  const result = await client.analyzeUserMessage(
    'Can you help me debug this authentication issue?',
    []
  );
  console.log('   Summary:', result.summary.slice(0, 100));
  console.log('   Intent:', result.intent);
}
