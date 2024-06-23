from langchain_community.llms import Ollama
from crewai import Agent, Task, Crew , Process
import sys
model = Ollama(model="llama3")


def extract_ingredientsV1(text):
    classifier = Agent(
        role = "food ingredient classifier",
        goal = "extract ingredients from text",
        backstory = "You are a food ingredient classifier. Your goal is to extract ingredients from a given text and only output the ingredients.",
        verbose= False,
        allow_delegation = False,
        llm = model
    )


    food_classifier = Task(
        name = "food classifier",
        description = f"Extract ingredients from '{text}' and only output the ingredients",
        agent = classifier,
        expected_output = "only the ingredients from the text",

    )
    crew = Crew(
        name = "food ingredient extraction",
        tasks = [food_classifier],
        agents = [classifier],
        process = Process.sequential
    )
    output = crew.kickoff()
    return output


if __name__ == '__main__':
    text = sys.stdin.read().strip()
    print(extract_ingredientsV1(text))

