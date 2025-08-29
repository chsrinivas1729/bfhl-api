const express = require("express");
const app = express();
app.use(express.json());

const FULL_NAME = "srinivas_chitneedi";
const DOB = "13052005";
const EMAIL = "surya.22bce9504@vitapstudent.ac.in";
const ROLL_NUMBER = "22BCE9504";

function alternatingCaps(str) {
  let result = "";
  let upper = true;
  for (let i = str.length - 1; i >= 0; i--) {
    let char = str[i];
    result += upper ? char.toUpperCase() : char.toLowerCase();
    upper = !upper;
  }
  return result;
}

// GET / route — optional for root check
app.get('/', (req, res) => {
  res.send('BFHL API is running. Use POST /bfhl endpoint.');
});

// GET /bfhl route — friendly message when accessed via browser or GET
app.get('/bfhl', (req, res) => {
  res.send('BFHL API is running. Please send a POST request to this endpoint.');
});

// POST /bfhl route — your main API logic
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "'data' must be an array",
      });
    }

    const evenNumbers = [];
    const oddNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    let concatAlpha = "";

    data.forEach((item) => {
      if (/^\d+$/.test(item)) {
        const num = parseInt(item, 10);
        if (num % 2 === 0) {
          evenNumbers.push(item);
        } else {
          oddNumbers.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        concatAlpha += item;
      } else {
        specialCharacters.push(item);
      }
    });

    const concat_string = alternatingCaps(concatAlpha);

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      even_numbers: evenNumbers,
      odd_numbers: oddNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Internal server error",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
