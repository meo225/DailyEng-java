## 2024-03-25 - Add Input Length Limit to Text-to-Speech Endpoint
**Vulnerability:** The `/speaking/speech/synthesize` endpoint, which is public without authentication, did not impose a limit on the input text length. This allowed attackers to send arbitrarily large texts to the Azure Speech Service API.
**Learning:** Third-party API calls, especially paid ones, must always have input length/size limits to prevent Server-Side Request Forgery cost exhaustion (Denial of Wallet) and Denial of Service vulnerabilities.
**Prevention:** Always add and enforce explicit size restrictions on user input at the controller boundary before forwarding data to external paid APIs.

## 2025-02-19 - [Missing Input Length Validation for External API Calls]
**Vulnerability:** External APIs like Azure Speech Service were taking an unbounded string `referenceText` directly from user request parameters, risking Denial of Service (DoS) and Denial of Wallet (Cost Exhaustion) through Server-Side Request Forgery.
**Learning:** External API dependencies charge by character count. Lacking a maximum length limitation in the controller causes unbound requests to third party services to execute, draining wallet resources or tying up threads in the backend system processing massive payload sizes.
**Prevention:** Always ensure any parameter (like `referenceText`) sent out to third party APIs (e.g. Azure, OpenAI, DeepL) validates input constraints on string length inside the `@RestController` endpoints prior to calling internal services.
