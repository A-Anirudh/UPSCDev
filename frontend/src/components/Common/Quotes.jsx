import React, { useState, useEffect } from 'react';

export  const Quotes = () => {
    const motivationalQuotes = [
        "Believe you can and you're halfway there. - Theodore Roosevelt",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
        "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. - Christian D. Larson",
        "It always seems impossible until it's done. - Nelson Mandela",
        "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
        "If you want to achieve greatness, stop asking for permission. - Anonymous",
        "The way to get started is to quit talking and begin doing. - Walt Disney",
        "Don't be afraid to give up the good to go for the great. - John D. Rockefeller",
        "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
        "Success is stumbling from failure to failure with no loss of enthusiasm. - Winston Churchill",
        "Do not wait to strike till the iron is hot, but make it hot by striking. - William Butler Yeats",
        "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
        "The only place where success comes before work is in the dictionary. - Vidal Sassoon",
        "Don’t let yesterday take up too much of today. - Will Rogers",
        "It’s not whether you get knocked down, it’s whether you get up. - Vince Lombardi",
        "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. - Christian D. Larson",
      ];
      

  const [quote, setQuote] = useState('');
  const [isQuoteVisible, setQuoteVisible] = useState(true);

  useEffect(() => {

    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  }, []);

  const closeQuote = () => {
    setQuoteVisible(false);
  };

  return (
    <>
      {isQuoteVisible && (
        <div className=" justify-center bg-background-1000   text-white  font-jakarta text-center w-full px-6 py-2  mx-auto my-3">
          <div className="bg-secondary  rounded-lg md:text-lg  text-md ">
            <p className="text-text-25"><span className='font-bold text-accent-700'>Daily motivation : </span> 	&ldquo; {quote} &rdquo;</p>
          </div>
        </div>
      )}
    </>
  );
};


