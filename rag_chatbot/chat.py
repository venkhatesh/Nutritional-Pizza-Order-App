import streamlit as st
import os
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.postprocessor import SimilarityPostprocessor
from llama_index.core.retrievers import SummaryIndexLLMRetriever

os.environ['OPENAI_API_KEY'] = ''
documents = SimpleDirectoryReader('data').load_data()
index = VectorStoreIndex.from_documents(documents, show_progress=True)
base_prompt = " You are a pizza ordering assistant help the user to choose and order pizza from the pizza menu"
format_prompt = "In the end of the response, based on the user input please give endpoint, body params and request params from the user input"

retriever = VectorIndexRetriever(index=index, top_k=5)
query_engine = RetrieverQueryEngine(retriever=retriever) 

st.title("Pizza Ordering system")

if "messages" not in st.session_state:
    st.session_state.messages = []

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

if prompt := st.chat_input("What is up?"):
    st.session_state.messages.append({"role":"user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)
    response = query_engine.query(f"{base_prompt} {prompt} {format_prompt}").response
    st.session_state.messages.append({"role": "assistant", "content": response})
    with st.chat_message("assistant"):
        response = st.markdown(response)
