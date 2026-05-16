# Security Audit: The Door Was Open

## Investigation
| Route | Method | Vulnerable Before Fix? (Yes/No) | Unauthenticated Response (Should return 401) |
| --- | --- | --- | --- |
| `POST /api/auth/register` | POST | | |
| `POST /api/auth/login` | POST | | |
| `GET /api/health` | GET | | |
| `GET /api/users/profile` | GET | | |
| `PUT /api/users/profile` | PUT | | |
| `GET /api/posts/my-posts` | GET | | |
| `POST /api/posts/create` | POST | | |
| `GET /api/admin/users` | GET | | |
| `DELETE /api/admin/users/:id` | DELETE | | |

## Fix
Describe which files were modified and how the `authenticate` middleware was applied to the private routes identified in the investigation.

## Verification
Confirm that private routes now correctly return `401 Unauthorized` without a valid token, while public routes remain accessible. Provide evidence of testing results.
