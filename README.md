# My Notebook - Class Project

This project was created for an assignment in CTEC 126 JavaScript at Clark College in the Spring quarter of 2003, as part of the unit covering local storage. The goal of the assignment was to design a site of our choosing that showcased the ability to store, retrieve and remove items from Local Storage.

I chose to create a notebook that allows a user to store text notes, images, and links. The text is parsed based on like breaks, and any links on their own line are parsed. If the link ends with a recognizable image extension, it is stored as an image, otherwise it is stored as a link, in the box on the left hand side. If there are no links included, the box will not be displayed.

Entries can be modified after being added without needing to create a new entry. Entries can also be deleted, or the user can remove all entries at once. A warning is given to alert the user that their data will be lost of they do this.
