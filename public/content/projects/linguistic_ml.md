# Linguistic Machine Learning
## Dialect classification from text
**Year:** November 2024
**Status:** Completed
**Source:** github.com/YorkeF/Linguistics-Analysis

---

## Overview

Developed an algorithm that accepts any string of words and determines
the linguistic dialect of the text, displaying the bounded results
overlaid on a geographic map.

## How It Works

- Text input is vectorised and passed through a trained classifier
- The model outputs a probability distribution over dialect regions
- Results are rendered as geographic bounds on an interactive map

## Technical Highlight

Training data sourced from regional linguistic corpora. The map
visualisation plots dialect confidence zones as geographic polygons,
giving an intuitive spatial view of dialect probability.

`Python` `PyTorch` `Pandas` `NumPy`
