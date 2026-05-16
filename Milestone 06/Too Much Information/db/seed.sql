-- Seed Users
-- Password for all is password123

INSERT INTO users (
  name, email, password_hash, role, is_admin, stripe_customer_id, 
  last_login_ip, subscription_plan, feature_flags, salary
) VALUES 
(
  'Corporate Admin', 
  'admin@corpauth.dev', 
  '$2a$10$K9xZwX8mN3pQ2rS1tU0vOeY7aB5cD6eF7gH8iJ9kL0mN1oP2qR3sT', 
  'admin', 
  true, 
  'cus_ADMIN_99_PRO_SECURE', 
  '192.168.1.1', 
  'enterprise', 
  '{"can_view_all_stats": true, "beta_access": true, "unlimited_api": true}', 
  150000.00
),
(
  'Project Manager', 
  'manager@corpauth.dev', 
  '$2a$10$K9xZwX8mN3pQ2rS1tU0vOeY7aB5cD6eF7gH8iJ9kL0mN1oP2qR3sT', 
  'manager', 
  false, 
  'cus_MGR_77_BUSINESS', 
  '192.168.1.45', 
  'business', 
  '{"can_manage_teams": true, "beta_access": false}', 
  85000.00
),
(
  'Standard User', 
  'user@corpauth.dev', 
  '$2a$10$K9xZwX8mN3pQ2rS1tU0vOeY7aB5cD6eF7gH8iJ9kL0mN1oP2qR3sT', 
  'user', 
  false, 
  'cus_USR_11_BASIC', 
  '192.168.1.102', 
  'free', 
  '{"can_use_standard_features": true}', 
  45000.00
);
