import React, { useState, useEffect } from 'react';


const TIME_TO_HOLD_FULLY_SPELLED_WORD = 1000;
const DELAY_BEFORE_DRAWING_NEXT_LETTER = 700;
const DELAY_BEFORE_DELETING_NEXT_LETTER = 140;

const HACKY_OFFSET_TO_DELAY_HAND_DELETE = 250;

const TypingAnimation = ({ words, onLetterTyped, onLetterDeleted }) => {
  const [index, setIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const cursorBlinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 800);

    return () => {
      clearInterval(cursorBlinkInterval);
    };
  }, []);

  useEffect(() => {
    if (index < words.length) {
      if (!isDeleting && letterIndex <= words[index].length) {
        setTimeout(() => {
          setDisplayText(words[index].substring(0, letterIndex));
          if (letterIndex > 0) {
            onLetterTyped(words[index][letterIndex - 1]);
          }
          setLetterIndex(letterIndex + 1);
        }, DELAY_BEFORE_DRAWING_NEXT_LETTER);
      } else if (isDeleting && letterIndex >= 0) {
        setTimeout(() => {
          setDisplayText(words[index].substring(0, letterIndex));
          if (letterIndex > 0) {
            setTimeout(() => {
              onLetterDeleted();
            }, HACKY_OFFSET_TO_DELAY_HAND_DELETE);
          }
          setLetterIndex(letterIndex - 1);
        }, DELAY_BEFORE_DELETING_NEXT_LETTER);
      } else if (!isDeleting) {
        setTimeout(() => {
          setIsDeleting(true);
        }, TIME_TO_HOLD_FULLY_SPELLED_WORD);
      } else {
        setIsDeleting(false);
        setLetterIndex(0);
        setIndex(index + 1);
      }
    } else {
      setIndex(0);
      setLetterIndex(0);
      setIsDeleting(false);
    }
  }, [letterIndex, isDeleting, index, words, onLetterTyped, onLetterDeleted]);

  return (
    <div className="flex items-center text-[#A29995]">
      <span className="text-[80px]">{displayText}</span>
      <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} font-[10] text-[80px]`}>|</span>
    </div>
  );
};

export default TypingAnimation;
