import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


app.get("/", (req, res) => {
  res.send("Ask Gemini Backend is running!");
});

app.post("/ask", async (req, res) => {
  try {
   
    const question = req.body.question;

    if (!question || question.trim() === "") {
      return res.status(400).json({
        error: "Please enter a question"
      });
    }


    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question
    });

    
    const answer = response.text;

   
    res.json({
      answer: answer
    });

  } catch (error) {
    console.log("Gemini Error:", error);

    res.status(500).json({
      error: "Something went wrong while generating the answer"
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});






















