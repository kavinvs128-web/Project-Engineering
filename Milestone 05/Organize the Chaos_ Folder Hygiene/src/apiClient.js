const apiClient = {
  get: async (url) => {
    // Artificial delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock responses
    if (url.includes('/products')) {
      return [
        { id: 1, name: 'Minimalist Chair', price: 129.99, description: 'A sleek, modern chair for your home office.', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=400' },
        { id: 2, name: 'Ceramic Vase', price: 45.00, description: 'Handcrafted ceramic vase with a matte finish.', image: 'https://images.unsplash.com/photo-1581781870027-04212e231e96?auto=format&fit=crop&q=80&w=400' },
        { id: 3, name: 'Linen Bedding', price: 189.50, description: '100% Belgian linen bedding set for ultimate comfort.', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=400' },
        { id: 4, name: 'Oak Coffee Table', price: 350.00, description: 'Solid oak coffee table with a natural grain.', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=400' },
        { id: 5, name: 'Wool Throw Blanket', price: 75.00, description: 'Soft wool throw blanket in a neutral grey tone.', image: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&q=80&w=400' },
        { id: 6, name: 'Table Lamp', price: 89.00, description: 'Modern table lamp with a warm glowing light.', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=400' }
      ];
    }
    
    if (url.includes('/orders')) {
      return [
        { id: 'ORD-12345', date: '2024-03-15', total: 174.99, status: 'Delivered', items: 2 },
        { id: 'ORD-67890', date: '2024-03-10', total: 350.00, status: 'Processing', items: 1 }
      ];
    }

    return null;
  },
  post: async (url, data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (url.includes('/login')) {
      if (data.password === 'pass123') {
        return { 
          user: { id: 'user_1', email: data.email, name: 'Demo User' },
          token: 'mock_token_xyz_123'
        };
      }
      throw new Error('Invalid credentials');
    }

    if (url.includes('/checkout')) {
      return { success: true, orderId: 'ORD-' + Math.floor(Math.random() * 100000) };
    }

    return { success: true };
  }
};

export default apiClient;
