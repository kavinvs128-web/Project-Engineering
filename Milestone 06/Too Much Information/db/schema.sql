CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'user')),
  is_admin BOOLEAN DEFAULT false,
  stripe_customer_id VARCHAR(100),
  verification_token VARCHAR(255),
  reset_password_token VARCHAR(255),
  last_login_ip VARCHAR(45),
  subscription_plan VARCHAR(50) DEFAULT 'free',
  feature_flags JSONB DEFAULT '{}',
  salary DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
