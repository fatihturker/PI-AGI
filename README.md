# PI AGI: Personalized Artificial General Intelligence

[![Donate](https://img.shields.io/badge/Donate-Buy%20Me%20a%20Coffee-yellow.svg)](https://www.buymeacoffee.com/RwIpTEd)
[![Stars](https://img.shields.io/github/stars/fatihturker/PI-AGI.svg?style=flat-square)](https://github.com/fatihturker/PI-AGI/stargazers)

Welcome to PI AGI, a groundbreaking project that aims to revolutionize the world of Artificial Intelligence. By developing a base for role-based AGIs (Artificial General Intelligences) that are personalized and optimized for specific tasks, we can unlock the true power and meaning of AGI. As we usher in a new era of AI-driven advancements, it's time for everyone to get ready and embrace the potential of personalized AGIs, which will play a transformative role in shaping our world and driving innovation across various domains.

## Table of Contents

- [The Ultimate Vision](#sparkles-the-ultimate-vision)
- [Getting Started](#rocket-getting-started)
- [Repository Overview](#wrench-repository-overview)
  - [Environment Parameters](#environment-parameters)
  - [Working Styles](#working-styles)
  - [Project Goal](#project-goal)
- [Get Involved](#star-get-involved)
  - [Donations](#donations)
  - [Contributors](#contributors)
- [Join the Community](#handshake-join-the-community)

## :sparkles: The Ultimate Vision

Envision a future where personalized AGIs effortlessly blend into our everyday lives, significantly boosting productivity and stimulating creativity in diverse fields like software development, medicine, finance, and beyond. At PI AGI, we aim to actualize this aspiration by laying the groundwork for AGIs specifically designed and optimized for distinct roles and tasks. 

By harnessing the power of AGI, we can accelerate innovation, tackle complex challenges, and revolutionize the way we work and live. By developing an ecosystem of interconnected, intelligent agents, we can break down barriers between disciplines and enable unprecedented collaboration, ultimately pushing the boundaries of what is possible. PI AGI will be a critical stepping stone towards achieving a more intelligent, efficient, and creative future for all.

## :rocket: Getting Started

Follow these steps to start exploring the world of PI AGI:

1. Clone the repository and navigate to the project folder.
2. Run `npm install` to install the required dependencies.
3. Configure the environment parameters as mentioned in the [Repository Overview](#wrench-repository-overview) section.
4. Open `index.ts` and set your application name, environment information, and other necessary configurations.
5. Customize or add new AGIs by modifying the agi prompts located in the `src/asset/agi` folder.
6. Update the project documentation in `src/asset/input/project-documentation.md` to match your requirements.
7. Once you've set up everything, run `npm start` to kick off the AGI.

## :wrench: Repository Overview

This repository serves as a comprehensive resource for delving into the realm of PI AGI, encompassing crucial environment parameters, AGI definitions, and detailed project documentation. We have meticulously curated and organized these materials to enable you to quickly grasp the core concepts, explore the underlying architecture, and kickstart your journey into the fascinating world of personalized Artificial General Intelligence. 
You can also check out the PI AGI Concept by following this [link](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=PI%20AGI%20Concept#R7Vttc9o4EP41zMDNJCPL7x8DSdNc0kyuSZv2042wZdDFWJwtCPTXn2TLL8LmpWkA59JkBqSVLFvaZx%2FtrkxHH0wWlzGajj9RH4cdCPxFRz%2FvQOjoDv8UgmUm0IADM8koJr6UlYJ78gPnHaV0RnycKB0ZpSEjU1Xo0SjCHlNkKI7ps9otoKF61yka4Zrg3kNhXfpIfDaW84J2Kf%2BIyWic31mz3KxlgvLOcibJGPn0uSLSLzr6IKaUZaXJYoBDsXj5ujxeLR%2FDmyfr8s%2B%2Fkn%2FRl%2F71w%2B3Xk2ywDz9zSTGFGEfsdYfWs6HnKJzJ9epAK%2BQ36ftkzosjUfyESMQ73cV0MuX1M14%2BxwGJuFrFMqWN3hjFyGM4JgkjnmigAf84u7zqwIGAAZljofpx%2BomSJ6HeyBefaRnzy%2FiKExoVDQnDUzFQwO%2BbD5U9G59k5fGkdtgyV3lMZ5GPxbQ13vw8JgzfT5EnWp85yLlszCahbA5oxCRqNa7S%2FihEiYAc4OWExfSpgI3oXWBANAckDAc0pHF6W903seMbxWWVFgcOdcuSN%2FuAJiQU1vQRh3PMFwuJS%2FjzkWh0gwOW3zuT9CljfPqK7LOEa0X0QKeqQDyvqI5i5BMOm8rTuLYPbDufuly2fCkq%2FYxz8V8s8Fb4SZjOcczwomJ8Eo6XmE4wi5e8S95qSsvKuUWX9efSUKEhZeOKkTpShiQ3jIqhS%2FzzgjSBZnMYTf8%2B0bSx%2B%2FV24prow%2BP1nb2QFrTFHC7vHk4MAcg7Dkj

### Environment Parameters

To get started with PI AGI, you'll need to configure the following environment parameters:

- `API_KEY`: Your Azure OpenAI Service API Key (either KEY1 or KEY2)
- `API_ENDPOINT`: Azure OpenAI Service Endpoint (https://your_service.openai.azure.com/openai/deployments/your_openai_model)
- `API_VERSION`: Azure OpenAI Service Version (2023-03-15-preview)
- `MAX_TOKEN`: Maximum token count for GPT-4-32K (32768)
- `MAX_ATTEMPT`: Maximum step count (100)
- `MAX_RETRY_COUNT`: Retry count for calling the GPT-4 API in case of rate limit or timeout (3)
- `RETRY_INTERVAL`: Retry interval for calling the GPT-4 API in case of rate limit or timeout (60000)

### Working Styles

Our AGIs function via a dynamic process of prompts and iterations, commencing with an initial call to delineate the task and obtain an estimation of the necessary API calls. As the AGI advances through the projected steps, it continuously adapts and fine-tunes its actions, drawing upon its inherent capabilities and the input it receives.

This flexible approach enables the AGI to learn and grow more proficient over time, evolving its strategies and techniques to better meet the needs of its specific role. By incorporating user feedback and adjusting its behavior in real-time, the AGI can deliver increasingly accurate and efficient results, ultimately maximizing its potential and value within its designated domain.

### Project Goal

The paramount objective of PI AGI is to lay the groundwork for the creation of personalized AGIs that can be employed across a diverse array of tasks and domains. By devising a scalable and flexible framework, we aim to galvanize others to participate in the project and propel innovation within the realm of Artificial General Intelligence.

Our vision encompasses fostering a thriving community of developers, researchers, and enthusiasts, all collaborating to enhance and expand the capabilities of PI AGI. By combining our collective expertise and insights, we can collectively push the boundaries of what AGI can achieve, ultimately benefiting industries, societies, and individuals worldwide.

## :star: Get Involved

We invite you to join us on this exciting journey by starring the repository, donating to support its development, or contributing your own code and ideas.

### Donations

Fuel the future of AI by [buying me a coffee](https://www.buymeacoffee.com/RwIpTEd) and helping to fund the project.

### Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.com/fatihturker"><img src="https://avatars1.githubusercontent.com/u/2202179?s=460&u=261b1129e7106c067783cb022ab9999aad833bdc&v=4" width="100px;" alt=""/><br /><sub><b>Fatih Turker</b></sub></a><br /></td>
  </tr>
</table>

## :handshake: Join the Community

We believe that collaboration is the key to unlocking the true potential of AGI. By working together, we can create a better, more intelligent future for all. So don't hesitate to get involved, contribute your ideas, or share your thoughts with us.

We're looking forward to building the future of AI together!