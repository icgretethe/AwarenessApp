#This is a short guide on using sass or SCSS
##Install Node.js
Here is a download link that shows how to download for all operating systems https://nodejs.org/en/download/

##Run these commands from the local repository folder command line
> npm install

This will create a massive node_modules folder within your local repo, which is ignored by the gitignore file

I have some global packages installed, so if an *error* comes up during npm install (you can ignore warnings) just install the package that is missing by using 

> npm install [package name] -save

and then run the *npm install* again

##That's it, almost
Now when you make style changes, make them to the scss folder and run this from the command line after the changes are done
> gulp

gulp also watches the scss files for changes, so any changes made the files will automatically update upon saving

DO NOT make changes to style.css, it will be overwritten when gulp runs over the SCSS files

SCSS is backwords compatible with CSS, so if something is written in CSS it will work if put into a SCSS file