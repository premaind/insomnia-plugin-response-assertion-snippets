# Response Assertion Snippets (Insomnia Plugin)

This is a plugin for [Insomnia](https://insomnia.rest) to provide Response Assertion Code snippets to ease the testing for users.

# Plugin Installation
-  Navigate to ~/AppData/Roaming/Insomnia/plugins folder in windows
- Clone the github project
    ```sh
    gh repo clone premaind/insomnia-plugin-response-assertion-snippets
- Install the insomnia plugin with following command
    ```sh
    npm install
- Build the insomnia plugin using below command
    ```sh
    npm run build

# How it works
- Create Design document in a insomnia workspace
- Create the desired HTTP request in "Debug" tab
- Create Test Suite in "Test" tab
- Select the workspace actions dropdown
- Choose the menu "Add Response Assertion"
- Choose the required response assertion snippets
- A save dialog will open. Please give the location "C:/Users/<your_user_name>/AppData/Roaming/Insomnia" and allow to save the file "insomnia.UnitTest.db"
- Close and open Insomnia. 
You can now see all the unit tests got added in the Test tab screen and you can now easily run all test cases and see the result

# Demo Video

https://user-images.githubusercontent.com/6916649/191023124-262685fe-b502-4884-84f6-7c2629ea6d37.mp4

# Contributors
Designed and Developed By : Prema.Namasivayam@VERIFONE.com, Satyajit.Sial@VERIFONE.com <br>
Guided By : Vineet.Dutt@VERIFONE.com , krishna_p2@VERIFONE.com
