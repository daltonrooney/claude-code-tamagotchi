#!/usr/bin/env node

// Simple test script to verify the local AI endpoint integration
// Run with: node test-local-ai.js

const { LocalAIClient } = require('./dist/llm/LocalAIClient.js');

async function testLocalAI() {
  console.log('Testing Local AI Client integration...');
  
  const client = new LocalAIClient(
    'dummy-key',  // API key (may not be needed for local endpoints)
    'http://127.0.0.1:11435/v1',  // Your local endpoint
    'gpt-5-nano',  // Model name
    5000,  // 5 second timeout
    2      // Max retries
  );
  
  try {
    console.log('Testing connection...');
    const isConnected = await client.testConnection();
    console.log(`Connection test: ${isConnected ? 'SUCCESS' : 'FAILED'}`);
    
    if (isConnected) {
      console.log('\nTesting user message analysis...');
      const analysis = await client.analyzeUserMessage(
        'Help me fix a bug in my authentication system',
        ['User: I want to add logging to my app', 'Claude: I can help with that']
      );
      
      console.log('Analysis result:', analysis);
      console.log('\n✅ Local AI integration is working!');
    } else {
      console.log('\n❌ Could not connect to local AI endpoint');
      console.log('Make sure your local AI server is running at http://127.0.0.1:11435/v1');
    }
  } catch (error) {
    console.error('\n❌ Error testing local AI:', error.message);
    console.log('Make sure your local AI server is running and accessible');
  }
}

testLocalAI();