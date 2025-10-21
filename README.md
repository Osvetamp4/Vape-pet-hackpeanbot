# Vape-pet-hackpeanbot
 
Vape-Pet is a web application submission for the HackBeanPot Hackathon 2025.



The core idea of Vape-Pet is a Harm-Reduction Software that doesn't seek to completely cure the user of their vape or smoking addiction but rather provide a plan of action to slowly reduce the user's vape/smoking usage.

Vape-Pet provides the user with the ability to document and follow their usage, and henceforth allow for self-accountability.
## Frontend Landing Page

Every user is greeted with the two initial pages that asks for the user's name and initialization information.

The third page is the home page that the user consistently refers back to whenever they add a new entry.

<figure>
  <img src="readmeimages/Init_Name_Entr.png" alt="Initialization screen" style="max-width:600px; width:80%; height:auto;" />
  <figcaption><em>Initialization — user enters name to create their profile.</em></figcaption>
</figure>

<figure>
  <img src="readmeimages/initializationinfo.png" alt="Initialization info screen" style="max-width:600px; width:80%; height:auto;" />
  <figcaption><em>Information Setup — user enters initial vape count.</em></figcaption>
</figure>

<figure>
  <img src="readmeimages\reminder.png" alt="reminder screen" style="max-width:600px; width:80%; height:auto;" />
  <figcaption><em>Reminder message — user enters a message as a small reminder.</em></figcaption>
</figure>

<figure>
  <img src="readmeimages\homepage.png" alt="reminder screen" style="max-width:600px; width:80%; height:auto;" />
  <figcaption><em>Landing Page — User Home page to count their statistics.</em></figcaption>
</figure>


## Backend and API routing

When the user submits a username that does not already exist in the database, a corresponding entry with no values is created in the backend database.


<figure>
  <img src="readmeimages\usercreation.png" alt="reminder screen" style="max-width:600px; width:80%; height:auto;" />
  <figcaption><em>Initial User Object Creation — Upon username submission, a corresponding object is created for the user.</em></figcaption>
</figure>