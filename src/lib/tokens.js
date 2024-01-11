const t = {
  /** For error messages.
   * Messages are divided into 3 different sections for both error and success messages:
   *  - auth (anything related to authentication)
   *  - video (anything related to video)
   *  - user (anything related to users)
   */
  alert: {
    // For error messages
    error: {
      auth: {
        badLoginInfo: "Username or password is incorrect.",
      },
      video: {
        resize: {
          range:
            "Width and height should be greater than 0 and less than the original width and height.",
          even: "Width and height should be even numbers.",
        },
      },
      user: {},
      default: "Sorry an unexpected error occurred. Please try again later.",
    },
    // For success error messages
    success: {
      auth: {
        loggedOut: "You were successfully logged out!",
        loggedIn: "You were successfully logged in!",
      },
      video: {
        audioExtracted:
          "The audio was extracted successfully! You can now download the audio file.",
        resized:
          "The resize process has successfully started! This process could take up to a few hours. Please check back later.",
      },
      user: {
        updated: "Your info was updated successfully!",
      },
    },
  },
};

export default t;
