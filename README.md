# Video Editor Client

Welcome to the Video Editor Client, the React client JavaScript code for the video editor project featured in the Unix section of the [Understanding Node.js: Core Concepts](https://www.udemy.com/course/understanding-nodejs-core-concepts/?referralCode=0BC21AC4DD6958AE6A95) course.

This project will ultimately give you a scripts.js file that you should put in the video-editor's public folder.

### API Call Locations

Search for **@API call** in this repository's search input to locate all instances of HTTP requests that should be handled by Node.js. Expand the results to view different API calls within the same file.

### Running the Project

After cloning the repo in your `UNCC-code/unix` folder, navigate to the video-editor-client folder and install the dependencies by running:

```
npm install
```

With the dependencies installed, you now have two options to run the app:

1. **Development Mode:**

   ```
   npm start
   ```

   _Webpack will continually generate a new scripts.js file as you modify React project files, provided it's running in the terminal._

2. **Production Mode:**

   ```
   npm run build
   ```

   _Generates a minified scripts.js file. If you make future changes to React files, rerun this command._

You can read more about these webpack modes by visiting webpack [production](https://webpack.js.org/guides/production) or [development](https://webpack.js.org/guides/development/) docs.

### Changing the File Name and Path

To modify the final scripts.js file's name or path, go to the `webpack.config.js` file. In the output section, adjust the path or filename to specify your desired location or filename.

By default, the file will be saved to `../video-editor/public`. You do not need to change the path or script name whatsoever if you clone the project in `UNCC-code/unix` folder and end up with a folder structure like this:

```
--- UNCC-code
------ unix
--------- video-editor
--------- video-editor-client
```

Thanks for your interest in the repository, and happy coding!
