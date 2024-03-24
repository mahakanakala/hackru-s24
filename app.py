from flask import Flask, jsonify, render_template, request
import requests

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/llm')
def llm():
    return render_template('llm.html')

@app.route('/forYou')
def forYou():
    return render_template('forYou.html')

@app.route('/account')
def account():
    return render_template('account.html')

@app.route('/get_response', methods=['GET','POST'])  # Allow GET requests
def get_response():
    user_input = request.json['prompt']
    chatContext = request.json['chat_context']
    # prompt = "Tell me all about PEP-8"
    response = requests.post(
        f"https://api.cloudflare.com/client/v4/accounts/aad6b1341f9c6220aa51eb99e96d1cd2/ai/run/@hf/thebloke/openhermes-2.5-mistral-7b-awq",
        headers={"Authorization": f"Bearer gwxtWoLk9qXYdPwzb_dl8Q6ZybuhPjK9ZSR4CAdf"},
        json={
            "messages": [
                {"role": "system", "content": "You are an AI assistant called StylistAI and you know everything about Fashion. Your outputs are in a markdown formatting. Add newline characters to the ends of paragraphs to make your outputs more cleaner. Here is a list of the previous messages: " + chatContext},
                {"role": "user", "content": user_input}
            ]
        }
    )
    result = response.json()
    
    response_value = result['result']['response']
    # print(result)
    return jsonify({'response_value': response_value})

if __name__ == '__main__':
    app.run(debug=True)