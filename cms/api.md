# Daemon API Documentation

The Daemon API provides programmatic access to personal information, projects, and frameworks through the Model Context Protocol (MCP).

## Base URL

```
https://daemon-eight.vercel.app
```

## Protocol

The API uses JSON-RPC 2.0 over HTTPS.

## Authentication

Currently, the API is publicly accessible. Future versions may include authentication.

## Available Methods

### List Available Tools

Get a list of all available endpoints:

```bash
curl -X POST https://daemon-eight.vercel.app \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/list",
    "id": 1
  }'
```

### Call a Tool

Execute a specific tool to retrieve data:

```bash
curl -X POST https://daemon-eight.vercel.app \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "get_purpose",
      "arguments": {}
    },
    "id": 2
  }'
```

## Available Endpoints

| Endpoint | Description | Response Type |
|----------|-------------|---------------|
| `get_about` | Basic information about Bryan Rivera | Text |
| `get_narrative` | Personal narrative and focus areas | Text |
| `get_mission` | Current mission statement | Text |
| `get_projects` | List of active projects | Text |
| `get_purpose` | Personal purpose framework | Structured Text |
| `get_favorite_books` | Recommended reading list | List |
| `get_favorite_movies` | Film recommendations | List |
| `get_current_location` | Current city/location | Text |
| `get_preferences` | Work style and preferences | Text |
| `get_all` | All available data | JSON |
| `get_section` | Specific section by name | Text |

## Response Format

All responses follow the JSON-RPC 2.0 specification:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Response content here..."
      }
    ]
  },
  "id": 2
}
```

## Error Handling

Errors are returned with appropriate error codes:

```json
{
  "jsonrpc": "2.0",
  "error": {
    "code": -32601,
    "message": "Method not found"
  },
  "id": 1
}
```

## Rate Limiting

The API currently has generous rate limits:
- 1000 requests per hour per IP
- Burst of up to 10 requests per second

## MCP Integration

To use Daemon with MCP-compatible tools like Claude Code:

1. Add to your MCP configuration:

```json
{
  "mcpServers": {
    "daemon": {
      "url": "https://daemon-eight.vercel.app"
    }
  }
}
```

2. The daemon tools will be available in your MCP client.

## Examples

### Python

```python
import requests
import json

url = "https://daemon-eight.vercel.app"
headers = {"Content-Type": "application/json"}

# Get purpose framework
payload = {
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
        "name": "get_purpose",
        "arguments": {}
    },
    "id": 1
}

response = requests.post(url, headers=headers, data=json.dumps(payload))
data = response.json()
print(data["result"]["content"][0]["text"])
```

### JavaScript

```javascript
async function getDaemonData(tool) {
  const response = await fetch('https://daemon-eight.vercel.app', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'tools/call',
      params: {
        name: tool,
        arguments: {}
      },
      id: 1
    })
  });

  const data = await response.json();
  return data.result.content[0].text;
}

// Usage
const purpose = await getDaemonData('get_purpose');
console.log(purpose);
```

## Updates

The Daemon API is continuously updated with new information. Check the `last_updated` field in responses for freshness.

## Support

For issues or questions:
- GitHub: [@brrh](https://github.com/brrh)
- Website: [brrh.lv](https://brrh.lv)

---

*The Daemon API is part of the broader vision of everyone having a personal API - a way for both humans and AI to understand who you are and how to interact with you.*
