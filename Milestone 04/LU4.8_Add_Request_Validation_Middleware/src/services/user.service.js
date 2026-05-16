async function createUser(data) {
    // 🚨 THIS IS THE PROOF MECHANISM 🚨
    // If this prints, the request made it past the middleware!
    console.log('\n✅ DATABASE HIT: Creating user...');
    console.log('Clean Payload Received:', data, '\n');
  
    return {
      id: 1,
      ...data,
      createdAt: new Date().toISOString(),
    };
  }
  
  module.exports = { createUser };