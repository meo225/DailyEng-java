## 2024-03-25 - Add Input Length Limit to Text-to-Speech Endpoint
**Vulnerability:** The `/speaking/speech/synthesize` endpoint, which is public without authentication, did not impose a limit on the input text length. This allowed attackers to send arbitrarily large texts to the Azure Speech Service API.
**Learning:** Third-party API calls, especially paid ones, must always have input length/size limits to prevent Server-Side Request Forgery cost exhaustion (Denial of Wallet) and Denial of Service vulnerabilities.
**Prevention:** Always add and enforce explicit size restrictions on user input at the controller boundary before forwarding data to external paid APIs.
