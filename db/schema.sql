SELECT * FROM apm5oe9jsj5tdj7x.Prompts;

DROP DATABASE IF EXISTS apm5oe9jsj5tdj7x;
CREATE DATABASE apm5oe9jsj5tdj7x;

USE apm5oe9jsj5tdj7x;

DELETE FROM Prompts;

CREATE TABLE Prompts (
  id INT NOT NULL AUTO_INCREMENT,
  text VARCHAR(200) NOT NULL,
  answer VARCHAR(5),
  createdAt VARCHAR(30),
  updatedAt VARCHAR(30),
  PRIMARY KEY(id)
);

INSERT INTO Prompts (text, answer)
VALUES
('"Step 1:_____., Step 2:_____., Step 3: Profit."', 'open'),
('"Super Mario Bros." was released in 1990."', 'false'),
('"You are allowed to sell your soul on eBay."', 'false'),
('"Next from J.K. Rowling: Harry Potter and the Chamber of _____."', 'open'),
('"Nutella is produced by the German company Ferrero."', 'false'),
('"The colors of the pills in The Matrix were blue and yellow."', 'false'),
('"Here is the church, here is the steeple. Open the doors and see all the _____."', 'open'),
('"50% of marriages end in _____."', 'open'),
('"As the parent of five, you are no stranger to _____."', 'open'),
('"The inspiration behind my music career is _____"', 'open'),
('"The sum of any two odd integers, is odd."', 'false'),
('"The Harry Potter series of books, combined, are over 1-million words in length."', 'true'),
('"A romantic, candlelit dinner would be incomplete without _____"', 'open'),
('"Bravo''s new reality show features 8 washed-up celebrities living with _____."', 'open'),
('"_____: kid-tested, mother-approved."', 'open'),
('"If you like _____, you might be a redneck."', 'open'),
('"Today on Maury: _____"', 'open'),
('"For my next trick I will pull _____ out of _____."', 'open'),
('"The real identity of Deapool is Slade Wilson."', 'false'),
('"Santa Claus is a variety of melon."', 'true'),
('"What is there a lot of in heaven?"', 'open'),
('"Such a pity that kids these days are experimenting with _____."', 'open'),
('"When I am a billionaire, I shall commission a 50-ft statue to commemorate _____."', 'open'),
('"Typewriter is the longest word that can be typed using only the first row on a QWERTY keyboard."', 'true'),
('"The logo for Snapchat is a bell."', 'false'),
('"The United States was a member of the Leauge of Nations."', 'false'),
('"In Jackie Chan''s newest action comedy he must fend off ninjas while also dealing with _____."', 'open'),
('"If you can''t be with the one you love, love _____."', 'open'),
('"I''m Lebron James, and when I''m not slamming dunks, I love _____."', 'open'),
('"I drink to forget _____."', 'open'),
('"Next on ESPN2: The World Series of _____."', 'open'),
('"The Playstation was orignally a joint project between Sega and Sony, that was a Sega Genesis with a disc drive."', 'false'),
('"Amazon acquired Twitch in August 2014 for $970 million."', 'true'),
('"When you get right down to it, _____ is just _____."', 'open'),
('"I spent my whole life working toward _____, only to have it ruined by _____."', 'open'),
('"You are pulled over by the police, and the officer is arresting your passenger for unruly conduct." _____ is your passenger.', 'open'),
('"The real name of Lady Gaga is Stefani Joanne Angelina Germanotta."', 'true'),
('"The average woman is 5 inches shorter than the average man."', 'true'),
('"The surface area of Russia is slightly larger than that of the dwarf planet Pluto."', 'true'),
('"Kangaroos keep food in their pouches next to their offspring."', 'false'),
('"Man, this is BS, screw _____."', 'open'),
('"Do the Dew with our most extreme flavor yet! Mountain Dew _____."', 'open'),
('"A caterpillar has more muscles than a human."', 'true'),
('"Actor Tommy Chong once served prison time."', 'true'),
('"Having problems with _____? Try _____!"', 'open'),
('"What is Batman''s guilty pleasure?"', 'open'),
('"Men''s Wearhouse. You''re gonna like _____. I guarantee it."', 'open'),
('"Brought to you by Bud Light, the official Beer of _____."', 'open'),
('"_____ is in prison & wants you to smuggle _____ in."', 'open'),
('"Oh no! Siri, how do I fix _____."', 'open'),
('"I got 99 problems but _____ ain''t one."', 'open'),
('"Android versions are named in alphabetical order."', 'true'),
('"2Pac died from complications being stabbed in 1996."', 'false'),
('"Before _____, all we had was _____."', 'open'),
('"Sound can travel through a vacuum."', 'false')