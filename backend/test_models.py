import google.generativeai as genai

# Replace with your real API key
genai.configure(api_key="AIzaSyDTUkv-s4ofx628XSC4lPbaf1Qpm-bATtU")

models = genai.list_models()

for model in models:
    print(model.name)
    print("Supported methods:", model.supported_generation_methods)
    print("-" * 40)