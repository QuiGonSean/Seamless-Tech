document.addEventListener('DOMContentLoaded', function() {
    console.log("Scholar AI initialized with Azure API integration");
    
    // This is a helper function to format API responses with proper styling
    window.formatAIResponse = function(text) {
        if (!text) return "";
        
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    };
    
    // Update API testing function with better error handling
    window.testAPI = async function() {
        try {
            const functionKey = window.FUNCTION_KEY || '';

            if (!functionKey || functionKey.length < 10) {
                return {
                    success: false,
                    error: "No API key provided. Please use the API key form in the top right."
                };
            }

            const functionUrl = `https://scholarai.azurewebsites.net/api/claudeChat`;

            const response = await fetch(functionUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": functionKey // Send key in header, not URL
                },
                body: JSON.stringify({ message: "Hello, this is a test message." })
            });

            console.log("API Test - Status:", response.status);
            console.log("API Test - Status Text:", response.statusText);
            console.log("API Test - Headers:", [...response.headers.entries()]);

            // Check if response was successful
            if (!response.ok) {
                const errorText = await response.text();
                console.error("API Test - Error response:", errorText || "(empty error response)");
                return {
                    success: false,
                    status: response.status,
                    error: `HTTP error ${response.status}: ${errorText || "No response text"}`
                };
            }
            
            // Try to parse the response as JSON
            try {
                const contentType = response.headers.get('content-type') || '';
                
                if (contentType.includes('application/json')) {
                    const data = await response.json();
                    console.log("API Test - JSON Response:", data);
                    return {
                        success: true,
                        status: response.status,
                        data: data
                    };
                } else {
                    // Handle non-JSON responses
                    const textData = await response.text();
                    console.log("API Test - Text Response:", textData);
                    return {
                        success: true,
                        status: response.status,
                        data: textData,
                        note: "Response was not JSON"
                    };
                }
            } catch (parseError) {
                // Handle parsing errors
                console.error("API Test - Parse error:", parseError);
                const rawText = await response.text();
                console.log("API Test - Raw response:", rawText);
                return {
                    success: false,
                    status: response.status,
                    error: "Failed to parse response: " + parseError.message,
                    rawResponse: rawText
                };
            }
        } catch (error) {
            console.error("API Test - Network error:", error);
            return {
                success: false,
                error: error.message
            };
        }
    };
    
    // Create API key form - GUARANTEED approach
    console.log("Starting API key form creation GUARANTEED approach");
    
    // Create the form directly in the body with fixed positioning
    const fixedKeyForm = document.createElement('div');
    fixedKeyForm.id = 'fixed-key-form';
    fixedKeyForm.style.position = 'fixed';
    fixedKeyForm.style.top = '10px';
    fixedKeyForm.style.right = '10px';
    fixedKeyForm.style.padding = '10px';
    fixedKeyForm.style.backgroundColor = '#2a0066';
    fixedKeyForm.style.border = '2px solid #ffd700';
    fixedKeyForm.style.borderRadius = '5px';
    fixedKeyForm.style.zIndex = '9999'; // Extremely high z-index
    fixedKeyForm.style.display = 'flex';
    fixedKeyForm.style.flexDirection = 'column';
    fixedKeyForm.style.gap = '8px';
    fixedKeyForm.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    fixedKeyForm.style.minWidth = '250px';
    
    // Check if we already have a valid key in localStorage
    const savedApiKey = localStorage.getItem('scholar_api_key') || '';
    if (savedApiKey && savedApiKey.length > 10) {
        console.log("API Key found in localStorage");
        window.FUNCTION_KEY = savedApiKey;
        
        // Display key status
        const keyStatus = document.createElement('div');
        keyStatus.style.display = 'flex';
        keyStatus.style.justifyContent = 'space-between';
        keyStatus.style.alignItems = 'center';
        
        const statusText = document.createElement('span');
        statusText.textContent = 'API Key: ✓ Set';
        statusText.style.color = '#ffd700';
        statusText.style.fontWeight = 'bold';
        
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset Key';
        resetButton.style.backgroundColor = '#aa0000';
        resetButton.style.color = 'white';
        resetButton.style.border = 'none';
        resetButton.style.borderRadius = '3px';
        resetButton.style.padding = '5px 10px';
        resetButton.style.cursor = 'pointer';
        resetButton.style.fontSize = '12px';
        
        resetButton.addEventListener('click', function() {
            if (confirm('Are you sure you want to reset your API key?')) {
                localStorage.removeItem('scholar_api_key');
                window.FUNCTION_KEY = '';
                location.reload();
            }
        });
        
        keyStatus.appendChild(statusText);
        keyStatus.appendChild(resetButton);
        fixedKeyForm.appendChild(keyStatus);
    } else {
        console.log("No API Key in localStorage, showing form");
        
        const formTitle = document.createElement('h4');
        formTitle.textContent = 'Enter API Key';
        formTitle.style.color = '#ffd700';
        formTitle.style.margin = '0 0 5px 0';
        formTitle.style.textAlign = 'center';
        
        const inputField = document.createElement('input');
        inputField.type = 'password';
        inputField.placeholder = 'Paste your API key';
        inputField.style.padding = '8px';
        inputField.style.borderRadius = '4px';
        inputField.style.border = '1px solid #ffd700';
        inputField.style.backgroundColor = '#3c0095';
        inputField.style.color = '#ffd700';
        inputField.style.width = '100%';
        
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Save Key';
        submitButton.style.backgroundColor = '#ffd700';
        submitButton.style.color = '#2a0066';
        submitButton.style.border = 'none';
        submitButton.style.borderRadius = '4px';
        submitButton.style.padding = '8px';
        submitButton.style.width = '100%';
        submitButton.style.cursor = 'pointer';
        submitButton.style.fontWeight = 'bold';
        
        // Handle enter key in input field
        inputField.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitButton.click();
            }
        });
        
        // Handle button click
        submitButton.addEventListener('click', function() {
            if (inputField.value.trim()) {
                const apiKey = inputField.value.trim();
                
                // Save API key
                localStorage.setItem('scholar_api_key', apiKey);
                window.FUNCTION_KEY = apiKey;
                
                // Show notification
                alert('API key saved successfully! The page will now reload.');
                
                // Reload page
                location.reload();
            } else {
                alert('Please enter a valid API key.');
            }
        });
        
        fixedKeyForm.appendChild(formTitle);
        fixedKeyForm.appendChild(inputField);
        fixedKeyForm.appendChild(submitButton);
    }
    
    // Add a note about the key
    const noteText = document.createElement('div');
    noteText.style.marginTop = '5px';
    noteText.style.fontSize = '10px';
    noteText.style.color = '#ffd700';
    noteText.style.opacity = '0.8';
    noteText.textContent = 'Your API key is stored securely in your browser.';
    fixedKeyForm.appendChild(noteText);
    
    // Append the form to the document body
    document.body.appendChild(fixedKeyForm);
    console.log("Fixed key form GUARANTEED added to body");
    
    // Remove previous attempt to add the form
    try {
        const existingForm = document.querySelector('.api-key-form');
        if (existingForm) {
            existingForm.remove();
            console.log("Removed existing form");
        }
    } catch (e) {
        console.log("Error removing existing form:", e);
    }
    
    // Add diagnostics button for deeper troubleshooting
    const aiMain = document.querySelector('.ai-main');
    if (aiMain) {
        const diagButton = document.createElement('button');
        diagButton.textContent = 'Run Diagnostics';
        diagButton.style.position = 'absolute';
        diagButton.style.right = '10px';
        diagButton.style.bottom = '10px';
        diagButton.style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
        diagButton.style.color = '#ffd700';
        diagButton.style.border = '1px solid #ffd700';
        diagButton.style.borderRadius = '4px';
        diagButton.style.padding = '5px 10px';
        diagButton.style.cursor = 'pointer';
        diagButton.style.zIndex = '100';
        
        diagButton.onclick = async function() {
            // Run a series of diagnostic tests
            console.log("Starting diagnostics...");
            
            // 1. Check if we have a function key
            console.log("Key check:", window.FUNCTION_KEY ? 
                        `Key present (${window.FUNCTION_KEY.substring(0, 3)}...)` : 
                        "No key found");
            
            // 2. Try a basic fetch to the endpoint (without the key)
            try {
                const checkResponse = await fetch("https://scholarai.azurewebsites.net/api/claudeChat", {
                    method: "HEAD"
                });
                console.log("Endpoint check:", checkResponse.status, checkResponse.statusText);
            } catch (e) {
                console.log("Endpoint check failed:", e);
            }
            
            // 3. Test the actual API call
            const apiTest = await window.testAPI();
            console.log("API test result:", apiTest);
            
            // Display results
            alert(`Diagnostics complete! Check the console (F12) for detailed results.\n\nSummary: ${apiTest.success ? 'API connection succeeded' : 'API connection failed: ' + apiTest.error}`);
        };
        
        aiMain.appendChild(diagButton);
    }
    
    // Enhance the textarea with auto-resize functionality
    const userInput = document.getElementById('user-message');
    if (userInput) {
        // Set initial height
        setTimeout(() => {
            userInput.style.height = 'auto';
            userInput.style.height = (userInput.scrollHeight) + 'px';
            userInput.focus();
        }, 100);
    }
});
