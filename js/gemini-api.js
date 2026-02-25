// Gemini API Integration
// Try most powerful first; when quota exceeded, step down. Only models that work with Google AI Studio keys (v1beta).
const GEMINI_MODEL_CONFIGS = [
    { name: 'gemini-3-pro-preview', base: 'v1beta' },   // 1. Most powerful
    { name: 'gemini-3-flash-preview', base: 'v1beta' }, // 2.
    { name: 'gemini-2.0-flash', base: 'v1beta' }        // 3. Last fallback (1.5 models often not available)
];

function getApiUrl(modelConfig, useQueryParam, apiKey) {
    const base = 'https://generativelanguage.googleapis.com/' + modelConfig.base + '/models';
    let url = `${base}/${modelConfig.name}:generateContent`;
    if (useQueryParam && apiKey) url += `?key=${apiKey}`;
    return url;
}

function isQuotaOrRateLimitError(message) {
    if (!message) return false;
    const lower = message.toLowerCase();
    return lower.includes('quota') || lower.includes('exceeded') || lower.includes('rate limit') ||
           lower.includes('rate_limit') || lower.includes('resource_exhausted') || lower.includes('please retry');
}

async function askGemini(prompt, modelIndex = 0, useQueryParam = false) {
    const apiKey = localStorage.getItem('gemini_api_key');
    
    if (!apiKey) {
        throw new Error('API key not configured. Please set it up in the index page.');
    }
    
    if (modelIndex >= GEMINI_MODEL_CONFIGS.length) {
        if (!useQueryParam) {
            console.log('Trying query parameter authentication method...');
            return askGemini(prompt, 0, true);
        }
        throw new Error('QUOTA_EXCEEDED');
    }
    
    const modelConfig = GEMINI_MODEL_CONFIGS[modelIndex];
    const apiUrl = getApiUrl(modelConfig, useQueryParam, apiKey);
    
    const headers = {
        'Content-Type': 'application/json'
    };
    if (!useQueryParam) {
        headers['x-goog-api-key'] = apiKey;
    }
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = (errorData.error?.message || response.statusText) + '';
            
            console.log(`Model ${modelConfig.name} failed: ${errorMessage}`);
            
            // Quota exceeded or rate limit -> try next model automatically
            if (isQuotaOrRateLimitError(errorMessage)) {
                if (modelIndex < GEMINI_MODEL_CONFIGS.length - 1) {
                    console.log(`Quota/rate limit hit. Trying next model: ${GEMINI_MODEL_CONFIGS[modelIndex + 1].name}`);
                    return askGemini(prompt, modelIndex + 1, useQueryParam);
                }
                throw new Error('QUOTA_EXCEEDED');
            }
            
            // Model not found / not supported -> try next model
            if (errorMessage.includes('not found') || errorMessage.includes('not supported') || errorMessage.includes('not available')) {
                if (modelIndex < GEMINI_MODEL_CONFIGS.length - 1) {
                    return askGemini(prompt, modelIndex + 1, useQueryParam);
                }
            }
            
            // Auth error -> try query param then retry
            if (errorMessage.includes('API key') || errorMessage.includes('permission') || errorMessage.includes('authentication')) {
                if (!useQueryParam) {
                    return askGemini(prompt, 0, true);
                }
            }
            
            throw new Error(`API error: ${errorMessage}`);
        }
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        }
        throw new Error('Invalid response format from API');
        
    } catch (error) {
        const msg = error.message || '';
        
        // Quota/rate limit in thrown error -> try next model
        if (isQuotaOrRateLimitError(msg)) {
            if (modelIndex < GEMINI_MODEL_CONFIGS.length - 1) {
                console.log(`Quota/rate limit. Trying next model: ${GEMINI_MODEL_CONFIGS[modelIndex + 1].name}`);
                return askGemini(prompt, modelIndex + 1, useQueryParam);
            }
            throw new Error('QUOTA_EXCEEDED');
        }
        
        if (msg.includes('not found') || msg.includes('not supported') || msg.includes('not available')) {
            if (modelIndex < GEMINI_MODEL_CONFIGS.length - 1) {
                return askGemini(prompt, modelIndex + 1, useQueryParam);
            }
        }
        
        console.error('Gemini API Error:', error);
        throw error;
    }
}

// Test API connection with detailed diagnostics
async function testAPIKey() {
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
        return { success: false, message: 'No API key found. Please enter your API key first.' };
    }
    
    // Validate API key format
    if (apiKey.length < 20) {
        return { success: false, message: 'API key appears to be invalid (too short). Please check your API key.' };
    }
    
    try {
        const testPrompt = 'Say "API connection successful"';
        const response = await askGemini(testPrompt);
        return { success: true, message: 'API key is valid and working!', response: response };
    } catch (error) {
        let errorMessage = error.message;
        
        // Provide helpful suggestions based on error
        if (errorMessage.includes('API key')) {
            errorMessage += '\n\nTroubleshooting tips:\n';
            errorMessage += '1. Make sure you copied the entire API key\n';
            errorMessage += '2. Verify the API key is active in Google AI Studio\n';
            errorMessage += '3. Check if API key has proper permissions\n';
            errorMessage += '4. Try generating a new API key';
        } else if (errorMessage.includes('CORS') || errorMessage.includes('network')) {
            errorMessage += '\n\nNetwork error detected. Please check your internet connection.';
        }
        
        return { success: false, message: errorMessage };
    }
}

// Alternative: Direct API test - uses askGemini so it benefits from multi-model fallback
async function testAPIDirect() {
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
        return { success: false, message: 'No API key found' };
    }
    
    try {
        const response = await askGemini('Say "API connection successful"');
        return { success: true, message: 'API connection successful! (Using first available model.)', response: response };
    } catch (error) {
        return { success: false, message: error.message || 'API test failed' };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { askGemini, testAPIKey };
}
