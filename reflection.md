# Reflection

**What Worked**
Building this persona-based AI chatbot was an incredible exercise in applied prompt engineering. What worked exceptionally well was treating the system prompt as a dynamic configuration file rather than just a set of instructions. By clearly separating the persona description, the few-shot examples, the chain-of-thought (CoT) instructions, and strict constraints, the LLM had a highly structured framework to operate within. 

The most effective technique was providing distinct few-shot examples. In my initial tests, just telling the model to "act like Abhimanyu Saxena" or "be a mentor" resulted in generic, robotic motivational quotes. However, the moment I embedded actual examples of how they speak (e.g., Anshuman using the "superpower" analogy, Kshitij using empathetic pedagogical framing like "Okay, so first of all...", and Abhimanyu using the "map vs. compass" analogy), the model's tone shifted dramatically. It stopped sounding like an AI and started sounding genuinely like the individuals.

**The GIGO Principle (Garbage In, Garbage Out)**
This project heavily underscored the GIGO principle. Early on, when my constraints were loose (e.g., "don't be boring"), the model produced lengthy, unengaging paragraphs. When I changed the constraints to be highly specific ("Do not use slang", "Avoid rigid step-by-step instructions unless necessary", "End with a reflective question"), the quality of the output skyrocketed. I learned that an LLM will take the path of least resistance. If you provide lazy, vague inputs, the model will output lazy, generic AI-speak. The prompt is the code, and if the code is messy, the execution will be poor. 

**What I Would Improve**
If I were to expand this project, I would implement two major improvements. First, I would introduce dynamic few-shot prompting. Instead of hardcoding the same three examples in the system prompt, I would use a vector database to retrieve past quotes and examples relevant to the specific user query, injecting them into the prompt right before the API call. This would make the personas even more context-aware.

Second, I would refine the Chain-of-Thought (CoT) process. Currently, the CoT is implicit; the model is instructed to think internally but only output the final answer. In the future, I would have the model output its reasoning process into a separate JSON field, ensuring it strictly follows the reasoning path before generating the user-facing text. This would drastically reduce hallucinations and ensure the model stays perfectly in character, especially for complex career or coding questions.
